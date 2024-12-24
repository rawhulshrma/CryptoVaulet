
import './App.css';
import "antd/dist/reset.css"; // Ant Design CSS reset
import { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Web3Provider from './contexts/Web3Provider'
import PageLoader from '@/components/PageLoader';
import { Provider } from 'react-redux';
import store from '@/redux/store';
const EtheriumOs = lazy(() => import('./apps/EtheriumOs'));

export default function RoutApp() {
  return (
    <BrowserRouter>
      <Web3Provider>
        <Provider store={store}>
        <Suspense fallback={<PageLoader />}>
          <EtheriumOs />
        </Suspense>
         </Provider>
      </Web3Provider>
    </BrowserRouter>
  );
}
