class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type;  // "operator" or "operand"
        this.left = left;  // Left child (Node)
        this.right = right; // Right child (Node)
        this.value = value; // Value for operand nodes or operator type
    }
}

function createRuleNode(ruleString) {
    const rule = ruleString.trim();

    // Handle parentheses first
    const openParenIndex = rule.indexOf('(');
    if (openParenIndex === 0) {
        const closeParenIndex = findClosingParen(rule);
        const subExpression = rule.slice(1, closeParenIndex);
        const nextPart = rule.slice(closeParenIndex + 1).trim();

        const subNode = createRuleNode(subExpression);

        // Handle AND/OR following the parentheses
        if (nextPart.startsWith('AND')) {
            return new Node('operator', subNode, createRuleNode(nextPart.slice(3).trim()), 'AND');
        } else if (nextPart.startsWith('OR')) {
            return new Node('operator', subNode, createRuleNode(nextPart.slice(2).trim()), 'OR');
        } else {
            return subNode; // Just return the subNode if nothing follows
        }
    }

    // Split on the outermost AND/OR operator
    const operator = findOuterOperator(rule);
    if (operator) {
        const parts = rule.split(operator);
        return new Node('operator', createRuleNode(parts[0].trim()), createRuleNode(parts[1].trim()), operator);
    }

    // If no operators, treat it as a simple condition
    return new Node('operand', null, null, rule);
}

// Helper function to find the closing parenthesis
function findClosingParen(str) {
    let stack = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') stack++;
        if (str[i] === ')') stack--;
        if (stack === 0) return i; // Return index of the closing parenthesis
    }
    throw new Error('Mismatched parentheses');
}

// Helper function to find the outermost operator (AND/OR)
function findOuterOperator(rule) {
    let balance = 0;
    let lastOperator = null;

    for (let i = 0; i < rule.length; i++) {
        if (rule[i] === '(') {
            balance++;
        } else if (rule[i] === ')') {
            balance--;
        } else if (balance === 0) {
            if (rule.slice(i, i + 3) === 'AND') {
                lastOperator = 'AND';
                break;
            } else if (rule.slice(i, i + 2) === 'OR') {
                lastOperator = 'OR';
                break;
            }
        }
    }
    return lastOperator;
}

function combineRules(ruleStrings) {
    let combinedAST = null;
    // console.log(ruleStrings);
    // console.log(typeof(ruleStrings));
    for (let i = 0; i < ruleStrings.length; i++) {
        const ruleString = ruleStrings[i];
        const ruleAST = createRuleNode(ruleString);
        
        if (!combinedAST) {
            combinedAST = ruleAST; // Initialize with the first rule
        } else {
            combinedAST = new Node("operator", combinedAST, ruleAST, "OR");
        }
    }
    

    return combinedAST;
}

// Function to evaluate the AST against the provided data
function evaluateRule(node, data) {
    if (!node) return false; // If the node is null, return false

    switch (node.type) {
        case 'operator':
            const leftResult = evaluateRule(node.left, data);
            const rightResult = evaluateRule(node.right, data);
            console.log(`Evaluating ${node.value}: ${leftResult} ${node.value} ${rightResult}`); // Debugging
            return node.value === 'AND' ? leftResult && rightResult : leftResult || rightResult;

        case 'operand':
            return evaluateCondition(node.value, data);

        default:
            throw new Error('Invalid node type');
    }
}

// Helper function to evaluate conditions in operand nodes
function evaluateCondition(condition, data) {
    const regex = /(\w+)\s*([<>=]+)\s*(.+)/; // Regex to parse conditions
    const match = condition.match(regex);
    if (!match) throw new Error('Invalid condition format');

    const [_, attribute, operator, value] = match; // Destructure regex match
    const parsedValue = isNaN(value) ? value.replace(/'/g, '') : Number(value); // Parse value

    // Debugging output
    console.log(`Evaluating condition: ${attribute} ${operator} ${parsedValue}`);

    switch (operator) {
        case '>':
            return data[attribute] > parsedValue;
        case '<':
            return data[attribute] < parsedValue;
        case '=':
            return data[attribute] === parsedValue;
        case '>=':
            return data[attribute] >= parsedValue;
        case '<=':
            return data[attribute] <= parsedValue;
        default:
            throw new Error('Invalid operator');
    }
}

module.exports = { createRuleNode, combineRules, evaluateRule };
