import React from 'react';

function SignIn(props) {
    
    // console.log(props, 'form')

    return (

        <div>
            <h3 className='Signin'>
                This is a Signin Form
            </h3>

            <form>

                <label>
                    UserName:
                    <input type="text" username="username" onChange={props.UserName} />
                </label> <br/>

                <label>
                    Password:
                    <input type="password" password="password" onChange={props.Password}/>
                </label> <br/>

                <input type="submit" value="Submit" onClick={ props.ClickHandler } />

            </form>
        </div>
    );
}

export default SignIn;