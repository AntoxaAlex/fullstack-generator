import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Loading from "./components/layout/Loading";

ReactDOM.render(
  <React.StrictMode>
    <Loading/>
  </React.StrictMode>,
  document.getElementById('root')
);

setTimeout(()=>{
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    );
},10500)

