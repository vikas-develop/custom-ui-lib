import React, { useState } from 'react';
import { Autocomplete, Card } from '@vk-develop/custom-ui';

const AutocompleteDemo = () => {
  const [selectedFruit, setSelectedFruit] = useState('');
  const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];

  return (
    <Card title="Autocomplete" style={{ marginBottom: '24px' }}>
      <div style={{ marginBottom: '12px' }}>
        <Autocomplete
          options={fruits}
          value={selectedFruit}
          onChange={(value) => setSelectedFruit(value)}
          onSelect={(option) => {
            setSelectedFruit(option);
            console.log('Selected:', option);
          }}
          placeholder="Search for a fruit..."
        />
      </div>
      {selectedFruit && (
        <p style={{ color: '#666', fontSize: '14px' }}>
          Selected: <strong>{selectedFruit}</strong>
        </p>
      )}
    </Card>
  );
};

export default AutocompleteDemo;
