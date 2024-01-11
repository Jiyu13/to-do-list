<script>
    export let API_URL

    import axios from "axios";
	import { onMount } from "svelte"
    import SingleList from "./SingleList.svelte"

    let inProgressLists = []

    onMount(async() => {
		const {data} = await axios.get(API_URL + "api/v1/to_do_list/in-progress")
		inProgressLists = data["lists"]
	})

    function handleDeleteFromInProgress(id) {
        axios.delete(API_URL + `api/v1/to_do_list/${id}`)
		inProgressLists = inProgressLists.filter(l => l._id !== id)
    }

</script>

<div class="lists-container">
        {#if inProgressLists}
            {#each inProgressLists as list}
                <SingleList 
                    list={list} 
                    handleDelete={handleDeleteFromInProgress}
                />
            {/each}
        {/if}
    
</div>

