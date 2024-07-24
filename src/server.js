const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const insertClients = require('./database/operations/insertClients');
const loginClients = require('./database/operations/loginClients');
const insertProducts = require('./database/operations/insertProducts');
const getProducts = require('./database/operations/getProducts');
const getProduct = require('./database/operations/getProduct');

// TESTING DEMA ROUTE
router.get("/testing", async (req, res) => {
    console.log("Dema test routing in running!");

    return res.json({ 
        status: 200, 
        message: "Dema test routing in running!" 
    });
});

// CLIENTS
router.post('/client', async (req, res) => {
  async function insertNewClients() {
    console.log("Cadastrando novo cliente: ", req.body);
    try {
      const resultOpNewClients = await insertClients(req.body);

      if (resultOpNewClients && resultOpNewClients.insertedId) {
        res.send({
          status: 200
        });
      } else {
        res.send({
          status: 500
        });
      }

    } catch (error) {
      console.log("Error at insertNewClients: ", error);
    }
  }

  insertNewClients();
});

// LOGIN
router.post('/login', (req, res) => {
  async function makeLogin() {
    try {
      const resultOpLoginClients = await loginClients(req.body);

      if (resultOpLoginClients && resultOpLoginClients._id) {
        const secretKey = 'suaChaveSecretaSuperSecreta';
        const userData = {
          userId: resultOpLoginClients._id,
          email: req.body.email,
        };

        const token = jwt.sign(userData, secretKey);

        res.send({
          status: 200,
          token: token,
          client: resultOpLoginClients
        });
      } else {
        res.send({
          status: 500
        });
      }

    } catch (error) {
      console.log("Error at makeLogin: ", error);
    }
  }

  makeLogin();
});

// CREATE PRODUCT
router.post('/addproduct', async (req, res) => {
  async function insertProduct() {

    console.log("Inserindo produto: ", req.body);

    try {
      const resultOpNewProduct = await insertProducts(req.body);

      if (resultOpNewProduct && resultOpNewProduct.insertedId) {
        res.send({
          status: 200
        });
      } else {
        res.send({
          status: 500
        });
      }

    } catch (error) {
      console.log("Error at insertProduct: ", error);
    }
  }

  insertProduct();
});

// GET ALL PRODUCTS FILE
router.get('/productsFile', async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, '..', 'products.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo:', err);
        res.status(500).json({ message: 'Erro ao ler o arquivo' });
      } else {
        return res.json({ 
          status: 200, 
          products: JSON.parse(data),
          message: "Get all products file ok" 
        });
      }
    });
  } catch (error) {
    return res.json({ 
      status: 500, 
      message: "Error on get all products file",
      error: error 
    });
  }
});

// GET ALL PRODUCTS
router.get('/products', async (req, res) => {
  async function getAllProducts() {

    try {
      const resultOpGetProducts = await getProducts();

      if (resultOpGetProducts && resultOpGetProducts.length > 0) {
        return res.json({ 
          status: 200, 
          products: resultOpGetProducts,
          message: "Get all products ok" 
        });
      } else {
        return res.json({ 
          status: 500, 
          message: "Error on get all products" 
        });
      }

    } catch (error) {
      console.log("Error at getAllProducts: ", error);
    }
  }

  getAllProducts();
});

// GET PRODUCT
router.post('/product', async (req, res) => {
  async function getProductId() {

    console.log("Buscando produto: ", req.body);

    try {
      const resultOpGetProduct = await getProduct(req.body);

      console.log("resultOpGetProduct: ", resultOpGetProduct);

      if (resultOpGetProduct && resultOpGetProduct._id) {
        res.send({
          status: 200,
          product: resultOpGetProduct
        });
      } else {
        res.send({
          status: 500
        });
      }

    } catch (error) {
      console.log("Error at getProduct: ", error);
    }
  }

  getProductId();
});

module.exports = router;
