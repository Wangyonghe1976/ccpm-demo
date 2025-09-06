# AI Assistant Note Integration

A React-based application that integrates AI assistance with multiple note editing formats including rich text, markdown, mind maps, and flowcharts.

## Features

- 🤖 AI Assistant with real-time contextual help
- 📝 Multiple note formats: Rich Text, Markdown, Mind Maps, Flowcharts
- 🔄 Bidirectional data communication between notes and AI
- ⚡ Built with React 18, TypeScript, and Vite
- 🎨 Modern, responsive UI design
- 💾 Local storage and IndexedDB for data persistence

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── stores/             # Zustand state management
├── services/           # API and business logic
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── styles/             # Global styles and CSS
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Styling**: CSS Modules + CSS Custom Properties
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library

## Development

This project follows a component-based architecture with clear separation of concerns. All components are written in TypeScript for type safety.

### Key Patterns

- Functional components with hooks
- Custom hooks for business logic
- Zustand for global state management
- CSS Modules for component-scoped styling
- Absolute imports with path aliasing (@/)

## License

MIT License - see LICENSE file for details.