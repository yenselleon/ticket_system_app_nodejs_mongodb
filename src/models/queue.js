const {Schema, model} = require('mongoose')

const QueueSchema = new Schema({
    queue_number:           {type:Number, maxlength:15, required:true, unique:true},
    name:                   {type:String, maxlength:15, required:true, unique:true},
    atention_time:          {type:Number, max:60, required:true},
    state:                  {type:Boolean, default: true}
});


QueueSchema.methods.toJSON = function () {
    const {__v, ...data} = this.toObject();
    
    return data;
}

const Queue = model("queues", QueueSchema);

module.exports = Queue;