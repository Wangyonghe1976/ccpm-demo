---
created: 2025-09-06T16:03:31Z
last_updated: 2025-09-06T16:03:31Z
version: 1.0
author: Claude Code PM System
---

# System Patterns: AI Assistant Note Integration

## Architectural Patterns

### 1. Component-Based Architecture
**Pattern**: React functional components with hooks
**Implementation**:
- Functional components with TypeScript
- Custom hooks for business logic
- Composition over inheritance
- Props drilling minimized with context

**Benefits**:
- Reusable and testable components
- Clear separation of concerns
- Easy to reason about data flow

### 2. State Management Pattern
**Pattern**: Zustand for global state + React state for local
**Implementation**:
- Zustand stores for application-wide state
- React useState/useReducer for component state
- Derived state with selectors
- Persistence to local storage

**Benefits**:
- Minimal boilerplate
- Excellent TypeScript support
- DevTools integration
- Easy testing

### 3. Service Layer Pattern
**Pattern**: Service classes/functions for external interactions
**Implementation**:
- Service functions for API calls
- Factory pattern for model providers
- Adapter pattern for different editor libraries
- Proxy pattern for model communication

**Benefits**:
- Isolate external dependencies
- Easy to mock for testing
- Centralized error handling
- Configurable implementations

## Design Patterns

### 1. Factory Pattern for Model Providers
**Use Case**: Creating different AI model instances
**Implementation**:
```typescript
interface ModelProvider {
  generateResponse(prompt: string): Promise<string>;
}

class ModelFactory {
  static createProvider(config: ModelConfig): ModelProvider {
    switch(config.type) {
      case 'openai': return new OpenAIService(config);
      case 'local': return new LocalModelService(config);
      default: throw new Error('Unknown model type');
    }
  }
}
```

### 2. Strategy Pattern for Editor Integration
**Use Case**: Different editors require different integration approaches
**Implementation**:
```typescript
interface EditorStrategy {
  getContent(): string;
  setContent(content: string): void;
  onContentChange(callback: (content: string) => void): void;
}

class QuillStrategy implements EditorStrategy {
  // Quill-specific implementation
}

class MarkdownStrategy implements EditorStrategy {
  // Markdown-specific implementation
}
```

### 3. Observer Pattern for Real-time Updates
**Use Case**: AI assistant reacting to editor changes
**Implementation**:
```typescript
class ContentObserver {
  private observers: Array<(content: string) => void> = [];
  
  subscribe(callback: (content: string) => void) {
    this.observers.push(callback);
  }
  
  notify(content: string) {
    this.observers.forEach(callback => callback(content));
  }
}
```

### 4. Adapter Pattern for API Normalization
**Use Case**: Different AI APIs have different response formats
**Implementation**:
```typescript
interface NormalizedAIResponse {
  content: string;
  isComplete: boolean;
  error?: string;
}

class OpenAIAdapter {
  normalizeResponse(openaiResponse: any): NormalizedAIResponse {
    return {
      content: openaiResponse.choices[0].message.content,
      isComplete: true
    };
  }
}
```

### 5. Decorator Pattern for Enhanced Functionality
**Use Case**: Adding features like caching or logging to AI services
**Implementation**:
```typescript
class CachingAIService implements ModelProvider {
  constructor(private wrappedService: ModelProvider) {}
  
  async generateResponse(prompt: string): Promise<string> {
    const cacheKey = this.getCacheKey(prompt);
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;
    
    const response = await this.wrappedService.generateResponse(prompt);
    this.cache.set(cacheKey, response);
    return response;
  }
}
```

## Data Flow Patterns

### 1. Unidirectional Data Flow
**Pattern**: Parent → Props → Children → Events → Parent
**Implementation**:
- Props down for data
- Events up for actions
- State lifted to common ancestors
- Context for widely needed data

### 2. Event-Driven Architecture
**Pattern**: Components emit events, services react
**Implementation**:
- Custom events for editor changes
- DOM events for user interactions
- Synthetic events for cross-component communication

### 3. Reactive Programming
**Pattern**: State changes automatically propagate
**Implementation**:
- React state and effects
- Zustand subscriptions
- RxJS observables (if complex streams needed)

## Integration Patterns

### 1. Editor-AI Communication Pattern
**Approach**: Shared state + event system
**Implementation**:
```typescript
// Editor emits content changes
const handleContentChange = (content: string) => {
  setEditorContent(content);
  contentObserver.notify(content);
};

// AI assistant subscribes to changes
useEffect(() => {
  const unsubscribe = contentObserver.subscribe((content) => {
    analyzeContent(content);
  });
  return unsubscribe;
}, []);
```

### 2. Model Switching Pattern
**Approach**: Strategy pattern with hot swapping
**Implementation**:
```typescript
const [currentModel, setCurrentModel] = useState<ModelProvider>();

useEffect(() => {
  const provider = ModelFactory.createProvider(modelConfig);
  setCurrentModel(provider);
}, [modelConfig]);
```

### 3. Conversation Management Pattern
**Approach**: Immutable state with structural sharing
**Implementation**:
```typescript
interface Conversation {
  id: string;
  messages: Message[];
  context: EditorContext;
}

const addMessage = (conversation: Conversation, message: Message): Conversation => ({
  ...conversation,
  messages: [...conversation.messages, message]
});
```

## Error Handling Patterns

### 1. Retry Pattern for API Calls
**Implementation**:
```typescript
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      await new Promise(resolve => setTimeout(resolve, attempt * 1000));
    }
  }
  
  throw lastError;
}
```

### 2. Circuit Breaker Pattern
**Implementation**:
```typescript
class CircuitBreaker {
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private failureCount = 0;
  private readonly failureThreshold: number;
  
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      throw new Error('Circuit breaker open');
    }
    
    try {
      const result = await operation();
      this.reset();
      return result;
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }
}
```

### 3. Fallback Pattern
**Implementation**:
```typescript
async function getAIResponseWithFallback(
  prompt: string,
  primaryModel: ModelProvider,
  fallbackModel: ModelProvider
): Promise<string> {
  try {
    return await primaryModel.generateResponse(prompt);
  } catch (error) {
    console.warn('Primary model failed, using fallback');
    return await fallbackModel.generateResponse(prompt);
  }
}
```

## Performance Patterns

### 1. Debouncing Pattern
**Implementation**:
```typescript
function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]) as T;
}
```

### 2. Memoization Pattern
**Implementation**:
```typescript
const expensiveCalculation = useMemo(() => {
  return computeExpensiveValue(props.data);
}, [props.data]);

const handleEvent = useCallback((event: Event) => {
  // handler logic
}, [dependencies]);
```

### 3. Lazy Loading Pattern
**Implementation**:
```typescript
const MarkdownEditor = lazy(() => import('./MarkdownEditor'));

const EditorSwitcher: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      {editorType === 'markdown' && <MarkdownEditor />}
    </Suspense>
  );
};
```

## Testing Patterns

### 1. Dependency Injection for Testing
**Implementation**:
```typescript
// Production code
const aiService = new OpenAIService(apiKey);

// Test code
const mockAIService = {
  generateResponse: jest.fn().mockResolvedValue('Mock response')
};

// Component using injected service
const AssistantPanel = ({ aiService = defaultAIService }) => {
  // implementation
};
```

### 2. Component Testing Pattern
**Implementation**:
```typescript
describe('AssistantPanel', () => {
  it('should display AI responses', async () => {
    const mockService = { generateResponse: jest.fn() };
    render(<AssistantPanel aiService={mockService} />);
    
    fireEvent.change(screen.getByPlaceholderText('Type your message'), {
      target: { value: 'Hello AI' }
    });
    
    fireEvent.click(screen.getByText('Send'));
    
    await waitFor(() => {
      expect(screen.getByText('Mock response')).toBeInTheDocument();
    });
  });
});
```

### 3. Integration Testing Pattern
**Implementation**:
```typescript
describe('Editor-AI Integration', () => {
  it('should update AI context when editor content changes', async () => {
    render(<App />);
    
    // Type in editor
    const editor = screen.getByRole('textbox');
    fireEvent.change(editor, { target: { value: 'New content' } });
    
    // Check if AI assistant received update
    await waitFor(() => {
      expect(mockAIService.analyzeContent).toHaveBeenCalledWith('New content');
    });
  });
});
```

## Security Patterns

### 1. Input Sanitization Pattern
**Implementation**:
```typescript
function sanitizeHTML(html: string): string {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: []
  });
  return clean;
}
```

### 2. Secure Storage Pattern
**Implementation**:
```typescript
class SecureStorage {
  static setItem(key: string, value: string): void {
    if (window.crypto && window.crypto.subtle) {
      // Encrypt before storage
      const encrypted = this.encrypt(value);
      localStorage.setItem(key, encrypted);
    } else {
      localStorage.setItem(key, value);
    }
  }
}
```

These patterns provide a robust foundation for building the AI assistant note integration system, ensuring maintainability, testability, and performance while following React and TypeScript best practices.