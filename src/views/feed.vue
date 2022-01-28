<template>
  <div>
    <sidebar />
    <feed-main />
  </div>
</template>

<script>
import feedMain from '../components/feedMain';
import sidebar from '../components/feedSidebar';

export default {
  components: {
    feedMain,
    sidebar
  }
}

</script>
