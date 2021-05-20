const toIcon = function(item){
  let icon,color,name ;
  let newObj ={}
  console.log('categoryId: '+item.categoryId)
  switch (item.categoryId) { //Record 將單一文件傳入時，去尋找categoryId 
    case 0:
      name = "家居物業",
      icon = 'home'
      color = "#08cbab"
      break
    case 1:
      name = "交通出行",
      icon = 'bus'
      color = "#81d20f"
      break
    case 2:
      name = "休閒娛樂",
      icon = 'smile-o'
      color = "#cc7d98"
      break
    case 3:
      name = "餐飲食品",
      icon = 'spoon'
      color = "#fc4f51"
      break
    case 4:
      name = "其他",
      icon = 'pencil'
      color = "#5f3677"
      break
  }
  newObj.name = name
  newObj.icon = icon
  newObj.color = color

return newObj;
}

const arrRemove=function(array,item){
  const index = array.indexOf(item)
if (index > -1) { array.splice(index, 1) }
return array
}

const categoryArr =['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

module.exports = { toIcon, arrRemove, categoryArr }