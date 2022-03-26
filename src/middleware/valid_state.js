const { request, response } = require("express");
const models = require('../models/index');


const validState = async(req = request, res = response, next)=> {

    try {
        
        const ticket = await models.Ticket.find({state: true});

        console.log(ticket);


        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: 'Token no valido'
        })
    }

}


module.exports = validState;
