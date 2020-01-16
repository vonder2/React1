import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Clock from "./Clock";

import CoursesHttpService from "./services/CoursesHttpService";
import CoursesList from "./components/CoursesList";

const testCourseService = new CoursesHttpService("http://localhost:3500/courses/",
    "http://localhost:3500/titles", "http://localhost:3500/teachers");


ReactDOM.render(<CoursesList courseService={testCourseService}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
