import React from 'react';

function Logout(props) {
    if (window.confirm("Logout?"))
    {
        props.authService.logout();
        return (<h4>Bye!</h4>)
    }
}
export default Logout;
