import {writable} from "svelte/store"

let allLists = writable([])
let inProgressLists = writable([])
let doneLists = writable([])
let API_URL="http://localhost:3000/"
let pathname = writable(window.location.pathname)
let isEdit = writable(false)
let searchTerm = writable("")

let time = new Date()
let year = time.getFullYear()
let month = (time.getMonth() + 1).toString().padStart(2, '0');
let date = time.getDate()

let localTime = writable(`${year}-${month}-${date}`)

export {
    allLists, inProgressLists, doneLists, 
    API_URL, pathname,
    isEdit, searchTerm, localTime
}