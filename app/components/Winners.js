import './Winners.less'
import React from 'react'
import {getMoble,getPrize} from "../static/tools";
import {public_resource} from "../constants/urls";
let broadcastDate =[]
let scrollDate = []

for(let i=0;i<10;i++){
  broadcastDate.push({
    mobile:getMoble(),
    prize:getPrize()
  })
}

for(let i=0;i<20;i++){
  scrollDate.push({
    mobile:getMoble(),
    prize:getPrize()
  })
}
console.log(broadcastDate)
console.log(scrollDate)


export default class Winners extends React.Component{
  constructor(props){
    super(props)
    this.img_boolean_left = `${public_resource}/boolean_left.png`
    this.img_boolean_right = `${public_resource}/boolean_right.png`
    this.img_cloud_down = `${public_resource}/cloud_down.png`
    this.img_cloud_up= `${public_resource}/cloud_up.png`
    this.img_record_title = `${public_resource}/record_title.png`
    this.img_talk = `${public_resource}/talk.png`
  }


  render(){
    let data=[]
    for(let i=0;i<15;i++){
      data.push(i)
    }



    let lis = data.map(item=>{
      return <li key={item}>第{item}条信息</li>
    })

    return(
        <div className="Winners">
          <div className="boolean left"><img src={this.img_boolean_left} /></div>
          <div className="boolean right"><img src={this.img_boolean_right} /></div>
          <div className="cloud up"><img src={this.img_cloud_up} /></div>
          <div className="cloud down"><img src={this.img_cloud_down} /></div>
          <div className="broadcast_wrap">
            <img src={this.img_talk} />
            <div className="list_wrap">
              <ul>

              </ul>
            </div>
          </div>
          <div className="scroll_wrap">
            <div className="record_title"><img src={this.img_record_title} /></div>
            <div className="list_wrap scrollText">
              <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
              </ul>
            </div>
          </div>
        </div>
    )
  }
}