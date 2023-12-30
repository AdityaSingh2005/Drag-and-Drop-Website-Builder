import React from 'react';
import Toolbar from './components/Toolbar';
import WebsiteSection from './components/WebsiteSection';

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Toolbar />
      <WebsiteSection />
    </div>
  );
}

export default App;
