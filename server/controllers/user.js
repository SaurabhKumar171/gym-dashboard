const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const client = require("../connection");
const { pagination } = require("../utils");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/");
    cb(null, uploadDir); // Directory to save images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Unique file name
  },
});

// Initialize Multer
const upload = multer({ storage });

// Middleware for image upload
exports.uploadImage = upload.single("profile_image_url");

// Function to add a user
exports.addUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      address,
      status,
      password,
      role,
      plan_id, // New plan_id field
      subscription_from, // Subscription start date
      subscription_to, // Subscription end date
      amount, // Subscription amount
    } = req.body;

    // Validate required fields
    if (!first_name || !email || !phone_number || !role || !plan_id || !subscription_from || !subscription_to || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // For admin role, ensure password is provided
    if (role === "admin" && !password) {
      return res.status(400).json({ message: "Password is required for admin role" });
    }

    // Hash the password if provided
    let hashedPassword = "";
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Handle image upload
    let profileImageUrl = null;
    if (req.file) {
      profileImageUrl = `/uploads/${req.file.filename}`; // Relative path to the uploaded image
    }

    // Prepare SQL query and values for inserting into `users` table
    const userQuery = `
      INSERT INTO users 
      (first_name, last_name, email, phone_number, address, status, password, profile_image_url, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const userValues = [
      first_name,
      last_name || null,
      email,
      phone_number,
      address || null,
      status || "active",
      hashedPassword,
      profileImageUrl || null, // Store image URL
      role || "member",
    ];

    // Execute the query to insert the user
    client.query(userQuery, userValues, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({
          success: false,
          message: err?.message || "Failed to create user",
        });
      }

      // Get the new user's ID (insertId)
      const userId = result.insertId;

      // Insert subscription data into `subscription` table
      const subscriptionQuery = `
        INSERT INTO subscriptions 
        (user_id, plan_id, subscription_from, subscription_to, amount, is_expired, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;
      const subscriptionValues = [
        userId,
        plan_id,
        subscription_from,
        subscription_to,
        amount,
        0, // Assuming the subscription is active, is_expired is 0
        "active", // Assuming the subscription is active
      ];

      // Insert the subscription
      client.query(subscriptionQuery, subscriptionValues, (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({
            success: false,
            message: err?.message || "Failed to add subscription",
          });
        }

        // Insert subscription log into `subscription_logs` table
        const subscriptionLogQuery = `
          INSERT INTO subscription_logs 
          (subscription_id, user_id, plan_id, subscription_from, subscription_to, amount, is_expired, status, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        const subscriptionLogValues = [
          result.insertId, // Subscription ID from the previous insert
          userId,
          plan_id,
          subscription_from,
          subscription_to,
          amount,
          0, // Assuming the subscription is active, is_expired is 0
          "active", // Assuming the subscription is active
        ];

        // Insert the subscription log
        client.query(subscriptionLogQuery, subscriptionLogValues, (err) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({
              success: false,
              message: err?.message || "Failed to add subscription log",
            });
          }

          // Respond with success
          return res.status(201).json({
            success: true,
            message: "User and subscription created successfully",
            userId: userId,
            profileImageUrl, // Send back the image URL
          });
        });
      });
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  }
};

// Function to get a user
exports.getUser = async (req, res) => {
  // console.log('Request in controller:', req);

  try {
    const { user_id, include_deleted, page, limit } = req.body;
    let condition = "";

    if (user_id && include_deleted) {
      condition = 'WHERE user_id = ?';
    } else if (user_id) {
      condition = 'WHERE user_id = ? AND is_deleted = 0';
    } else if (!include_deleted) {
      condition = 'WHERE is_deleted = 0';
    }

    let query = `SELECT * FROM users ${condition} ORDER BY user_id`;
    const values = [user_id || null];

    if (limit) {
      query = pagination(query, limit, page);
    }

    client.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: err?.message,
        });
      }
      return res.status(201).json({
        message: "User fetched successfully",
        data: result,
        success: true,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error?.message,
      success: false,
    });
  }
};

// Function to update a user
exports.updateUser = async (req, res) => {
  try {
    const {
      user_id, first_name, last_name, email, phone_number, address, status,
      profile_image_url, role
    } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updates = [];
    const values = [];

    // Handle profile image URL upload
    let newProfileImageUrl = profile_image_url; // Default value if no new image is uploaded
    if (req.file) {
      // If a new image is uploaded, update the profile_image_url
      newProfileImageUrl = `/uploads/${req.file.filename}`; // Save the new image URL
      updates.push("profile_image_url = ?");
      values.push(newProfileImageUrl);
    }

    // Handle other fields for update
    if (first_name) updates.push("first_name = ?"), values.push(first_name);
    if (last_name) updates.push("last_name = ?"), values.push(last_name);
    if (email) updates.push("email = ?"), values.push(email);
    if (phone_number) updates.push("phone_number = ?"), values.push(phone_number);
    if (address) updates.push("address = ?"), values.push(address);
    if (status) updates.push("status = ?"), values.push(status);
    if (role) updates.push("role = ?"), values.push(role);

    if (updates.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // SQL query to update user
    const query = `
      UPDATE users 
      SET ${updates.join(", ")} 
      WHERE user_id = ?
    `;
    values.push(user_id);

    client.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: err?.message,
        });
      }
      return res.status(201).json({
        message: "User updated successfully",
        data: result,
        success: true,
        profileImageUrl: newProfileImageUrl, // Return the updated image URL
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error?.message,
      success: false,
    });
  }
};

// Function to soft delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const query = `UPDATE users SET is_deleted = 1 WHERE user_id = ?`;
    const values = [user_id];

    client.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: err?.message,
        });
      }
      return res.status(201).json({
        message: "User removed successfully",
        data: result,
        success: true,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error?.message,
      success: false,
    });
  }
};

// Function to permanently delete a user
exports.deleteUserForcefully = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const query = `DELETE FROM users WHERE user_id = ?`;
    const values = [user_id];

    client.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: err?.message,
        });
      }
      return res.status(201).json({
        message: "User removed successfully",
        data: result,
        success: true,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error?.message,
      success: false,
    });
  }
};
