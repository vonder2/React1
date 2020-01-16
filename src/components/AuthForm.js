import React, {useState, useEffect} from "react";
import {Redirect} from "react-router-dom";

const SignIn = (props) => {
    //props: {AuthService, redirectTo}
    //set variable and setState
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);

    const inputHandler = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        switch (fieldName)
        {
            case 'username': setUsername(fieldValue); break;
            case 'password': setPassword(fieldValue); break;
        }
    };

    let valid = false;

    //ngOnInit && ngOnChange
    useEffect(() => {
        if (username && password)
            if (props.authService.login({username, password}))
                setLogin(true);
            else
                window.alert("Wrong credentials");

    });

    return login ? (<Redirect to={props.redirectTo}/>) : (
      <form>
          <div className="form-group">
              <label>Username</label>
              <input className={"form-control"} name={"username"} onBlur={inputHandler}/>

              <label>Password</label>
              <input type="password" className={"form-control"} name={"password"} onBlur={inputHandler}/>
          </div>

      </form>
    );
};

export default SignIn;
