import React from "react"
import Points from "./Points"

function App() {
  return (
  <div className="surface">
    <nav className="hor-nav">
      <img src="https://via.placeholder.com/150x50" alt= "Org logo"/>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Help</li>
      </ul>
    </nav>
      
    <Points />

    <nav className="vert-nav">
      <img className="nsbe-logo" src="https://via.placeholder.com/180x60" alt="UK-NSBE logo"/>
      <ul>
        <li>Anouncements</li>
        <li>Track Points</li>
        <li>Study Help</li>
        <li>Display Board</li>
        <li>Finance</li>
        <li>Attedance</li>
      </ul>
    </nav>
  </div>
  )
}
export default App