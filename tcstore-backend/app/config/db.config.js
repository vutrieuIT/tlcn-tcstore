module.exports = {
  URL:
    process.env.MONGODB_URI ||
    "mongodb://root:passw0rd@vuductrieu.id.vn:27018/tcstore?authSource=admin&retryWrites=true&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000",
};
