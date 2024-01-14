<script>

    import axios from "axios";
	import { onMount } from "svelte"
    import SingleList from "./SingleList.svelte"
    import { allLists, API_URL } from "../store.js"
    
    onMount(async() => {
		const {data} = await axios.get(API_URL + "api/v1/to_do_list")
		allLists.set(data["lists"])
	})

    function handleDeleteFromAll(id) {
		axios.delete(API_URL + `api/v1/to_do_list/${id}`)
		allLists.update(currentLists => currentLists.filter(l => l._id !== id))
	}


</script>

<div class="lists-container">
    {#if $allLists}
        {#each $allLists as list}
            <SingleList 
                list={list} 
                handleDelete={handleDeleteFromAll}
            />
        {/each}
    {/if}
</div>