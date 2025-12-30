import React from 'react';
import { Card, Button } from '@vk-develop/custom-ui';

const CardDemo = () => {
  return (
    <>
      <Card title="Card Example" style={{ marginBottom: '24px' }}>
        <p>This is a basic card with a title.</p>
      </Card>
      <Card 
        title="Card with Footer" 
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button variant="primary">Save</Button>
          </div>
        }
      >
        <p>This card demonstrates all card features including a header title and footer.</p>
      </Card>
    </>
  );
};

export default CardDemo;
