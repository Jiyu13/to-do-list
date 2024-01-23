<script>
    import { searchTerm } from "../store.js";
    import MenuMobile from "./MenuMobile.svelte";

    import OrderBy from "./OrderBy.svelte";


    export let isMobile
    export let handleOpenAddList
    


    function handleSearchChange(value) {
		searchTerm.set(value)
    }
    
</script>
    <div class="left-navbar">
        {#if isMobile}
            <MenuMobile handleOpenAddList={handleOpenAddList}/>
        {/if}

        <OrderBy />
        
        <input
            class="search-bar"
            type="text"
            placeholder="search"
            bind:value={$searchTerm}
            on:input={(e) => handleSearchChange(e.target.value)}
        />
    </div>


<style></style>