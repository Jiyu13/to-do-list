<script>
    import axios from "axios";
	import { onMount } from "svelte"
    import SingleList from "./SingleList.svelte"

    export let handleDelete
    export let API_URL
    let inProgressLists = []


    onMount(async() => {
		const {data} = await axios.get(API_URL + "api/v1/to_do_list/in-progress")
		inProgressLists = data["lists"]
	})

</script>

<div class="lists-container">
        {#if inProgressLists}
            {#each inProgressLists as list}
                <SingleList 
                    list={list} 
                    handleDelete={handleDelete}
                />
            {/each}
        {/if}
    
</div>

