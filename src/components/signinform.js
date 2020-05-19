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

                    <input type="submit" value="Sign-In" onClick={ props.submitHandler } />

                    <button onClick={props.createButton}> Join </button>

                </form>

            :

                <div>
                    <form>
                        <label>
                            UserName:
                            <input type="text" username="username" onChange={props.userName} />
                        </label> <br/>
                        <label>
                            Password:
                            <input type="password" password="password" onChange={props.password} />
                        </label> <br/>
                        <label>
                            Confirm Password:
                            <input type="password" password="password" onChange={props.confirm} />
                        </label> <br/>

                        <input type="submit" value="Create account" onClick={ props.submitUser } />

                        <button onClick={props.createButton}>Sign In</button>

                    </form>

                </div>
            }

        </div>
    );
}

export default SignIn;