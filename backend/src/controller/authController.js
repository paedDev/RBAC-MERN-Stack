import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
    });
    const savedUser = await newUser.save();

    const userResponse = {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };
    res.status(201).json({
      message: `Successfully created a new user with an email ${email}`,
      data: userResponse,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(404).json({
        message: "User does not exists",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({
      message: "Login Successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: "Error in creating a new user" });
    console.log("Error in login a new user", error);
  }
};

export const GetAllUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }
    const User = await User.find().select("-password");

    res.status(200).json({
      message: "Users retrieved successfully",
      data: User,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting all users",
      error: error.message,
    });
  }
};
export const UpdateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const id = req.params.id;
  try {
    if (!name && !email && !password) {
      return res.status(404).json({
        message: "At least one field must be provided for update",
      });
    }
    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. You can only update your own account.",
      });
    }
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (password) {
      if (password.length < 8) {
        return res.status(400).json({
          message: "Password must be at least 8 characters long",
        });
      }
      updateData.password = await bcrypt.hash(password, 10);
    }
    const UpdatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!UpdatedUser) {
      return res.status(500).json({
        message: "User not found",
      });
    }
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        error: error.message,
      });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const DeleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User deleted successfully",
      data: {
        id: deletedUser._id,
        email: deletedUser.email,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        error: error.message,
      });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
