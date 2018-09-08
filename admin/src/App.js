import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import Login from "./pages/login";
import Profile from "./pages/profile";
import Article from "./pages/article";
import Category from "./pages/category";
import Tag from "./pages/tag";
import Read from "./pages/read";
import Laboratory from "./pages/laboratory";


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/login">login</Link>
                        </li>
                        <li>
                            <Link to="/profile">profile</Link>
                        </li>
                        <li>
                            <Link to="/article">article</Link>
                        </li>
                        <li>
                            <Link to="/category">category</Link>
                        </li>
                        <li>
                            <Link to="/tag">tag</Link>
                        </li>
                        <li>
                            <Link to="/read">read</Link>
                        </li>
                        <li>
                            <Link to="/laboratory">laboratory</Link>
                        </li>

                    </ul>

                    <Route path="/login" component={Login}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/article" component={Article}/>
                    <Route path="/category" component={Category}/>
                    <Route path="/tag" component={Tag}/>
                    <Route path="/read" component={Read}/>
                    <Route path="/laboratory" component={Laboratory}/>
                </div>
            </Router>
        );
    }
}

export default App;
