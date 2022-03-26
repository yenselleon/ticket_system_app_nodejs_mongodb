const { request, response } = require("express");
const models = require('../models/index');


const addTicket = async (req = request, res = response, next)=> {
    const {documentation_number, name, queue, due_date} = req.body
    
    try {
        const data = await models.Ticket.create({
            documentation_number,
            name,
            queue,
            due_date
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
        
        res.status(200).json({
            ok: true,
            body: data
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).send({
            ok:false,
            message: "error en la peticion",
            error
        });
        next(error);
    }

}


const listTicketByQueue = async (req = request, res = response, next)=> {

    
    try {
        const dataQueue = await models.Queue.aggregate(
            [
                {
                    $lookup:
                    {
                        from: 'tickets',
                        pipeline: [
                            { $match: { state: true } },
                         ],
                        localField: '_id',
                        foreignField: 'queue',
                        as: 'ticketList'
                    }
                },
            ]
        ).sort({'createAt':1});


        res.status(200).json({
            ok: true,
            body: dataQueue
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            ok:false,
            message: "error en la peticion",
            error
        });
        next(error);
    }

}

const desactivateTicket = async (req = request, res = response, next) => {
    const id = req.params.id;
    try {
        
        const data = await models.Ticket.findByIdAndUpdate({_id: id}, {state: 0});

        res.status(200).json({
            ok: true,
            body: data
        });
        
    } catch (error) {
        console.log(error);

        res.status(500).send({
            ok:false,
            message: "error en la peticion",
            error
        });
        next(error);
    }

}

module.exports = {
    addTicket,
    listTicket,
    listTicketByQueue,
    desactivateTicket
}

