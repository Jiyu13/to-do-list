<script>
    import {onMount} from "svelte"

    import {isOrderByOpen, isMenuOpen, pathname, allLists, inProgressLists, doneLists,} from "../store.js"
    import listSrc from '../../public/icons/list_24.svg';
    import { handleCloseModal } from "../hooks.js";


    function handleOpenOrderBy() {
        $isOrderByOpen = !$isOrderByOpen
        $isMenuOpen = false
    }

    function sortByDate(targetList, orderBy, InOrder) {
        let prevItem
        let nextItem
        if (InOrder === "asc") {
            targetList.update(currentLists => currentLists.sort((a, b) => {

                if (orderBy === "name") {
                    prevItem = a[orderBy].toLowerCase()
                    nextItem = b[orderBy].toLowerCase()
                } else {
                    prevItem = a[orderBy]
                    nextItem = b[orderBy]
                }
                // console.log(a[orderBy] < $localTime, a)
                // console.log(b[orderBy]< $localTime, b)
                if (prevItem < nextItem) {
                        return -1
                    } else {
                        return 1
                    }
                }))
        } else {
            targetList.update(currentLists => currentLists.sort((a, b) => {
                if (orderBy === "name") {
                    prevItem = a[orderBy].toLowerCase()
                    nextItem = b[orderBy].toLowerCase()
                } else {
                    prevItem = a[orderBy]
                    nextItem = b[orderBy]
                }
                // console.log(a[orderBy] < localTime, a)
                // console.log(b[orderBy]< localTime, b)
                if (prevItem < nextItem) {
                        return 1
                } else {
                    return -1
                }
            }))
        }
    }


    function handleOrderBy(e) {
        const sortID = e.target.id
        if (sortID === "date-asc") {
            if ($pathname === '/completed') {
                sortByDate(doneLists, "dueBy", "asc")
                // console.log($doneLists)
                // $doneLists.forEach(e => console.log(e.dueBy > $localTime, isDue))

            } else if ($pathname === '/in-progress') {
                sortByDate(inProgressLists, "dueBy", "asc")
                // console.log($inProgressLists)
                // $inProgressLists.forEach(e => console.log(e.dueBy > $localTime, isDue))
            } else {
                sortByDate(allLists, "dueBy", "asc")
                // console.log($allLists)
                // $allLists.forEach(e => console.log(e.completed, e.dueBy < $localTime))
            } 

        } else  if (sortID === "date-desc") {
            if ($pathname === '/completed') {
                sortByDate(doneLists, "dueBy", "desc")
            } else if ($pathname === '/in-progress') {
                sortByDate(inProgressLists, "dueBy", "desc")

            } else {
                sortByDate(allLists, "dueBy", "desc")
            } 

        } else  if (sortID === "name-asc") {
            if ($pathname === '/completed') {
                sortByDate(doneLists, "name", "asc")
            } else if ($pathname === '/in-progress') {
                sortByDate(inProgressLists, "name", "asc")

            } else {
                sortByDate(allLists, "name", "asc")
            } 
        } else {
            if ($pathname === '/completed') {
                sortByDate(doneLists, "name", "desc")
            } else if ($pathname === '/in-progress') {
                sortByDate(inProgressLists, "name", "desc")
            } else {
                sortByDate(allLists, "name", "desc")
            } 
        }
    }

    let orderByRef
    onMount(() => {
        const unsubscribe = handleCloseModal(
            orderByRef, isOrderByOpen
        )
        return unsubscribe
    })
</script>

<div position="relative" bind:this={orderByRef}>
    <div class="trigger-container">
        <div 
            class="trigger-wrapper" 
            on:click={handleOpenOrderBy} 
            on:keydown={handleOpenOrderBy}
        >
            <img src={listSrc} alt="order by"/>
            <div>Order by</div>
        </div>

        {#if $isOrderByOpen }
            <ul class="options-box order-by">
                <li 
                    class="option-item order-by" 
                    id="date-asc" 
                    on:click={handleOrderBy} 
                    on:keydown={handleOrderBy}
                >
                    Due date, ascend
                </li>
                <li 
                    class="option-item order-by" 
                    id="date-desc"
                    on:click={handleOrderBy} 
                    on:keydown={handleOrderBy}
                >
                    Due date, descend
                </li>
                <li 
                    class="option-item order-by" 
                    id="name-asc"
                    on:click={handleOrderBy} 
                    on:keydown={handleOrderBy}
                >
                    Name, A - Z
                </li>
                <li 
                    class="option-item order-by" 
                    id="name-desc"
                    on:click={handleOrderBy} 
                    on:keydown={handleOrderBy}
                >
                    Name, Z - A
                </li>

            </ul>
        {/if}

    </div>
 </div>

 <style>
    .options-box.order-by {
        padding: 0;
        margin: 0;
        background-color: white;
        width: 9.5rem;
        list-style: none;
        box-sizing: border-box;
        position: absolute;
        top: 215px;
        left: 100px;
        z-index: 1000;
        border-radius: 4px;
    }

    .option-item.order-by{
	padding: 0.58rem;
}
 </style>