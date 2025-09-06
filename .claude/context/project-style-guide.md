---
created: 2025-09-06T16:03:31Z
last_updated: 2025-09-06T16:03:31Z
version: 1.0
author: Claude Code PM System
---

# Project Style Guide: AI Assistant Note Integration

## Code Style and Conventions

### TypeScript Configuration

**tsconfig.json Rules**:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false
  }
}
```

### Naming Conventions

#### File Names
- **Components**: `PascalCase.tsx` (e.g., `AssistantPanel.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `formatContent.ts`)
- **Types**: `PascalCase.ts` (e.g., `Conversation.ts`)
- **Tests**: `ComponentName.test.tsx` (e.g., `AssistantPanel.test.tsx`)
- **Styles**: `styles.module.css` (CSS Modules)

#### Variables and Functions
- **Variables**: `camelCase` (e.g., `userSettings`, `currentConversation`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_ATTEMPTS`)
- **Functions**: `camelCase` (e.g., `formatMessageContent`, `validateInput`)
- **Boolean variables**: prefix with `is`, `has`, `should` (e.g., `isLoading`, `hasError`)

#### Component Names
- **PascalCase** for component names (e.g., `MessageInput`)
- **Descriptive names** that indicate purpose (e.g., `ConversationHistory` not `ChatList`)
- **Interface props**: `ComponentNameProps` (e.g., `AssistantPanelProps`)

### Import Organization

#### Import Order
1. **React and built-ins**
2. **Third-party libraries**
3. **Absolute imports (@/)**
4. **Relative imports**
5. **Type imports**
6. **CSS/SCSS imports**

#### Example:
```typescript
import React, { useState, useEffect } from 'react';
import { useStore } from 'zustand';
import { Button } from '@/components/common/Button';
import { Message } from './Message';
import type { Conversation } from '@/types/conversation';
import styles from './styles.module.css';
```

#### Import Aliasing
- Use meaningful aliases for conflicting names
- Avoid default imports when possible

```typescript
// Good
import { Button as UIButton } from '@/components/common/Button';
import { Conversation } from '@/types/conversation';

// Avoid
import Button from '@/components/common/Button';
```

### Component Structure

#### Functional Components
```typescript
interface ComponentNameProps {
  // Props definition
  title: string;
  onAction?: (data: DataType) => void;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  onAction,
}) => {
  // State and hooks
  const [state, setState] = useState<StateType>();
  
  // Handlers
  const handleClick = useCallback(() => {
    onAction?.(data);
  }, [onAction]);
  
  // Render
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {/* Component content */}
    </div>
  );
};
```

#### Props Interface Rules
- Use `interface` for component props
- Mark optional props with `?`
- Use precise types, avoid `any`
- Document complex props with JSDoc

```typescript
interface MessageProps {
  /** The message content to display */
  content: string;
  /** Timestamp when the message was sent */
  timestamp: Date;
  /** Whether this is a user message (true) or AI message (false) */
  isUser: boolean;
  /** Callback when message is clicked */
  onClick?: (messageId: string) => void;
}
```

### State Management

#### useState Hook
- Use descriptive state variable names
- Provide explicit type annotations
- Use functional updates when previous state is needed

```typescript
// Good
const [messages, setMessages] = useState<Message[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(false);

// Avoid
const [msgs, setMsgs] = useState([]);
const [loading, setLoading] = useState(false);
```

#### useReducer for Complex State
```typescript
interface ConversationState {
  messages: Message[];
  status: 'idle' | 'loading' | 'error';
  error?: string;
}

type ConversationAction = 
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const conversationReducer = (
  state: ConversationState,
  action: ConversationAction
): ConversationState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_LOADING':
      return { ...state, status: action.payload ? 'loading' : 'idle' };
    case 'SET_ERROR':
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
};
```

### Error Handling

#### Error Boundaries
```typescript
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}
```

#### Async Error Handling
```typescript
const fetchWithErrorHandling = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error; // Re-throw for caller to handle
  }
};
```

### Testing Conventions

#### Test Structure
```typescript
describe('ComponentName', () => {
  // Setup
  const mockProps: ComponentNameProps = {
    // mock props
  };
  
  // Tests
  it('should render correctly', () => {
    render(<ComponentName {...mockProps} />);
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });
  
  it('should handle user interactions', async () => {
    const mockHandler = jest.fn();
    render(<ComponentName {...mockProps} onAction={mockHandler} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
  
  // Edge cases
  it('should handle empty state', () => {
    render(<ComponentName {...mockProps} data={[]} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});
```

#### Mocking Guidelines
- Use `jest.fn()` for function mocks
- Mock at the appropriate level (component vs integration)
- Clear mocks between tests
- Use realistic mock data

```typescript
// Good mock data
const mockMessage: Message = {
  id: '1',
  content: 'Hello, world!',
  timestamp: new Date('2024-01-01'),
  isUser: true,
};

// Avoid
const mockMessage = {} as Message; // Too vague
```

### CSS and Styling

#### CSS Modules Convention
- Use `styles.module.css` for component-scoped styles
- Class names in `camelCase`
- Descriptive class names

```css
/* styles.module.css */
.container {
  padding: 1rem;
  border: 1px solid #e0e0e0;
}

.message {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.messageUser {
  background-color: #e3f2fd;
}

.messageAI {
  background-color: #f5f5f5;
}
```

#### Usage in Components
```typescript
import styles from './styles.module.css';

const Message: React.FC<MessageProps> = ({ content, isUser }) => (
  <div className={cn(
    styles.message,
    isUser ? styles.messageUser : styles.messageAI
  )}>
    {content}
  </div>
);
```

### Documentation Standards

#### JSDoc Comments
```typescript
/**
 * Formats a message timestamp for display
 * @param timestamp - The date to format
 * @returns Formatted date string
 */
function formatTimestamp(timestamp: Date): string {
  return timestamp.toLocaleTimeString();
}

/**
 * AI Assistant component that provides contextual help
 * @param props - Component properties
 * @param props.conversation - Current conversation history
 * @param props.onNewMessage - Callback when new message is added
 */
const AssistantPanel: React.FC<AssistantPanelProps> = ({
  conversation,
  onNewMessage,
}) => {
  // implementation
};
```

#### Component README
Each major component directory should have a README.md:
```markdown
# ComponentName

## Purpose
Brief description of what this component does.

## Props
- `propName`: Type - Description
- `onAction`: (data: Type) => void - Callback description

## Usage
```tsx
<ComponentName 
  prop1="value"
  onAction={handleAction}
/>
```

## Dependencies
- Internal: List internal dependencies
- External: List external libraries used
```

### Git Commit Messages

**Conventional Commits Format**:
```
feat: add conversation persistence
fix: resolve message rendering issue
docs: update component documentation
style: format code with prettier
refactor: reorganize service layer
test: add unit tests for utils
chore: update dependencies
```

**Commit Message Rules**:
- Use imperative mood ("add" not "added")
- Limit first line to 50 characters
- Provide more details in body if needed
- Reference issues with #123

### Code Review Guidelines

#### Must Have
- TypeScript types are correct and precise
- No `any` types unless absolutely necessary
- Tests cover main functionality and edge cases
- Error handling is appropriate
- Performance considerations addressed

#### Should Have
- Code is readable and well-commented
- Follows existing patterns and conventions
- No unnecessary dependencies added
- Documentation updated if needed

#### Could Have
- Additional tests for better coverage
- Performance optimizations
- Additional error cases handled

### Performance Guidelines

#### React Optimization
- Use `React.memo` for expensive components
- Use `useCallback` and `useMemo` appropriately
- Avoid inline object/function creation in render
- Implement virtual scrolling for long lists

#### Bundle Size
- Use code splitting with `React.lazy`
- Tree-shake unused imports
- Avoid large dependencies when possible
- Monitor bundle size with build tools

This style guide ensures consistency, maintainability, and quality across the AI assistant note integration project. All contributors should follow these conventions to maintain code quality and team productivity.