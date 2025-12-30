# Custom UI Component Library

Reusable React components by `@vk-develop`. A collection of UI components including Button, Card, Input, Modal, Spinner, Accordion, Autocomplete, Alert, Avatar, Badge, and Breadcrumbs.

## Install (after publish)
```bash
npm install @vk-develop/custom-ui
```

Use in your app:
```jsx
import { Button, Card, Input, Modal, Spinner, Accordion, Autocomplete, Alert, Avatar, Badge, Breadcrumbs } from '@vk-develop/custom-ui';

export default function App() {
  return (
    <>
      <Button>Click Me</Button>
      <Card title="Hello" footer="Footer">Card content</Card>
    </>
  );
}
```

## Components

### Button
A versatile button with multiple variants and sizes.

```jsx
import { Button } from '@vk-develop/custom-ui';

// Variants: primary, secondary, danger, outline
// Sizes: small, medium, large
<Button variant="primary" size="medium">Click Me</Button>
<Button variant="danger" size="small">Delete</Button>
<Button variant="outline" disabled>Disabled</Button>
```

### Card
A container component for displaying grouped content.

```jsx
import { Card } from '@vk-develop/custom-ui';

<Card title="Card Title" footer="Footer content">
  Your content here
</Card>
```

### Input
A styled text input with label, error state, and helper text.

```jsx
import { Input } from '@vk-develop/custom-ui';

<Input 
  label="Email" 
  type="email" 
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>

<Input 
  label="Password" 
  type="password" 
  error="Password is required"
  size="large"
/>
```

### Modal
A modal dialog component for displaying focused content.

```jsx
import { Modal, Button } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Modal Title"
        size="medium" // small, medium, large
      >
        Modal content
      </Modal>
    </>
  );
}
```

### Spinner
A loading spinner component.

```jsx
import { Spinner } from '@vk-develop/custom-ui';

// Sizes: small, medium, large
<Spinner size="medium" color="#007bff" />
```

### Accordion
A collapsible content component with expand/collapse functionality.

```jsx
import { Accordion } from '@vk-develop/custom-ui';

<Accordion title="Section 1" defaultOpen={false}>
  This is the content that can be expanded or collapsed.
</Accordion>

<Accordion 
  title="Section 2" 
  defaultOpen={true}
  onToggle={(isOpen) => console.log('Toggled:', isOpen)}
>
  Another section with callback support.
</Accordion>
```

### Autocomplete
An input component with search suggestions and keyboard navigation.

```jsx
import { Autocomplete } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [selected, setSelected] = useState('');
  const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

  return (
    <Autocomplete
      options={options}
      value={selected}
      onChange={(value) => setSelected(value)}
      onSelect={(option) => {
        setSelected(option);
        console.log('Selected:', option);
      }}
      placeholder="Search fruits..."
    />
  );
}
```

### Alert
A notification component with different variants for different message types.

```jsx
import { Alert } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <>
      <Alert variant="success" title="Success!" onClose={() => setShowAlert(false)}>
        Your changes have been saved successfully.
      </Alert>

      <Alert variant="error" title="Error">
        Something went wrong. Please try again.
      </Alert>

      <Alert variant="warning" title="Warning">
        This action cannot be undone.
      </Alert>

      <Alert variant="info">
        Here's some helpful information for you.
      </Alert>
    </>
  );
}
```

### Avatar
A user avatar component that displays an image or user initials.

```jsx
import { Avatar } from '@vk-develop/custom-ui';

// With image
<Avatar 
  src="https://example.com/avatar.jpg" 
  alt="User Avatar"
  size="large"
/>

// With initials from name
<Avatar 
  name="John Doe" 
  size="medium"
  shape="circle"
/>

// Square avatar
<Avatar 
  name="Jane Smith" 
  size="small"
  shape="square"
/>

// Sizes: small (32px), medium (48px), large (64px)
// Shapes: circle, square
```

### Badge
A badge component for displaying labels, counts, or status indicators.

```jsx
import { Badge } from '@vk-develop/custom-ui';

// Variants: default, primary, success, warning, error, info
// Sizes: small, medium, large
<Badge variant="primary">New</Badge>
<Badge variant="success" size="small">Active</Badge>
<Badge variant="error">3</Badge>

// Dot badge (no text)
<Badge variant="primary" dot size="medium" />
```

### Breadcrumbs
A navigation breadcrumb component for showing the current page location.

```jsx
import { Breadcrumbs } from '@vk-develop/custom-ui';

<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Current Page' }, // Last item is active by default
  ]}
/>

// Custom separator
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'About' },
  ]}
  separator=">"
/>

// With onClick handlers
<Breadcrumbs
  items={[
    { label: 'Home', href: '/', onClick: () => console.log('Home clicked') },
    { label: 'Current' },
  ]}
/>
```

## Local Development (without publishing)
Build and link the library into any local app:
```bash
# In the library root
npx rollup -c
npm link

# In your consuming app
npm link @vk-develop/custom-ui
```
Then import as:
```jsx
import { Button } from '@vk-develop/custom-ui';
```

## Scripts
- Install deps:
  ```bash
  npm install
  ```
- Build library (outputs to `dist/`):
  ```bash
  npx rollup -c
  ```

## Project Structure
- `src/components/` — reusable components
- `src/index.js` — package entry (re-exports components)
- `dist/` — build output (CJS + ESM)

## Publish to npm
1. Ensure `package.json` has:
   - `name: "@vk-develop/custom-ui"`
   - `main: "dist/index.cjs.js"`
   - `module: "dist/index.esm.js"`
   - `exports` map for import/require
   - `files`: `["dist", "README.md", "LICENSE"]`
2. Build:
   ```bash
   npx rollup -c
   ```
3. Publish:
   ```bash
   npm publish --access public
   ```

## Peer Dependencies
This library expects the consuming app to provide:
- `react`
- `react-dom`

## Available Components
- **Button** - Enhanced button with variants (primary, secondary, danger, outline) and sizes
- **Card** - Container with optional header and footer
- **Input** - Text input with label, error state, and helper text
- **Modal** - Dialog component with backdrop
- **Spinner** - Loading spinner with customizable size and color
- **Accordion** - Collapsible content component with expand/collapse functionality
- **Autocomplete** - Input with search suggestions and keyboard navigation
- **Alert** - Notification component with variants (success, error, warning, info)
- **Avatar** - User avatar with image or initials support, multiple sizes and shapes
- **Badge** - Badge component with variants and sizes, supports dot mode
- **Breadcrumbs** - Navigation breadcrumb component with customizable separators