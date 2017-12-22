import './TurnTable.less'
import React from 'react'
import Pop from './Pop'
import {public_resource} from "../constants/urls";

// 用户不存在，请联系客服
export default class TurnTable extends React.Component{
  constructor(props){
    super(props)
    this.state={
      animate:false,
      popShow:false,
      rotate:{
        'transform':'rotate(0deg)'
      }
    }
    this.img_go = `${public_resource}/go.png`
  }

  componentDidMount(){

  }

  onClick(){
    let {check,received} = this.props.user
    let {animate} = this.state

    // if(!received){//如果从未接收到数据则弹出pop
    //   this.setState({
    //     popShow:true
    //   })
    // }
    // else{
    //
    // }

    if(!animate){
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

  sub(phone){
    this.props.userActions.fetchPostsIfNeeded(phone)
  }

  render(){
    console.log(this.state)

    let popDom =this.state.popShow?<Pop sub={this.sub.bind(this)}/>:<div />


    return(
        <div className="TurnTable">
          <div className="bigTable">
            <div className="pointerWrap"
                 onClick={this.onClick.bind(this)}
            >
              <div
                  className="pointer"
                  style={this.state.rotate}
                  onTransitionEnd={this.onTransitionEnd.bind(this)}
              >
                <span className="triangle" />
              </div>
              <img className="go" src={this.img_go} alt=""/>
            </div>
          </div>

          {popDom}
        </div>
    )
  }
}