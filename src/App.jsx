import { useState , useEffect } from 'react'
import './App.css'
import LoginPage from './Components/LoginPage'
import GoalList from './Components/GoalList'
import GoalDetails from './Components/GoalDetails'

function App() {
  const [goals, setGoals] = useState([])
  const [singleGoal, setSingleGoal] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [goalId, setGoalId] = useState(null)
  const [userId, setUserId] = useState(null)
// reformat error handling in fetch requests ( response.statusText ) - console.error(error)

  const logIn = async (user,pass) => {
    const userData = {
      userName: user,
      password: pass
    }
    await fetch(`http://localhost:3000/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not okay')
      }
      return response.json()
    })
    .then(data => {
      setUserId(data[0].id)
      setLoggedIn(true)
      fetchGoals(data[0].id)
    })
    .catch(error => {
      setError(error)
    })
  }

  const createUser = async (user,pass) => {
    const userData = {
      userName: user,
      password: pass
    }
    await fetch('http://localhost:3000/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error: network response was not okay')
      }
      return response.json()
    })
    .then(data => {
      setUserId(data[0].id)
      setLoggedIn(true)
      fetchGoals(data[0].id)
    })
    .catch(error => {
      setError(error)
    })
  }

  const fetchGoals = async (id) => {
    const res = await fetch(`http://localhost:3000/api/goal/${id}`)
    const data = await res.json()
    setGoals(data)
  }

  const getDetails = async (id) => {
    const res = await fetch(`http://localhost:3000/api/goal/details/${id}`)
    const data = await res.json()
    setSingleGoal(data)
    setGoalId(id)
  }

  const clearSingleGoal = () => {
    setSingleGoal(null)
    setGoalId(null)
  }

  const createGoal = async (newGoal) => {
    const goalData = {
      goalTitle: newGoal
    }
    await fetch(`http://localhost:3000/api/goal/${userId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(goalData)
    })
    .then( response => {
      if (!response.ok) {
        throw new Error(`${response}`)
      }
      return response
    })
    .then( data => {
      fetchGoals(userId)
    })
    .catch(error => {
      setError(error)
    })
  }

  const signOut = () => {
    setLoggedIn(false)
    setUserId(null)
    setGoalId(null)
    setGoals([])
    setSingleGoal(null)
  }

  const delGoal = async (id) => {
    const res = await fetch(`http://localhost:3000/api/goal/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
     })
     .then(response => {
      if(!response.ok) {
        throw new Error(`${response.statusText}`)
      }
      return response
     })
     .then(data => {
      fetchGoals(userId)
     })
     .catch(error => {
      console.error(error)
     })
  }

  const addGoalDetail = async (goalData) => {
    const res = await fetch(`http://localhost:3000/api/goal/details/${goalId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goalData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error: Update was not created')
      }
      return response
    })
    .then( () => {
      getDetails(goalId)
    })
  }

  if (!loggedIn) {
    return (
      <>
        <div className='container'>
          <h2>Ever Goals</h2>
          <LoginPage logIn={logIn} createUser={createUser}/>
        </div>
      </>
    )
  }

  if (loggedIn && !singleGoal ) {
    return (
      <>
        <div className='container'>
          <h2>Ever Goals</h2>
          <GoalList
            goals={goals}
            getDetails={getDetails}
            userId={userId}
            loggedIn={loggedIn}
            createGoal={createGoal}
            signOut={signOut}
            delGoal={delGoal}
          />
        </div>
      </>
    )
  }

  if(loggedIn && singleGoal) {
    return (
      <div className='container'>
        <h2>Ever Goals</h2>
        <GoalDetails
          singleGoal={singleGoal}
          setSingleGoal={setSingleGoal}
          getDetails={getDetails}
          goalId={goalId}
          addGoalDetail={addGoalDetail}
          setGoals={setGoals}
        />
      </div>
    )
  }

}
export default App
