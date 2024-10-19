import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import BackgroundCard from './styles/BackgroundCard';
import NavigationBar from './styles/NavigationBar';

import LandingLoading from './pages/LandingLoading';

import Home from './pages/Home';
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import About from './pages/About'
import Admin from './components/Profiles/Admin'
import UserProfile from './components/Profiles/UserProfile'
import {Unauthorized} from './components/Profiles/Unauthorized'
import NoAccess from './components/Profiles/NoAccess';
import { useAuth } from './components/Auth/useAuth';


export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const globalLoading = useSelector((state) => state.loading.loading);
  const { isLoading: isRefreshing } = useAuth();
  const isImage = true; 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || isRefreshing) { // Check for token refresh loading state
    return <LandingLoading />; // Or any loader component
  }

  return (
    <Router>
      <NavigationBar style={{ position: 'fixed' }} />
      <CssBaseline />
      <BackgroundCard
        isImage={isImage} 
        pos="fixed"
        width="100vw"
        height="100vh"
      />
        {globalLoading && <p>Loading Please wait...</p>}
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/admin" element={
          <Unauthorized requiredRole="admin">
            <Admin/>
          </Unauthorized>
        } />
        <Route path="/subscriber" element={
          <Unauthorized requiredRole="subscriber">
            <UserProfile />
          </Unauthorized>
        } />
        <Route path="/unauthorized" element={<NoAccess />} />
      </Routes>
    </Router>
  );
};