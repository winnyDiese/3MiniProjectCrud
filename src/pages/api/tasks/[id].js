import Task from "@/src/models/Task"
import {dbConnect} from "@/src/utils/mongoose"
import { runMiddleware } from "@/src/utils/runMiddleware"
import Morgan from 'morgan'

dbConnect()


export default async (req, res) => {
    const {method, body, query: {id}} = req
    const morgan = Morgan("dev")

    switch(method){
        case "GET":
            try {
                const task = await Task.findById(id)
                if(!task) return res.status(400).json({msg: "The task doesn't exist"})
                await runMiddleware(req, res, morgan)
                return res.status(200).json(task)
            } catch (error) {
                return res.status(400).json({msg: error.message})
            }
        case "DELETE":
            try {
                const deletedTask = await Task.findByIdAndDelete(id)
                if(!deletedTask)  return res.status(400).json({msg: "The task doesn't exist"})
                await runMiddleware(req,res,morgan)
                return res.status(204).json()
            } catch (error) {
                return res.status(400).json({msg: error.message})
            }
        case "PUT":
            try {
                const updatedTask = await Task.findByIdAndUpdate(id, body, {
                    new: true,
                    runValidators: true 
                })

                if(!updatedTask)
                    return res.status(400).json({msg: "Task doesn't exist"})
                return res.status(200).json(updatedTask)
            } catch (error) {
                return res.status(400).json({msg: error.message})
            }
        default:
            return res.status(400).json({msg: "this method id not supported"})
    }
}