# Shopping Cart Application - Task Details

## Task Overview
Create a modern shopping cart application that demonstrates the use of ES6+ features, modules, classes, and modern JavaScript practices. The application should allow users to browse products, add them to a cart, manage quantities, apply discounts, and complete purchases.

## Learning Objectives
- [ ] Implement ES6+ syntax features (arrow functions, destructuring, spread/rest, template literals)
- [ ] Use JavaScript modules for code organization
- [ ] Create and extend classes with inheritance
- [ ] Implement private fields and methods
- [ ] Use modern JavaScript features (optional chaining, nullish coalescing)
- [ ] Handle asynchronous operations with async/await
- [ ] Implement proper error handling
- [ ] Use local storage for data persistence
- [ ] Create a responsive and user-friendly interface

## Required Sections

### 1. Product Management
- [ ] Product class with private fields
- [ ] Product categories and subcategories
- [ ] Product search and filtering
- [ ] Product sorting options
- [ ] Product details view

### 2. Shopping Cart
- [ ] Add/remove items
- [ ] Update quantities
- [ ] Calculate totals
- [ ] Apply discounts
- [ ] Save cart state
- [ ] Clear cart

### 3. User Interface
- [ ] Responsive design
- [ ] Dark/light theme
- [ ] Loading states
- [ ] Error messages
- [ ] Success notifications
- [ ] Animations and transitions

### 4. Data Persistence
- [ ] Save cart to local storage
- [ ] Load cart from local storage
- [ ] Handle offline mode
- [ ] Sync data when online

## Technical Requirements

### ES6+ Features
- [ ] Arrow functions
- [ ] Destructuring
- [ ] Spread/rest operators
- [ ] Template literals
- [ ] Optional chaining
- [ ] Nullish coalescing
- [ ] Private class fields
- [ ] Static methods

### Modules
- [ ] Product module
- [ ] Cart module
- [ ] UI module
- [ ] Storage module
- [ ] Utility module

### Classes
- [ ] Product class
- [ ] Cart class
- [ ] Category class
- [ ] Discount class

### Data Structure Example
```javascript
// Product class
class Product {
    #id;
    #price;
    
    constructor(name, price, category) {
        this.#id = crypto.randomUUID();
        this.name = name;
        this.#price = price;
        this.category = category;
    }
    
    get id() {
        return this.#id;
    }
    
    get price() {
        return this.#price;
    }
    
    static createFromJSON(json) {
        return new Product(json.name, json.price, json.category);
    }
}

// Cart class
class Cart {
    #items;
    
    constructor() {
        this.#items = new Map();
    }
    
    addItem(product, quantity = 1) {
        if (this.#items.has(product.id)) {
            this.#items.get(product.id).quantity += quantity;
        } else {
            this.#items.set(product.id, { product, quantity });
        }
    }
    
    removeItem(productId) {
        this.#items.delete(productId);
    }
    
    get total() {
        return Array.from(this.#items.values())
            .reduce((sum, { product, quantity }) => 
                sum + (product.price * quantity), 0);
    }
}
```

## Bonus Challenges
- [ ] Implement real-time price updates
- [ ] Add product reviews and ratings
- [ ] Create a wishlist feature
- [ ] Implement product recommendations
- [ ] Add multiple currency support
- [ ] Create a checkout process
- [ ] Add user authentication
- [ ] Implement order history

## Submission Guidelines
1. Create a new directory for your project
2. Implement all required features
3. Include proper documentation
4. Add comments explaining complex logic
5. Ensure code is properly formatted
6. Test all functionality
7. Submit your code and a README file

## Testing Checklist
- [ ] All ES6+ features work correctly
- [ ] Modules are properly imported/exported
- [ ] Classes and inheritance work as expected
- [ ] Cart operations function correctly
- [ ] Data persistence works
- [ ] UI is responsive
- [ ] Error handling is implemented
- [ ] Dark/light theme works
- [ ] All bonus features (if implemented) work

## Design Guidelines
- Use a clean, modern design
- Implement responsive layouts
- Use consistent spacing and typography
- Add appropriate animations
- Ensure good contrast ratios
- Make the interface intuitive
- Add helpful tooltips
- Include loading states

## Resources
- [MDN Web Docs - Modern JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- [ES6 Features](https://github.com/lukehoban/es6features)
- [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Classes in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

## Common Mistakes to Avoid
- Not using proper error handling
- Forgetting to validate input
- Not implementing proper data persistence
- Using var instead of let/const
- Not using arrow functions where appropriate
- Forgetting to handle edge cases
- Not implementing proper loading states
- Using synchronous code where async would be better

## Tips for Success
- Plan your code structure before starting
- Use proper naming conventions
- Implement features incrementally
- Test as you go
- Use proper error handling
- Comment your code
- Use proper indentation
- Follow best practices

## Evaluation Criteria
- Code organization and structure
- Use of modern JavaScript features
- Implementation of required features
- Error handling and edge cases
- Code readability and documentation
- UI/UX design and responsiveness
- Performance optimization
- Bonus feature implementation

## Final Checklist
- [ ] All required features implemented
- [ ] Code is properly organized
- [ ] Documentation is complete
- [ ] Error handling is implemented
- [ ] UI is responsive
- [ ] Data persistence works
- [ ] Code is properly formatted
- [ ] All tests pass
- [ ] Bonus features (if any) work
- [ ] README is complete 