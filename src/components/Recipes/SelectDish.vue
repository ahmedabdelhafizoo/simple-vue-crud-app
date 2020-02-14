<template>
  <div>
    <b-modal
      id="select-dish-modal"
      hide-footer
      hide-header
      centered
      size="lg"
      body-class="p-0"
      @hidden="resetModal"
    >
      <div class="d-flex bg-dark align-items-center rounded-top mb-3 p-3">
        <h6 class="text-light mr-3 mb-0">Select Dish</h6>
        <input
          type="text"
          class="form-control col"
          placeholder="search.."
          v-model="searchValue"
        />
      </div>
      <!-- dishs -->
      <div class="dishs-container px-3">
        <div class="row">
          <div
            class="col-6 col-lg-4"
            v-for="dish in filteredDishs"
            :key="dish.name"
          >
            <div class="card">
              <div class="card-iamge">
                <img :src="dish.image" alt="dish image" width="100%" />
              </div>
              <div class="card-footer p-2">
                <h6>{{ dish.name }}</h6>
                <div class="d-flex justify-content-between align-items-center">
                  {{ dish.type }}
                  <b-form-radio
                    v-model="selectedDish"
                    :value="dish"
                    :id="dish.name"
                  ></b-form-radio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end dishs -->
      <div class="text-center my-3">
        <button class="mt-4 mr-2 btn btn-success rounded-btn" @click="saveDish">
          save
        </button>
        <button
          class="mt-4 btn btn-outline-secondary rounded-btn"
          @click="$bvModal.hide('select-dish-modal')"
        >
          Cancel
        </button>
      </div>
    </b-modal>
  </div>
</template>

<style lang="scss" scoped>
.dishs-container {
  max-height: 500px;
  overflow: auto;
}
</style>

<script>
export default {
  name: "SelectDishModal",
  data() {
    return {
      selectedDish: "",
      searchValue: "",
      dishs: [
        {
          image: "http://dummyimage.com/200x130.png/5fa2dd/ffffff",
          name: "First Dish",
          type: "single",
          size: "Large"
        },
        {
          image: "http://dummyimage.com/200x130.png/ff4444/ffffff",
          name: "second Dish",
          type: "double",
          size: "Mini"
        }
      ]
    };
  },
  computed: {
    filteredDishs() {
      return this.dishs.filter(dish =>
        dish.name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }
  },
  methods: {
    saveDish() {
      if (this.selectedDish) {
        this.$router.push({
          name: "CreateRecipe",
          params: { dish: this.selectedDish }
        });
      } else {
        this.displayToast("please select dish first !! ", "Error", "danger");
      }
    },
    resetModal() {
      this.selectedDish = "";
    }
  }
};
</script>
