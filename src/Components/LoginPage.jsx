import {useState} from 'react'

const LoginPage = ({logIn , createUser}) => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleNameChange = (e) => {
    setUserName(e.target.value)
  }

  const handlePassChange = (e) => {
    setPassword(e.target.value)
  }

  const handleExistingUserClick = () => {
    logIn(userName , password)
  }

  const handleNewUserClick = () => {
    createUser(userName, password)
  }

  return (
    <div>
      <input type="text" placeholder="User Name" onChange={handleNameChange}/>
      <input type="text" placeholder="Password" onChange={handlePassChange}/>
      <div className='button-container'>
        <button onClick={handleNewUserClick}>Create User</button>
        <button onClick={handleExistingUserClick}>Sign In</button>
      </div>

    </div>
  )
}

export default LoginPage