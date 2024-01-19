<script>
    import axios from "axios";
    import CloseSrc from '../../public/icons/close_24.svg';
    import { pathname, API_URL, allLists, inProgressLists, doneLists } from "../store.js";
    import Calendar from "./Calendar.svelte";
    
    export let handleAddList

    pathname.set(window.location.pathname)

    let newListNameInput
    let initialValue = {
        name: "",
        completed: false,
    }

    function handleInput(e) {
        const name = e.target.name
        let value 
        if (e.target.type === "checkbox") {
            value = e.target.checked
        } else {
            value = e.target.value
        }
        initialValue[name] = value
    }

    function handleCreateFormSubmit(event) {
		event.preventDefault();
        axios.post(API_URL + "api/v1/to_do_list", initialValue)
            .then(res => {
                const newList = res.data["list"]
                if (pathname === '/completed' && newList.completed === true) {
                    doneLists.update((currentLists ) => [...currentLists, newList])
                } else if (pathname === '/in-progress' && newList.completed === false) {
                    inProgressLists.update((currentLists ) => [...currentLists, newList])
                } else {
                    allLists.update((currentLists) => [...currentLists, newList])
                } 
            })
            .catch(error => console.log(error))
        
        handleAddList()
        newListNameInput = ""
	}

    $: disabled = initialValue.name === "" ? true : false
    // import { onMount } from "svelte"
    // onMount(() => {
    //     console.log(disabled, initialValue.name);
    // });
</script>

<div class="modal-container">
    <div class="modal-dialog">
        <div class="pop-up-header">
            <div class="header-title">Create a List!</div>

            <button class="close-btn" on:click={handleAddList}>
                <img src={CloseSrc} alt="close button"/>
            </button>
        </div>
        
        <form class="list-form" on:submit={handleCreateFormSubmit}>
            <div class="input-fields">
                <input
                    class="list-name-input"
                    type="text"
                    name="name"
                    bind:value={newListNameInput}
                    placeholder="List name"
                    on:input={handleInput}
                />
                <div class="checkbox-div">
                    <input 
                        type="checkbox" 
                        name="completed"
                        bind:checked={initialValue.completed}
                        id="check-completed" 
                        on:input={handleInput}
                    />
                    <label for="check-completed" class="check-label">Completed</label>
                </div>
                
            </div>
            <div>
                <Calendar />
                
            </div>
            <input type="submit" value="Add"class="add-list-btn" disabled={disabled} />
        </form>

    </div>

</div>