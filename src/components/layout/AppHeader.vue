<template>
  <div>
    <b-navbar toggleable="lg" type="light" class="shadow-sm">
      <div>
        <!-- <i class="fas fa-bars ml-2 mr-3 menu-icon"></i> -->
        <router-link to="/" class="navbar-brand">Kitchen</router-link>
      </div>
    </b-navbar>
  </div>
</template>
<style lang="scss" scoped>
.navbar {
  background: #fff;
}
.menu-icon {
  cursor: pointer;
}
</style>

<script>
export default {
  name: "appHeader"
};
</script>
