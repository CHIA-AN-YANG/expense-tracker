const currentYear = Number(new Date().getFullYear())
const months = [...Array(12).keys()]
const years = Array.from({ length: 20 }, (_, i) => currentYear - 18 + i)

module.exports = {
  currentYear,
  months,
  years,
}
