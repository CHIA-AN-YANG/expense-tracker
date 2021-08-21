if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose.js')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const bcrypt = require('bcryptjs')

const SEED_USER = {
  name: 'seedUser1',
  email: 'user1@example.com',
  password: '12345678',
}

db.once('open', () => {
  let userId
  User.findOne({ user_name: SEED_USER.name })
    .then((user) => {
      if (user) {
        return (userId = user._id)
      }
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(SEED_USER.password, salt))
        .then((hash) =>
          User.create({
            user_name: SEED_USER.name,
            user_email: SEED_USER.email,
            password: hash,
          })
        )
        .then((user) => {
          userId = user._id
          console.log(`new user created! user id: ${userId}`)
        })
        .catch((err) => console.log(err))
    })
    .then(() => {
      console.log('enter this section')
      return Promise.any(
        Array.from({ length: 10 }, (_, i) => {
          Category.findOne({ categoryId: i % 4 })
            .lean()
            .then((doc) => {
              console.log(`create seed ${i}...`)
              let plusNow = Date.now() - 150000000 * i
              return Record.create({
                userId,
                name: `name-${i}`,
                amount: 1000 + i * 3,
                date: plusNow,
                category: String(doc._id),
                merchant: `merchant${i}`,
              })
            })
            .catch((err) => console.log(err))
        })
      )
    })
    .then(() => {
      console.log(`seed creation completed.`)
      process.exit()
    })
    .catch((err) => console.log(err))
})
