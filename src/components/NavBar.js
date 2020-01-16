import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

function NavBar(props) {
    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        const subscrib = props.authService.isAuth().subscribe(res => setAuth(res));

        return () => {
            //dismount func
            subscrib.unsubscribe();
        }
    });

    return (
        <ul className={"nav"}>
            <li className={"nav-item"} hidden={!isAuth}>
                <Link to={'/courses'}><span className="nav-link"> List of Courses</span></Link>
            </li>
            <li className={"nav-item"}  hidden={isAuth}>
                <Link to={'/login'}><span className="nav-link">Sign In</span></Link>
            </li>
            <li className={"nav-item"}  hidden={!isAuth}>
                <Link to={'/logout'}><span className="nav-link">Logout</span></Link>
            </li>

        </ul>
    )
}
