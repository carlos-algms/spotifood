import React from 'react';
import './App.css';

import authService from './auth/auth-service';
import FeaturedPlayLists from './featured-playlists/featured-playlists';

export default function App() {
  if (!authService.isAuthorized()) {
    authService.redirectToAutorize();
    return null;
  }

  return <FeaturedPlayLists />;
}
