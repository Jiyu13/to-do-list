<script>

    import axios from "axios";
	import { onMount } from "svelte"
    import SingleList from "./SingleList.svelte"
    import { API_URL, inProgressLists } from "../store.js"
    
    let lists = [];
    inProgressLists.subscribe(($inProgressLists) => lists = $inProgressLists);
    onMount(async() => {
		const {data} = await axios.get(API_URL + "api/v1/to_do_list/in-progress")
		inProgressLists.set(data["lists"])
	})


    function handleDeleteFromInProgress(id) {
        axios.delete(API_URL + `api/v1/to_do_list/${id}`)
		inProgressLists.update(currentLists => currentLists.filter(l => l._id !== id))
    }

</script>

<div class="lists-container">
        {#if lists}
            {#each lists as list}
                <SingleList 
                    list={list} 
                    handleDelete={handleDeleteFromInProgress}
                />
            {/each}
        {/if}
    
</div>

