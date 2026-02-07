# Email templates

Handlebars (`.hbs`) templates used by `EmailsService.sendTemplate()`. When sending, pass `metadata.emailData` with the variables below. Optional vars can be omitted (sections won't render).

## Template list and variables

| Template | Use case | Variables |
|----------|----------|-----------|
| `verify-account` | Email verification | `username`, `verifyUrl` |
| `reset-password` | Password reset | `username`, `resetUrl` |
| **Offers** | | |
| `offer-by-brand` | Brand sent offer to creator | `username`, `offerTitle?`, `brandName?`, `dashboardUrl` |
| `offer-adjusted` | Brand adjusted offer | `username`, `offerTitle?`, `brandName?`, `dashboardUrl` |
| `offer-accepted` | Creator accepted (notify brand) | `username`, `offerTitle?`, `creatorName?`, `price?`, `currency?`, `dashboardUrl` |
| `offer-rejected` | Creator rejected (notify brand) | `username`, `offerTitle?`, `creatorName?`, `dashboardUrl` |
| `offer-expired` | Offer expired | `username`, `offerTitle?`, `dashboardUrl` |
| `offer-ended` | Offering ended | `username`, `offerTitle?`, `dashboardUrl` |
| **Orders & payments** | | |
| `order-created` | New order (notify creator) | `username`, `orderTitle?`, `brandName?`, `total?`, `currency?`, `dashboardUrl` |
| `order-status-update` | Order status changed | `username`, `orderTitle?`, `newStatus?`, `orderIdString?`, `dashboardUrl` |
| `payment-intent` | Payment initiated | `username`, `orderTitle?`, `amount?`, `currency?`, `dashboardUrl` |
| `payment-received` | Payment success | `username`, `orderTitle?`, `orderIdString?`, `amount?`, `currency?`, `dashboardUrl` |
| `payment-failed` | Payment failed | `username`, `orderTitle?`, `amount?`, `currency?`, `dashboardUrl` |

**Note:** When using template-based emails, set `metadata.emailData` to an object containing the variables above (and optionally `metadata.emailSubject`). Include `dashboardUrl` (e.g. from `FRONTEND_HOST` or app config) so the CTA button works.
