import './Winners.less'
import React from 'react'
import {getMoble, getPrize} from "../static/tools";
import {public_resource} from "../constants/urls";


function getDate() {
  return {
    mobile: getMoble(),
    prize: getPrize()
  }
}


export default class Winners extends React.Component {
  constructor(props) {
    super(props)
    this.img_boolean_left = `${public_resource}/boolean_left.png`
    this.img_boolean_right = `${public_resource}/boolean_right.png`
    this.img_cloud_down = `${public_resource}/cloud_down.png`
    this.img_cloud_up = `${public_resource}/cloud_up.png`
    this.img_record_title = `${public_resource}/record_title.png`
    this.img_talk = `${public_resource}/talk.png`
    let broadcastDate = []
    let scrollDate = []
    for (let i = 0; i < 2; i++) {
      broadcastDate.push(getDate())
    }
    for (let i = 0; i < 10; i++) {
      scrollDate.push(getDate())
    }
    this.state = {
      broadcastDate,
      broadAnimation: {'animation': 'scrollTextH 2s linear both'},
      scrollDate,
      scrollAnimation: {'animation': 'scrollTextV 2s linear both'}
    }
  }

  updateBroad() {
    this.setState({
      scrollAnimation: {'animation': 'scrollTextV 2s linear both'}
    })
  }

  updateScroll() {
    this.setState({
      broadAnimation: {'animation': 'scrollTextH 2s linear both'}
    })
  }

  onAnimationEndBroad() {
    this.setState(({broadcastDate}) => {
      let _broadcastDate = broadcastDate.slice(1)
      _broadcastDate.push(getDate())
      return {
        broadcastDate: _broadcastDate,
        broadAnimation: {'animation': 'none'}
      }
    })
    setTimeout(this.updateScroll.bind(this), 6000)
  }

  onAnimationEndScroll() {
    this.setState(({scrollDate}) => {
      let _scrollDate = scrollDate.slice(5)
      for (let i = 0; i < 5; i++) {
        _scrollDate.push(getDate())
      }
      return {
        scrollDate: _scrollDate,
        scrollAnimation: {'animation': 'none'}
      }
    })
    setTimeout(this.updateBroad.bind(this), 2000)
  }

  render() {
    let {broadcastDate, broadAnimation, scrollDate, scrollAnimation} = this.state
    let broadLis = broadcastDate.map((item, index) => {
      return (<li key={index}>
        <span>恭喜{item.mobile}</span>
        <span>抽中</span>
        <span>{item.prize}</span>
      </li>)
    })
    let scrollLis = scrollDate.map((item, index) => {
      return (<li key={index}>
        <span>{item.mobile}</span>
        <span>抽中</span>
        <span>{item.prize}</span>
      </li>)
    })
    scrollLis.splice(5, 0, <li key="blank2"/>)
    scrollLis.splice(0, 0, <li key="blank1"/>)


    return (
        <div className="Winners">
          <div className="boolean left"><img src={this.img_boolean_left}/></div>
          <div className="boolean right"><img src={this.img_boolean_right}/></div>
          <div className="cloud up"><img src={this.img_cloud_up}/></div>
          <div className="cloud down"><img src={this.img_cloud_down}/></div>
          <div className="broadcast_wrap">
            <img src={this.img_talk}/>
            <div className="list_wrap">
              <ul style={broadAnimation} onAnimationEnd={this.onAnimationEndBroad.bind(this)}>
                {broadLis}
              </ul>
            </div>
          </div>
          <div className="scroll_wrap">
            <div className="record_title"><img src={this.img_record_title}/></div>
            <div className="list_wrap">
              <ul style={scrollAnimation} onAnimationEnd={this.onAnimationEndScroll.bind(this)}>
                {scrollLis}
              </ul>
            </div>
          </div>
        </div>
    )
  }
}