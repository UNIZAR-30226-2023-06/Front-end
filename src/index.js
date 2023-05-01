import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import './style.css';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
  <App />
  </QueryClientProvider>
)