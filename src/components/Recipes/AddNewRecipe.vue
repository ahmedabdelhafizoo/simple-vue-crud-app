<template>
  <div>
    <Recipeform mode="create" :dish="dish" />
  </div>
</template>

<script>
// import PageNav from "../layout/PageNav";
import Recipeform from "./RecipeForm";
// import axios from "../../axios";
export default {
  name: "CreateRecipe",
  props: ["dish"],
  created() {
    if (this.dish) {
      console.log(this.dish);
    } else {
      this.$router.push({
        name: "RecipesList"
      });
    }
  },
  components: {
    Recipeform
  }
};
</script>
