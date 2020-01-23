import React from 'react';

export default function Logout(props) {
    if (window.confirm("Logout?"))
    {
        props.authService.logout();
        return (<h4>Bye!</h4>)
    }
}
