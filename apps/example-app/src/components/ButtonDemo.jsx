import React from 'react';
import { Button, Card } from '@vk-develop/custom-ui';

const ButtonDemo = () => {
  return (
    <Card title="Buttons" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="primary" size="small">Small</Button>
        <Button variant="primary" size="large">Large</Button>
        <Button variant="primary" disabled>Disabled</Button>
      </div>
    </Card>
  );
};

export default ButtonDemo;
