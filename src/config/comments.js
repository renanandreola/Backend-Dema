/**
 * @swagger
 * /testing:
 *   get:
 *     summary: Rota de teste da API
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API operando normalmente
 */

/**
 * @swagger
 * /client:
 *   post:
 *     summary: Cadastra um novo cliente
 *     tags:
 *       - Clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Cliente cadastrado com sucesso
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login de cliente
 *     tags:
 *       - Clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */

/**
 * @swagger
 * /loginAdmin:
 *   post:
 *     summary: Login do administrador
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Login do administrador realizado com sucesso
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Lista todos os clientes
 *     tags:
 *       - Clientes
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 */

/**
 * @swagger
 * /addproduct:
 *   post:
 *     summary: Cadastra um novo produto
 *     tags:
 *       - Produtos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Produto cadastrado com sucesso
 */

/**
 * @swagger
 * /editproduct:
 *   post:
 *     summary: Edita um produto existente
 *     tags:
 *       - Produtos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Produto editado com sucesso
 */

/**
 * @swagger
 * /addAdmin:
 *   post:
 *     summary: Cadastra um novo administrador
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Administrador cadastrado com sucesso
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags:
 *       - Produtos
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Busca um produto específico
 *     tags:
 *       - Produtos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Produto encontrado
 */

/**
 * @swagger
 * /removeProduct:
 *   post:
 *     summary: Remove um produto
 *     tags:
 *       - Produtos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 */

/**
 * @swagger
 * /removeClient:
 *   post:
 *     summary: Remove um cliente
 *     tags:
 *       - Clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Cliente removido com sucesso
 */

/**
 * @swagger
 * /searchResults:
 *   post:
 *     summary: Realiza uma busca por produtos
 *     tags:
 *       - Produtos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               searchTerm:
 *                 type: string
 *     responses:
 *       200:
 *         description: Resultados encontrados
 *       400:
 *         description: Nenhum resultado encontrado
 */
