# Contributing to Template WebApp

First off, thank you for considering contributing to this template! 🎉

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples**
* **Describe the behavior you observed and what you expected**
* **Include screenshots if applicable**
* **Include your environment details** (OS, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Explain why this enhancement would be useful**
* **List any alternatives you've considered**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Process

### Setting Up Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/template-webapp-react-ts-vite.git

# Install dependencies
yarn install

# Create a new branch
git checkout -b feature/my-feature

# Start development
yarn dev
```

### Coding Standards

* Use TypeScript for all new code
* Follow the ESLint and Prettier configurations
* Write meaningful commit messages following conventional commits
* Add comments for complex logic
* Keep functions small and focused

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Example:
```
feat(backend): add user authentication endpoint

Add POST /api/auth/login endpoint with JWT token generation.
Includes input validation and error handling.

Closes #123
```

### Testing

Before submitting a PR:
- Ensure all existing tests pass
- Add tests for new features
- Update tests for changed features
- Verify the build works: `yarn build`

### Documentation

* Update README.md if you change functionality
* Add JSDoc comments for new functions
* Update inline code comments
* Create or update relevant wiki pages

## Style Guide

### TypeScript

```typescript
// Good
interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = async (id: number): Promise<User> => {
  // Implementation
};

// Avoid
const getUser = async (id: any) => {
  // Implementation
};
```

### React Components

```typescript
// Good
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

// Avoid
export const Button = (props: any) => {
  return <button onClick={props.onClick}>{props.children}</button>;
};
```

### File Organization

```
feature/
├── FeatureComponent.tsx       # Main component
├── FeatureComponent.test.tsx  # Tests
├── FeatureComponent.css       # Styles
├── types.ts                   # Type definitions
└── index.ts                   # Public exports
```

## Release Process

1. Update version in package.json files
2. Update CHANGELOG.md
3. Create a release branch
4. Tag the release
5. Merge to main
6. GitHub Actions will handle deployment

## Questions?

Feel free to open an issue with the `question` label or start a discussion in GitHub Discussions.

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing! 🚀
