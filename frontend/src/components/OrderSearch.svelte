<script>
    import { pathname, allLists, inProgressLists, doneLists } from "../store.js";

    import listSrc from '../../public/icons/list_24.svg';

    let isOpen = false
    let searchBarinput = ""

    function handleFilterBySearch(targetLists) {
        const filterResult = targetLists.filter(l => {
            return l.name.toLowerCase().includes(searchBarinput.toLowerCase())
        })
        return filterResult
    }

    function handleSearchChange(value) {
		searchBarinput = value
        if ($pathname === '/completed') {
            if (searchBarinput === "") {
                return doneLists
            } else {
                doneLists.update(currentLists => handleFilterBySearch(currentLists))
            }
        } else if ($pathname === '/in-progress') {
            if (searchBarinput === "") {
                return inProgressLists
            } else {
                inProgressLists.update(currentLists => handleFilterBySearch(currentLists))
            }
        } else {
            console.log("all")
            if (searchBarinput === "") {
                return allLists
            } else {
                allLists.update(currentLists => handleFilterBySearch(currentLists))
            }
        }
    }
</script>
    <div class="left-navbar">

        <div position="relative">
            <div class="trigger-container">
                <div class="trigger-wrapper">
                    <img src={listSrc} alt="order by menu"/>
                    <div>Order by</div>
                </div>

                {#if isOpen }
                    <div class="options-box">
                        <div id="">Date, new to old</div>
                        <div id="">Date, old to new</div>
                        <div id="">Name, A - Z</div>
                        <div id="">Name, Z - A</div>

                    </div>
                {/if}

            </div>
         </div>
        <input
            class="search-bar"
            type="text"
            placeholder="search"
            on:input={(e) => handleSearchChange(e.target.value)}
        />
    </div>


<style>
.left-navbar{
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px; 
    width: 100%;
    justify-content: space-between;
    margin: 0 0 1rem 0;
}
.trigger-container{
    display: flex;
    justify-content: end;
    box-sizing: border-box;
    gap: 12px;
    border-radius: 4px;
    background-color: #fff; 
}
.trigger-wrapper{
    display: flex;
    justify-content: space-between;
    column-gap: 2px;
    margin: 8px;
}
</style>