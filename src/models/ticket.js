const {Schema, model} = require('mongoose')

const TicketSchema = new Schema({
    documentation_number:   {type:Number, maxlength:15, required:true, unique:true},
    name:                   {type:String, maxlength:50, required:true},
    state:                  {type:Boolean, default: true},
    queue:                  {type: Schema.Types.ObjectId, ref: 'queues', required: true},
    createAt:               {type:Date, default:Date.now},
    due_date:               {type:Date, required: true},
});


TicketSchema.methods.toJSON = function () {
    const {__v, ...data} = this.toObject();
    
    return data;
}

const Ticket = model("tickets", TicketSchema)

module.exports = Ticket;