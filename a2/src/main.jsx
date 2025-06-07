import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux";
import {datastore} from "./store/index.js";


createRoot(document.getElementById('root')).render(<Provider store={datastore}>
    <App/>
</Provider>,)
