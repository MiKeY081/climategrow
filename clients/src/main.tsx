import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import './index.css';
import { store } from './store/index';  // Import your Redux store
import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "https://climategrow-server.vercel.app/api/v1";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>  {/* Wrap App in Provider */}
      <App />
    </Provider>
  </StrictMode>
);
