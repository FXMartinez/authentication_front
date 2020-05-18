import React from 'react';

function UserInformation(props) {

    console.log(props)

    return(
        <>
        <h3> Here lies some user information </h3> <br/>
        username: {props.CurrentUser.username} <br/>
        password: {props.CurrentUser.password} <br/>
        joined: {props.CurrentUser.created_at} <br/>
        user ID number: {props.CurrentUser.id}
        </>
    )
}

export default UserInformation;