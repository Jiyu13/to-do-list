<script>
	import axios from "axios";
	import { onMount } from "svelte"
	import OrderSearch from "./components/OrderSearch.svelte"
	import RightNavigation from "./components/RightNavigation.svelte"
	import SingleList from "./components/SingleList.svelte"

	let API_URL="http://localhost:3000/"
	let input=""
	let allLists = []



	onMount(async() => {
		const {data} = await axios.get(API_URL + "api/v1/to_do_list")
		console.log(data["lists"])
		allLists = data["lists"]
	})


	
	

</script>
<main class="main">

	<div class="top-container">
		<h5 class="title">Todo List</h5>
	</div>

	<div class="middle-container">
		<div class="left">
			<OrderSearch />
				
			
			<div class="lists-container">
				{#each allLists as list}
					<SingleList list={list}/>
				{/each}
			</div>
		</div>
		<RightNavigation />

</main>


<style>
	.main {
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

	

	.lists-container {
		display: flex;
		gap: 12px;
		flex-direction: column;
		overflow-y: scroll; 
		max-height: 70vh;
		justify-content: space-evenly;
	}

	
	
	:global(body) {
		background-color: rgb(246, 215, 118);
		overflow: hidden;
		height: 100vh;

	}

	:global(button){
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
		margin: 0;
	}

	:global(button:active) {
		background-color: transparent;
	}
</style>