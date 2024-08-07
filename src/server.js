const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const insertClients = require('./database/operations/insertClients');
const loginClients = require('./database/operations/loginClients');
const loginAdmin = require('./database/operations/loginAdmin');
const insertProducts = require('./database/operations/insertProducts');
const insertAdm = require('./database/operations/insertAdmin');
const getProducts = require('./database/operations/getProducts');
const getClients = require('./database/operations/getClients');
const getProduct = require('./database/operations/getProduct');
const removeProduct = require('./database/operations/removeProduct');

// TESTING DEMA ROUTE
router.get("/testing", async (req, res) => {
    console.log("Dema test routing in running!");

    return res.json({ 
        status: 200, 
        message: "Dema test routing in running!" 
    });
});

// ADD CLIENT
router.post('/client', async (req, res) => {
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
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
      const resultOpLoginClients = await loginClients(req.body);

      if (resultOpLoginClients && resultOpLoginClients._id) {
        res.send({
          status: 200,
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
});

// LOGIN ADMIN
router.post('/loginAdmin', async (req, res) => {
  try {
    const resultOpLoginAdmin = await loginAdmin(req.body);

    if (resultOpLoginAdmin && resultOpLoginAdmin._id) {
      const secretKey = 'suaChaveSecretaSuperSecreta';
      const userData = {
        userId: resultOpLoginAdmin._id,
        email: req.body.email,
      };

      const token = jwt.sign(userData, secretKey);

      res.send({
        status: 200,
        token: token,
        // client: resultOpLoginAdmin
      });
    } else {
      res.send({
        status: 500
      });
    }

  } catch (error) {
    console.log("Error at makeLogin: ", error);
  }
});

// GET ALL CLIENTS
router.get('/clients', async (req, res) => {
  try {
    const resultOpGetClients = await getClients();

    if (resultOpGetClients && resultOpGetClients.length > 0) {
      return res.json({ 
        status: 200, 
        products: resultOpGetClients,
        message: "Get all clients ok" 
      });
    } else {
      return res.json({ 
        status: 500, 
        message: "Error on get all clients" 
      });
    }

  } catch (error) {
    console.log("Error at getAllClients: ", error);
  }
});

// CREATE PRODUCT
router.post('/addproduct', async (req, res) => {
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
});

// CREATE ADMIN
router.post('/addAdmin', async (req, res) => {
    try {
      const resultInsertAdm = await insertAdm(req.body);

      if (resultInsertAdm && resultInsertAdm.insertedId) {
        res.send({
          status: 200
        });
      } else {
        res.send({
          status: 500
        });
      }

    } catch (error) {
      console.log("Error at insertAdmin: ", error);
    }
});

// GET ALL PRODUCTS
router.get('/products', async (req, res) => {
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
});

// GET PRODUCT
router.post('/product', async (req, res) => {
    try {
      const resultOpGetProduct = await getProduct(req.body);

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
});

router.post('/removeProduct', async (req, res) => {
  try {
    const resultOpRemoveProduct = await removeProduct(req.body);

    if (resultOpRemoveProduct && resultOpRemoveProduct.deletedCount == 1) {
      return res.json({ 
        status: 200, 
        // favorites: resultOpRemoveProduct,
        message: "Remove product ok" 
      });
    } else {
      return res.json({ 
        status: 500, 
        message: "Error on remove product" 
      });
    }

  } catch (error) {
    console.log("Error at removeProduct: ", error);
  }
});

module.exports = router;
