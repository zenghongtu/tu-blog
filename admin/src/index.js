import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'
import './index.css';
import App from './App';
import Provider from "react-redux/es/components/Provider";
import store from "./store";

ReactDOM.render(
    <Provider store={store}><App/></Provider>
    , document.getElementById('root')
);


if (module.hot) {
    module.hot.accept(() => {
        ReactDOM.render(
            <Provider store={store}>
                <App/>
            </Provider>, document.getElementById('root'));
    });
}
