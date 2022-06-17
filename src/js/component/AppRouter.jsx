import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import List from '../pages/List';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route exact path="/list" element={<List />} />
    </Routes>
  );
}

export default AppRouter;