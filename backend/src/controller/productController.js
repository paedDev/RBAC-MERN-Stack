import Product from "../model/Product.js";

// Create a new product(Admin Only)
export const createProduct = async (req, res) => {
  const { name, description, price, category, image, stock } = req.body;
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    // there is two way to create
    // const newProduct = await Product.create(req.body);
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
      stock,
      createdBy: req.user.id,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      erorr: error.message,
    });
  }
};

// Get All products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Product by id
export const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.status(200).json({
      data: product,
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Product(Admin only)
export const updateProduct = async (req, res) => {
  const { name, description, price, category, image, stock } = req.body;
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied",
    });
  }
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        image,
        stock,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Product(Admin Only)
export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
