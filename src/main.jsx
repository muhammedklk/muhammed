import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Preloader from './components/Preloader.jsx';
import '@fontsource/mona-sans';
import './index.css';

function Root() {
  const hasVisited = sessionStorage.getItem('portfolio_preloader_seen');
  const [ready, setReady] = useState(!!hasVisited);

  return (
    <>
      {!ready && <Preloader onComplete={() => setReady(true)} />}
      <div style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <App />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
