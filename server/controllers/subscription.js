


// Function to add a subscription
exports.addSubscription1 = async (req, res) => {

  try {
    const { user_id, plan_id, subscription_from, subscription_to } = req.body;

    if (!user_id || !plan_id || !subscription_from || !subscription_to) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Insert query
    const query = `
      INSERT INTO subscriptions (user_id, plan_id, subscription_from, subscription_to)
      VALUES (?, ?, ?, ?)
    `;

    const values = [
      user_id, 
      plan_id, 
      subscription_from, 
      subscription_to                 
    ];

    // Execute the query
    client.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        return res
                .status(500)
                .json({ 
                        success : false,
                        message: err?.message 
                      });
      }
      return res
              .status(201)
              .json({ 
                      message: "Subscription created successfully", 
                      userId: result.insertId,
                      success : true
                    });
    });
  } catch (error) {
    console.error(error);
    return res
            .status(500)
            .json({ 
                    message: error?.message,
                    success:false
                  });
  }
};



// Function to get a user
exports.getSubscription = async (req, res) => {

  try {
    const { id } = req.body;
    var condition = "";

    if (id ) {
      condition = 'where id = ?'
    }


    // Insert query
    const query = `
      SELECT * FROM subscriptions ${condition} ORDER BY id
    `;

    const values = [
      id||null                     
    ];

    // Execute the query
    client.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        return res
                .status(500)
                .json({ 
                        success : false,
                        message: err?.message 
                      });
      }
      return res
              .status(201)
              .json({ 
                      message: "subscriptions fetched successfully", 
                      data: result,
                      success : true
                    });
    });
  } catch (error) {
    console.error(error);
    return res
            .status(500)
            .json({ 
                    message: error?.message,
                    success:false
                  });
  }
};



// Function to remove a user
exports.deleteSubscription = async (req, res) => {

  try {
    const { id } = req.body;

    if (!id ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const query = `
      DELETE FROM subscriptions WHERE id = ?
    `;

    const values = [
      id                   
    ];

    // Execute the query
    client.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        return res
                .status(500)
                .json({ 
                        success : false,
                        message: err?.message 
                      });
      }
      return res
              .status(201)
              .json({ 
                      message: "subscriptions removed successfully", 
                      data: result,
                      success : true
                    });
    });
  } catch (error) {
    console.error(error);
    return res
            .status(500)
            .json({ 
                    message: error?.message,
                    success:false
                  });
  }
};



// Function to update a user
exports.updateSubscription = async (req, res) => {
  try {
    const { id, user_id, plan_id, subscription_from, subscription_to  } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Prepare the fields to update
    const updates = [];
    const values = [];

    if (user_id) {
      updates.push("user_id = ?");
      values.push(user_id);
    }
    if (plan_id) {
      updates.push("plan_id = ?");
      values.push(plan_id);
    }
    if (subscription_from) {
      updates.push("subscription_from = ?");
      values.push(subscription_from);
    }
    if (subscription_to) {
      updates.push("subscription_to = ?");
      values.push(subscription_to);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // Construct the query
    const query = `
      UPDATE subscriptions 
      SET ${updates.join(", ")} 
      WHERE id = ?
    `;
    
    values.push(id); // Add user_id to the values array

     // Execute the query
     client.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        return res
                .status(500)
                .json({ 
                        success : false,
                        message: err?.message 
                      });
      }
      return res
              .status(201)
              .json({ 
                      message: "subscriptions updated successfully", 
                      data: result,
                      success : true
                    });
    });
  } catch (error) {
    console.error(error);
    return res
            .status(500)
            .json({ 
                    message: error?.message,
                    success:false
                  });
  }
};



const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const client = require("../connection");
const { pagination } = require("../utils");

// Function to add a user
exports.addSubscription = async (req, res) => {
  // console.log('Request in controller:', req);

  try {
    const {
      user_id, plan_id
    } = req.body;

    if (!user_id || !plan_id ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const startDate =  await getStartDate(user_id);
    console.log('startDate', startDate);
    return;

    // fetchDurationAndAmount(plan_id);

    const query = `
      INSERT INTO subscriptions (first_name, last_name, email, phone_number, address, status, password, profile_image_base64, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      first_name,
      last_name || null,
      email,
      phone_number,
      address || null,
      status || "active",
      hashedPassword,
      profile_image_base64 || null,
      role || "member"
    ];

    client.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: err?.message,
        });
      }
      return res.status(201).json({
        message: "User created successfully",
        userId: result.insertId,
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

async function getStartDate(user_id) {
  try {
    const query = `SELECT * FROM subscriptions WHERE user_id = ? ORDER BY id DESC LIMIT 1`;

    const response = await new Promise((resolve, reject) => {
      client.query(query, [user_id], (err, result) => {
        if (err) {
          reject({
            success: false,
            message: err?.message,
          });
        } else if (result[0]) {
          resolve({
            success: true,
            date: result[0].subscription_to,
          });
        } else {
          resolve({
            success: true,
            date: new Date(),
          });
        }
      });
    });

    return response;

  } catch (error) {
    console.error(error);
    return {
      message: error?.message,
      success: false,
    };
  }
}





// Function to get a user
exports.getUser = async (req, res) => {
  console.log('Request in controller:', req);

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
      profile_image_base64, role
    } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updates = [];
    const values = [];

    if (first_name) updates.push("first_name = ?"), values.push(first_name);
    if (last_name) updates.push("last_name = ?"), values.push(last_name);
    if (email) updates.push("email = ?"), values.push(email);
    if (phone_number) updates.push("phone_number = ?"), values.push(phone_number);
    if (address) updates.push("address = ?"), values.push(address);
    if (status) updates.push("status = ?"), values.push(status);
    if (profile_image_base64) updates.push("profile_image_base64 = ?"), values.push(profile_image_base64);
    if (role) updates.push("role = ?"), values.push(role);

    if (updates.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

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
