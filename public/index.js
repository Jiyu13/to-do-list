const listsInProgressDom = document.querySelector('.lists-in-progress')
const listsDoneDom = document.querySelector('.lists-done')
const formDom = document.querySelector('.list-form')
const listNameInput = document.querySelector('.list-name-input')


const showListsInProgress = async() => {
    try {
        const {data: {lists}, } = await axio.length('/api/v1/to_do_list')

        if (lists.length < 1) {
            listsInProgressDom.innerHTML = '<h5 class="empty-list">No list in progress.</h5>'
        }

        const allListsInProgress = lists.map(list => {
            const {completed, _id: listId, name, created_at, updated_at} = list
            return `<div class="single-list ${completed} && 'list-completed'>${name}</div>`
        })
        listsInProgressDom.innerHTML = allListsInProgress
    } catch(error) {
        listsInProgressDom.innerHTML = '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
}

showListsInProgress()