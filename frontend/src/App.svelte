<script>
	import { onDestroy } from 'svelte'
	import {Router, Route} from 'svelte-routing'
	Router.baseUrl = 'http://localhost:8080/'

	import {isMenuOpen, isAddList, isEditFormOpen} from "./store.js"

	import ListsAll from "./components/ListsAll.svelte"
	import ListsDone from "./components/ListsDone.svelte"
	import ListsInProgress from "./components/ListsInProgress.svelte"

	import EditListForm from './components/EditListForm.svelte'
	import CreateListForm from "./components/CreateListForm.svelte"
	import NavBar from "./components/NavBar.svelte"
	import RightNavigation from "./components/RightNavigation.svelte"
	import '../public/global.css';
	
	
	function handleOpenAddList() {
		$isAddList = true
		$isMenuOpen = !$isMenuOpen
	}

	// initialize isMobile based on the initial window width
	let isMobile = window.innerWidth <= 540;
	// Function to update isMobile when the screen size changes
	const updateIsMobile = () => {
		isMobile = window.innerWidth <= 540;
		// console.log(isMobile)
	};

	// Attach a resize event listener to the window
	window.addEventListener("resize", updateIsMobile);

	// Remove the event listener when the component is destroyed to avoid memory leaks
	onDestroy(() => {
		window.removeEventListener("resize", updateIsMobile);
	});

</script>

<div class="app">
	<!-- handleOpenAddList={handleOpenAddList}  -->

	{#if $isEditFormOpen}
		<EditListForm />
	{/if}

	{#if $isAddList}
		<CreateListForm />
	{/if}
	<div class="top-container">
		<h5 class="title">Todo List</h5>
	</div>

	<Router >
		<div class="middle-container">
			<div class="left" >
				<NavBar isMobile={isMobile} handleOpenAddList={handleOpenAddList}/>
				
				<Route path="/" component={ListsAll}/>
				<Route path="/completed" component={ListsDone}/>
				<Route path="/in-progress" component={ListsInProgress}/>

			</div>
			
			{#if !isMobile }
				<RightNavigation handleOpenAddList={handleOpenAddList}/>
			{/if}
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
	/* .middle-container{
		display: grid;
		width: 100%;
		grid-template-columns: 70% 30%;
		justify-content: space-between;
		box-sizing: border-box;
	} */

	.left {
		display: flex;
		flex-direction: column;
		margin-right: 20px;
	}

	





</style>