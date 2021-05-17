const totalCost = document.querySelector('#total-record-cost')
const recordAmount = document.querySelectorAll('.each-record-amount')

let sum = 0
for ( i=0; i<recordAmount.length; i++ ){
sum += Number(recordAmount[i].innerHTML)
}

totalCost.textContent = sum


const deleteBtn = document.querySelectorAll('#form--delete')
function confirmDelete(e) { 
  if(confirm("這會移除這筆紀錄，你確定嗎?")){ e.parentElement.submit() }   
}
deleteBtn.forEach(btn => btn.addEventListener('mousedown', evt => { 
  confirmDelete(evt.target) 

}))
