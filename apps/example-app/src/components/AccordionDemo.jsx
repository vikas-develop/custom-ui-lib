import React from 'react';
import { Accordion, Card } from '@vk-develop/custom-ui';

const AccordionDemo = () => {
  return (
    <Card title="Accordion" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Accordion title="What is React?" defaultOpen={false}>
          <p>React is a JavaScript library for building user interfaces, particularly web applications.</p>
        </Accordion>
        <Accordion title="How to use this library?" defaultOpen={true}>
          <p>Simply install the package and import the components you need:</p>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
{`import { Button } from '@vk-develop/custom-ui';`}
          </pre>
        </Accordion>
        <Accordion title="Can I customize the components?">
          <p>Yes! All components accept standard props and can be styled using className or inline styles.</p>
        </Accordion>
      </div>
    </Card>
  );
};

export default AccordionDemo;
