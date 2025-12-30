import React, { useState } from 'react';
import { Input, Card } from '@vk-develop/custom-ui';

const InputDemo = () => {
  const [email, setEmail] = useState('');

  return (
    <Card title="Inputs" style={{ marginBottom: '24px' }}>
      <Input 
        label="Email Address" 
        type="email" 
        placeholder="Enter your email"
        helperText="We'll never share your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input 
        label="Password" 
        type="password" 
        placeholder="Enter password"
        error="This field is required"
      />
      <Input 
        label="Small Input" 
        size="small" 
        placeholder="Small size"
      />
      <Input 
        label="Large Input" 
        size="large" 
        placeholder="Large size"
      />
    </Card>
  );
};

export default InputDemo;
