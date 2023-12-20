const HomeButton = ({setSingleGoal}) => {

  const handleClick = () => {
    setSingleGoal()
  }

  return (
    <button onClick={handleClick} className="special-button">Home Button</button>
  )
}

export default HomeButton