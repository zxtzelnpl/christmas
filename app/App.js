import './static/app.less'
import React from 'react'
import TurnTable from './containers/Turntable'
import Winners from './components/Winners'
import {public_resource} from "./constants/urls";

class App extends React.Component {
  render() {
    let first_img = `${public_resource}/first.jpg`
    let last_img = `${public_resource}/last.jpg`
    return (
        <div className="container">
          <div className="bigBg">
            <img src={first_img} alt=""/>
          </div>
          <div className="main">
            <TurnTable/>
            <Winners/>
          </div>
          <div className="bigBg">
            <img src={last_img} alt=""/>
          </div>
        </div>
    )
  }

}

export default App