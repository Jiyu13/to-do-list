<script>
	import {Router, Route} from 'svelte-routing'
	Router.baseUrl = 'http://localhost:8080/'
	import ListsAll from "./components/ListsAll.svelte"
	import ListsDone from "./components/ListsDone.svelte"
	import ListsInProgress from "./components/ListsInProgress.svelte"

	import CreateListForm from "./components/CreateListForm.svelte"
	import OrderSearch from "./components/OrderSearch.svelte"
	import RightNavigation from "./components/RightNavigation.svelte"
	import '../public/global.css';


	import axios from "axios";
	import { onMount } from "svelte"
	
	let API_URL="http://localhost:3000/"
	let input=""
	let allLists = []
	let isAddList = false

	onMount(async() => {
		const {data} = await axios.get(API_URL + "api/v1/to_do_list")
		allLists = data["lists"]
	})
	

	function handleAddLists() {
		isAddList = !isAddList
	}
	function handleCreateFormSubmit(event) {
		event.preventDefault();
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
			handleAddLists={handleAddLists} 
			handleCreateFormSubmit={handleCreateFormSubmit}
		/>
	{/if}
	<div class="top-container">
		<h5 class="title">Todo List</h5>
	</div>

	<Router >
		<div class="middle-container">
			<div class="left" >
				<OrderSearch />
				
				<Route path="/" component={ListsAll} {allLists} {handleDelete}/>
				<Route path="/completed" component={ListsDone} {handleDelete} {API_URL}/>
				<Route path="/in-progress" component={ListsInProgress} {handleDelete} {API_URL}/>

			</div>

			<RightNavigation handleAddLists={handleAddLists}/>
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