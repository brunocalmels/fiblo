const { STRING, ARRAY, TEXT, INTEGER, DOUBLE, DATE, JSONB } = require('sequelize');
const sequelize = require('./db');
var usuarioModel = require('./usuarioModel.js');
var categoriaModel = require('./categoriaModel.js');

var proyectoSchema = sequelize.define('proyecto', {
  usuario_id: {
    type: INTEGER,
    references: {
      model: usuarioModel,
      key: 'id',
    },
    allowNull: false,
  },
  categoria_id: {
    type: INTEGER,
    references: {
      model: categoriaModel,
      key: 'id',
    },
    allowNull: false,
  },
  // Address of the Fiblo Contract on the Blockchain
  address: {
    type: STRING,
    allowNull: false,
    default: '-',
    unique: true,
  },
  nombre: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  descripcion: {
    type: TEXT,
  },
  propuesta: {
    type: TEXT,
  },
  ciudad: {
    type: JSONB,
  },
  domicilio: {
    type: STRING,
    allowNull: false,
  },
  // telefono: {
  //   type: INTEGER,
  //   allowNull: false,
  // },
  email: {
    type: STRING,
    allowNull: false,
  },
  monto: {
    type: DOUBLE,
    allowNull: false,
  },
  montoSuperaMax: {
    type: DOUBLE,
    allowNull: false,
  },
  cantAcciones: {
    type: INTEGER,
    allowNull: false,
  },
  fechaFin: {
    type: DATE,
    allowNull: false,
  },
  logo: {
    type: STRING,
  },
  emprendedores: JSONB,
});

module.exports = proyectoSchema;
