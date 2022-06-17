import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '../component/UI/button/Button'

const Main = () => {
    const router = useNavigate();
    return (
        <>
            <div className="description">
                <h1>Welcome to DBrowser</h1>
                <h2>DBrowser is graphical user interface tool for CSV, XLS, XLSX. This project is designed to view
                    information from a database.</h2>
                <h2>You can see the source code on the <a href="https://github.com/7w1nk/DB-browser.git" target="_blank">github</a> page.</h2>
            </div>
            <MyButton onClick={() => router('/list')}>Watch information</MyButton>
            <footer className="footer">© Papushev A.P., 2022</footer>
        </>
    );
};

export default Main;