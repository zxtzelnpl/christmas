export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

export function phoneCheck(phone) {
  const mobile = /^[1][3,4,5,7,8][0-9]{9}$/
  return mobile.test(phone)
}

export function getMoble() {
  let prefixArray = ["130", "131", "132", "133", "135", "137", "138", "150", "156", "157", "159", "170", "176", "177", "178", "182", "185", "187", "188", "189"];
  let len = prefixArray.length
  let i = Math.floor(len * Math.random());
  let prefix = prefixArray[i] + '****';
  for (let j = 0; j < 4; j++) {
    prefix += Math.floor(Math.random() * 10);
  }
  return prefix
}

export function getPrize(){
  let prizes=['888元加油卡','IphoneX一台','加增服务期30天','跨年金股一只','加增服务期45天','1000元京东购物卡','加增服务期15天']
  let len = prizes.length
  let index = Math.floor(Math.random()*len)
  return prizes[index]
}