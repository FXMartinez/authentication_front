import React from 'react';
import SignIn from './components/signinform'
// import logo from './logo.svg';
import './App.css';
import UserInformation from './components/userinfo';

class App extends React.Component {

  state = {
    user: '',
    useredit: 'off',
    users: [],
    username: '',
    password: ''
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/users')
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          users: [...data]
        })
      }
    )
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

  submitHandler = (e) => {
    this.state.users.forEach( user => {
      this.state.username.toLowerCase() === user.username.toLowerCase() && this.state.password === user.password
      ?
      this.setState({
        user: {...user}
      })
      :
      alert('wrong bitch')
      }
    )

    e.preventDefault();
  }

  render() {

    // console.log(this.state.users, "App")

    return (
    
      <>
        {
          this.state.user === ''
          ?
          <div className='Centerme'>
            <h1> You must sign in to access the website </h1>
              <SignIn submitHandler={this.submitHandler} userName={this.usernameOnChange} password={this.passwordOnChange} />
          </div>
          :
          <div className="App">

            <h1> BOOM! WHATUP </h1>
            <h2> This is the front page </h2> <br/>
              <UserInformation currentUser={this.state.user} editStatus={this.state.useredit} editButton={this.editButton}  />

          </div>
        }
      </>
    );
  }
}

export default App;