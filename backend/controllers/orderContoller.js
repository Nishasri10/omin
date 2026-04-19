// In-memory orders storage
let orders = [];
let orderCounter = 1000;

export const createOrder = (req, res) => {
  const { items, total, paymentMethod, shippingAddress } = req.body;
  const userId = req.user.id;
  
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Order must have at least one item' });
  }
  
  const order = {
    id: `ORD-${++orderCounter}`,
    userId,
    items,
    total,
    paymentMethod,
    shippingAddress: shippingAddress || {},
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  orders.unshift(order);
  res.status(201).json(order);
};

export const getOrders = (req, res) => {
  const userRole = req.user.role;
  
  if (userRole === 'admin') {
    res.json(orders);
  } else {
    const userOrders = orders.filter(o => o.userId === req.user.id);
    res.json(userOrders);
  }
};

export const getUserOrders = (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.user.id);
  res.json(userOrders);
};

export const getOrderById = (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  if (order.userId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  
  res.json(order);
};

export const updateOrderStatus = (req, res) => {
  const { status } = req.body;
  const order = orders.find(o => o.id === req.params.id);
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  
  order.status = status;
  order.updatedAt = new Date().toISOString();
  
  res.json(order);
};