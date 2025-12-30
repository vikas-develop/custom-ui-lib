import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './layout/Layout';
import { components } from './layout/Sidebar';
import AllComponentsDemo from './components/AllComponentsDemo';
import ButtonDemo from './components/ButtonDemo';
import CardDemo from './components/CardDemo';
import InputDemo from './components/InputDemo';
import ModalDemo from './components/ModalDemo';
import SpinnerDemo from './components/SpinnerDemo';
import AccordionDemo from './components/AccordionDemo';
import AutocompleteDemo from './components/AutocompleteDemo';
import AlertDemo from './components/AlertDemo';
import AvatarDemo from './components/AvatarDemo';
import BadgeDemo from './components/BadgeDemo';
import BreadcrumbsDemo from './components/BreadcrumbsDemo';
import { useTheme } from './context/ThemeContext';

function AppContent() {
  const [selectedComponent, setSelectedComponent] = useState('all');
  const { themeStyles } = useTheme();

  const renderComponent = (componentId) => {
    switch (componentId) {
      case 'button':
        return <ButtonDemo />;
      case 'card':
        return <CardDemo />;
      case 'input':
        return <InputDemo />;
      case 'modal':
        return <ModalDemo />;
      case 'spinner':
        return <SpinnerDemo />;
      case 'accordion':
        return <AccordionDemo />;
      case 'autocomplete':
        return <AutocompleteDemo />;
      case 'alert':
        return <AlertDemo />;
      case 'avatar':
        return <AvatarDemo />;
      case 'badge':
        return <BadgeDemo />;
      case 'breadcrumbs':
        return <BreadcrumbsDemo />;
      default:
        return <AllComponentsDemo />;
    }
  };

  const componentName = components.find(c => c.id === selectedComponent)?.name || 'Component Library';

  return (
    <Layout 
      selectedComponent={selectedComponent} 
      onComponentSelect={setSelectedComponent}
    >
      <h1 style={{ marginTop: 0, marginBottom: '40px', color: themeStyles.text }}>
        {componentName}
      </h1>
      {renderComponent(selectedComponent)}
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
