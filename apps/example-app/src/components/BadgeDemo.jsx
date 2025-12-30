import React from 'react';
import { Badge, Card } from '@vk-develop/custom-ui';

const BadgeDemo = () => {
  return (
    <Card title="Badge" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Variants */}
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Variants</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Sizes</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge variant="primary" size="small">Small</Badge>
            <Badge variant="primary" size="medium">Medium</Badge>
            <Badge variant="primary" size="large">Large</Badge>
          </div>
        </div>

        {/* Dot Badges */}
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Dot Badges</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Status:</span>
              <Badge variant="success" dot size="small" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Online:</span>
              <Badge variant="primary" dot size="medium" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Notification:</span>
              <Badge variant="error" dot size="large" />
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Usage Examples</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Notifications</span>
              <Badge variant="error">5</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>New Items</span>
              <Badge variant="success">12</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Label</span>
              <Badge variant="primary">New</Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BadgeDemo;
