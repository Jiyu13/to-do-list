const List = require('../models/List')

const getAllLists = async (req, res) => {
    try {
        const allLists = await List.find({})
        res.status(200).json({lists: allLists})
        // console.log("===========all========================")
        // console.log(allLists)
    } catch(error) {
        res.status(500).json({msg: error})
    }
}

const getInProgressLists = async (req, res) => {
    try {
        const InProgresLists = await List.find({completed: false})
        res.status(200).json({lists: InProgresLists})
        // console.log("======================================")
        // console.log(InProgresLists)
    } catch(error) {
        res.status(500).json({msg: error})
    }
}

const getCompletedLists = async (req, res) => {
    try {
        const completedLists = await List.find({completed: true})
        res.status(200).json({lists: completedLists})
        // console.log("============completed================")
        // console.log(completedLists)
    } catch(error) {
        res.status(500).json({msg: error})
    }
}
const getList = async (req, res) => {
    try {
        const {id: listID} = req.params
        const targetList = await List.findOne({_id:listID})
        
        if (!targetList) {
            return res.status(404).json({msg: "No list found."})
        }

        res.status(200).json({list: targetList})
    } catch (error) {
        // trigger error if id syntax not correct
        res.status(500).json({msg: error})
    }
    
}

const createList = async (req, res) => {
    try {
        const formattedDate = new Date(req.body.dueBy)

        const newData = {
            name: req.body.name,
            completed: req.body.completed,
            dueBy: formattedDate
        }

        const list = await List.create(newData)
        res.status(201).json({list})

    } catch(error) {
        res.status(500).json({msg: error})
    }

}

const updateList = async (req, res) => {
    try {
        const {id: listID} = req.params
        const targetList = await List.findOneAndUpdate(
            {_id:listID}, 
            req.body,
            {new: true, runValidators: true},  
            // options: return modified document & runs update validators
        )
        
        if (!targetList) {
            return res.status(404).json({msg: "No list found."})
        }

        res.status(200).json({targetList,})
    } catch (error) {
        // trigger error if id syntax not correct
        res.status(500).json({msg: error})
    }
}

const updateWholeList = async (req, res) => {
    console.log(req.body)
    try {
        const {id: listID} = req.params
        const targetList = await List.findOneAndUpdate(
            {_id:listID}, 
            req.body,
            {new: true, runValidators: true},  
            // options: return modified document & runs update validators
        )
        
        if (!targetList) {
            return res.status(404).json({msg: "No list found."})
        }

        res.status(200).json({targetList,})
    } catch (error) {
        console.log(error)
        // trigger error if id syntax not correct
        res.status(500).json({msg: error})
    }
}

const deleteList = async (req, res) => {
    try {
        const {id: listID} = req.params
        const deleteList = await List.findOneAndDelete({_id:listID})
        
        if (!deleteList) {
            return res.status(404).json({msg: "No list found."})
        }

        res.status(200).json({list: null, status: "success"})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

module.exports = {
    getAllLists, getInProgressLists, getCompletedLists,
    getList, 
    createList,
    updateList, updateWholeList,
    deleteList,
}