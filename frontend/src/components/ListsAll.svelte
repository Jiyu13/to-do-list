<script>
    export let API_URL

    import axios from "axios";
	import { onMount } from "svelte"
    import SingleList from "./SingleList.svelte"


    let allLists = []


    onMount(async() => {
		const {data} = await axios.get(API_URL + "api/v1/to_do_list")
		allLists = data["lists"]
	})

    function handleDeleteFromAll(id) {
		axios.delete(API_URL + `api/v1/to_do_list/${id}`)
		allLists = allLists.filter(l => l._id !== id)
	}

</script>

<div class="lists-container">
    {#if allLists}
        {#each allLists as list}
            <SingleList 
                list={list} 
                handleDelete={handleDeleteFromAll}
            />
        {/each}
    {/if}
</div>