<script>
    import CloseSrc from '../../public/icons/close_24.svg';


    let newListNameInput
    export let handleAddLists
    export let handleCreateFormSubmit
</script>

<div class="modal-container">
    <div class="modal-dialog">
        <div class="pop-up-header">
            <div class="header-title">Create a List!</div>

            <button class="close-btn" on:click={handleAddLists}>
                <img src={CloseSrc} alt="close button"/>
            </button>
        </div>
        
        <form class="list-form" on:submit={handleCreateFormSubmit}>
            <div class="input-fields">
                <input
                    class="list-name-input"
                    type="text"
                    name="'list-name"
                    bind:value={newListNameInput}
                    placeholder="List name"
                />
                <div class="checkbox-div">
                    <input type="checkbox" name="completed" id="check-completed"/>
                    <label for="check-completed" class="check-label">Completed</label>
                </div>
                
            </div>
            <button class="add-list-btn">Add</button>

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