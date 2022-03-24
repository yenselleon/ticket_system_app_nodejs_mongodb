const {Schema, model} = require('mongoose')

const TicketSchema = new Schema({
    documentation_number:   {type:Number, maxlength:15, required:true, unique:true},
    name:                   {type:String, maxlength:15, required:true},
    state:                  {type:Number, default: 1},
    queue:                  {type: Schema.Types.ObjectId, ref: 'queueschema', required: true},
    createAt:               {type:Date, default:Date.now}
});


TicketSchema.methods.toJSON = function () {
    const {__v, ...data} = this.toObject();
    
    return data;
}

const Ticket = model("ticketschema", TicketSchema)

module.exports = Ticket;