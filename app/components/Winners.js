import './Winners.less'
import React from 'react'




export default class Winners extends React.Component{



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
          <div className="wrap scrollText">
            <ul>
              {lis}
              {lis}
            </ul>
          </div>
        </div>
    )
  }
}