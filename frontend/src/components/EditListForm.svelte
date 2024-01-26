<script>
    import axios from "axios";
    import {onMount} from "svelte"
    import {handleCloseModal, upateLists} from "../hooks.js"

    import CloseSrc from '../../public/icons/close_24.svg';
    import { pathname, API_URL, allLists, inProgressLists, doneLists, editListID, isEditFormOpen } from "../store.js";

    pathname.set(window.location.pathname)

    let editItem = { name: "", completed: false, dueBy: "" }

    $: {
        if ($editListID) {
            axios
            .get(API_URL + `api/v1/to_do_list/${$editListID}`) 
            .then(res => { editItem = res.data["list"] })
            .catch(error => console.log(error))
        }
    }

    function handleInput(e) {
        const name = e.target.name
        let value 
        if (e.target.type === "checkbox") {
            value = e.target.checked
        } else if (e.target.type === "date") {
            value = e.target.value
        } else {
            value = e.target.value
        }
        editItem[name] = value
    }

    function handleEditFormSubmit(event) {
		event.preventDefault();
        axios.put(API_URL + `api/v1/to_do_list/${editItem._id}`, editItem)
            .then(res => {
                const updatedList = res.data["targetList"]
                if ($pathname === '/completed') {
                    doneLists.update((currentLists) => upateLists(currentLists, updatedList))
                } else if ($pathname === '/in-progress') {
                    inProgressLists.update((currentLists) => upateLists(currentLists, updatedList))
                } else {
                    allLists.update((currentLists) => upateLists(currentLists, updatedList))
                } 
            })
            .catch(error => console.log(error))
        
        handleCloseEditList()

        editItem = {name: "", completed: false, dueBy: ""}
	}

    function handleCloseEditList() {
        $isEditFormOpen = false
    }


    let addFormRef
    onMount(() => {
        const unsubscribe = handleCloseModal(
            addFormRef, isEditFormOpen
        )
        return unsubscribe
    })

    $: disabled = editItem.name === "" ? true : false

</script>

<div class="modal-container">
    <div class="modal-dialog" bind:this={addFormRef}>
        <div class="pop-up-header">
            <div class="header-title">Update</div>

            <button class="close-btn" on:click={handleCloseEditList} on:keydown={handleCloseEditList}>
                <img src={CloseSrc} alt="close button"/>
            </button>
        </div>
        
        <form class="list-form" on:submit={handleEditFormSubmit}>
            <div class="input-container">
                <label for="list-name" class="input-label">List Name:</label>
                <input
                    class="list-name-input"
                    id="list-name"
                    type="text"
                    name="name"
                    bind:value={editItem.name}
                    on:input={handleInput}
                />
                
            </div>
            <div class="input-container">
                <label for="due-by" class="input-label">Due Date:</label>
                <input 
                    class="date-input" 
                    id="due-by"
                    type="date"
                    name="dueBy"
                    value={editItem.dueBy.split("T")[0]}
                    on:input={handleInput}
                />
                
            </div>

            <div class="input-checkbox">
                <label for="check-completed" class="check-label">Completed</label>
                <input 
                    class="checkbox-div"
                    type="checkbox" 
                    name="completed"
                    bind:checked={editItem.completed}
                    id="check-completed" 
                    on:input={handleInput}
                />
            </div>
            <input type="submit" value="submit" class="add-list-btn" disabled={disabled} />
        </form>

    </div>

</div>

<style>
</style>