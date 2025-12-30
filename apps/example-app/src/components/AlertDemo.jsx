import React, { useState } from 'react';
import { Alert, Card } from '@vk-develop/custom-ui';

const AlertDemo = () => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <Card title="Alert" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {showAlert && (
          <Alert 
            variant="success" 
            title="Success!" 
            onClose={() => setShowAlert(false)}
          >
            Your changes have been saved successfully.
          </Alert>
        )}
        <Alert variant="error" title="Error">
          Something went wrong. Please try again.
        </Alert>
        <Alert variant="warning" title="Warning">
          This action cannot be undone.
        </Alert>
        <Alert variant="info">
          Here's some helpful information for you.
        </Alert>
      </div>
    </Card>
  );
};

export default AlertDemo;
