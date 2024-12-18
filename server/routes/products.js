const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 获取所有产品
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个产品
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 创建新产品
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ 
      message: error.message,
      errors: error.errors?.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }
});

// 更新产品
router.patch('/:id', async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true
    });
    if (updated) {
      const product = await Product.findByPk(req.params.id);
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ 
      message: error.message,
      errors: error.errors?.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }
});

// 删除产品
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 