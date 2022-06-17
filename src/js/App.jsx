import React from 'react';
import { HashRouter } from 'react-router-dom'
import '../scss/all.scss';
import '../img/logo.png';

import AppRouter from './component/AppRouter';

function App() {
    return (
        <div className="container">
            <React.StrictMode>
                <HashRouter >
                    <AppRouter />
                </HashRouter>
            </React.StrictMode>
        </div>
    );
};

export default App;