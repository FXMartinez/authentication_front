import React from 'react';
import SignIn from './components/signinform'
// import logo from './logo.svg';
import './App.css';
import UserInformation from './components/userinfo';

class App extends React.Component {

  state = {
    user: '',
    useredit: 'off',
    createUser: 'off',
    users: '',
    username: '',
    password: '',
    // editUsername: '',
    // editPassword: '',
    confirmPassword: ''
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/users')
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          users: data
        })
      }
    )
  }

  logoutButton = () => {
    this.setState({
      user: ''
    })
  }

  deleteButton = (id) => {
    fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
    })
  }

  editUserInfo = (id) => {
    fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        username: this.state.editUsername,
        password: this.state.editPassword
      })
    })
    .then(resp => resp.json())
    .then( console.log )
    alert(`Your info has successfully changed ${this.state.editUsername}`)
  }

  // Function for the button used to submit the new user information to the rails api
  submitNewUserData = (e) => {
    this.state.password === this.state.confirmPassword
    ?
      fetch('http://localhost:3000/api/v1/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
          })
        })
        .then(resp => resp.json())
        .then(
              newUserData => {
                newUserData.id === null
                ?
                alert('you already have an account')
                :
                this.setState({
                  user: newUserData,
                  username: '',
                  password: '',
                  users: [...this.state.users, newUserData]
                })
              }
            )
      :

      alert("passwords do not match")
    e.preventDefault()
  }

  // Button for toggling the new user form on the signin component
  newUserButton = () => {
    this.state.createUser === "off"
    ?
    this.setState({
      createUser: "on"
    })
    :
    this.setState({
      createUser: "off"
    })
  }

  editButton = () => {
    console.log('edit button is being pressed')
    this.state.useredit === 'off'
    ?
    this.setState({
      useredit: "on"
    })
    :
    this.setState({
      useredit: "off"
    })
  }

  usernameOnChange = (e) => {
    this.setState({
      username: e.target.value
    })
    console.log(this.state.username)
  }

  passwordOnChange = (e) => {
    this.setState({
      password: e.target.value
    })
    console.log(this.state.password)
  }

  confirmPasswordOnChange = (e) => {
    this.setState({
      confirmPassword: e.target.value
    })
    console.log(this.state.confirmPassword)
  }

  submitHandler = (e) => {
    let foundUser = null;
    this.state.users.forEach( user => 
      user.username.toLowerCase() === this.state.username.toLowerCase() 
      ? foundUser = user
      :null 
    )
    foundUser === null ? alert('user does not exist') 
    : foundUser.password === this.state.password 
      ? this.setState({ user: {...foundUser}}) 
      : alert('Wrong password')

    e.preventDefault();
  }

  render() {

    console.log(this.state.user.id, "App")

    return (
    
      <>
        {
          this.state.user === ''

          ?

          <div className='Centerme'>
            <h1> You must sign in or create an account to access the website </h1>
              <SignIn 
                submitUser={this.submitNewUserData}
                confirm={this.confirmPasswordOnChange} 
                userName={this.usernameOnChange} 
                password={this.passwordOnChange} 
                createButton={this.newUserButton} 
                submitHandler={this.submitHandler}
                createUser={this.state.createUser} 
              />
          </div>

          :

          <div className="App">

            <h1> BOOM! WHATUP </h1>
            <h2> This is the front page </h2> <br/>
              <UserInformation 
                logout={this.logoutButton} 
                editButton={this.editButton}
                currentUser={this.state.user} 
                editStatus={this.state.useredit} 
                editUsername={this.usernameOnChange}
                editPassword={this.passwordOnChange}
                editSubmit={this.editUserInfo}
              />

          </div>
        }
          
      </>
    );
  }
}

export default App;