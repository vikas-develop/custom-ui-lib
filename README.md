# Custom UI Component Library

Reusable React components by `@vk-develop`. A comprehensive collection of UI components including Button, Card, Input, Modal, Spinner, Accordion, Autocomplete, Alert, Avatar, Badge, Breadcrumbs, Calendar, Checkbox, CheckboxGroup, Chip, CircularProgress, Code, DateInput, DatePicker, DateRangePicker, Divider, Dropdown, Drawer, Navbar, NumberInput, Pagination, Popover, Progress, RadioGroup, RangeCalendar, ScrollShadow, Select, Skeleton, Slider, Snippet, Spacer, Switch, Table, Tabs, Toast, Textarea, TimeInput, Tooltip, and User.

## Install (after publish)
```bash
npm install @vk-develop/custom-ui
```

Use in your app:
```jsx
import { 
  Button, Card, Input, Modal, Spinner, Accordion, Autocomplete, Alert, 
  Avatar, Badge, Breadcrumbs, Calendar, Checkbox, CheckboxGroup, Chip, 
  CircularProgress, Code, DateInput, DatePicker, DateRangePicker, 
  Divider, Dropdown, Drawer, Navbar, NumberInput, Pagination, Popover, Progress,
  RadioGroup, RangeCalendar, ScrollShadow, Select, Skeleton, Slider, Snippet, Spacer, Switch, Table,
  Tabs, Toast, Textarea, TimeInput, Tooltip, User
} from '@vk-develop/custom-ui';

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

### Calendar
A calendar component for date selection with month and year navigation.

```jsx
import { Calendar } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Calendar
      value={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      minDate="2024-01-01"
      maxDate="2024-12-31"
    />
  );
}
```

### Checkbox
A checkbox input component with label support and indeterminate state.

```jsx
import { Checkbox } from '@vk-develop/custom-ui';

// Basic checkbox
<Checkbox 
  label="Accept terms" 
  checked={isChecked}
  onChange={(checked) => setIsChecked(checked)}
/>

// Sizes: small, medium, large
<Checkbox label="Small" size="small" />
<Checkbox label="Large" size="large" />

// Indeterminate state
<Checkbox 
  label="Select all" 
  indeterminate={true}
  checked={someChecked}
/>
```

### CheckboxGroup
A group of checkboxes with controlled selection.

```jsx
import { CheckboxGroup } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [selected, setSelected] = useState([]);
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ];

  return (
    <CheckboxGroup
      options={options}
      value={selected}
      onChange={(values) => setSelected(values)}
      direction="column" // or 'row'
      size="medium"
    />
  );
}
```

### Chip
A chip component for displaying labels, tags, or removable items.

```jsx
import { Chip } from '@vk-develop/custom-ui';

// Variants: default, primary, secondary, success, warning, error, outline
// Sizes: small, medium, large
<Chip label="React" variant="primary" />
<Chip label="JavaScript" variant="secondary" />

// Removable chip
<Chip 
  label="Removable" 
  onDelete={() => console.log('Deleted')}
  variant="success"
/>

// With icon or avatar
<Chip 
  label="User" 
  avatar={<Avatar name="JD" size="small" />}
  variant="default"
/>
```

### CircularProgress
A circular progress indicator with determinate and indeterminate variants.

```jsx
import { CircularProgress } from '@vk-develop/custom-ui';

// Determinate progress
<CircularProgress 
  value={75} 
  max={100}
  showLabel={true}
  size="medium" // small, medium, large
  color="#007bff"
/>

// Indeterminate progress
<CircularProgress 
  variant="indeterminate"
  size="large"
  color="#28a745"
/>
```

### Code
A component for displaying code snippets inline or in blocks.

```jsx
import { Code } from '@vk-develop/custom-ui';

// Inline code
<Code inline>const x = 5;</Code>

// Block code
<Code language="javascript">
{`function greet(name) {
  return \`Hello, \${name}!\`;
}`}
</Code>
```

### DateInput
A text input component for date entry with formatting support.

```jsx
import { DateInput } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [date, setDate] = useState(null);

  return (
    <DateInput
      label="Birth Date"
      value={date}
      onChange={(date) => setDate(date)}
      format="YYYY-MM-DD"
      placeholder="YYYY-MM-DD"
      helperText="Enter your birth date"
      size="medium"
    />
  );
}
```

### DatePicker
A date picker component with calendar popup.

```jsx
import { DatePicker } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [date, setDate] = useState(null);

  return (
    <DatePicker
      label="Select Date"
      value={date}
      onChange={(date) => setDate(date)}
      minDate="2024-01-01"
      maxDate="2024-12-31"
      placeholder="Select a date"
      size="medium"
    />
  );
}
```

### DateRangePicker
A date range picker component for selecting start and end dates.

```jsx
import { DateRangePicker } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [range, setRange] = useState(null);

  return (
    <DateRangePicker
      label="Select Date Range"
      value={range}
      onChange={(range) => setRange(range)}
      placeholder="Select date range"
      minDate="2024-01-01"
      maxDate="2024-12-31"
    />
  );
}
```

### Divider
A divider component for separating content horizontally or vertically.

```jsx
import { Divider } from '@vk-develop/custom-ui';

// Horizontal divider
<Divider />

// With text
<Divider text="OR" />

// Variants: solid, dashed, dotted
<Divider variant="dashed" spacing="large" />

// Vertical divider
<Divider orientation="vertical" spacing="medium" />
```

### Dropdown
A dropdown/select component with single or multiple selection support.

```jsx
import { Dropdown } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [selected, setSelected] = useState(null);
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ];

  return (
    <Dropdown
      label="Choose an option"
      options={options}
      value={selected}
      onChange={(value) => setSelected(value)}
      placeholder="Select..."
      size="medium"
    />
  );
}

// Multiple selection
function MultiSelect() {
  const [selected, setSelected] = useState([]);
  
  return (
    <Dropdown
      multiple={true}
      options={options}
      value={selected}
      onChange={(values) => setSelected(values)}
      placeholder="Select multiple..."
    />
  );
}
```

### Drawer
A slide-out drawer component that can appear from any side.

```jsx
import { Drawer, Button } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right" // 'left', 'right', 'top', 'bottom'
        title="Drawer Title"
        size="medium" // small, medium, large
      >
        <p>Drawer content goes here</p>
      </Drawer>
    </>
  );
}
```

### Navbar
A navigation bar component with brand and links.

```jsx
import { Navbar } from '@vk-develop/custom-ui';

<Navbar
  brand={{ text: 'My App', href: '/' }}
  links={[
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Contact', href: '/contact', onClick: () => console.log('Contact clicked') },
  ]}
  position="left" // 'left', 'center', 'right'
  variant="default" // 'default', 'dark', 'light'
/>

// Dark variant
<Navbar
  brand="My App"
  links={['Home', 'About', 'Contact']}
  variant="dark"
/>
```

### NumberInput
A number input component with increment/decrement buttons.

```jsx
import { NumberInput } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [value, setValue] = useState(0);

  return (
    <NumberInput
      label="Quantity"
      value={value}
      onChange={(newValue) => setValue(newValue)}
      min={0}
      max={100}
      step={1}
      size="medium" // small, medium, large
      helperText="Enter a number between 0 and 100"
    />
  );
}
```

### Pagination
A pagination component for navigating through pages.

```jsx
import { Pagination } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => setCurrentPage(page)}
      showFirstLast={true}
      showPrevNext={true}
      maxVisible={5}
    />
  );
}
```

### Popover
A popover component that displays content on hover or click.

```jsx
import { Popover, Button } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      trigger={<Button>Click me</Button>}
      content={
        <div>
          <h4>Popover Title</h4>
          <p>This is the popover content</p>
        </div>
      }
      position="bottom" // 'top', 'bottom', 'left', 'right'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}

// Uncontrolled
<Popover
  trigger={<Button>Hover me</Button>}
  content={<p>Popover content</p>}
  position="top"
/>
```

### Progress
A linear progress bar component.

```jsx
import { Progress } from '@vk-develop/custom-ui';

// Basic progress bar
<Progress value={75} max={100} />

// With label and percentage
<Progress 
  value={60} 
  max={100}
  label="Upload Progress"
  showLabel={true}
/>

// Variants: default, success, warning, error, info
<Progress value={80} variant="success" size="large" />
<Progress value={50} variant="warning" />
<Progress value={30} variant="error" />
```

### RadioGroup
A radio button group component for single selection.

```jsx
import { RadioGroup } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [selected, setSelected] = useState('option1');
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ];

  return (
    <RadioGroup
      options={options}
      value={selected}
      onChange={(value) => setSelected(value)}
      direction="column" // or 'row'
      size="medium"
    />
  );
}
```

### RangeCalendar
A calendar component for selecting date ranges.

```jsx
import { RangeCalendar } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [range, setRange] = useState(null);

  return (
    <RangeCalendar
      value={range}
      onChange={(range) => setRange(range)}
      minDate="2024-01-01"
      maxDate="2024-12-31"
    />
  );
}
```

### ScrollShadow
A component that adds scroll shadows to indicate scrollable content.

```jsx
import { ScrollShadow } from '@vk-develop/custom-ui';

<ScrollShadow
  showTopShadow={true}
  showBottomShadow={true}
  shadowColor="rgba(0, 0, 0, 0.1)"
  style={{ maxHeight: '400px' }}
>
  <div>
    {/* Long scrollable content */}
  </div>
</ScrollShadow>
```

### Select
A select/dropdown component (similar to Dropdown but with different styling).

```jsx
import { Select } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [selected, setSelected] = useState(null);
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ];

  return (
    <Select
      label="Choose an option"
      options={options}
      value={selected}
      onChange={(value) => setSelected(value)}
      placeholder="Select..."
      size="medium"
    />
  );
}
```

### Skeleton
A skeleton loading component for placeholder content.

```jsx
import { Skeleton } from '@vk-develop/custom-ui';

// Text skeleton
<Skeleton variant="text" width="100%" height="20px" />

// Circular skeleton (for avatars)
<Skeleton variant="circular" width="40px" height="40px" />

// Rectangular skeleton
<Skeleton variant="rectangular" width="200px" height="100px" />

// Animation types: 'pulse', 'wave', 'none'
<Skeleton variant="text" animation="wave" />
```

### Slider
A slider component for selecting numeric values.

```jsx
import { Slider } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [value, setValue] = useState(50);

  return (
    <Slider
      value={value}
      onChange={(newValue) => setValue(newValue)}
      min={0}
      max={100}
      step={1}
      label="Volume"
      showValue={true}
      marks={true}
    />
  );
}
```

### Snippet
A code snippet component with copy functionality.

```jsx
import { Snippet } from '@vk-develop/custom-ui';

<Snippet copyable={true} symbol="$">
  npm install @vk-develop/custom-ui
</Snippet>

// Without copy button
<Snippet copyable={false} symbol=">">
  git clone https://github.com/example/repo.git
</Snippet>
```

### Spacer
A spacer component for adding consistent spacing.

```jsx
import { Spacer } from '@vk-develop/custom-ui';

// Vertical spacer
<Spacer size="medium" axis="vertical" />

// Horizontal spacer
<Spacer size="large" axis="horizontal" />

// Custom size
<Spacer size={32} axis="vertical" />
```

### Switch
A toggle switch component.

```jsx
import { Switch } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={(checked) => setEnabled(checked)}
      label="Enable notifications"
      size="medium" // small, medium, large
      color="#007bff"
    />
  );
}
```

### Table
A table component for displaying tabular data.

```jsx
import { Table } from '@vk-develop/custom-ui';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age' },
  { 
    key: 'status', 
    header: 'Status',
    render: (value) => <Badge variant={value === 'Active' ? 'success' : 'default'}>{value}</Badge>
  },
];

const data = [
  { name: 'John Doe', age: 30, status: 'Active' },
  { name: 'Jane Smith', age: 25, status: 'Inactive' },
];

<Table
  columns={columns}
  data={data}
  striped={true}
  bordered={true}
  hoverable={true}
  size="medium"
/>
```

### Tabs
A tabs component for organizing content into multiple panels.

```jsx
import { Tabs } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: 'Tab 1', content: <div>Content for Tab 1</div> },
    { label: 'Tab 2', content: <div>Content for Tab 2</div> },
    { label: 'Tab 3', content: <div>Content for Tab 3</div> },
  ];

  return (
    <Tabs
      items={tabs}
      activeTab={activeTab}
      onChange={(index) => setActiveTab(index)}
      variant="default" // 'default', 'pills', 'underline'
      orientation="horizontal" // 'horizontal', 'vertical'
    />
  );
}

// Simple string tabs
<Tabs items={['Tab 1', 'Tab 2', 'Tab 3']} />
```

### Toast
A toast notification component for displaying temporary messages.

```jsx
import { Toast } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <Button onClick={() => setShowToast(true)}>Show Toast</Button>
      {showToast && (
        <Toast
          message="Operation completed successfully!"
          variant="success" // 'success', 'error', 'warning', 'info'
          duration={3000}
          position="top-right" // 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
```

### Textarea
A textarea component for multi-line text input.

```jsx
import { Textarea } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <Textarea
      label="Description"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rows={4}
      resize="vertical" // 'none', 'both', 'horizontal', 'vertical'
      maxLength={500}
      showCount={true}
      helperText="Enter a description"
      size="medium"
    />
  );
}
```

### TimeInput
A time input component with 12h or 24h format support.

```jsx
import { TimeInput } from '@vk-develop/custom-ui';
import { useState } from 'react';

function MyComponent() {
  const [time, setTime] = useState(null);

  return (
    <TimeInput
      label="Select Time"
      value={time}
      onChange={(time) => setTime(time)}
      format="24h" // '24h' or '12h'
      placeholder="HH:MM"
      size="medium"
    />
  );
}

// 12-hour format
<TimeInput
  label="Time"
  format="12h"
  placeholder="HH:MM AM/PM"
/>
```

### Tooltip
A tooltip component that displays additional information on hover.

```jsx
import { Tooltip } from '@vk-develop/custom-ui';

// Basic tooltip
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>

// With different positions
<Tooltip content="Top tooltip" position="top">
  <span>Hover top</span>
</Tooltip>

<Tooltip content="Bottom tooltip" position="bottom">
  <span>Hover bottom</span>
</Tooltip>

<Tooltip content="Left tooltip" position="left">
  <span>Hover left</span>
</Tooltip>

<Tooltip content="Right tooltip" position="right">
  <span>Hover right</span>
</Tooltip>

// With delay
<Tooltip content="Delayed tooltip" delay={500}>
  <span>Hover with delay</span>
</Tooltip>
```

### User
A user component that displays user information with avatar.

```jsx
import { User } from '@vk-develop/custom-ui';

// Basic user display
<User
  name="John Doe"
  description="Software Engineer"
  avatar="https://example.com/avatar.jpg"
/>

// Without avatar
<User
  name="Jane Smith"
  description="Product Manager"
  showAvatar={false}
/>

// Different sizes
<User
  name="Bob Johnson"
  description="Designer"
  size="small"
/>

<User
  name="Alice Brown"
  description="Developer"
  size="large"
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
- **Calendar** - Calendar component for date selection with month/year navigation
- **Checkbox** - Checkbox input with label support and indeterminate state
- **CheckboxGroup** - Group of checkboxes with controlled selection
- **Chip** - Chip component for displaying labels, tags, or removable items
- **CircularProgress** - Circular progress indicator with determinate/indeterminate variants
- **Code** - Component for displaying code snippets inline or in blocks
- **DateInput** - Text input component for date entry with formatting support
- **DatePicker** - Date picker component with calendar popup
- **DateRangePicker** - Date range picker for selecting start and end dates
- **Divider** - Divider component for separating content horizontally or vertically
- **Dropdown** - Dropdown/select component with single or multiple selection support
- **Drawer** - Slide-out drawer component that can appear from any side
- **Navbar** - Navigation bar component with brand and links, multiple variants
- **NumberInput** - Number input component with increment/decrement buttons
- **Pagination** - Pagination component for navigating through pages
- **Popover** - Popover component that displays content on hover or click
- **Progress** - Linear progress bar component with multiple variants
- **RadioGroup** - Radio button group component for single selection
- **RangeCalendar** - Calendar component for selecting date ranges
- **ScrollShadow** - Component that adds scroll shadows to indicate scrollable content
- **Select** - Select/dropdown component with single or multiple selection support
- **Skeleton** - Skeleton loading component for placeholder content
- **Slider** - Slider component for selecting numeric values
- **Snippet** - Code snippet component with copy functionality
- **Spacer** - Spacer component for adding consistent spacing
- **Switch** - Toggle switch component
- **Table** - Table component for displaying tabular data
- **Tabs** - Tabs component for organizing content into multiple panels
- **Toast** - Toast notification component for displaying temporary messages
- **Textarea** - Textarea component for multi-line text input
- **TimeInput** - Time input component with 12h or 24h format support
- **Tooltip** - Tooltip component that displays additional information on hover
- **User** - User component that displays user information with avatar