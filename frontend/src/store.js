import {writable} from "svelte/store"

let allLists = writable([])
let inProgressLists = writable([])
let doneLists = writable([])
let API_URL="http://localhost:3000/"
let pathname = writable("")

export {allLists, inProgressLists, doneLists, API_URL, pathname}