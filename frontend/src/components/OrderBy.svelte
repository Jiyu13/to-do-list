<script>
    import listSrc from '../../public/icons/list_24.svg';
    let isOpen = false
</script>

<div position="relative">
    <div class="trigger-container">
        <div class="trigger-wrapper">
            <img src={listSrc} alt="order by menu"/>
            <div>Order by</div>
        </div>

        {#if isOpen }
            <ul class="options-box">
                <li id="">Date, new to old</li>
                <li id="">Date, old to new</li>
                <li id="">Name, A - Z</li>
                <li id="">Name, Z - A</li>

            </ul>
        {/if}

    </div>
 </div>