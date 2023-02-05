import { Sequelize } from 'sequelize'

const db = new Sequelize('app', '', '', {
  storage: process.env.DB_PATH || './db.sqlite',
  dialect: 'sqlite',
  logging: false,
})

export default db
