import React from 'react';
import MyButton from './UI/button/Button'

const Main = () => {
    return (
        <>
            <div className="description">
                <h1>Welcome to DBrowser</h1>
                <h2>DBrowser is graphical user interface tool for JSON. This project is designed to view
                    information from a database.</h2> 
            </div>
            <MyButton>Watch information</MyButton>
            <footer className="footer">© Papushev A.P., 2022</footer>
        </>
    );
};

export default Main;