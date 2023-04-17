const Customer = require('../models/Customer');

module.exports = {
  Query: {
    async customer(_, { ID }) {
      return await Customer.findById(ID).populate('products');
    },
    async getAllCustomers() {
      return await Customer.find().populate('products');
    },
  },
  Mutation: {
    async createCustomer(_, { customerInput: { name, email } }) {
      if (!name || !email) {
        throw new Error('Invalid input: Name and email are required');
      }

      const customer = new Customer({
        name,
        email,
        createAt: new Date(),
        products: [],
      });

      const result = await customer.save();
      return { ...result._doc, _id: result._id.toString() };
    },
    async deleteCustomer(_, { ID }) {
      const deleted = (await Customer.deleteOne({ _id: ID })).deletedCount;
      return deleted;
    },
    async addProductToCustomer(_, { customerID, productInput: { name, description, price, quantity } }) {
      const customer = await Customer.findById(customerID);

      if (!customer) {
        throw new Error('Customer not found');
      }

      const product = {
        name,
        description,
        createAt: new Date(),
        price,
        quantity,
      };

      customer.products.push(product);
      await customer.save();
      return customer;
    },
    async removeProductFromCustomer(_, { customerID, productID }) {
      const customer = await Customer.findById(customerID);
      if (!customer) {
        throw new Error('Customer not found');
      }
      const updatedProducts = customer.products.filter(product => product._id.toString() !== productID);
      if (updatedProducts.length === customer.products.length) {
        return false;
      }

      customer.products = updatedProducts;
      await customer.save();
      return true;
    },
    async editProductFromCustomer(_, { customerID, productID, productInput: { name, description, price, quantity } }) {
      const customer = await Customer.findById(customerID);
      if (!customer) {
        throw new Error('Customer not found');
      }

      const product = customer.products.find(product => product._id.toString() === productID);
      if (!product) {
        throw new Error('Product not found for this customer');
      }
      if (name) {
        product.name = name;
      }
      if (description) {
        product.description = description;
      }
      if (price) {
        product.price = price;
      }
      if (quantity) {
        product.quantity = quantity;
      }
      await customer.save();
      return true;
    },
  },
};
