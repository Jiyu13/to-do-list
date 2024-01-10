<script>
    export let allLists
    export let handleDelete

    import SingleList from "./SingleList.svelte"

</script>

<div class="lists-container">
    {#if allLists}
        {#each allLists as list}
            <SingleList 
                list={list} 
                handleDelete={handleDelete}
            />
        {/each}
    {/if}
</div>