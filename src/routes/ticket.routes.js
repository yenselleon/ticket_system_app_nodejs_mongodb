const {Router} = require('express');
const { check } = require('express-validator');
const { addTicket, listTicket } = require('../controllers/tikect.controller');
const { valid_fields } = require('../middleware/valid_fields');


const router = Router();


//GET
router.get('/list', listTicket);


//POST
router.post('/add',[
    check('documentation_number', 'El numero de indentificacion es obligatorio y el valor debe de ser un numero').not().isEmpty().isNumeric(),
    check('name', 'El nombre es obligartorio').not().isEmpty(),
    check('queue', 'El id es obligatorio').isMongoId(),
    valid_fields
], addTicket);

//UPTADE
router.put('/activate',);
router.put('/desactivate',);




module.exports = router;