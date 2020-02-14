<template>
  <div>
    <div>
      <b-modal
        id="view-recipe-modal"
        hide-footer
        hide-header
        centered
        size="lg"
        modal-class="recipe-modal"
      >
        <div>
          <h5 class="text-primary mb-3">{{ recipeItem.name }}</h5>
          <div class="card">
            <b-tabs>
              <b-tab
                v-for="(size, index) in recipeItem.sizes"
                :key="index"
                :title="size.name"
              >
                <b-card-text class="tab-content">
                  <h6>ingredients</h6>
                  <p
                    class="d-flex"
                    v-for="(item, index) in size.ingredients"
                    :key="index"
                  >
                    <span class="mr-4">{{ item.name }}</span>
                    <span>{{ item.quantity }}</span>
                  </p>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </div>
          <div v-if="recipeItem.instructions">
            <h6 class="mt-4">Recipe instructions :</h6>
            <p>{{ recipeItem.instructions }}</p>
          </div>

          <div v-if="recipeItem.image">
            <h6 class="mt-4">Recipe image</h6>
            <img
              :src="recipeItem.image"
              alt="recipe-image"
              width="150"
              height="150"
            />
          </div>

          <div v-if="recipeItem.time">
            <h6 class="mt-4">Recipe time :</h6>
            <p>{{ recipeItem.time }}</p>
          </div>
        </div>
        <div class="text-center">
          <button
            class="mt-3 btn btn-outline-secondary rounded-btn"
            @click="$bvModal.hide('view-recipe-modal')"
          >
            Close
          </button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewRecipeModal",
  props: ["recipeItem"]
};
</script>
