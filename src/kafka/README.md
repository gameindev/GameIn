# Kafka Integration

This module provides Kafka integration for the GameIn backend using KafkaJS and NestJS microservices.

## Features

- ✅ Kafka producer and consumer setup
- ✅ Automatic connection management
- ✅ Topic creation utilities
- ✅ Event publishing and subscription
- ✅ Health check endpoints
- ✅ TypeScript interfaces and types
- ✅ Error handling and logging

## Configuration

Add the following environment variables to your `.env` file:

```env
# Kafka Configuration
KAFKA_CLIENT_ID=gamein-backend
KAFKA_BROKERS=localhost:9092
KAFKA_GROUP_ID=gamein-group
KAFKA_RETRY_INITIAL_TIME=100
KAFKA_RETRIES=8
KAFKA_CONNECTION_TIMEOUT=3000
KAFKA_REQUEST_TIMEOUT=30000
```

## Usage

### 1. Basic Message Publishing

```typescript
import { KafkaService } from './kafka/kafka.service';

@Injectable()
export class YourService {
  constructor(private readonly kafkaService: KafkaService) {}

  async publishMessage() {
    await this.kafkaService.sendMessage('your-topic', {
      key: 'unique-key',
      value: { message: 'Hello Kafka!' }
    });
  }
}
```

### 2. Message Consumption

```typescript
import { KafkaService } from './kafka/kafka.service';

@Injectable()
export class YourService {
  constructor(private readonly kafkaService: KafkaService) {}

  async onModuleInit() {
    await this.kafkaService.subscribeToTopic('your-topic', async (payload) => {
      const message = JSON.parse(payload.message.value.toString());
      console.log('Received message:', message);
    });
  }
}
```

### 3. Event-Driven Architecture

```typescript
import { UserEventsService } from './kafka/events/user-events.service';

@Injectable()
export class UsersService {
  constructor(private readonly userEventsService: UserEventsService) {}

  async createUser(userData: any) {
    // Your business logic
    const user = await this.saveUser(userData);
    
    // Publish event
    await this.userEventsService.publishUserCreated({
      userId: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt.toISOString(),
    });
    
    return user;
  }
}
```

## API Endpoints

### Send Message
```http
POST /kafka/send
Content-Type: application/json

{
  "topic": "user-events",
  "message": { "event": "user.created", "data": {...} },
  "key": "user-123",
  "partition": 0
}
```

### Create Topic
```http
POST /kafka/topic/create
Content-Type: application/json

{
  "topic": "user-events",
  "partitions": 3,
  "replicationFactor": 1
}
```

### Health Check
```http
GET /kafka/health
```

## Docker Setup

The Kafka service is already configured in `docker-compose.yml`. To start Kafka:

```bash
docker-compose up kafka -d
```

## Common Use Cases

1. **User Events**: Publish user creation, updates, and deletion events
2. **Notification System**: Send notifications asynchronously
3. **Audit Logging**: Track system events and changes
4. **Data Synchronization**: Keep multiple services in sync
5. **Event Sourcing**: Store events for replay and analysis

## Best Practices

1. **Error Handling**: Always wrap Kafka operations in try-catch blocks
2. **Message Keys**: Use meaningful keys for message partitioning
3. **Topic Naming**: Use consistent naming conventions (e.g., `user.created`, `order.updated`)
4. **Idempotency**: Design consumers to handle duplicate messages
5. **Monitoring**: Monitor Kafka metrics and consumer lag
6. **Schema Evolution**: Plan for message schema changes

## Troubleshooting

### Common Issues

1. **Connection Failed**: Check if Kafka is running and accessible
2. **Topic Not Found**: Create topics before producing messages
3. **Consumer Lag**: Monitor consumer performance and scaling
4. **Message Ordering**: Use single partition for strict ordering

### Debug Mode

Enable debug logging by setting the log level:

```typescript
// In your service
this.logger.setContext('KafkaService');
this.logger.debug('Debug message');
```
