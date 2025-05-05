const Client = require('../models/Client');

// Create a new client
exports.createClient = async (req, res) => {
    const { name, category, contact } = req.body;
    
    try {
        const client = await Client.create({ name, category, contact, userId: req.user.userId });
        res.status(201).json(client);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating client' });
    }
};

// Get all clients
exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.findAll({ where: { userId: req.user.userId } });
        res.status(200).json(clients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching clients' });
    }
};

// Get client by ID
exports.getClientById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json(client);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching client' });
    }
};

// Update client details
exports.updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, category, contact } = req.body;
    
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        client.name = name || client.name;
        client.category = category || client.category;
        client.contact = contact || client.contact;
        
        await client.save();
        res.status(200).json(client);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating client' });
    }
};

// Delete a client
exports.deleteClient = async (req, res) => {
    const { id } = req.params;
    
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        
        await client.destroy();
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting client' });
    }
};
