<template>
  <div class="home">
    <div class="row">
      <!-- card -->
      <div
        class="col-sm-6 col-md-4 col-lg-3 mb-3"
        v-for="(i, index) in 1"
        :key="index"
      >
        <div class="card text-center shadow-sm">
          <div class="card-body">
            <i class="fas fa-utensils card-icon"></i>
            <h4 class="card-title">Recipes</h4>
          </div>
          <!-- link -->
          <router-link
            :to="{ name: 'RecipesList' }"
            class="card-link"
          ></router-link>
        </div>
      </div>
      <!-- end card -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  &-icon {
    font-size: 40px;
    color: #fff;
    background: #2d809b;
    padding: 10px;
    margin-bottom: 12px;
  }
  &-link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>

<script>
export default {
  name: "Kitchen",
  components: {}
};
</script>
