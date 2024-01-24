<script>
    import { Link } from 'svelte-routing'
    import {onMount} from "svelte"
    import {handleCloseModal} from "../hooks.js"

    import {isMenuOpen, isOrderByOpen} from "../store.js"

    import addSrc from '../../public/icons/add_24.svg';
    import listSrc from '../../public/icons/list_24.svg';
    import inProgressSrc from '../../public/icons/in_progress_24.svg';
    import doneSrc from '../../public/icons/done_24.svg';

    export let handleOpenAddList


    function handleOpenMenu() {
        $isMenuOpen = !$isMenuOpen
        $isOrderByOpen = false
    }

    let menuRef
    onMount(() => {
        const unsubscribe = handleCloseModal(
            menuRef, isMenuOpen
        );

        return unsubscribe
    })
</script>

<ul>
    <div position="relative" bind:this={menuRef}>
        <div class="trigger-container">
            <div class="trigger-wrapper" on:click={handleOpenMenu} on:keydown={handleOpenMenu}>
                <img src={listSrc} alt="menu"/>
                <div>Menu</div>
            </div>

            {#if $isMenuOpen }
                <ul class="options-box menu">
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
.options-box.menu {
	padding: 0;
	margin: 0;
	background-color: white;
	width: 8rem;
	list-style: none;
	box-sizing: border-box;
	position: absolute;
	top: 215px;
	left: 10px;
	z-index: 1000;
	border-radius: 4px;
}

</style>