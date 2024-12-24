const express = require('express');
const router = express.Router();
const { authController } = require('../../controllers/auth/authControllers');

router.post('/', authController);

module.exports = router;
