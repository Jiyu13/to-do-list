<script>
	import axios from "axios";
	import { localTime, isEdit, pathname, API_URL, allLists, inProgressLists, doneLists } from "../store.js";
	pathname.set(window.location.pathname)
    

	import EditListNameForm from "./EditListNameForm.svelte"

	const editSrc = './icons/edit_24.svg';
	const deleteSrc = './icons/delete_24.svg';
	const checkCircleSrc = './icons/check_circle_24.svg'
	const greenCircleSrc = './icons/green_circle_24.svg'
	const redCircleSrc = './icons/red_circle_24.svg'

    export let list
	let isEditItemId = null
	let newListNameInput = list.name

	export let handleDelete

	function onUpdateLists(targetLists, updatedList) {
		return targetLists.map(l => {
			if (l._id === list._id) {
				return updatedList
			} else {
				return l
			}
		})
	}
    
	function handleCheckList(isCompleted) {
		axios.patch(
			API_URL+ 
			`api/v1/to_do_list/${list._id}`, 
			{completed: !isCompleted}
		) 
		.then(res => {
			const newList = res.data["targetList"]
			if ($pathname === '/completed') {
				doneLists.update((currentLists) => currentLists.filter(l => l._id !== newList._id))
			} else if ($pathname === '/in-progress') {
				inProgressLists.update((currentLists) => currentLists.filter(l => l._id !== newList._id))
			} else {
				allLists.update((currentLists) => onUpdateLists(currentLists, newList))
			} 
		})
		.catch(error => console.log(error))
	}

	function handleTitleClick(id) {
		isEditItemId = id
		$isEdit = !$isEdit
	}

	const dueDate = list.dueBy
	let isDue = dueDate < $localTime
	const dueLocale = new Date(dueDate).toLocaleDateString(
		undefined, 
		{
		timeZone: 'UTC',
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		}
	)

</script>


<div class="list-container">

    <div class="list-data">

        {#if list.completed}
            <button class="icon" on:click={handleCheckList(list.completed)}>
                <img src={checkCircleSrc} alt="checked icon"/>
            </button>
        {:else if list.completed === false && !isDue}
            <button class="icon" on:click={handleCheckList(list.completed)}>
                <img src={greenCircleSrc} alt="not checked icon"/>
            </button>
		{:else if list.completed === false && isDue}
			<button class="icon" on:click={handleCheckList(list.completed)}>
				<img src={redCircleSrc} alt="is due icon"/>
			</button>
		{/if}
		
		<div class="name-date">
			{#if $isEdit && list._id === isEditItemId}
				<EditListNameForm list={list}/>
			{:else}
				<h5 
					class="list-name" 
					class:completed={list.completed} 
					on:click={handleTitleClick(list._id)}
					on:keydown={handleTitleClick(list._id)}
				>
					{list.name}
				</h5>
			{/if }
			<div class="due-date">Due by: {dueLocale}</div>
		</div>
        
    </div>

    <div class="icons">
        <button class="icon">
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
	.name-date {
		display: flex;
		flex-direction: column;
	}
	.due-date{
		font-size: 0.85rem;
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