import Product from "../models/product";
import Sale from "../models/sale";

export const getAllProduct = async () => {
  console.log("getAllProducts,service");
  const products = await Product.aggregate([
    { $lookup: { from: "sale", localField: "ProductID", foreignField: "ProductID", as: "sales" } },
    { $addFields: { total_sales: { $sum: "$sales.Quantity" } } },
    { $project: { _id: 0, __v: 0, sales: 0 } }
  ]);
  console.log(products);
  return products;
};

// Additional service methods related to products
