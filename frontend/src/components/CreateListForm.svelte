<script>
    import axios from "axios";
    import CloseSrc from '../../public/icons/close_24.svg';
    import { pathname, API_URL, allLists, inProgressLists, doneLists } from "../store.js";
    import Calendar from "./Calendar.svelte";
    let selectedDate = null

    
    export let handleAddList

    pathname.set(window.location.pathname)

    let date = new Date()
    let initialValue = {
        name: "",
        completed: false,
        dueBy: date
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
        initialValue[name] = value
        // console.log(initialValue)
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
        initialValue = {
            name: "",
            completed: false,
            dueBy: date
        }
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
            <div class="input-container">
                <label for="list-name" class="input-label">List Name:</label>
                <input
                    class="list-name-input"
                    id="list-name"
                    type="text"
                    name="name"
                    bind:value={initialValue.name}
                    placeholder="What are you going to do?"
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
                    bind:value={initialValue.date}
                    on:input={handleInput}
                />
                <!-- <Calendar 
                    selectedDate={selectedDate} 
                    handleInput={handleInput}
                    date={date}
                /> -->
                
            </div>

            <div class="input-checkbox">
                <label for="check-completed" class="check-label">Completed</label>
                <input 
                    class="checkbox-div"
                    type="checkbox" 
                    name="completed"
                    bind:checked={initialValue.completed}
                    id="check-completed" 
                    on:input={handleInput}
                />
            </div>
            <input type="submit" value="Add"class="add-list-btn" disabled={disabled} />
        </form>

    </div>

</div>

<style>

    input[type="date"]::-webkit-calendar-picker-indicator {
    }
</style>