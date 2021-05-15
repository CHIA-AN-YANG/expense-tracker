const totalCost = document.querySelector('#total-record-cost')
const recordAmount = document.querySelectorAll('.each-record-amount')

let sum = 0
for ( i=0; i<recordAmount.length; i++ ){
sum += Number(recordAmount[i].innerHTML)
}

totalCost.textContent = sum