import {writable} from "svelte/store"

let allLists = writable([])
let inProgressLists = writable([])
let doneLists = writable([])
let API_URL="http://localhost:3000/"

export {allLists, inProgressLists, doneLists, API_URL}