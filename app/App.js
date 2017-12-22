import './static/app.less'
import React from 'react'
import TurnTable from './components/Turntable'
import Winners from './components/Winners'



const App = () => {
  return (
      <div className="container">
        <TurnTable />
        <Winners />
      </div>
  )
}

export default App