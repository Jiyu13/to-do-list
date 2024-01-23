<script>
    import { Link } from 'svelte-routing'

    import {isMenuOpen} from "../store.js"

    import addSrc from '../../public/icons/add_24.svg';
    import listSrc from '../../public/icons/list_24.svg';
    import inProgressSrc from '../../public/icons/in_progress_24.svg';
    import doneSrc from '../../public/icons/done_24.svg';

    export let handleOpenAddList


    function handleOpenMenu() {
        $isMenuOpen = !$isMenuOpen
    }

</script>

<ul>
    <div position="relative">
        <div class="trigger-container">
            <div class="trigger-wrapper" on:click={handleOpenMenu} on:keydown={handleOpenMenu}>
                <img src={listSrc} alt="order by menu"/>
                <div>Menu</div>
            </div>

            {#if $isMenuOpen }
                <ul class="options-box">
                    <li class="option-item" on:click={handleOpenAddList} on:keydown={handleOpenAddList}>
                        <img src={addSrc} alt="add list icon"/>
                        <span>Add List</span>
                    </li>
                
                    <Link to="/" on:click={() => $isMenuOpen=false}>
                        <li class="option-item link">
                            <img src={listSrc} alt="all lists icon"/>
                            <span>All</span>
                        </li>
                    </Link>
                    
                    <Link to="/in-progress" on:click={() => $isMenuOpen=false}>
                        <li class="option-item link">
                            <img src={inProgressSrc} alt="lists in progress icon"/>
                            <span>In Progress</span>
                        </li>
                    </Link>
                    <Link to="/completed" on:click={() => $isMenuOpen=false}>
                        <li class="option-item link">
                            <img src={doneSrc} alt="lists done icon"/>
                            <span>Done</span>
                        </li>
                    </Link>
                    
                </ul>
            {/if}

        </div>
     </div>
</ul>


<style>
    .trigger-container {
        display: flex;
        justify-content: end;
        box-sizing: border-box;
        /* margin: 8rem 0 0; */
        /* gap: 12px; */
    }

    .trigger-wrapper {
        display: flex;
        justify-content: space-between;
        column-gap: 2px;
        margin: 0;
        padding: 8px;
    }

    .options-box {
        padding: 0;
        margin: 0;
        background-color: white;
        width: 8rem;
        list-style: none;
        /* border: 1px solid #282c34; */
        box-sizing: border-box;
        position: absolute;
        top: 215px;
        left: 10px;
        z-index: 1000;
        border-radius: 4px;
        /* padding: 8px; */
    }

    .option-item {
        padding: 8px;
        display: flex;
        justify-content: start;
        gap: 8px;
    }
    .option-item.link{
        padding: 8px;
    }
    .option-item:hover {
        background-color: rgb(255, 181, 52);
        cursor: pointer;
    }
    .option-item:hover:first-child {
    border-top-left-radius: 4px; /* Adjust the value as needed */
    border-top-right-radius: 4px; /* Adjust the value as needed */
    }

    .option-item:hover:last-child {
    border-bottom-left-radius: 4px; /* Adjust the value as needed */
    border-bottom-right-radius: 4px; /* Adjust the value as needed */
    }

</style>