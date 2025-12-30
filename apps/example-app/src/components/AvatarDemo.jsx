import React from 'react';
import { Avatar, Card } from '@vk-develop/custom-ui';

const AvatarDemo = () => {
  return (
    <Card title="Avatar" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '14px' }}>With Image</div>
          <Avatar 
            src="https://i.pravatar.cc/150?img=1" 
            alt="User Avatar"
            size="large"
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '14px' }}>With Name (Circle)</div>
          <Avatar 
            name="John Doe" 
            size="medium"
            shape="circle"
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '14px' }}>With Name (Square)</div>
          <Avatar 
            name="Jane Smith" 
            size="medium"
            shape="square"
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '14px' }}>Small</div>
          <Avatar name="AB" size="small" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '14px' }}>Large</div>
          <Avatar name="CD" size="large" />
        </div>
      </div>
    </Card>
  );
};

export default AvatarDemo;
