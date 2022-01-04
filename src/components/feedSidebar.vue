<template>
    <aside>
        <div class="sidebarHead">
            <strong>Recent winners</strong>
        </div>
        <li class="winnersList">
            <winner></winner>
            <winner></winner>
            <winner></winner>
            <winner></winner>
            <winner></winner>
            <winner></winner>
            <winner></winner>
            <winner></winner>
            <winner></winner>
        </li>
    </aside>
</template>

<script>
import winner from './recentWinner';
export default {
    name: 'sidebar',
    components: {
        winner,
    }
}

</script>
