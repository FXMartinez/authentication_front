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
                    <input type="text" username="username" onChange={props.userName} />
                </label> <br/>

                <label>
                    Password:
                    <input type="password" password="password" onChange={props.password}/>
                </label> <br/>

                <input type="submit" value="Submit" onClick={ props.submitHandler } />

            </form>
        </div>
    );
}

export default SignIn;