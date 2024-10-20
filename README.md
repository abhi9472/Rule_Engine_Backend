# Rule Engine with Abstract Syntax Tree (AST)

## Project Overview

The **Rule Engine** application is designed to dynamically create, combine, and evaluate conditional rules to determine user eligibility based on attributes such as age, department, income, and experience. It utilizes an Abstract Syntax Tree (AST) to represent these rules, ensuring a clear structure for processing and evaluation.

## Objectives

- Develop a backend service responsible for handling rule creation, combination, and evaluation.
- Implement RESTful APIs to facilitate interaction with the frontend.

## Data Structure

### AST Node Structure

The primary data structure representing the AST consists of nodes defined as follows:

```javascript
class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type; // "operator" or "operand"
        this.left = left; // Reference to another Node (left child)
        this.right = right; // Reference to another Node (right child for operators)
        this.value = value; // Optional value for operand nodes (e.g., number for comparisons)
    }
}
