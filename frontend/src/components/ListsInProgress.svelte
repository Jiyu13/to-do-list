<script>
    export let inProgressLists
    export let handleDelete

    import SingleList from "./SingleList.svelte"

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

