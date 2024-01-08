<script>
    export let allLists
    export let handleDelete

    import SingleList from "./SingleList.svelte"

</script>

<div class="lists-container">
    {#each allLists as list}
        <SingleList 
            list={list} 
            handleDelete={handleDelete}
        />
    {/each}
</div>

<style>
    .lists-container {
		display: flex;
		gap: 12px;
		flex-direction: column;
		overflow-y: auto; 
		max-height: 70vh;
	}
</style>