const { Router } = require("express");
const User = require("../model/user");
const login=require("../model/login");
const Product= require("../model/product");
const admin = require("../model/admin");

const router = Router();

// Register route
router.post("/register", async (req, res) => {
  try {
    let { email, password, name } = req.body;

    const record = await User.findOne({ email });
    if (record) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Create new user with plain text password (not secure for real apps)
    const user = new User({ name, email, password });
    const result = await user.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: { name: result.name, email: result.email },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Login successful",
      login: { name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Update user details route
router.put("/update", async (req, res) => {
  try {
    const { email, name, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (newPassword) user.password = newPassword;

    await user.save();

    return res.status(200).json({ message: "User details updated successfully", user: { name: user.name, email: user.email } });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Forgot password route
router.post("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


// Product 
router.post("/product", async (req, res) => {
  console.log(req, "req at api");
  
  try {
    let { productName, productImg, productPrice,productDiscription } = req.body;

    // Create new user with plain text password (not secure for real apps)
    const product = new Product({ productName, productImg, productPrice,productDiscription });
    console.log(product, "product saved in db");
    
    const result = await product.save();
    console.log(result, "result of save query");

    return res.status(201).json({
      message: "Product Saved successfully",
      product:{productName:result.productName , productImg: result.productImg , productPrice: result.productPrice , productDiscription: result.productDiscription}
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


router.get("/products", async (req, res) => {
  try {
    const products = await Product.find(); // Assuming Product is your Mongoose model
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


// Admin Routes

router.post("/admin", async (req, res) => {
  try {
    let { id,mobNo,deptName,email, password, name } = req.body;

    const record = await admin.findOne({ email });
    if (record) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Create new user with plain text password (not secure for real apps)
    const admin1 = new admin({ id,name,mobNo, email,deptName, password });
    console.log(admin, "product saved in db");
    const result = await admin1.save();

    return res.status(201).json({
      message: "Admin registered successfully",
      admin: { name: result.name, email: result.email, mobNo: result.mobNo,deptName: result.deptName,id: result.id },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

router.get("/admins", async (req, res) => {
  try {
    const admin1 = await admin.find(); // Assuming Product is your Mongoose model
    return res.status(200).json(admin1);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

router.post("/login-admin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const admin1 = await admin.findOne({ email });
    if (!admin1 || admin1.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Admin Login successful",
      login: { name: admin1.name, email: admin1.email },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



module.exports = router;
