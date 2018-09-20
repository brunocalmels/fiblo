const { STRING } = require('sequelize')
const sequelize = require('./db')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const Usuario = sequelize.define('usuario', {
  email: {
    type: STRING,
    unique: true,
    required: true
  },
  nombre: { type: STRING, required: true },
  role: STRING,
  activation: STRING,
  hash: STRING
})

Usuario.prototype.setPassword = function (password) {
  this.hash = crypto.pbkdf2Sync(password, process.env.BCF, 1000, 64, 'sha1').toString('hex')
}

Usuario.prototype.validPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, process.env.BCF, 1000, 64, 'sha1').toString('hex')
  return this.hash === hash
}

Usuario.prototype.generateJwt = function () {
  let expiry = new Date()
  expiry.setDate(expiry.getDate() + 7)
  // El rol se "encripta" como un base64 juntando el id de usuario y el email, después se "desencriptará" en el frontend para matchear con el valor del rol.
  return jwt.sign(
    Object.assign(
      {},
      {
        id: this.id,
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000)
      },
      this.role && {
        role: Buffer.from(`${this.id}${this.role}${this.email}`).toString('base64')
      }
    ),
    process.env.BCF
  )
}
Usuario.prototype.generateMailToken = function () {
  let expiry = new Date()
  expiry.setDate(expiry.getDate() + 1)
  return jwt.sign(
    {
      uid: this.id,
      exp: parseInt(expiry.getTime())
    },
    process.env.BCF
  )
}

Usuario.prototype.generateActivationToken = function () {
  let expiry = new Date()
  expiry.setDate(expiry.getDate() + 1)
  let token = jwt.sign(
    {
      acuid: this.id,
      exp: parseInt(expiry.getTime())
    },
    process.env.BCF
  )
  this.activation = token
  return token
}

sequelize.sync()

module.exports = Usuario