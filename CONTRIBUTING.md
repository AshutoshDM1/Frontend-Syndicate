## 🚀 How to Contribute

## 📝 Contributing Guidelines

1. You can contribute to this project by opening a pull request.

2. Create a new branch name of the format `dev/DiscordName`

3. Don't forget to add good commit messages to your code.

4. Make sure to lint before pushing your code `bun lint` or `bun lint:fix`.

5. Make sure to format before pushing your code `bun format`.

## Prerequisites

- Node.js (v20+) or Bun (latest version)
- bun (recommended) or npm/pnpm

## 🔐 Environment Variables

If needed, create a `.env` file in the project root with any required variables.

### Installation

1. Clone the repository

```bash
git clone https://github.com/YourUsername/Frontend-Syndicate.git
cd Frontend-Syndicate
```

2. Install dependencies using Bun (recommended)

```bash
bun install
```

Or using npm:

```bash
npm install
```

3. Start the development server

```bash
bun dev
```

4. Build for production

```bash
bun build
```

5. Type checking

```bash
bun typecheck
```

## Project Structure

This project uses React Router v7 with the latest React 19. Key technologies:

- React Router v7
- React 19
- TypeScript
- TailwindCSS 4
- Vite 6
- Bun as package manager and runtime

## Useful Commands

- `bun dev` - Start the development server
- `bun build` - Build for production
- `bun start` - Start the production server
- `bun typecheck` - Run type checking
- `bun lint` - Run ESLint
- `bun lint:fix` - Run ESLint with auto-fix
- `bun format` - Format code with Prettier
