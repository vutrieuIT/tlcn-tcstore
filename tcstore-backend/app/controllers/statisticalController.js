const StatisticalModel = require('../models/statistical');
const UserModel = require('../models/user');
const ProductModel = require('../models/product');
const CategoryModel = require('../models/category');
const OrderModel = require("../models/order")

const statisticalController = {
    getAllStatistical: async (req, res) => {
        try {
            // const statistical = await StatisticalModel.find();

            // Đếm số lượng user và sản phẩm trong cơ sở dữ liệu MongoDB
            const userCountPromise = UserModel.countDocuments();
            const productCountPromise = ProductModel.countDocuments();
            const categoryCountPromise = CategoryModel.countDocuments();
            const orderCountPromise = OrderModel.countDocuments();
            const result = {};
            // Sử dụng Promise.all để chờ cả hai Promise hoàn thành
            Promise.all([userCountPromise, productCountPromise, categoryCountPromise, orderCountPromise])
                .then((results) => {
                    const [userCount, productCount, categoryCount, orderCount] = results;
                    result.userTotal = userCount;
                    result.productTotal = productCount;
                    result.categoryTotal = categoryCount;
                    result.orderTotal = orderCount;

                    res.status(200).json({ data: result });
                })
                .catch((error) => {
                    console.error(error);
                });

        } catch (err) {
            res.status(500).json(err);
        }
    },
}

module.exports = statisticalController;