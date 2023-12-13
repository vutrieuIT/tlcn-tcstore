module.exports = {
  URL:
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/tcstore?authSource=admin&retryWrites=true&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000",
};
