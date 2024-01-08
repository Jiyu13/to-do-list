<script>
	import {Router, Route} from 'svelte-routing'
	import ListsAll from "./components/ListsAll.svelte"

	import CreateListForm from "./components/CreateListForm.svelte"
	import OrderSearch from "./components/OrderSearch.svelte"
	import RightNavigation from "./components/RightNavigation.svelte"
	import '../public/global.css';


	import axios from "axios";
	import { onMount } from "svelte"
	

	let API_URL="http://localhost:3000/"
	let input=""
	let listsToShow = []
	let allLists = []
	let inProgressLists = []
	let doneLists = []

	let isAddList = false

	onMount(async() => {
		const {data} = await axios.get(API_URL + "api/v1/to_do_list")
		allLists = data["lists"]
		listsToShow = data["lists"]
		inProgressLists = data["lists"].filter(l => l.completed === false)
		doneLists = data["lists"].filter(l => l.completed === true)
	})

	function handleAddLists() {
		isAddList = !isAddList
	}
	function handleCreateFormSubmit(event) {
		event.preventDefault();
	}

    
	function handleAllLists() {
		listsToShow = allLists
    }
    
	function handleInProgressLists() {
		listsToShow = inProgressLists
    }
    
	function handleDoneLists() {
        listsToShow = doneLists
    }


	function handleDelete(id) {
		console.log("delete")
		console.log(id)
		axios.delete(API_URL + `api/v1/to_do_list/${id}`)
	}


</script>

<div class="app">

	{#if isAddList}
		<CreateListForm 
		handleAddLists={handleAddLists} handleCreateFormSubmit={handleCreateFormSubmit}/>
	{/if}
	<div class="top-container">
		<h5 class="title">Todo List</h5>
	</div>

	<Router >
		<div class="middle-container">
			<div class="left" >
				<OrderSearch />
				
					<Route path="/" component={ListsAll} {allLists} {handleDelete}/>
			</div>

			<RightNavigation 
				handleAddLists={handleAddLists}
				handleAllLists={handleAllLists}
				handleInProgressLists={handleInProgressLists}
				handleDoneLists={handleDoneLists}
			/>
		</div>
	</Router>

</div>

<style>
	.app {
		max-width: 900px;
		margin: 50px auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}

	.top-container {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	.title {
		font-size: 3rem;
		color: rgb(109, 164, 170);
		margin: 0 0 3rem 0;
	}
	.middle-container{
		display: grid;
		width: 100%;
		grid-template-columns: 80% 20%;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.left {
		display: flex;
		flex-direction: column;
		margin-right: 20px;
	}

	





</style>