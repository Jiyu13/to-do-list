const getAllLists = (req, res) => {
    res.send("all items")
}


const getList = (req, res) => {
    res.send("get single list")
}

const createList = (req, res) => {
    res.send("create list")
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