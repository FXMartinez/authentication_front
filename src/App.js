import React from 'react';
import SignIn from './components/signinform'
// import logo from './logo.svg';
import './App.css';
import UserInformation from './components/userinfo';

class App extends React.Component {

  state = {
    user: '',
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

  UsernameOnChange = (e) => {
    this.setState({
      username: e.target.value
    })
    console.log(this.state.username)
  }

  PasswordOnChange = (e) => {
    this.setState({
      password: e.target.value
    })
    console.log(this.state.password)
  }

  ClickHandler = (e) => {
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
              <SignIn ClickHandler={this.ClickHandler} UserName={this.UsernameOnChange} Password={this.PasswordOnChange} />
          </div>
          :
          <div className="App">

            <h1> BOOM! WHATUP </h1>
            <h2> This is the front page </h2> <br/>
              <UserInformation CurrentUser={this.state.user} />

          </div>
        }
      </>
    );
  }
}

export default App;