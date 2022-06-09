import React, {useState} from 'react';

function App() {
    const [count, setCount] = useState(0);
    console.log(count);
    console.log(setCount);
    return (
        <div className="container">
            <div className="description">
                <h1>Welcome to DBrowser</h1>
                <h2>DBrowser is graphical user interface tool for JSON. This project is designed to view
                    information from a database.</h2>
            </div>
            <a href="#" className="button"><span>Watch information</span></a>
            <footer className="footer">© Papushev A.P., 2022</footer>
        </div>
    );
};
export default App;