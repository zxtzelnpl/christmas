import './TurnTable.less'
import React from 'react'

export default class TurnTable extends React.Component{
  constructor(props){
    super(props)
    this.state={
      animate:false,
      rotate:{
        'transform':'rotate(0deg)'
      }
    }
  }

  componentDidMount(){

  }

  onClick(){
    if(!this.state.animate){
      this.setState(({rotate})=>{
        let deg = parseInt(rotate.transform.slice(7,-4))
        console.log(deg)
        return {
          animate:true,
          rotate:{
            'transform':`rotate(${deg+1890}deg)`
          }
        }
      })
    }
  }

  onTransitionEnd(){
    this.setState({
      animate:false
    })
  }

  render(){
    console.log(this.state)
    return(
        <div className="TurnTable">
          <div
              className="pointer"
              style={this.state.rotate}
              ref={pointer=>{this.pointer = pointer}}
              onClick={this.onClick.bind(this)}
              onTransitionEnd={this.onTransitionEnd.bind(this)}
          >
            123
          </div>
        </div>
    )
  }
}