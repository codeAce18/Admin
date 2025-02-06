import './App.css';
import React, { useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Splash from '../src/pages/Splash.tsx';
import Login from '../src/pages/Login.tsx';
import NotFound from '../src/pages/NotFound.tsx';
import Home from './pages/Home.tsx';
import Players from './pages/Players.tsx';
import Tasks from './pages/Tasks.tsx';
import Levels from './pages/Levels.tsx';
import Notifications from './pages/Notifications.tsx';
import TreasureChestPurchase from "./pages/TreasureChestPurchase.tsx"

import { AppWrapper } from './context/index.tsx';
import { ToastContainer } from "react-toastify";
import Redirect from './components/Redirect.tsx';

function App() {
  const location = useLocation();

  // Memoize showNavbarRoutes to prevent it from changing on each render
  const showNavbarRoutes = useMemo(
    () => ['/dashboard', '/players', '/tasks', '/levels', '/notifications','/treasure-chest-purchase'],
    []
  );
  const hideNavbar = useMemo(
    () => !showNavbarRoutes.includes(location.pathname),
    [location.pathname, showNavbarRoutes]
  );


  return (
    <AppWrapper>
      <ToastContainer toastClassName='ff-secondary' />

      {!hideNavbar ? (

        <Navbar>
          <Redirect />
          <Routes>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/players" element={<Players />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/levels" element={<Levels />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/treasure-chest-purchase" element={<TreasureChestPurchase />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Navbar>

      ) : (
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      )}


    </AppWrapper>
  );
}

export default App;
