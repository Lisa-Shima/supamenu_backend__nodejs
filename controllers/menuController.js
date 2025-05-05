const MenuItem = require('../models/MenuItem');

// Create a new menu item
exports.createMenuItem = async (req, res) => {
    const { clientId, name, price, description } = req.body;

    try {
        const menuItem = await MenuItem.create({ clientId, name, price, description });
        res.status(201).json(menuItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating menu item' });
    }
};

// Get all menu items for a client
exports.getMenuItems = async (req, res) => {
    const { clientId } = req.params;

    try {
        const menuItems = await MenuItem.findAll({ where: { clientId } });
        res.status(200).json(menuItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching menu items' });
    }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;

    try {
        const menuItem = await MenuItem.findByPk(id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        menuItem.name = name || menuItem.name;
        menuItem.price = price || menuItem.price;
        menuItem.description = description || menuItem.description;

        await menuItem.save();
        res.status(200).json(menuItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating menu item' });
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
    const { id } = req.params;

    try {
        const menuItem = await MenuItem.findByPk(id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        await menuItem.destroy();
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting menu item' });
    }
};
