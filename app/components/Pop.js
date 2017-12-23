import './Pop.less'
import React from 'react'
import {trim,phoneCheck} from "../static/tools";
import {public_resource} from "../constants/urls";

export default class Pop extends React.Component{

  constructor(props){
    super(props)
    this.img_close = `${public_resource}/close-circled.png`
    this.state={
      phone:''
    }
  }

  componentDidUpdate(){
    if(this.props.user.check){
      this.props.closePop()
    }
  }

  onChange(){
    let phone = trim(this.input.value).slice(0,11)
    this.setState({
      phone:phone
    })
  }

  sub(){
    let phone = this.state.phone
    if(phoneCheck(phone)){
      this.props.sub(this.state.phone)
    }
    else{
      this.props.userActions.receivedError('手机号码格式错误')
    }

  }

  render(){
    let infoDom
    if(this.props.user.err_msg!==''){
      infoDom = <div className="info">{this.props.user.err_msg}</div>
    }


    return (
        <div className="Pop">
          <div className="formBox">
            <div className="formTitle">
              <span className="close" onClick={this.props.closePop}>
                <img src={this.img_close} />
              </span>
            </div>
            <div className="formBody">
              <input
                  type="number"
                  onChange={this.onChange.bind(this)}
                  placeholder="请在此输入您的手机号"
                  value={this.state.phone}
                  ref={input=>{this.input=input}}
              />
              {infoDom}
              <p className="subBtn" onClick={this.sub.bind(this)}>立即抽奖</p>
            </div>
          </div>
        </div>
    )
  }
}