const GoalItem = ({goal, getDetails, delGoal}) => {

  const handleClick = (e) => {
    getDetails(e.currentTarget.parentNode.id)
  }

  const delGoalClick = (e) => {
    delGoal(e.target.parentNode.id)
  }

  return (
    <div className='goal-card' id={goal.id}>
      <h1>{goal.goal_title}</h1>
      <div id={goal.id}>
        <button onClick={delGoalClick}>Mark Completed</button>
        <div id={goal.id}>
          <button onClick={handleClick}>See Journal Entries</button>
        </div>
      </div>

    </div>
  )
}

export default GoalItem