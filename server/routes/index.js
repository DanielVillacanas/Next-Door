module.exports = (app) => {
  console.log("asd");
  app.use("/", require("./landing.routes"));
  app.use("/allProducts", require("./products/allProducts.routes"));
  app.use("/auth", require("./auth/auth.routes"));
  app.use("/seller", require("./seller/seller.routes"));
  // app.use("/api", require("./auth.routes"));
};
