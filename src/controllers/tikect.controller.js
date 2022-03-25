const { request, response } = require("express");
const models = require('../models/index');
const { populate } = require("../models/queue");


const addTicket = async (req = request, res = response, next)=> {
    const {documentation_number, name, queue} = req.body
    
    try {
        const data = await models.Ticket.create({
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
        next(error);
    }

}

const listTicket = async (req = request, res = response, next)=> {
    const valor = req.query.valor;
    
    try {
        //Obtener los datos de la db correspondientes al valor ingresado
        const data = await models.Ticket.find({state: true})
        .populate('queue', ['name', 'queue_number'])
        .sort({'createAt':1});
        
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "error en la peticion"
        });
        next(error);
    }

}



module.exports = {
    addTicket,
    listTicket
}

