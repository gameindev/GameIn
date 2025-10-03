# Messaging Client Guide

This guide shows how a client app creates conversations (DIRECT/GROUP), connects over WebSockets, sends messages, and handles server events. It also outlines payloads and endpoints used by this service.

## Conversation Types

- Enum: `DIRECT | GROUP` (see `src/messaging/enum/conversation-type.enum.ts`)

## 1) Authenticate and get a JWT

- HTTP: `POST /api/auth/sign-in`
- Body:
  ```json
  { "identifier": "<username-or-email>", "password": "<password>" }
  ```
- Response:
  ```json
  { "access_token": "<jwt>" }
  ```

Use this token for both REST and Socket.IO.

## 2) Create a conversation

Endpoint: `POST /api/messaging/conversation`

Body (DIRECT):
```json
{
  "participant_ids": [1, 42],
  "type": "DIRECT"
}
```

Body (GROUP):
```json
{
  "participant_ids": [1, 42, 99],
  "type": "GROUP",
  "title": "Design Team"
}
```

Response contains the new conversation with `id` (your `conversation_id`).

DTO reference: `src/messaging/dto/create-conversation.dto.ts`

## 3) Connect via Socket.IO

- URL: `ws://localhost:3002`
- Send JWT as either:
  - Header: `Authorization: Bearer <token>`
  - or auth payload: `{ auth: { token: '<token>' } }`

Example (socket.io-client):
```ts
import { io } from 'socket.io-client';

const socket = io('ws://localhost:3002', {
  auth: { token: '<jwt>' }
});

socket.on('connect', () => {
  console.log('connected', socket.id);
});

socket.on('error', (e) => console.error('socket error', e));
```

On connect, the server joins you to your personal room `user:<sub>` for targeted notifications.

## 4) Join a conversation room

Server broadcasts conversation updates to `conv:<conversation_id>`. Ensure your client joins that room after opening a conversation. If you don’t have a dedicated join event yet, add one server‑side (a simple `client.join('conv:' + id)` handler). Until then, you’ll still receive user‑targeted events in `user:<sub>`.

Suggested client once a join event exists:
```ts
socket.emit('JOIN_CONVERSATION', { conversation_id: 123 });
```

## 5) Send a message

Event name: `SEND_MESSAGE` (see `src/messaging/enum/socket.enum.ts`)

Payload (SendMessageDto: `src/messaging/dto/send-message.dto.ts`):
```json
{
  "conversation_id": 123,
  "sender_id": 1,
  "type": "TEXT",
  "content": "Hello team!",
  "client_msg_id": "<uuid>"
}
```
Notes:
- `sender_id` is currently validated; include it to avoid validation errors.
- `client_msg_id` is recommended (UUID) for idempotency and reconciliation.
- For media, set `type` to `IMAGE` or `VIDEO` and pass `attachment_id`.

Type options: `TEXT | IMAGE | VIDEO | SYSTEM` (see `src/messaging/enum/type.enum.ts`).

## 6) Handle server events

Register these listeners:

- `messageReceived`
  - Broadcast to `conv:<conversation_id>` with the message payload (may or may not include a DB `id` immediately depending on mode).
- `messagePersisted`
  - Payload: `{ conversation_id, client_msg_id, messageId, persisted_at }`
  - Use to reconcile your pending message (by `client_msg_id`) to the official `messageId` and clear any "sending" indicator.
- `messageDelivered`
  - Payload: `{ messageId, userId }`
  - Marks a message delivered for a specific recipient; emitted once the message has a real `messageId`.
- `user-joined` / `user-left`
  - Informational room join/leave broadcasts.

Example:
```ts
socket.on('messageReceived', (msg) => {
  // render message immediately in the thread
});

socket.on('messagePersisted', ({ conversation_id, client_msg_id, messageId }) => {
  // reconcile temp message (client_msg_id) -> canonical messageId
});

socket.on('messageDelivered', ({ messageId, userId }) => {
  // mark delivered for userId
});
```

## 7) Delivery and read receipts (REST)

- Delivered: `POST /api/messaging/delivered`
  ```json
  { "message_id": 555, "user_id": 42 }
  ```
- Read: `POST /api/messaging/read`
  ```json
  { "message_id": 555, "user_id": 42 }
  ```

These update receipt state and also publish Kafka events; the service emits WS updates when a `messageId` exists.

## Modes (transparent to client)

- Kafka‑first async: You’ll see `messageReceived` immediately, then `messagePersisted` shortly after.
- Kafka‑first sync: Both arrive nearly together; `messageId` is present immediately.
- Outbox: Persistence and publication are transactional; `messagePersisted` arrives quickly.

## Troubleshooting

- Not receiving conversation updates? Ensure the client joined `conv:<id>` room (and that the server exposes a join handler).
- Auth error on connect? Confirm you send `Authorization: Bearer <jwt>` or `auth.token`.
- Stuck in "sending"? Ensure you pass a `client_msg_id` and listen for `messagePersisted` to reconcile.
- Partitioning/order concerns? Messages are keyed by `conversation_id` for ordering per conversation.

---
This document reflects the current API and event flow in this repository. Update it alongside any changes to DTOs, events, or room join semantics.

