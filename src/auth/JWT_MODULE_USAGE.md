# JWT Module Usage Guide

## Problem

When using `AccessTokenGuard` in a controller, the module must have access to `JwtService`. NestJS dependency injection requires that all dependencies be available in the module's context.

## Solution

**Always import `AuthModule` in any module that uses `AccessTokenGuard`.**

The `AuthModule` exports `JwtModule`, so importing `AuthModule` provides access to `JwtService` for guards.

## Pattern

```typescript
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
// ... other imports

@Module({
    imports: [
        // ... other imports
        AuthModule, // Required if using AccessTokenGuard
    ],
    controllers: [YourController],
    providers: [YourService],
})
export class YourModule {}
```

## Modules Currently Using This Pattern

- ✅ `NewsfeedModule` - Uses `forwardRef(() => AuthModule)`
- ✅ `UserFaqsModule` - Uses `AuthModule`
- ✅ `NotificationsModule` - Uses direct `JwtModule` import (can be refactored)
- ✅ `ChatModule` - Uses direct `JwtModule` import (can be refactored)

## Important Notes

1. **No need to import `JwtModule` directly** - Import `AuthModule` instead
2. **Use `forwardRef()` if there might be circular dependencies** (e.g., `forwardRef(() => AuthModule)`)
3. **The `AuthModule` exports `JwtModule`**, so importing `AuthModule` provides `JwtService`

## Error to Watch For

If you see this error:
```
Nest can't resolve dependencies of the AccessTokenGuard (?). 
Please make sure that the argument JwtService at index [0] is available in the [ModuleName] context.
```

**Solution**: Add `AuthModule` to the `imports` array of the module that uses `AccessTokenGuard`.

## Example Fix

**Before (Broken):**
```typescript
@Module({
    imports: [
        TypeOrmModule.forFeature([YourEntity]),
        // Missing AuthModule!
    ],
    controllers: [YourController], // Uses @UseGuards(AccessTokenGuard)
})
export class YourModule {}
```

**After (Fixed):**
```typescript
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([YourEntity]),
        AuthModule, // ✅ Added
    ],
    controllers: [YourController], // Uses @UseGuards(AccessTokenGuard)
})
export class YourModule {}
```

