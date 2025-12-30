import React, { useState } from 'react';
import { Modal, Button, Card } from '@vk-develop/custom-ui';

const ModalDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card title="Modal" style={{ marginBottom: '24px' }}>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        size="medium"
      >
        <p>This is a modal dialog. Click outside or the X button to close.</p>
        <div style={{ marginTop: '20px' }}>
          <Button variant="primary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </Card>
  );
};

export default ModalDemo;
