import taskModel from "../models/taskModel.js";

export const getTask = async (req,res)=>{
    try{
        const task = await taskModel.find();
        res.json(task);
    }catch(e){
        res.status(500).json({message: e.message});
    }
};

export const createdTask = async (req,res)=>{
    try{
        const { title, description, status } = req.body;
        const task = new taskModel({ title, description, status});
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    }catch(e){
        res.status(500).json({ message: e.message });
    }
}
export const updateTask = async(req,res)=>{
    try{
        const updatedTask = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if(!updatedTask){
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(updatedTask);
    }catch(e){
        res.status(400).json({ message: e.message });
    }
}

export const deleteTask = async (req,res)=>{
    try{
        const task = await taskModel.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted" });
    }catch(e){
        res.statu(500).json({ message: e.message });
    }
}
export const getTaskById = async (req,res)=>{
    try{
        const task = await taskModel.findById(req.params.id);
        if(!task){
            return res.status(404).json({ message: `Task no. ${id} not found.` });
        }
        res.json({ message: "Task found", task });
    }catch(e){
        res.status(500).json({ message: e.message });
    }
}

export const searchByTaskByTitle = async(req,res)=>{
    try{
        const { q, status } = req.query;
        const filter = {};
        
        if(q){
            filter.$or= [
                { title: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } }
            ];
        }
        if(status){
           filter.status = status;
        }
        const task = await taskModel.find(filter);

        res.json(task);
    }catch(e){
        res.status(500).json({ message: e.message });
    }
}
