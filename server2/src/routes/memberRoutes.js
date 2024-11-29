const express = require('express');
const { addNewMember } = require('../controllers/Members');
const router = express.Router();

// Route to Add a New Member
router.post('/add-member', addNewMember);