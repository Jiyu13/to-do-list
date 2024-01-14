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

	import { API_URL } from "./store.js"
	import axios from "axios";
	import { onMount } from "svelte"
	
	let isAddList = false
	
	function handleAddList() {
		isAddList = !isAddList
	}



</script>

<div class="app">

	{#if isAddList}
		<CreateListForm handleAddList={handleAddList}/>
	{/if}
	<div class="top-container">
		<h5 class="title">Todo List</h5>
	</div>

	<Router >
		<div class="middle-container">
			<div class="left" >
				<OrderSearch />
				
				<Route path="/" component={ListsAll}/>
				<Route path="/completed" component={ListsDone}/>
				<Route path="/in-progress" component={ListsInProgress}/>

			</div>

			<RightNavigation handleAddList={handleAddList}/>
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