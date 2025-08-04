# Flow

A modern React component library and utilities built with TypeScript.

## Packages

- **@nearux/flow**: React components and utilities
- **@nearux/shared**: Shared utilities and types

## Development

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm dev

# Build all packages
pnpm build

# Run linting
pnpm lint
```

## Automatic Deployment

This project uses GitHub Actions for automatic deployment:

- **Trigger**: Push to `main` branch
- **Packages**: `@nearux/flow` and `@nearux/shared` are automatically published to npm
- **Releases**: GitHub releases are automatically created with version tags
- **Changelog**: Recent changes are automatically added to release notes

### Deployment Process

1. **Build & Test**: All packages are built and linted
2. **Version Bump**: Patch version is automatically incremented
3. **Publish**: Packages are published to npm registry
4. **Release**: GitHub release is created with changelog
5. **Commit**: Version changes are committed back to repository

## Contributing

1. Create a feature branch
2. Make your changes
3. Push to main branch to trigger automatic deployment

## License

MIT
