<script>

    import axios from "axios";
	import { onMount } from "svelte"
    import SingleList from "./SingleList.svelte"
    import { API_URL, inProgressLists, searchTerm } from "../store.js"
    
    let filteredLists

    onMount(async() => {
		const {data} = await axios.get(API_URL + "api/v1/to_do_list/in-progress")
		inProgressLists.set(data["lists"])
        filteredLists = data["lists"]
	})


    function handleDeleteFromInProgress(id) {
        axios.delete(API_URL + `api/v1/to_do_list/${id}`)
		inProgressLists.update(currentLists => currentLists.filter(l => l._id !== id))
    }

    $: filteredLists = $inProgressLists.filter(l => {
        const listTitle = l.name.toLowerCase();
        return $searchTerm === "" || listTitle.includes($searchTerm.toLowerCase());
    });

</script>

<div class="lists-container">
        {#if filteredLists}
            {#each filteredLists as list}
                <SingleList 
                    list={list} 
                    handleDelete={handleDeleteFromInProgress}
                />
            {/each}
        {/if}
    
</div>

