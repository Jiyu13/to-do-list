import {writable} from "svelte/store"

let allLists = writable([])
let inProgressLists = writable([])
let doneLists = writable([])
let API_URL="http://localhost:3000/"
let pathname = writable(window.location.pathname)
let isEdit = writable(false)
let searchTerm = writable("")

let time = new Date()
// time.setHours(23, 59, 0, 0)
// let year = time.getFullYear()
// let month = (time.getMonth() + 1).toString().padStart(2, '0');
// let date = time.getDate()

let localTime = writable(new Date(time.getTime() - (time.getTimezoneOffset() * 60000)).toISOString())

let isOrderByOpen = writable(false)
let isMenuOpen =  writable(false)
let isAddList = writable(false)

export {
    allLists, inProgressLists, doneLists, 
    API_URL, pathname,
    isEdit, searchTerm, localTime,
    isOrderByOpen, isMenuOpen, isAddList
}