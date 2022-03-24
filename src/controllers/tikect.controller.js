const { request, response } = require("express");
const models = require('../models/index');


const addTicket = (req = request, res = response, next)=> {
    const {documentation_number, name, queue} = req.body
    
    try {
        const data = models.Ticket.create({
            documentation_number,
            name,
            queue
        })
        
        res.status(201).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "error en la peticion"
        });
        next(e);
    }

}



module.exports = {
    addTicket,
}

