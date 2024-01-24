import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/css/style.scss'
import store from './store/store.ts'
import { Provider } from "react-redux";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
