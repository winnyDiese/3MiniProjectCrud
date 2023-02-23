
import Task from "@/src/models/Task"
import {dbConnect} from "@/src/utils/mongoose"
import { runMiddleware } from "@/src/utils/runMiddleware"
import Morgan from 'morgan'

dbConnect()

export default async (req, res) => {
    const {method, body} = req
    const morgan = Morgan("dev")

    switch(method){
        case "GET":
            try {
                const tasks = await Task.find()
                await runMiddleware(req, res, morgan)
                return res.status(200).json(tasks)
            } catch (error) {
                return res.status(400).json({msg: error.message})
            }
        case "POST":
            try {
                const newTask = new Task(body)
                const savedTask = newTask.save()
                await runMiddleware(req,res,morgan)
                console.log({savedTask})
                return res.status(200).json(savedTask)
            } catch (error) {
                return res.status(400).json({msg: error.message})
            }
    }
}