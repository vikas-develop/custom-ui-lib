import React from 'react';
import { Breadcrumbs, Card } from '@vk-develop/custom-ui';

const BreadcrumbsDemo = () => {
  const handleClick = (label) => {
    console.log(`Clicked: ${label}`);
    alert(`You clicked on: ${label}`);
  };

  return (
    <Card title="Breadcrumbs" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Basic Breadcrumbs */}
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Basic Breadcrumbs</h3>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Electronics', href: '/products/electronics' },
              { label: 'Laptops' },
            ]}
          />
        </div>

        {/* Custom Separator */}
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Custom Separator</h3>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Team' },
            ]}
            separator=">"
          />
        </div>

        {/* With onClick Handlers */}
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>With Click Handlers</h3>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/', onClick: () => handleClick('Home') },
              { label: 'Dashboard', href: '/dashboard', onClick: () => handleClick('Dashboard') },
              { label: 'Settings' },
            ]}
          />
        </div>

        {/* Simple Breadcrumb */}
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Simple Breadcrumb</h3>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Current Page' },
            ]}
          />
        </div>

        {/* Long Path */}
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Long Navigation Path</h3>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/shop' },
              { label: 'Categories', href: '/shop/categories' },
              { label: 'Electronics', href: '/shop/categories/electronics' },
              { label: 'Computers', href: '/shop/categories/electronics/computers' },
              { label: 'Laptops' },
            ]}
          />
        </div>
      </div>
    </Card>
  );
};

export default BreadcrumbsDemo;
