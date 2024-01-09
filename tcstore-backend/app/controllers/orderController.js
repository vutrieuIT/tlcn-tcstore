const OrderModel = require("../models/order");
const UserModel = require("../models/user");
const ProductModel = require("../models/product");
const _const = require("../config/constant");
const jwt = require("jsonwebtoken");

async function checkProductQuantities(products) {
  const invalidProducts = [];
  for (const product of products) {
    const { product: productId, quantity } = product;
    const availableQuantity = await ProductModel.findById(productId).select(
      "quantity"
    );
    if (availableQuantity && quantity > availableQuantity.quantity) {
      invalidProducts.push(productId);
    }
  }
  return invalidProducts;
}

async function deductProductQuantities(products) {
  for (const product of products) {
    const { product: productId, quantity } = product;
    await ProductModel.findByIdAndUpdate(productId, {
      $inc: { quantity: -quantity },
    });
  }
}

const orderController = {
  getAllOrder: async (req, res) => {
    try {
      const page = req.body.page || 1;
      const limit = req.body.limit || 10;

      const options = {
        page: page,
        limit: limit,
        populate: "user",
      };

      const orderList = await OrderModel.paginate({}, options);
      res.status(200).json({ data: orderList });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getOrderById: (req, res) => {
    try {
      res.status(200).json(res.order);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createOrder: async (req, res) => {
    try {
      const products = req.body.products;
      const invalidProducts = await checkProductQuantities(products);
      if (invalidProducts.length > 0) {
        return res.status(400).json({
          error: "Product quantities exceed available quantity",
          invalidProducts,
        });
      }

      // Proceed with creating the order
      const order = new OrderModel({
        user: req.body.userId,
        products: req.body.products,
        description: req.body.description,
        orderTotal: req.body.orderTotal,
        billing: req.body.billing,
        address: req.body.address,
        status: req.body.status,
      });

      const user = await UserModel.findById(req.body.userId);

      // Deduct ordered quantities from available quantities
      await deductProductQuantities(products);

      // Gửi thông báo Kafka
      // await sendKafkaMessage(email, message);

      const orderList = await order.save();
      res.status(200).json(orderList);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const orderList = await OrderModel.findByIdAndDelete(req.params.id);
      if (!orderList) {
        return res.status(200).json("Order does not exist");
      }
      res.status(200).json("Delete order success");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateOrder: async (req, res) => {
    const id = req.params.id;
    const {
      user,
      products,
      address,
      orderTotal,
      billing,
      description,
      status,
    } = req.body;

    try {
      const orderList = await OrderModel.findByIdAndUpdate(
        id,
        { status, description, address },
        { new: true }
      );
      if (!orderList) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(orderList);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  searchOrderByName: async (req, res) => {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;

    const options = {
      page: page,
      limit: limit,
    };

    const name = req.query.name;

    try {
      const orderList = await OrderModel.paginate(
        { billing: { $regex: `.*${name}.*`, $options: "i" } },
        options
      );

      res.status(200).json({ data: orderList });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getOrderByUser: async (req, res) => {
    try {
      const decodedToken = jwt.verify(
        req.headers.authorization,
        _const.JWT_ACCESS_KEY
      );
      const orders = await OrderModel.find({ user: decodedToken.user._id });
      res.status(200).json({ data: orders });
    } catch (err) {
      res.status(401).send("Unauthorized");
    }
  },
};

module.exports = orderController;
