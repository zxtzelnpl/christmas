import './TurnTable.less'
import React from 'react'
import Pop from './Pop'
import Prize from './Prize'
import {public_resource,send_prize} from "../constants/urls";
import {userPrize} from '../static/tools'

// 用户不存在，请联系客服
export default class TurnTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animate: false,
      popShow: false, /**需要删除，改为false**/
      prizeShow:false,/**需要删除，改为false**/
      rotate: {
        'transform': 'rotate(0deg)'
      }
    }
    this.img_go = `${public_resource}/go.png`
    this.userGot={
      deg:0,
      prize:''
    }
    // this.userGot=userPrize()/**需要删除，改为上面的注释**/
  }

  componentDidMount() {

  }

  onClick() {
    let {check, prize} = this.props.user
    let {animate} = this.state

    console.log(prize)

    if (!check) {//如果从未接收到数据则弹出pop
      return this.setState({
        popShow: true
      })
    }
    else if(prize==='1'||animate){
      alert('此号码已经参与过抽奖了')
    }
    else if (!animate) {
      this.userGot = userPrize()
      let {deg} = this.userGot
      this.setState({
        animate: true,
        rotate: {
          'transform': `rotate(${deg + 3600}deg)`
        }
      })
    }
    else {
      alert('页面故障，请稍后再试')
    }
  }

  closePop() {
    this.setState({
      popShow: false
    })
  }

  onTransitionEnd() {
    let {id,phone} = this.props.user
    let {prize} = this.userGot
    let url = `${send_prize}?id=${id}&phone=${phone}&prize=${prize}`
    fetch(url)
        .then(res=>res.json())
        .then(json=>{
          if(json.error==='1'){
            this.setState({
              prizeShow:true
            })
          }
          else{
            alert('网络连接发送错误，请稍后重试')
          }
        })
        .catch(e=>{
          alert('网络连接发送错误，请稍后重试')
        })

  }

  sub(phone) {
    this.props.userActions.fetchPostsIfNeeded(phone)
  }

  render() {
    let popDom = this.state.popShow && !this.props.check ? <Pop
        sub={this.sub.bind(this)}
        closePop={this.closePop.bind(this)}
        user={this.props.user}
        userActions={this.props.userActions}
    /> : <div/>

    let PrizeDom = this.state.prizeShow ? <Prize prize={this.userGot.prize}/>:<div />


    return (
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
                <span className="triangle"/>
              </div>
              <img className="go" src={this.img_go} alt=""/>
            </div>
          </div>
          {popDom}
          {PrizeDom}
        </div>
    )
  }
}