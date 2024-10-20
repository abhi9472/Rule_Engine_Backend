const express = require('express');
const router = express.Router();
const { createRule, combineRules, evaluateRule } = require('../controllers/ruleController.js');

// Route to create a single rule and store it in the database
router.post('/create', createRule);

// Route to combine multiple rules
router.post('/combine', combineRules);

// Route to evaluate a rule against provided user data
router.post('/evaluate', evaluateRule);

module.exports = router;
