import {writable} from "svelte/store"

let allLists = writable([])
let inProgressLists = writable([])
let doneLists = writable([])
let API_URL="http://localhost:3000/"
let pathname = writable(window.location.pathname)
let isEditListName = writable(false)
let searchTerm = writable("")

let time = new Date()
// time.setHours(23, 59, 0, 0)
// let year = time.getFullYear()
// let month = (time.getMonth() + 1).toString().padStart(2, '0');
// let date = time.getDate()

let localTime = writable(new Date(time.getTime() - (time.getTimezoneOffset() * 60000)).toISOString())

let editListID = writable(null)
let isEditFormOpen = writable(false)
let isOrderByOpen = writable(false)
let isMenuOpen =  writable(false)
let isAddList = writable(false)

export {
    allLists, inProgressLists, doneLists, 
    API_URL, pathname,
    isEditListName, searchTerm, localTime,
    isOrderByOpen, isMenuOpen, isAddList, isEditFormOpen,
    editListID
}