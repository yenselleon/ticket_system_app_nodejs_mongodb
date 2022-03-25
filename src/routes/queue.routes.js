const {Router} = require('express');
const { check } = require('express-validator');
const { addQueue, listQueue } = require('../controllers/queue.controller');
const { valid_fields } = require('../middleware/valid_fields');


const router = Router();

//GET
router.get('/list',listQueue);

//POST
router.post('/add',[
    check('queue_number', 'El numero de cola es obligatorio y el valor debe de ser un numero').not().isEmpty().isNumeric(),
    check('name', 'El nombre es obligartorio').not().isEmpty(),
    valid_fields
], addQueue);

//UPDATE
router.put('activate');
router.put('desactivate');

module.exports = router;