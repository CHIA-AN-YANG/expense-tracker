const toIcon = function(Arr){
Arr.forEach((item) => {
  let icon,color;
  switch (item['category']) { 
    case "家居物業":
      icon = 'home'
      color = "#08cbab"
      break
    case "交通出行":
      icon = 'bus'
      color = "#81d20f"
      break
    case "休閒娛樂":
      icon = 'smile-o'
      color = "#cc7d98"
      break
    case "餐飲食品":
      icon = 'spoon'
      color = "#fc4f51"
      break
    case "其他":
      icon = 'pencil'
      color = "#5f3677"
      break
  }
  item.icon = icon
  item.color = color
})
return Arr;
}

const arrRemove=function(array,item){
  const index = array.indexOf(item)
if (index > -1) { array.splice(index, 1) }
return array
}

const categoryArr =['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

module.exports = { toIcon, arrRemove, categoryArr }