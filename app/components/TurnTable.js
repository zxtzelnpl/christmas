import './TurnTable.less'
import React from 'react'
import Pop from './Pop'
import {public_resource,send_prize} from "../constants/urls";
import {userPrize} from '../static/tools'

// 用户不存在，请联系客服
export default class TurnTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animate: false,
      popShow: false, /**需要删除，改为false**/
      rotate: {
        'transform': 'rotate(0deg)'
      }
    }
    this.img_go = `${public_resource}/go.png`
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
          console.log(json)
          alert(`恭喜您获得奖品${prize}`)
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
        </div>
    )
  }
}