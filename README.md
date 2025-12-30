# Custom UI Monorepo

This is a monorepo containing the Custom UI component library and example application.

## Structure

```
custom-ui/
├── packages/
│   └── custom-ui/          # Component library
│       ├── src/            # Source components
│       ├── dist/           # Built output
│       └── package.json
├── apps/
│   └── example-app/        # Example/demo application
│       ├── src/
│       └── package.json
└── package.json            # Root workspace config
```

## Getting Started

### Install Dependencies

```bash
npm install
```

This will install dependencies for all workspaces.

### Build Library

```bash
npm run build
```

This builds the component library in `packages/custom-ui`.

### Run Example App

```bash
npm run dev
```

This starts the example app development server.

### Publish Library

```bash
npm run publish:lib
```

This publishes the library to npm (requires npm login).

## Workspace Commands

You can also run commands in specific workspaces:

```bash
# Build library
npm run build --workspace=packages/custom-ui

# Start example app
npm start --workspace=apps/example-app

# Install dependency in specific workspace
npm install <package> --workspace=packages/custom-ui
```

## Development

1. Make changes to components in `packages/custom-ui/src/`
2. Build the library: `npm run build`
3. The example app will automatically use the linked version
4. Test changes in the example app: `npm run dev`

## Publishing

1. Update version in `packages/custom-ui/package.json`
2. Build the library: `npm run build`
3. Publish: `npm run publish:lib`
