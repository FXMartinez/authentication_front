import React from 'react';

function UserInformation(props) {

    console.log(props.editStatus)

    return(
        <div>
            <>
            <h3> Here lies some user information </h3> <br/>
            </>
            <button onClick={props.editButton}>Edit Info</button> <br/>
            {
            props.editStatus === 'off'
            ?
            <div>
                username: {props.currentUser.username} <br/>
                password: {props.currentUser.password} <br/>
                joined: {props.currentUser.created_at} <br/>
                user ID number: {props.currentUser.id}
            </div>
            :
            <div>
                <h1> there is going to be an edit form here </h1> <br/>
                <button onClick={props.deleteButton}> Delete Account </button>
            </div>
            }
        </div>
    )
}

export default UserInformation;