import HomeButton from "./HomeButton"
import {useState} from 'react'

const GoalDetails = ({singleGoal, setSingleGoal, getDetails, goalId, addGoalDetail}) => {

  const [newEntry, setNewEntry] = useState('')
  const [content, setContent] = useState('')

  const handleEntry = (e) => {
    setNewEntry(e.target.innerText)
  }

  const handleClick = async (e) => {
    const goalData = {goalDetails: newEntry}
    addGoalDetail(goalData)
  }

  const singleGoalReversed = singleGoal.slice().reverse()

  return (
    <div>
      <HomeButton setSingleGoal={setSingleGoal}/>
      <div className='goal-card'>
        <h1 contentEditable={true} onInput={handleEntry}>Click to add new update</h1>
        <button onClick={handleClick}>Add New Entry</button>
      </div>
      {singleGoalReversed.map((goal) => (
        <div className='detail-card' key={goal.id}>
          <h3>{goal.update_text}</h3>
        </div>
      )
    )}
    </div>
  )

}

export default GoalDetails