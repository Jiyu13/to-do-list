<script>
    export let API_URL

    import axios from "axios";
	import { onMount } from "svelte"
    import SingleList from "./SingleList.svelte"

    let doneLists = []
    onMount(async() => {
		const {data} = await axios.get(API_URL + "api/v1/to_do_list/completed")
		doneLists = data["lists"]
	})

    function handleDeleteFromDone(id) {
        axios.delete(API_URL + `api/v1/to_do_list/${id}`)
		doneLists = doneLists.filter(l => l._id !== id)
    }

</script>

<div class="lists-container">
    {#if doneLists}
        {#each doneLists as list}
            <SingleList 
                list={list} 
                handleDelete={handleDeleteFromDone}
            />
        {/each}
    {/if}
</div>

