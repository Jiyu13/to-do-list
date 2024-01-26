const express = require('express')
const router = express.Router()


const {    
    getAllLists,  getInProgressLists, getCompletedLists,
    getList, 
    createList,
    updateList, updateWholeList,
    deleteList,
} = require('../controllers/lists')

router.route('/').get(getAllLists).post(createList)
router.route('/in-progress').get(getInProgressLists)
router.route('/completed').get(getCompletedLists)
router.route('/:id').get(getList).patch(updateList).delete(deleteList)
router.route('/:id').put(updateWholeList)

module.exports = router