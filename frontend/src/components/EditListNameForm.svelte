<script>
	import axios from "axios";
    import {onMount} from "svelte"

    import {handleCloseModal} from "../hooks.js"
    import { isEdit, pathname, API_URL, allLists, inProgressLists, doneLists } from "../store.js";
	pathname.set(window.location.pathname)

    export let list
    let newListNameInput = list.name
    
    let initialValue = {
        name: list.name,
    }

    function handleInput(e) {
        const name = e.target.name
        const value = e.target.value
        initialValue[name] = value
        
    }

    function handleCloseEdit() {
        $isEdit = false
    }

    function upateLists(targetArray, updatedData) {
        return targetArray.map(a => {
            if (a._id === list._id) {
                return updatedData
            } else {
                return a
            }
        })
    }

    function handleEditNameFormSubmit(e) {
        e.preventDefault();
        axios.patch(API_URL + `api/v1/to_do_list/${list._id}`, initialValue)
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
        handleCloseEdit()
    }

    let nameEditFormRef
    onMount(() => {
        const unsubscribe = handleCloseModal(
            nameEditFormRef, isEdit
        );

        return unsubscribe
    })
</script>

<form on:submit={handleEditNameFormSubmit} class="edit-list-form" bind:this={nameEditFormRef}>
    <input
        class="list-name-input"
        type="text"
        name="name"
        bind:value={newListNameInput}
        placeholder="List name"
        on:input={handleInput}
    />
    <input type="submit" value="Submit" class="add-list-btn">
    <input type="button" value="Cancel" class="add-list-btn" on:click={handleCloseEdit}>

</form>

<style>
    .edit-list-form {
        display: flex;
        gap: 4px;
    }
</style>