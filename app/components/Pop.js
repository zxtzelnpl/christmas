import './Pop.less'
import React from 'react'
import {trim,phoneCheck} from "../static/tools";

export default class Pop extends React.Component{

  constructor(props){
    super(props)
    this.state={
      phone:'',
      info:'请填写手机以参加抽奖'
    }
  }

  onChange(){
    this.setState({
      phone:this.input.value
    })
  }

  sub(){
    this.props.sub(this.state.phone)
  }

  render(){
    return (
        <div className="Pop">
          <div className="formBox">
            <div className="info">{this.state.info}</div>
            <input
                type="number"
                onChange={this.onChange.bind(this)}
                value={this.state.phone}
                ref={input=>{this.input=input}}
            />
            <p onClick={this.sub.bind(this)}>确认</p>
          </div>
        </div>
    )
  }
}