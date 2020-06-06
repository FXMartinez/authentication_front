import React from 'react';
import SignIn from './components/signinform'
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
      user: '',
      createUser: 'off',
      useredit: 'off'
    })
  }

  deleteButton = () => {
    if(window.confirm('Are you sure you want to delete your account?') === true) {
      fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
      })
      this.logoutButton()
    } else {
      return
    }
  }

  filterUsers = (username) => {
    let filteredArray = this.state.users.filter( user => { return user.username !== username })
    return filteredArray
  }

  editUserInfo = (e) => {
    fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}`, {
      method: "PUT",
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
    .then( editedUserData => {
      let usersArray = this.state.users.filter(user => user.username !== editedUserData.username)
      let fullArray = [ editedUserData, ...usersArray ]
      this.setState({
        users: fullArray
      })
    })
    alert(`Your info has successfully changed ${this.state.user.username}`)
    e.preventDefault()
  }


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
      ? this.setState({ 
        user: {...foundUser},
        username: foundUser.username,
        password: foundUser.password
      }, console.log(this.state.username, this.state.password, 'login')) 
      : alert('Wrong password')

    e.preventDefault();
  }

  render() {

    // console.log(this.state.user.id, "App")

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
                delete={this.deleteButton}
              />

          </div>
        }
          
      </>
    );
  }
}

export default App;