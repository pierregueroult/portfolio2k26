# i18n Refactoring and Chat Integration Walkthrough

I have successfully moved the internationalization messages to a separate package, synchronized translations, and integrated them into the Chat Service to provide context to the AI.

## Changes

### 1. Created New Package `@repo/i18n`
- Created `packages/i18n` directory.
- Added `package.json` with exports for messages.
- Moved `messages` folder (containing `en.json`, `fr.json`, `en.d.json.ts`) from `apps/portfolio/src/features/internationalization/` to `packages/i18n/`.

### 2. Shared Type Definitions in `@repo/database`
- Created `packages/database/src/constracts/i18n/messages.ts` defining the `I18nMessages` interface.
- This ensures a single source of truth for the message structure across frontend and backend.

### 3. Updated Portfolio Application
- **`package.json`**: Added `@repo/i18n` dependency.
- **`next.config.ts`**: Updated `createMessagesDeclaration` path.
- **`src/features/internationalization/lib/request.ts`**: Updated message loading.
- **`src/features/internationalization/next-intl.d.ts`**: Updated type import to use `I18nMessages` from `@repo/database`.

### 4. Synchronized French Translations
- Updated `packages/i18n/messages/fr.json` to match `en.json`.

### 5. Integrated into Chat Service (`apps/main-api`)
- **Dependencies**: Added `@repo/i18n` and `@repo/database`.
- **`tsconfig.json`**: Enabled `resolveJsonModule` and `allowArbitraryExtensions` to correctly resolve `en.json` imports shadowed by `en.d.json.ts`.
- **`src/chat/chat.service.ts`**:
    - Imported `en.json` and cast it to `I18nMessages`.
    - Injected the full JSON content into the system prompt to provide context about the website (navigation, metadata, etc.).

## Verification

- **`apps/portfolio`**: `pnpm typecheck` passed (ignoring unrelated grid-pattern error).
- **`apps/main-api`**: `pnpm typecheck` passed.

## Files Modified
- `packages/i18n/package.json`
- `packages/i18n/messages/fr.json`
- `packages/i18n/messages/en.d.json.ts`
- `packages/database/src/constracts/i18n/messages.ts`
- `apps/portfolio/package.json`
- `apps/portfolio/next.config.ts`
- `apps/portfolio/src/features/internationalization/lib/request.ts`
- `apps/portfolio/src/features/internationalization/next-intl.d.ts`
- `apps/main-api/package.json`
- `apps/main-api/tsconfig.json`
- `apps/main-api/src/chat/chat.service.ts`
