<script>
    const date = new Date();
    const today = {
		dayNumber: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear(),
	}

    const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthIndex = date.getMonth();
    $: month = monthNames[monthIndex];

    let year = date.getFullYear();

    // Get the first day (sun ... sat) of the month 
    $: firstDayIndex = new Date(year, monthIndex, 1).getDay();
    // Get the last date of the month - (year, month, day)
    $: numberOfDays = new Date(year, monthIndex+1, 0).getDate();
    // current month days + days from prev month that appear in the first row
    $: calendarCellsQty = numberOfDays + firstDayIndex;

    // Get the day of the last date of the month
    $: lastDayIndex =  new Date(year, monthIndex, numberOfDays).getDay();
    // Get the last date of the previous month
    $: lastDatePrevMonth = new Date(year, monthIndex, 0).getDate();

    // Get the first days from next month that appear in the last row
    // +7 is to make it up to 6 rows in total
    $: firstDayNextMonth = new Date(year, monthIndex+1, 1).getDay();
    $: firstDaysNextMonth = 6 - lastDayIndex



    
    const goToNextMonth = () => {
        selectedDate = null

		if (monthIndex >= 11) {
			year += 1;
			return monthIndex = 0;
		}
		return monthIndex += 1;
	}

    const goToPrevMonth = () => {
        selectedDate = null

		if (monthIndex <= 0) {
			year -= 1;
			return monthIndex = 11;
		}
		return monthIndex -= 1;
	}

    let selectedDate = null
    let todayFormatted = `${today.year}-${today.month+1}-${today.dayNumber}`
    const selectDate = (e) => {
        todayFormatted = `${today.year}-${today.month+1}-${e.target.innerText}`
        selectedDate = e.target.innerText
    }
    
    // import { onMount } from "svelte"
    // onMount(() => {
    //     console.log(year);
    // });
</script>

<input class="date-container" bind:value={todayFormatted}/>
<div class="calendar-container">
    <header class="calendar-header">
        <p class="calendar-current-date">{month} {year}</p>
        <div class="calendar-navigation">
            <span class="calendar-prev" on:click={goToPrevMonth} on:keydown={goToPrevMonth}>&#10094;</span>
            <span class="calendar-next" on:click={goToNextMonth} on:keydown={goToNextMonth}>&#10095;</span>
        </div>
    </header>

    <div class="calendar-body">
        <ul class="calendar-weekdays">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
        </ul>
        <ul class="calendar-dates">
            {#each Array(calendarCellsQty) as _, i}
                {#if i < firstDayIndex || i >= numberOfDays+firstDayIndex  }
                    <li class="inactive">{(lastDatePrevMonth - (firstDayIndex - i) + 1)}</li>
                {:else}
                    <li class:active={
                            i === today.dayNumber+(firstDayIndex-1) &&
                            monthIndex === today.month &&
                            year === today.year
                        }
                        class:selected={(i - firstDayIndex) + 1 == selectedDate}
                        on:click={(e) => selectDate(e)}
                        on:keydown={(e) => selectDate(e)}
                    >
                        {(i - firstDayIndex) + 1}
                    </li>
                {/if}
            {/each}
            
            {#each Array(firstDaysNextMonth + 7) as _, i}
                {#if firstDayNextMonth <= 6 && calendarCellsQty + i <  42}
                    <li class="inactive">{(i + 1)}</li>
                {/if}
            {/each}
        </ul>
    </div>
</div>

<style>
.date-container{
    margin-bottom: 0.5rem;
    padding: 8px;
}
.calendar-container {
    background: #fff;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
    padding-bottom: 15px;
}
 
.calendar-container header {
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
}
 
header .calendar-navigation {
    display: flex;
}
 
header .calendar-navigation span {
    height: 33px;
    width: 33px;
    margin: 0 1px;
    cursor: pointer;
    text-align: center;
    line-height: 33px;
    border-radius: 50%;
    user-select: none;
    color: #aeabab;
    font-size: 1.3rem;
}
 
.calendar-navigation span:last-child {
    margin-right: -5px;
}
 
header .calendar-navigation span:hover {
    background: #f2f2f2;
}
 
header .calendar-current-date {
    margin: 0px;
    /* font-weight: 500; */
    font-size: 1rem;
}
 
.calendar-body {
    padding: 0px;
}
 
.calendar-body ul {
    list-style: none;
    flex-wrap: wrap;
    display: flex;
    text-align: center;
}
 
.calendar-body li {
    width: calc(100% / 7);
    font-size: 0.9rem;
    color: #414141;
}

ul.calendar-weekdays, 
ul.calendar-dates {
    margin: 0px;
    padding-left: 0px;
}
.calendar-body .calendar-weekdays li {
    cursor: default;
    font-weight: 500;
}
 
.calendar-body .calendar-dates li {
    margin-top: 15px;
    position: relative;
    z-index: 1;
    cursor: pointer;
}
 
.calendar-dates li.inactive {
    color: #aaa;
}
 
.calendar-dates li.active {
    color: #fff;
}
 
.calendar-dates li::before {
    position: absolute;
    content: "";
    z-index: -1;
    top: 50%;
    left: 50%;
    width: 33px;
    height: 33px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}
 
.calendar-dates li.active::before {
    background: #6332c5;
}
 
.calendar-dates li:not(.active):hover::before {
    background: #e4e1e1;
}
.calendar-dates li:not(.active).selected::before {
    border: 2px solid #6332c5;
    box-sizing: border-box;
}
</style>