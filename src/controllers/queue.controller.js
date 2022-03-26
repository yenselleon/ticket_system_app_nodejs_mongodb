const { request, response } = require("express");
const models = require('../models/index');


const addQueue = async (req = request, res = response, next)=> {
    const {queue_number, name, atention_time} = req.body
    
    try {
        const data = await models.Queue.create({
            queue_number,
            atention_time,
            name
        })

        res.status(201).json({
            ok: true,
            body: data
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "error en la peticion"
        });
        next(error);
    }

}

const listQueue = async(req = request, res = response, next)=> {

    try {
        
        const data = await models.Queue.find({state: true}).sort({'queue_number': 1});

        res.status(201).json({
            ok: true,
            body: data
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "error en la peticion"
        });
        next(error);
    }

}



module.exports = {
    addQueue,
    listQueue
}
