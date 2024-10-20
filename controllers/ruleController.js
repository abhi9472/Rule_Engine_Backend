const { createRuleNode, combineRules, evaluateRule } = require('../utils/ast.js');
const Rule = require('../models/rule.js');

exports.createRule = (req, res) => {
    const { ruleString } = req.body;
    try {
        const astNode = createRuleNode(ruleString);
        res.status(200).json({ astNode });
    } catch (error) {
        console.error('Error creating rule:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.combineRules = (req, res) => {
    const  { rules }  = req.body;

    let x = [];
    for(let i = 0; i < rules.rules.length; i++){
        x.push(rules.rules[i]);
    }

    // console.log(typeof(rules));
    console.log(x);
    if (!Array.isArray(x) || x.length === 0) {
        return res.status(400).json({ message: 'Invalid input, please provide an array of rules.' });
    }

    try {
        const combinedAST = combineRules(x);
        console.log(combinedAST);
        res.status(200).json({ combinedAST });
    } catch (error) {
        console.error('Error combining rules:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.evaluateRule = (req, res) => {
    const { ruleString, data } = req.body;

    if (!ruleString || !data) {
        return res.status(400).json({ message: 'Invalid input, please provide a rule string and data.' });
    }

    try {
        const astNode = createRuleNode(ruleString);

        // Log the AST to ensure it's created correctly
        console.log('Generated AST: ', JSON.stringify(astNode, null, 2));

        const evaluationResult = evaluateRule(astNode, data);

        // Log the evaluation steps
        console.log('Evaluating rule against data:', data, 'Result:', evaluationResult);

        res.status(200).json({ evaluationResult });
    } catch (error) {
        console.error('Error evaluating rule:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

