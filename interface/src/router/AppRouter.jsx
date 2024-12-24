import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Wallet from '@/pages/Wallet';
// import Navbar from '@/components/Navbar';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Wallet />} />
      <Route
        path="/home"
        element={
            <div className="wrapper">
            {/* <Navbar /> */}
            <Home />
          </div>
        }
      />
    </Routes>
  );
}
