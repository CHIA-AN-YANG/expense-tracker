const db = require('../../config/mongoose.js')
const User = require('../user')
const Category = require('../category')
const Record = require('../record')
const bcrypt = require('bcryptjs')
const { exit } = require('process')

const SEED_USER = [
  {
    name: 'root',
    email: 'root@example.com',
    password: '12345678',
  },
  {
    name: 'User1',
    email: 'user1@example.com',
    password: '12345678',
  },
  {
    name: 'User2',
    email: 'user2@example.com',
    password: '12345678',
  },
]

db.once('open', async () => {
  for await (seedUser of SEED_USER) {
    const { name, email, password } = seedUser
    User.findOne({ user_email: email })
      .then((user) => {
        if (user) {
          console.log(`User ${name}, ${email} already exists.`)
          return
        }
        return bcrypt //Save new user to DB
          .genSalt(10)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hash) =>
            User.create({
              user_name: name,
              user_email: email,
              password: hash,
            })
              .then((user2) => {
                console.log(
                  `creating user and records for: ${user2.user_name}...`
                )
                return Promise.any(
                  Array.from({ length: 10 }, (_, i) => {
                    Category.findOne({ categoryId: i % 4 }).then((doc) => {
                      let plusNow = Date.now() - 150000000 * i
                      console.log(`creating user ${name}, record ${i}`)
                      return Record.create({
                        userId: user2._id,
                        name: `name-${i}`,
                        amount: 1000 + i * 3,
                        date: plusNow,
                        category: String(doc._id),
                        merchant: `merchant${i}`,
                      })
                    })
                  })
                )
              })
              .catch((error) => console.error(error))
          )
      })
      .then(() => {
        const lastone = SEED_USER.length - 1
        if (SEED_USER[lastone].name == name) {
          console.log('end of user creation, creating records.')
        }
      })
  }
})
