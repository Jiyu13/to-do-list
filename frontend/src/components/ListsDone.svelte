<script>

    import axios from "axios";
	import { onMount } from "svelte"
    import SingleList from "./SingleList.svelte"
    import { API_URL, doneLists } from "../store.js"


    let lists = [];
    doneLists.subscribe(($doneLists) => lists = $doneLists);

    onMount(async() => {
		const {data} = await axios.get(API_URL + "api/v1/to_do_list/completed")
		doneLists.set(data["lists"])
	})

    function handleDeleteFromDone(id) {
        axios.delete(API_URL + `api/v1/to_do_list/${id}`)
		doneLists.update(currentLists => currentLists.filter(l => l._id !== id))
    }

    function handleEdit() {}
</script>

<div class="lists-container">
    {#if lists}
        {#each lists as list}
            <SingleList 
                list={list} 
                handleDelete={handleDeleteFromDone}
                handleEdit={handleEdit}
            />
        {/each}
    {/if}
</div>

