const ScheduleModel = require('../models/classScheduleModel');

const getAllClasses = async (req, res) => {

    await ScheduleModel.find({}, (err, result) => {
        if (err) throw err;
        res.json({ massage: "success", data: result })

    })
}


const postClasses = async (req, res) => {
    try {
        await ScheduleModel.insertMany(req.body, (err, result) => {
            if (err) throw err;
            res.json({ massage: "add class", data: result });
        })
    }
    catch (err) {
        res.json({ massage: "adding class failing", error: err })
    }
}

const updateClassesName = async (req,res) => {
    try {
        await ScheduleModel.findByIdAndUpdate(req.body.id, {$set:{className:req.body.className}}, (err, result)=>{
            if(err) throw err;
            res.status(200).json({ massage: "get class by name success", data: result })
        })
    } catch (error) {
        res.status(500).json({ massage: "get class by name failed", data: result })
    }
}

const updateClasses = async (req, res) => {
    const taken = { $set: { isTaken: req.body.isTaken? false : true } }
    try {
        await ScheduleModel.findByIdAndUpdate(req.body.id , taken ,(err, result) => {
            if (err) throw err,
                res.status(200).json({ massage: "success",data: result})
        })
    }
    catch (err) {
        res.json({ massage: "problem with update", error: err })
    }
}

const deleteClasses = async (req, res) => {
    try {
        await ScheduleModel.findByIdAndDelete(req.body.id  ,(err, result) => {
            if (err) throw err;
                res.status(200).json({ massage: "delete class success",data: result})
        })
    }
    catch (err) {
        res.json({ massage: "delete class failed", error: err })
    }
}

module.exports = {
    getAllClasses,
    updateClasses,
    postClasses,
    deleteClasses,
    updateClassesName
}
