const toIcon = function(id){
  let icon,color,name ;
  let newObj ={}
  switch (id) { //Record 將單一文件傳入時，去尋找categoryId 
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
  newObj.idx = id
  newObj.name = name
  newObj.icon = icon
  newObj.color = color
return newObj;
}

const toCategoryObjId= function(id){
  let cateId ="check input id"
switch (id) {  
  case 0:
    cateId = "60a8095bd49f433a4c747f65" //"家居物業"
    break
  case 1:
    cateId = "60a8095cd49f433a4c747f66" //"交通出行",
    break
  case 2:
    cateId = "60a8095cd49f433a4c747f67" //"休閒娛樂",
    break
  case 3:
    cateId = "60a8095cd49f433a4c747f68" //"餐飲食品",
    break
  case 4:
    cateId = "60a8095cd49f433a4c747f69" //"其他",
    break
  }
return cateId
}

const arrRemove=function(array,item){
  const index = array.indexOf(item)
if (index > -1) { array.splice(index, 1) }
return array
}

const categoryArr =[
  { name: '家居物業', categoryId:0 }, 
  { name: '交通出行', categoryId:1 },
  { name: '休閒娛樂', categoryId:2 },
  { name: '餐飲食品', categoryId:3 },
  { name: '其他',    categoryId:4 }
]

module.exports = { toIcon, arrRemove, categoryArr, toCategoryObjId }