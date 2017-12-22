let myStorage = {
  setItem:function(){
    console.info('localStorage无法使用')
  },
  getItem:function(){
    console.info('localStorage无法使用')
  },
  clear:function(){
    console.info('localStorage无法使用')
  }
}

if (typeof localStorage === 'object') {
  console.info('localStorage可以使用')
  myStorage = localStorage
}

export default myStorage