import React from 'react';

function SignIn(props) {
    
    // console.log(props, 'form')

    return (

        <div>
            <h3 className='Signin'>
                This is a Signin Form
            </h3>

            {

            props.createUser === 'off'
            ?   
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
                    <button onClick={props.createButton}> Join </button>
                </form>
            :
                <div>
                    <h2> create user form goes here </h2> 
                    <button onClick={props.createButton}>Sign In</button>
                </div>
            }
        </div>
    );
}

export default SignIn;