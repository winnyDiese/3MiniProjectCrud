
import {Schema, model, models} from 'mongoose'
// import mongoose from 'mongoose'

const TaskSchema = new Schema({
    title:{
        type: String,
        required: [true, 'The title is required'],
        unique: true,
        trim: true,
        maxlength: [40, 'The title cannot be greatest then 40 characters']
    },
    description:{
        type: String,
        required: [true, 'The description is required'],
        trim: true,
        maxlength: [200, 'The description cannot be greatest then 200 characters']
    }
},
{
    timestamps: true,
    versionKey: false
}
)

export default models.Task || model('Task', TaskSchema)
// module.exports = mongoose.models.Task || mongoose.model('Task', TaskSchema)