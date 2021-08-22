const currentYear = Number(new Date().getFullYear())
const months = [...Array(13).keys()].splice(1, 12)
const years = Array.from({ length: 20 }, (_, i) => currentYear - 18 + i)

module.exports = {
  currentYear,
  months,
  years,
}
