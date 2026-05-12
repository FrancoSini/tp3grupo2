const { Router } = require('express');

const { login, loginById } = require('../controllers/loginController');

const router = Router();

router.post('/', login);

router.get('/:id', loginById);

module.exports = router;