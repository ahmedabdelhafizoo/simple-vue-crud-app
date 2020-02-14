<template>
  <div>
    <b-modal id="delete-recipe-modal" hide-footer hide-header centered>
      <h6 class="mt-3">Are you sure you want to delete this recipe ?</h6>
      <div>
        <button
          class="mt-3 mr-2 btn btn-link"
          @click="$bvModal.hide('delete-recipe-modal')"
        >
          No
        </button>
        <button class="mt-3 btn btn-link text-danger" @click="deleteRecipe">
          Yes
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "../../axios";
export default {
  name: "DeleteRecipeModal",
  props: ["itemId"],
  methods: {
    deleteRecipe() {
      this.$bvModal.hide("delete-recipe-modal");
      axios
        .delete(`/${this.itemId}`)
        .then(res => {
          console.log(res);
          this.displayToast("item deleted successfully ", "Done", "success");
          this.$emit("deleteRecipe");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
