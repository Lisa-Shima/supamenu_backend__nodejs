const express = require('express');
const router = express.Router();
const { createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');

// CRUD routes for menu items
router.post('/', createMenuItem);
router.get('/:clientId', getMenuItems);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

module.exports = router;
