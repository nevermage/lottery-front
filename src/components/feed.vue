<template>
  
    <div>
        <sidebar></sidebar>
        <feed-main></feed-main>
    </div>
</template>

<script>
import feedMain from './feedMain';
import sidebar from './feedSidebar';
export default {
    components: {
        feedMain,
        sidebar
    }
}

</script>
