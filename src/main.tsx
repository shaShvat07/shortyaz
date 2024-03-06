import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.js';
import './index.css';
import reducer, { initialState } from './MyContexts/reducer';
import { StateProvider } from './MyContexts/StateProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
)
