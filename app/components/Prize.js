import './Prize.less'
import React from 'react'
import {public_resource} from "../constants/urls";

export default class Prize extends React.Component{
  constructor(props){
    super(props)
    this.img_boolean_left = `${public_resource}/boolean_left.png`
    this.img_boolean_right = `${public_resource}/boolean_right.png`
  }

  render(){
    return <div className="Prize">
      <div className="prize_info">
        <p>恭喜</p>
        <p>您获得奖品</p>
        <p>“{this.props.prize}”</p>
        <img className="left" src={this.img_boolean_left} alt=""/>
        <img className="right" src={this.img_boolean_right} alt=""/>
      </div>
    </div>
  }
}