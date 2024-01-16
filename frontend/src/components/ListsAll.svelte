<script>

    import axios from "axios";
	import { onMount } from "svelte"
    import SingleList from "./SingleList.svelte"
    import { allLists, API_URL, searchTerm } from "../store.js"
    
    let filteredLists

    onMount(async() => {
		const {data} = await axios.get(API_URL + "api/v1/to_do_list")
		allLists.set(data["lists"])
        filteredLists = data["lists"]
	})

    function handleDeleteFromAll(id) {
		axios.delete(API_URL + `api/v1/to_do_list/${id}`)
		allLists.update(currentLists => currentLists.filter(l => l._id !== id))
	}

    $: filteredLists = $allLists.filter(l => {
        const listTitle = l.name.toLowerCase();
        return $searchTerm === "" || listTitle.includes($searchTerm.toLowerCase());
    });
</script>

<div class="lists-container">
    {#if filteredLists}
        {#each filteredLists as list}
            <SingleList 
                list={list} 
                handleDelete={handleDeleteFromAll}
            />
        {/each}
    {/if}
</div>