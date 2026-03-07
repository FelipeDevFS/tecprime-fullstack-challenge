const orderService = require('../services/orderService')

async function createOrder(req, res) {
  try {

    const orderData = req.body;

    const orderId = await orderService.createOrder(orderData)
    
    return res.status(201).json({
        message: "Order created successfully",
        orderId: orderId
    })
  } catch (error) {
    
    console.error("Error creating order:", error.message)

    return res.status(500).json({
      message: "Failed to create order"
    })
  }

}

async function getOrderById(req, res) {
  try {

    const { id } = req.params;

    const order = await orderService.getOrderById(id)
    return res.status(200).json(order)
  } catch (error) {

    console.error('Failed to fetch order:', error.message)
    
    return res.status(500).json({ 
        message: 'Failed to fetch order' 
    })
  }
}

module.exports = {
  createOrder,
  getOrderById  
}