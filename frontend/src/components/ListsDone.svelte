<script>
    import axios from "axios";
	import { onMount } from "svelte"
    export let handleDelete

    import SingleList from "./SingleList.svelte"

    export let API_URL
    let doneLists = []
    onMount(async() => {
		const {data} = await axios.get(API_URL + "api/v1/to_do_list/completed")
		doneLists = data["lists"]
	})


</script>

<div class="lists-container">
    {#if doneLists}
        {#each doneLists as list}
            <SingleList 
                list={list} 
                handleDelete={handleDelete}
            />
        {/each}
    {/if}
</div>

