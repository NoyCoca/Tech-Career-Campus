const ScheduleModel = require('../models/classScheduleModel');



const getAllClasses = async (req, res) => {

    await ScheduleModel.find({}, (err, result) => {
        if (err) throw err;
        res.json({ massage: "success", data: result })

    })
}


const postClasses = async (req, res) => {
    try {
        await ScheduleModel.insertMany([req.body], (err, result) => {
            if (err) throw err;
            res.json({ massage: "day schedule updated", data: result });
        })
    }
    catch (err) {
        res.json({ massage: "adding class failing", error: err })
    }
}
const updateClassesName = async (req, res) => {
    const { className,spot, hours, classId, dayId, hourId } = await req.body;
    try {
        const ArrayPath = `days.$.${hours}.$[object].${spot}`
        const ArrayObject = {};
        ArrayObject[ArrayPath] = className
        const query = {
            _id: classId,
            days: {
                $elemMatch: {
                    _id: dayId,
                },
            },
        };
        await ScheduleModel.findOneAndUpdate(
            query,
            { $set: ArrayObject },
            {
                arrayFilters: [{ "object._id": { _id: hourId } }],
                upsert: true
            },
            (err, result) => {
                if (err) throw err;

                if (result !== null) {
                    res
                        .status(200)
                        .json({ message: "update class spot success!", data: result });
                } else {
                    const errorNull = new Error("result is null");
                    res
                        .status(500)
                        .json({ message: "update class spot field", error: errorNull.message });
                }
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "update class spot field", error: err });
    }
}

const updateClasses = async (req, res) => {
    const { isTaken, spot, hours, classId, dayId, hourId } = await req.body;
    try {
        const ArrayPath = `days.$.${hours}.$[object].${spot}`
        const ArrayObject = {};
        ArrayObject[ArrayPath] =  isTaken ? false : true
        const query = {
            _id: classId,
            days: {
                $elemMatch: {
                    _id: dayId,
                },
            },
        };
        await ScheduleModel.findOneAndUpdate(
            query,
            { $set: ArrayObject },
            {
                arrayFilters: [{ "object._id": { _id: hourId } }],
                upsert: true
            },
            (err, result) => {
                if (err) throw err;

                if (result !== null) {
                    res
                        .status(200)
                        .json({ message: "update class spot success!", data: result });
                } else {
                    const errorNull = new Error("result is null");
                    res
                        .status(500)
                        .json({ message: "update class spot field", error: errorNull.message });
                }
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "update class spot field", error: err });
    }
}

const deleteClasses = async (req, res) => {
    try {
        await ScheduleModel.findByIdAndDelete(req.body.id, (err, result) => {
            if (err) throw err;
            res.status(200).json({ massage: "delete class success", data: result })
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
