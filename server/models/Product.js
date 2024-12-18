const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  images: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  category: {
    type: DataTypes.ENUM('bracelets', 'necklaces', 'rings', 'earrings'),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  materials: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['category']
    }
  ]
});

module.exports = Product; 