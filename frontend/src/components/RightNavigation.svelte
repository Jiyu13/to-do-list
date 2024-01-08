<script>
    import addSrc from '../../public/icons/add_24.svg';
    import listSrc from '../../public/icons/list_24.svg';
    import inProgressSrc from '../../public/icons/in_progress_24.svg';
    import doneSrc from '../../public/icons/done_24.svg';

    export let handleAddLists
    export let handleAllLists
    export let handleInProgressLists
    export let handleDoneLists

    

</script>

<div class="right">
    <div class="nav-item" on:click={handleAddLists}>
        <img src={addSrc} alt="add list icon"/>
        Add List
    </div>
    
    <div class="nav-item" on:click={handleAllLists}>
        <img src={listSrc} alt="all lists icon"/>
        All
    </div>
    
    <div class="nav-item" on:click={handleInProgressLists}>
        <img src={inProgressSrc} alt="lists in progress icon"/>
        In Progress
    </div>
    
    <div class="nav-item" on:click={handleDoneLists}>
        <img src={doneSrc} alt="lists done icon"/>
        Done
    </div>
</div>


<style>

    .right {
        background-color: white;
        border-radius: 12px;
        padding: 12px;
        height: fit-content;
    }

    .nav-item {
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 12px 8px;
        gap: 12px;
        cursor: pointer;
    }
    div.nav-item:hover {
        background-color: rgb(255, 181, 52);
        border-radius: 10px;
    }

</style>