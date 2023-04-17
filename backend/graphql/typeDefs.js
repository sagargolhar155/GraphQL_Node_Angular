
const { gql } = require('apollo-server');
const typeDefs = gql`
  type Product {
    name: String
    description: String
    createAt: String
    price: Float
    quantity: Int
  }

  input ProductInput {
    name: String
    description: String
    price: Float
    quantity: Int
  }

  type Customer {
    name: String
    email: String
    createAt: String
    products: [Product]!
  }

  input CustomerInput {
    name: String
    email: String
  }

  type Query {
    customer(ID: ID!): Customer!
    getAllCustomers: [Customer]!
  }

  type Mutation {
    createCustomer(customerInput: CustomerInput): Customer!
    deleteCustomer(ID: ID!): Boolean
    addProductToCustomer(customerID: ID!, productInput: ProductInput): Customer!
    removeProductFromCustomer(customerID: ID!, productID: ID!): Boolean
    editProductFromCustomer(customerID: ID!, productID: ID!, productInput: ProductInput): Boolean
  }
`;

module.exports = typeDefs;
