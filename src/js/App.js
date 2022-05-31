import React from "react";

const electron = require('electron');

export default function App() {
    return (
        <>
            <h1>I am sdfs!!!</h1>
            <button onClick={() => {
                electron.notificationApi.sendNotification('My notify!')
            }
            }>Notify
            </button>
        </>
    )
}