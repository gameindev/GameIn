# Backend Source Folder Structure

This document outlines the structure of the `src` folder in the GameIn Backend project.

## Root Level Files

```
src/
├── main.ts                           # Application entry point
├── app.controller.ts                 # Main application controller
├── app.controller.spec.ts           # Main controller tests
├── app.module.ts                     # Root application module
├── app.service.ts                    # Main application service
└── data-source.ts                    # Database data source configuration
```

## Core Directories

### @types/
Type definitions and type extensions
```
@types/
└── express/
    └── index.d.ts                    # Express type extensions
```

### config/
Application configuration files
```
config/
├── app.config.ts                     # Main application configuration
├── database.config.ts                # Database configuration
└── environment.validation.ts         # Environment validation schemas
```

### common/
Shared utilities and common functionality
```
common/
├── filters/                          # Exception filters
│   └── [1 file]
└── interceptors/                     # HTTP interceptors
    └── [1 file]
```

### migrations/
Database migration files
```
migrations/
├── 1758301871796-CreateEnumUserType.ts
├── 1758302302479-CreateEnumUploadType.ts
├── 1758302335267-CreateEnumSocialPlatform.ts
├── 1758302356697-CreateEnumOfferingEnums.ts
├── 1758344377089-CreateUserTable.ts
├── 1758344601475-CreateUploadTable.ts
├── 1758344707445-CreateCreatorProfileTable.ts
├── 1758344766943-CreateBrandProfileTable.ts
├── 1758344807245-CreateUserBioTable.ts
├── 1758344859268-CreateSocialIntegrationTable.ts
├── 1758344918509-CreatePreferredGamesTable.ts
├── 1758344992743-CreatePofileViewTable.ts
├── 1758345028747-CreateUserFollowerTable.ts
├── 1758345133355-CreateOfferingTable.ts
├── 1758345229467-CreateOfferPriceTable.ts
├── 1758345439313-CreateOfferingOffersTable.ts
├── 1758345589559-CreateTeamsTable.ts
├── 1758345801753-AddAdjustmentTrackingToOfferingTable.ts
├── 1758345840017-AddVersioningToOfferingOffersTable.ts
├── 1758345893102-AddDateColumnsToOfferingOffersTable.ts
├── 1758345943317-AddColumnUpdateByUserToOfferingOffersTable.ts
├── 1758634720967-CreateConversationTable.ts
├── 1758635211620-CreateConversationParticipantTable.ts
├── 1758635491781-CreateMessagesTable.ts
├── 1758635696425-CreateMessageReceiptTable.ts
├── 1759001000000-AddClientMsgIdToMessage.ts
└── 1759001100000-CreateOutboxEventTable.ts
```

## Feature Modules

### auth/
Authentication and authorization module
```
auth/
├── auth.controller.ts                # Authentication controller
├── auth.module.ts                    # Authentication module
├── config/
│   └── jwt.config.ts                 # JWT configuration
├── contants/                         # Authentication constants
│   └── [1 file]
├── decorators/                       # Custom decorators
│   └── [3 files]
├── dtos/                             # Data Transfer Objects
│   └── [2 files]
├── enums/                            # Authentication enums
│   └── [1 file]
├── guards/                           # Authentication guards
│   └── [4 files]
├── http/                             # HTTP test files
│   └── [2 files]
├── interfaces/                       # Authentication interfaces
│   └── [1 file]
├── providers/                        # Authentication providers
│   └── [6 files]
└── social/                           # Social authentication
    └── [3 files]
```

### users/
User management module
```
users/
├── users.controller.ts               # Users controller
├── users.module.ts                   # Users module
├── user.entity.ts                    # User entity
├── config/
│   └── profile.config.ts             # Profile configuration
├── dtos/                             # User DTOs
│   ├── get-user-param.dto.ts
│   ├── patch-user-role.dto.ts
│   ├── patch-user.dto.ts
│   └── post-create-user.dto.ts
├── enums/
│   └── user-type.enums.ts            # User type enums
├── http/                             # HTTP test files
│   ├── user.delete.endpoints.http
│   ├── user.get.endpoints.http
│   ├── user.patch.endpoints.http
│   └── user.post.endpoints.http
├── interfaces/
│   └── google-user.intefrace.ts      # Google user interface
├── providers/                        # User providers
│   ├── check-one-by-identifier.provider.ts
│   ├── create-google-user.provider.ts
│   ├── create-user.provider.ts
│   ├── find-one-by-google-id.provider.ts
│   ├── find-one-by-identifier.provider.ts
│   ├── find-one-user-by-email.provider.ts
│   ├── find-user-by-username-provider.ts
│   ├── update-user-role.provider.ts
│   ├── update-user.provider.ts
│   └── users.service.ts
└── utils/                            # User utilities
    ├── common-utilities.ts
    └── populate-user-relations.ts
```

### creator-profiles/
Creator profile management module
```
creator-profiles/
├── creator-profile.entity.ts         # Creator profile entity
├── creator-profiles.controller.ts    # Creator profiles controller
├── creator-profiles.module.ts        # Creator profiles module
├── dtos/                             # Creator profile DTOs
│   └── [2 files]
└── providers/                        # Creator profile providers
    └── [4 files]
```

### brand-profiles/
Brand profile management module
```
brand-profiles/
├── brand-profile.entity.ts           # Brand profile entity
├── brand-profiles.controller.ts      # Brand profiles controller
├── brand-profiles.module.ts          # Brand profiles module
├── dtos/                             # Brand profile DTOs
│   └── [2 files]
└── providers/                        # Brand profile providers
    └── [4 files]
```

### offerings/
Offering and pricing management module
```
offerings/
├── offerings.controller.ts           # Offerings controller
├── offerings.entity.ts               # Offerings entity
├── offerings.module.ts               # Offerings module
├── dtos/                             # Offering DTOs
│   ├── get-offering.dto.ts
│   ├── offerings-responses.dto.ts
│   ├── patch-offering-bundle.dto.ts
│   ├── patch-offering.dto.ts
│   ├── post-offering-bundle.dto.ts
│   └── post-offering.dto.ts
├── enums/                            # Offering enums
│   ├── event-type.enum.ts
│   ├── offering-category.enum.ts
│   ├── offering-status.enum.ts
│   ├── offering-type.enum.ts
│   ├── payment-provider.enum.ts
│   ├── size-preset.enum.ts
│   └── time-mode.enum.ts
├── offering-offers/                  # Offering offers submodule
│   ├── offering-offers.controller.ts
│   ├── offering-offers.entity.ts
│   ├── offering-offers.module.ts
│   ├── dtos/
│   │   ├── patch-offering-offer.dto.ts
│   │   └── post-offering-offer.dto.ts
│   └── providers/
│       └── offering-offers.service.ts
├── offering-price/                   # Offering pricing submodule
│   ├── offering-price.controller.ts
│   ├── offering-price.entity.ts
│   ├── offering-price.module.ts
│   ├── dtos/
│   │   ├── patch-offer-price.dto.ts
│   │   └── post-offer-price.dto.ts
│   └── providers/
│       └── offering-price.service.ts
├── providers/                        # Offering providers
│   ├── create-adjustment.provider.ts
│   ├── offering.base.service.ts
│   └── offerings.service.ts
└── scheduler/                        # Offering schedulers
    └── offerings.scheduler.ts
```

### social-integration/
Social platform integration module
```
social-integration/
├── social-integration.controller.ts  # Social integration controller
├── social-integration.module.ts      # Social integration module
├── entities/
│   └── social-integration.entity.ts  # Social integration entity
├── enums/
│   └── social-platform.enums.ts      # Social platform enums
├── interfaces/
│   └── social-integration-service.interface.ts
├── platforms/                        # Platform-specific implementations
│   ├── discord/
│   │   ├── discord.config.ts
│   │   ├── discord.module.ts
│   │   └── discord.service.ts
│   ├── instagram/
│   │   ├── instagram.config.ts
│   │   ├── instagram.module.ts
│   │   └── instagram.service.ts
│   ├── twitch/
│   │   ├── twitch.config.ts
│   │   ├── twitch.module.ts
│   │   └── twitch.service.ts
│   └── x/
│       ├── x.config.ts
│       ├── x.module.ts
│       └── x.service.ts
└── providers/
    ├── social-integration.provider.ts
    └── social-integration.service.ts
```

### teams/
Team management module
```
teams/
├── teams.controller.ts               # Teams controller
├── teams.entity.ts                   # Teams entity
├── teams.module.ts                   # Teams module
├── dtos/                             # Team DTOs
│   └── [3 files]
├── enums/                            # Team enums
│   └── [3 files]
├── providers/                        # Team providers
│   └── [1 file]
├── team-links/                       # Team links submodule
│   └── [6 files]
└── team-members/                     # Team members submodule
    └── [5 files]
```

### uploads/
File upload management module
```
uploads/
├── upload.entity.ts                  # Upload entity
├── uploads.controller.ts             # Uploads controller
├── uploads.module.ts                 # Uploads module
├── enums/                            # Upload enums
│   └── [1 file]
├── interfaces/                       # Upload interfaces
│   └── [1 file]
└── providers/                        # Upload providers
    └── [5 files]
```

### emails/
Email service module
```
emails/
├── emails.controller.ts              # Emails controller
├── emails.module.ts                  # Emails module
├── emails.service.ts                 # Emails service
├── config/                           # Email configuration
│   └── [2 files]
├── interfaces/                       # Email interfaces
│   └── [1 file]
├── providers/                        # Email providers
│   └── [2 files]
└── templates/                        # Email templates
    └── [3 files] (.hbs)
```

### user-follow/
User follow/following functionality
```
user-follow/
├── user-follow.controller.ts         # User follow controller
├── user-follow.entity.ts             # User follow entity
├── user-follow.module.ts             # User follow module
├── dtos/                             # User follow DTOs
│   └── [1 file]
└── providers/                        # User follow providers
    └── [1 file]
```

### user-search/
User search functionality
```
user-search/
├── user-search.controller.ts         # User search controller
├── user-search.module.ts             # User search module
├── dtos/                             # User search DTOs
│   └── [1 file]
└── providers/                        # User search providers
    └── [1 file]
```

### users-bio/
User biography management
```
users-bio/
└── [6 files]                         # User bio related files
```

### preferred-games/
User preferred games management
```
preferred-games/
├── preferred-games.controller.ts     # Preferred games controller
├── preferred-games.entity.ts         # Preferred games entity
├── preferred-games.module.ts         # Preferred games module
├── dto/                              # Preferred games DTOs
│   └── [1 file]
└── providers/                        # Preferred games providers
    └── [1 file]
```

### metadata/
Application metadata management
```
metadata/
├── metadata.module.ts                # Metadata module
└── providers/                        # Metadata providers
    └── [1 file]
```

### views/
View-related functionality
```
views/
└── [4 files]                         # View related files
```

## Architecture Notes

This project follows a modular NestJS architecture with the following patterns:

1. **Module-based Structure**: Each feature is organized as a separate module with its own controller, service, and related files
2. **DTOs**: Data Transfer Objects are used for request/response validation
3. **Providers**: Business logic is encapsulated in provider services
4. **Entities**: TypeORM entities for database models
5. **Migrations**: Database schema changes are tracked through migration files
6. **Configuration**: Environment-specific configurations are centralized
7. **Testing**: HTTP test files are included for API endpoint testing

The structure supports scalability and maintainability by separating concerns and following NestJS best practices.

