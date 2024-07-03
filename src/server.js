const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const insertClients = require('./database/operations/insertClients');
const insertFavorites = require('./database/operations/insertFavorites');
const getActions = require('./database/operations/getActions');
const getFavs = require('./database/operations/getFavorites');
const removeFavs = require('./database/operations/removeFavorite');
const loginClients = require('./database/operations/loginClients');

const insertProducts = require('./database/operations/insertProducts');
const getProducts = require('./database/operations/getProducts');


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

// GET ALL ACTIVES
router.get('/allActives', async (req, res) => {
  async function getAllActions() {

    try {
      const resultOpGetActions = await getActions();

      if (resultOpGetActions && resultOpGetActions.length > 0) {
        return res.json({ 
          status: 200, 
          actives: resultOpGetActions,
          message: "Get all actions ok" 
        });
      } else {
        return res.json({ 
          status: 500, 
          message: "Error on get all actions" 
        });
      }

    } catch (error) {
      console.log("Error at getAllActions: ", error);
    }
  }

  getAllActions();
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
          username: req.body.email,
        };

        const token = jwt.sign(userData, secretKey);

        res.send({
          status: 200,
          token: token,
          email: req.body.email,
          name: resultOpLoginClients.name
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

// CREATE FAVORITE
router.post('/favorite', async (req, res) => {
  async function insertFavorite() {
    console.log("Inserindo favorito: ", req.body);
    try {
      const resultOpNewFavorites = await insertFavorites(req.body);

      if (resultOpNewFavorites && resultOpNewFavorites.insertedId) {
        res.send({
          status: 200
        });
      } else {
        res.send({
          status: 500
        });
      }

    } catch (error) {
      console.log("Error at insertFavorite: ", error);
    }
  }

  insertFavorite();
});

// GET ALL FAVORITES
router.post('/getFavorites', async (req, res) => {
  async function getAllFavorites() {

    try {
      const resultOpGetFavorites = await getFavs(req.body);

      if (resultOpGetFavorites && resultOpGetFavorites.length > 0) {
        return res.json({ 
          status: 200, 
          favorites: resultOpGetFavorites,
          message: "Get all favorites ok" 
        });
      } else {
        return res.json({ 
          status: 500, 
          message: "Error on get all favorites" 
        });
      }

    } catch (error) {
      console.log("Error at getAllFavorites: ", error);
    }
  }

  getAllFavorites();
});

// REMOVE FAVORITE
router.post('/removeFavorite', async (req, res) => {
  async function removeFavorite() {

    try {
      const resultOpRemoveFavorite = await removeFavs(req.body);

      if (resultOpRemoveFavorite && resultOpRemoveFavorite.deletedCount == 1) {
        return res.json({ 
          status: 200, 
          favorites: resultOpRemoveFavorite,
          message: "Remove favorite ok" 
        });
      } else {
        return res.json({ 
          status: 500, 
          message: "Error on remove favorite" 
        });
      }

    } catch (error) {
      console.log("Error at removeFavorite: ", error);
    }
  }

  removeFavorite();
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

module.exports = router;