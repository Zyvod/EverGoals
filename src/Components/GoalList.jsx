import GoalItem from "./GoalItem";
import {useState} from 'react'

const GoalList = ({goals, setGoals, getDetails, userId, createGoal, signOut, delGoal}) => {

  const [newGoal , setNewGoal] = useState('')

  const handleGoalChange = (e) => {
    setNewGoal(e.target.innerText)
  }

  const handleGoalClick = () => {
    createGoal(newGoal)
    setGoals([])
  }

  const handleSignOut = () => {
    signOut()
  }

  const reversedGoals = goals.slice().reverse()

  return (
    <div>
      <button onClick={handleSignOut} className="special-button">Sign Out</button>
      <div className='goal-card'>
        <h1 contentEditable={true} onInput={handleGoalChange}>
          Click to edit new goal
        </h1>
        <button onClick={handleGoalClick}>Save New Goal</button>
      </div>
    {reversedGoals.map((goal) => (
        <GoalItem goal={goal}
          key={goal.id}
          getDetails={getDetails}
          delGoal={delGoal}
        />
      )
    )}
    </div>
 )

};

export default GoalList;