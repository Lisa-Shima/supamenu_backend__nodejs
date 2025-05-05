const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

exports.createOrder = async (req, res) => {
  const { clientId, items } = req.body; 
  // items = [{ menuItemId: 1, quantity: 2 }, ...]

  try {
    // 1) create the order
    const order = await Order.create({ clientId });

    // 2) create the order items
    const orderItems = items.map(i => ({
      orderId: order.id,
      menuItemId: i.menuItemId,
      quantity: i.quantity || 1
    }));
    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({ orderId: order.id, items: orderItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating order' });
  }
};

exports.getOrdersByClient = async (req, res) => {
  const { clientId } = req.params;
  try {
    const orders = await Order.findAll({
      where: { clientId },
      include: [{ model: OrderItem }]
    });
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // "new" | "delivered" | "rejected"
  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = status;
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating status' });
  }
};
