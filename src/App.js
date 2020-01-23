import React, {useEffect, useState} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';
import CoursesHttpService from "./services/CoursesHttpService";
import CoursesList from "./components/CourseList/CoursesList";
import AuthForm from "./components/AuthForm"
import NavBar from "./components/NavBar";
import Logout from "./components/Logout";
import AuthService from "./services/AuthService";




function App() {
  const myCourseService = new CoursesHttpService("http://localhost:3500/courses/",
      "http://localhost:3500/titles", "http://localhost:3500/teachers");

  const authService = new AuthService();
  const [isAuth, setAuth] = useState(false);

  useEffect(function () {
      authService.isAuth().subscribe(isAuth => setAuth(isAuth));
  })

  return (
      <BrowserRouter>
        <div className="App">
          <NavBar authService={authService}></NavBar>

          <Switch>
            <Route path={'/courses'} exact render={()=> isAuth ?
                <CoursesList authService={authService} courseService={myCourseService} /> : <div/> } />

            <Route path={'/login'} exact render={()=>
                <AuthForm authService={authService} redirectTo={'/courses'} />  } />

            <Route path={'/logout'} exact render={()=>
                <Logout authService={authService}  />} />

          </Switch>
        </div>
      </BrowserRouter>

  );
}

export default App;
