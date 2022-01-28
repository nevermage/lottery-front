<template>
  <div>
    <sidebar />
    <feed-lots-list />
  </div>
</template>

<script>
import feedLotsList from '../components/feedLotsList';
import sidebar from '../components/feedSidebar';

export default {
  components: {
    feedLotsList,
    sidebar
  }
}

</script>
