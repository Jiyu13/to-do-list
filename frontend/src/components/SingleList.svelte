<script>
    
	const editSrc = './icons/edit_24.svg';
	const deleteSrc = './icons/delete_24.svg';
	const checkCircleSrc = './icons/check_circle_24.svg'
	const CircleSrc = './icons/circle_24.svg'

    export let list
	export let handleDelete

    function handleEdit() {}
	function handleCheckList() {}
</script>


<div class="list-container">

    <div class="list-data">

        {#if list.completed}
            <button class="icon" on:click={handleCheckList}>
                <img src={checkCircleSrc} alt="checked icon"/>
            </button>
        {:else}
            <button class="icon" on:click={handleCheckList}>
                <img src={CircleSrc} alt="not checked icon"/>
            </button>
        {/if}

        <div class="list-name" class:completed={list.completed}>
			{list.name}
		</div>
    </div>

    <div class="icons">
        <button on:click={handleEdit} class="icon">
            <img src={editSrc} alt="edit icon"/>
        </button>
        <button on:click={()=>handleDelete(list._id)} class="icon">
            <img src={deleteSrc} alt="delete icon"/>
        </button>
    </div>
</div>

<style>
    .list-container{
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		padding: 16px;
		border-radius: 12px;
		border: solid 1px #33d9b2;
		box-sizing: border-box;
	}

	.list-data{
		display: flex;
		gap: 8px;
	}


	.icons{
		display: flex;
		gap: 8px;
	}

	.icon {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
        transition: all .2s ease-in-out;
	}
    button.icon:hover {
		transform: scale(1.1);
	}

	.completed {
		text-decoration-line: line-through;
	}
</style>