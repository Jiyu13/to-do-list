<script>
    export let doneLists
    export let handleDelete

    import SingleList from "./SingleList.svelte"

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

