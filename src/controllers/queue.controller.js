const { request, response } = require("express");
const models = require('../models/index');


const addQueue = async (req = request, res = response, next)=> {
    const {queue_number, name} = req.body
    
    try {
        const data = await models.Queue.create({
            queue_number,
            name
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



module.exports = {
    addQueue
}
