---
created: 2025-09-06T16:03:31Z
last_updated: 2025-09-06T16:03:31Z
version: 1.0
author: Claude Code PM System
---

# Project Structure: AI Assistant Note Integration

## Directory Organization

```
ccpm-demo/
├── .claude/                 # Claude Code PM system
│   ├── commands/           # CCPM command definitions
│   ├── context/           # Project context documentation
│   ├── scripts/           # Utility scripts
│   └── settings.local.json # Local configuration
├── public/                # Static assets
│   ├── index.html        # Main HTML template
│   └── assets/           # Images, fonts, etc.
├── src/                   # Application source code
│   ├── components/       # React components
│   │   ├── editors/      # Note editor components
│   │   ├── ai/           # AI assistant components
│   │   ├── common/       # Shared UI components
│   │   └── layout/       # Layout components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # Business logic and API calls
│   ├── stores/           # State management (Zustand/Context)
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles and themes
│   └── App.tsx           # Main application component
├── tests/                # Test files
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
├── docs/                 # Project documentation
├── scripts/              # Build and utility scripts
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md            # Project overview
```

## Source Code Structure (src/)

### Components Directory (/src/components)

#### Editors (/src/components/editors)
```
editors/
├── RichTextEditor/       # Quill.js based editor
│   ├── RichTextEditor.tsx
│   ├── RichTextToolbar.tsx
│   └── styles.module.css
├── MarkdownEditor/       # Cherry Markdown editor
│   ├── MarkdownEditor.tsx
│   ├── MarkdownToolbar.tsx
│   └── styles.module.css
├── MindMapEditor/        # SimpleMind integration
│   ├── MindMapEditor.tsx
│   ├── MindMapToolbar.tsx
│   └── styles.module.css
├── FlowchartEditor/      # DrawIO integration
│   ├── FlowchartEditor.tsx
│   ├── FlowchartToolbar.tsx
│   └── styles.module.css
└── EditorWrapper/        # Common editor container
    ├── EditorWrapper.tsx
    └── types.ts
```

#### AI Components (/src/components/ai)
```
ai/
├── AssistantPanel/       # Main AI assistant UI
│   ├── AssistantPanel.tsx
│   ├── MessageList.tsx   # Conversation display
│   ├── MessageInput.tsx  # User input field
│   └── styles.module.css
├── ModelSelector/        # Model choice interface
│   ├── ModelSelector.tsx
│   ├── ModelCard.tsx     # Individual model display
│   └── styles.module.css
├── ConversationHistory/  # Saved conversations
│   ├── ConversationList.tsx
│   ├── ConversationItem.tsx
│   └── styles.module.css
└── SuggestionPanel/      # AI content suggestions
    ├── SuggestionPanel.tsx
    ├── SuggestionItem.tsx
    └── styles.module.css
```

#### Common UI Components (/src/components/common)
```
common/
├── Button/
├── Input/
├── Modal/
├── Toggle/
├── Loading/
└── ErrorBoundary/
```

#### Layout Components (/src/components/layout)
```
layout/
├── Header/
├── Sidebar/
├── MainLayout/
└── ResizablePanel/
```

### Hooks Directory (/src/hooks)
```
hooks/
├── useAIAssistant.ts     # AI interaction logic
├── useConversation.ts    # Conversation management
├── useEditorContent.ts   # Editor content tracking
├── useModelConfig.ts     # Model configuration
├── useLocalStorage.ts    # Persistent storage
└── useDebounce.ts        # Debounced operations
```

### Services Directory (/src/services)
```
services/
├── ai/
│   ├── openaiService.ts  # OpenAI API integration
│   ├── localModelService.ts # Local model integration
│   └── modelFactory.ts   # Model provider factory
├── storage/
│   ├── conversationStorage.ts
│   ├── noteStorage.ts
│   └── settingsStorage.ts
├── editor/
│   ├── contentService.ts # Content transformation
│   └── formatService.ts  # Format conversion
└── api/
    ├── apiClient.ts      # HTTP client wrapper
    └── errorHandler.ts   # API error handling
```

### Stores Directory (/src/stores)
```
stores/
├── useAppStore.ts        # Main application state
├── useAIConversationStore.ts # Conversation state
├── useEditorStore.ts     # Editor state management
├── useModelStore.ts      # Model configuration state
└── useSettingsStore.ts   # User preferences
```

### Types Directory (/src/types)
```
types/
├── ai.ts                # AI-related types
├── editor.ts            # Editor-related types
├── conversation.ts      # Conversation types
├── model.ts            # Model configuration types
├── note.ts             # Note data types
└── index.ts            # Barrel exports
```

### Utils Directory (/src/utils)
```
utils/
├── aiUtils.ts           # AI-specific utilities
├── editorUtils.ts       # Editor helper functions
├── contentUtils.ts      # Content manipulation
├── storageUtils.ts      # Storage helpers
├── validationUtils.ts   # Input validation
└── domUtils.ts          # DOM manipulation helpers
```

## File Naming Conventions

### Component Files
- **PascalCase**: ComponentName.tsx
- **Styles**: styles.module.css (CSS Modules)
- **Tests**: ComponentName.test.tsx
- **Types**: ComponentName.types.ts (if complex types)

### Utility Files
- **camelCase**: utilityName.ts
- **Clear naming**: Describe functionality clearly

### Type Files
- **PascalCase**: TypeName.ts
- **Barrel exports**: index.ts for easy imports

## Import Patterns

### Absolute Imports
Configured in tsconfig.json for clean imports:
```typescript
import { Button } from '@/components/common/Button';
import { useAIAssistant } from '@/hooks/useAIAssistant';
import { Conversation } from '@/types/conversation';
```

### Barrel Exports
Each directory has index.ts for clean exports:
```typescript
// components/editors/index.ts
export { RichTextEditor } from './RichTextEditor/RichTextEditor';
export { MarkdownEditor } from './MarkdownEditor/MarkdownEditor';
```

## Configuration Files

### TypeScript (tsconfig.json)
- Strict mode enabled
- Path mapping for absolute imports
- ES2020 target
- Module resolution: Node

### Vite (vite.config.ts)
- React plugin
- TypeScript support
- Environment variables
- Build optimization

### ESLint (.eslintrc.js)
- React hooks rules
- TypeScript compatibility
- Import ordering
- Accessibility rules

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "jest",
    "test:e2e": "cypress run",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  }
}
```

## Build Output Structure

```
dist/
├── assets/
│   ├── index.[hash].js
│   ├── index.[hash].css
│   └── vendor.[hash].js
├── index.html
└── manifest.json
```

## Development Workflow

### Component Development
1. Create component in appropriate directory
2. Add TypeScript interfaces
3. Write unit tests
4. Add CSS modules for styling
5. Export through barrel file

### Feature Development
1. Create feature branch
2. Implement required components and hooks
3. Add integration tests
4. Update documentation
5. Merge to main after review

### Testing Strategy
- **Unit tests**: Individual components and functions
- **Integration tests**: Component interactions
- **E2E tests**: User workflows
- **Performance tests**: Editor and AI responsiveness

## Documentation Structure

### Code Documentation
- JSDoc comments for functions and components
- README.md in each major directory
- TypeScript interfaces as documentation

### User Documentation
- Getting started guide
- Feature documentation
- Troubleshooting guide
- API documentation (if backend exists)

This structure provides a scalable foundation for the AI assistant note integration system, with clear separation of concerns and easy maintainability.