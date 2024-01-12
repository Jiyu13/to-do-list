<script>
    import axios from "axios";
    import CloseSrc from '../../public/icons/close_24.svg';
    import { pathname, API_URL, allLists, inProgressLists, doneLists } from "../store.js";
    
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
                if (pathname === '/completed' && initialValue.completed === true) {
                    doneLists.update((currentLists ) => [...currentLists, initialValue])
                } else if (pathname === '/in-progress' && initialValue.completed === false) {
                    inProgressLists.update((currentLists ) => [...currentLists, initialValue])
                } else {
                    allLists.update((currentLists) => [...currentLists, initialValue])
                } 
            })
            .catch(error => console.log(error))
        
        handleAddList()
        newListNameInput = ""
	}

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
            <input type="submit" value="Add"class="add-list-btn" />
        </form>

    </div>

</div>


<style>
    .list-form {
        display: flex;
        gap: 12px;
        flex-direction: column;
        width: 80%;
        margin: 1.2rem auto 0;
        box-sizing: border-box;
    }
    .input-fields {
        display: flex;
        justify-content: space-between;
    }
    .checkbox-div{
        display: flex;
        gap: 4px;
    }
    .list-name-input {
        padding: 8px;
    }

    .add-list-btn {
        background-color: rgba(100, 125, 135, 0.8);
        border-radius: 4px;
        padding: 8px;
        color: white;
    }
    button.add-list-btn:hover {
        background-color: rgb(100, 125, 135);
    }

    .pop-up-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .header-title {
        flex-grow: 1;
        text-align: center;
        font-size: 1.3rem;
        font-weight: bold;
        padding: 24px 16px 8px 16px;
        color: rgb(100, 125, 135);

    }
    .close-btn {
        background: none;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        margin: 0;
        padding: 4px;

        position: relative;
        top: -12px;
    }
    button.close-btn:hover {
        background-color: rgb(251, 246, 238);
        border-radius: 0 4px 0 0 ;
    }

    .check-label {
        margin: auto 0;
    }

</style>