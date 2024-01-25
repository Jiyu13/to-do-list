<script>
    import {isOrderByOpen, isMenuOpen, pathname, allLists, inProgressLists, doneLists,} from "../store.js"
    import listSrc from '../../public/icons/list_24.svg';


    function handleOpenOrderBy() {
        $isOrderByOpen = !$isOrderByOpen
        $isMenuOpen = false
    }

    function sortByDate(targetList, orderBy, InOrder) {
        if (InOrder === "asc") {
            targetList.update(currentLists => currentLists.sort((a, b) => {
                // console.log(a[orderBy] < $localTime, a)
                // console.log(b[orderBy]< $localTime, b)
                if (a[orderBy] < b[orderBy]) {
                        return -1
                    } else {
                        return 1
                    }
                }))
        } else {
            targetList.update(currentLists => currentLists.sort((a, b) => {
                // console.log(a[orderBy] < localTime, a)
                // console.log(b[orderBy]< localTime, b)
                if (a[orderBy] < b[orderBy]) {
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

        } else  if (sortID === "date-des") {
            if ($pathname === '/completed') {
                sortByDate(doneLists, "dueBy", "des")
                // console.log($doneLists)
            } else if ($pathname === '/in-progress') {
                sortByDate(inProgressLists, "dueBy", "des")
                // console.log($inProgressLists)

            } else {
                sortByDate(allLists, "dueBy", "des")
                console.log($allLists)
            } 

        } else  if (sortID === "name-asc") {

        } else {}
    }
</script>

<div position="relative">
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
                    id="date-des"
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
                    id="name-des"
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