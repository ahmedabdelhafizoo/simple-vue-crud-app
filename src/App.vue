<template>
  <div id="app">
    <!-- header -->
    <AppHeader />

    <!-- loading overlay -->
    <LoadingOverlay v-if="loadingStatus" />

    <!-- main content -->
    <div class="container main-content py-5">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
body {
  background: #f8f9fa !important;
}
</style>

<script>
import AppHeader from "./components/layout/AppHeader";
import LoadingOverlay from "./components/layout/LoadingOverlay";
export default {
  components: {
    AppHeader,
    LoadingOverlay
  },
  computed: {
    loadingStatus() {
      return this.$store.getters.getLoadingStatus;
    }
  }
};
</script>
