import React from 'react';
import { Spinner, Card } from '@vk-develop/custom-ui';

const SpinnerDemo = () => {
  return (
    <Card title="Loading Spinner">
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div>
          <div style={{ marginBottom: '8px' }}>Small</div>
          <Spinner size="small" />
        </div>
        <div>
          <div style={{ marginBottom: '8px' }}>Medium</div>
          <Spinner size="medium" />
        </div>
        <div>
          <div style={{ marginBottom: '8px' }}>Large</div>
          <Spinner size="large" />
        </div>
        <div>
          <div style={{ marginBottom: '8px' }}>Custom Color</div>
          <Spinner size="medium" color="#28a745" />
        </div>
      </div>
    </Card>
  );
};

export default SpinnerDemo;
