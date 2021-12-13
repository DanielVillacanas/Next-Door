module.exports = (app) => {
  app.use("/api", require("./landing.routes"));
  app.use("/api/allProducts", require("./products/allProducts.routes"));
  app.use("/api/auth", require("./auth/auth.routes"));
  app.use("/api/reviews", require("./reviews/reviews.routes"));
  app.use("/api/seller", require("./seller/seller.routes"));
  app.use("/api/user", require("./user/user.routes"));
  app.use("/api/payment", require("./payment/payment.routes"));
  app.use("/api/api/upload", require("./upload/uploads.routes"));
};
