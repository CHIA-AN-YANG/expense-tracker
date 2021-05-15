const home = document.querySelector('.nav-link--home')
const add = document.querySelector('.nav-link--add')
console.log('main.js is working')
home.addEventListener('click', () => {
  home.parentElement.classList.add('active')
  add.parentElement.classList.remove('active')
  home.innerHTML='<a class="nav-link nav-link--home" href="/">Home<span class="sr-only">(current)</span></a>'
  add.innerHTML='<a class="nav-link nav-link--add" href="/">Add Record</a>'
})
add.addEventListener('click', () => {
  add.parentElement.classList.add('active')
  home.parentElement.classList.remove('active')
  home.innerHTML='<a class="nav-link nav-link--home" href="/">Home</a>'
  add.innerHTML='<a class="nav-link nav-link--add" href="/">Add Record<span class="sr-only">(current)</span></a>'
})