const List = require('../models/List')

const getAllLists = async (req, res) => {
    try {
        const allLists = await List.find({})
        res.status(200).json({lists: allLists})
    } catch(error) {
        res.status(500).json({msg: error})
    }
}


const getList = (req, res) => {
    res.json({id: req.params.id})
}

const createList = async (req, res) => {
    try {
        const list = await List.create(req.body)
        console.log(req.body)
        res.status(201).json({list})

    } catch(error) {
        res.status(500).json({msg: error})
    }

}

const updateList = (req, res) => {
    res.send("update list")
}

const deleteList = (req, res) => {
    res.send("delete list")
}

module.exports = {
    getAllLists,
    getList, 
    createList,
    updateList,
    deleteList,
}