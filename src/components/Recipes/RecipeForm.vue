<template>
  <div>
    <div>
      <!--page nav-->
      <PageNav>
        <div slot="back-btn">
          <button class="btn back-btn" v-backBtn>
            <i class="fas fa-chevron-left"></i>
          </button>
        </div>
      </PageNav>
      <!--end page nav-->

      <form class="col-lg-10 m-auto" @submit.prevent="submitFunc">
        <h5>{{ mode == "create" ? "Create Recipe" : "Edit Recipe" }}</h5>
        <div class="card p-3 mt-3 recipe-modal">
          <h5 class="text-primary">{{ recipe.name }}</h5>
          <div class="card">
            <b-tabs v-model="tabIndex">
              <b-tab
                v-for="(size, index) in recipe.sizes"
                :key="index"
                :title="size.name"
              >
                <b-card-text class="tab-content">
                  <h6>ingredients</h6>
                </b-card-text>
                <template v-if="size.ingredients.length > 0">
                  <div
                    class="d-flex align-items-center justify-content-between py-2 border-bottom"
                    v-for="(item, i) in size.ingredients"
                    :key="i"
                  >
                    <span class="col">name: {{ item.name }}</span>
                    <span class="col">Qty: {{ item.quantity }}</span>
                    <i
                      class="fas fa-trash ml-2 add-icon"
                      @click="deleteSize(i)"
                    ></i>
                  </div>
                </template>
                <div
                  class="d-flex align-items-center justify-content-between mb-3"
                >
                  <input
                    type="text"
                    class="form-control col"
                    placeholder="name"
                    v-model="ingredientName"
                  />
                  <input
                    type="number"
                    class="form-control col ml-2"
                    placeholder="quantity"
                    v-model="ingredientQuantity"
                  />
                  <i
                    class="fas fa-plus-circle ml-2 add-icon"
                    @click="addSize"
                  ></i>
                </div>
              </b-tab>
            </b-tabs>
          </div>
          <h6 class="mt-4">Recipe instructions:</h6>
          <textarea
            class="form-control"
            rows="3"
            placeholder="Add  Recipe instructions"
            v-model="recipe.instructions"
          ></textarea>
          <h6 class="mt-4">Recipe image:</h6>
          <div class="d-flex flex-wrap">
            <label
              class="upload-input mr-3 d-flex align-items-center justify-content-center text-center"
            >
              <input type="file" accept="image/*" @change="uploadeImage" />
              <span>
                <i class="fas fa-cloud-upload-alt"></i>
                <strong class="d-block">Choose image</strong>
              </span>
            </label>
            <img
              :src="recipe.image"
              alt="recipe image"
              v-if="recipe.image"
              width="200"
              height="180"
            />
          </div>
          <h6 class="mt-4">Recipe Time:</h6>
          <div class="d-flex align-items-center">
            <input
              type="number"
              class="form-control col mr-2"
              placeholder="time"
              v-model="recipe.time"
            />
            Min
          </div>
          <div class="text-center my-3">
            <button class="mt-4 mr-2 btn btn-success rounded-btn">save</button>
            <button
              type="button"
              class="mt-4 btn btn-outline-secondary rounded-btn"
              v-backBtn
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-icon {
  padding: 5px;
  cursor: pointer;
}

.upload-input {
  width: 200px;
  height: 180px;
  border: 1px dashed #000;
  cursor: pointer;

  input {
    display: none;
  }
}
</style>

<script>
import PageNav from "../layout/PageNav";
import axios from "../../axios";

export default {
  name: "RecipeForm",
  props: ["dish", "mode"],
  created() {
    if (this.dish) {
      console.log(this.dish);
    } else {
      this.$router.push({
        name: "RecipesList"
      });
    }

    if (this.mode == "edit") {
      this.recipe = {
        ...this.dish
      };
    } else {
      this.recipe = {
        name: this.dish.name,
        time: "",
        image: "",
        instructions: "",
        sizes: [
          {
            name: "Mini",
            ingredients: []
          },
          {
            name: "Small",
            ingredients: []
          },
          {
            name: "Large",
            ingredients: []
          }
        ]
      };
    }
  },
  data() {
    return {
      ingredientName: "",
      ingredientQuantity: "",
      recipe: "",
      tabIndex: 0
    };
  },
  components: {
    PageNav
  },
  methods: {
    addSize() {
      console.log("click", this.ingredientName, this.ingredientQuantity);

      if (this.ingredientName && this.ingredientQuantity) {
        this.recipe.sizes[this.tabIndex].ingredients.push({
          name: this.ingredientName,
          quantity: this.ingredientQuantity + " gram"
        });
        this.ingredientName = "";
        this.ingredientQuantity = "";
      }
    },
    deleteSize(index) {
      this.recipe.sizes[this.tabIndex].ingredients.splice(index, 1);
    },
    uploadeImage(e) {
      let reader = new FileReader();
      console.log(e.target.files[0]);

      reader.onloadend = () => {
        this.recipe.image = reader.result;
      };

      reader.readAsDataURL(e.target.files[0]);
    },
    saveRecipe() {
      axios
        .post(`/`, this.recipe)
        .then(res => {
          console.log(res);
          this.$store.dispatch("toggleAddRecipeStatus");
          this.$router.push({
            name: "RecipesList"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    EditRecip() {
      axios
        .put(`/${this.recipe.id}`, this.recipe)
        .then(res => {
          console.log(res);
          this.$store.dispatch("toggleEditRecipeStatus");
          this.$router.push({
            name: "RecipesList"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitFunc() {
      this.mode == "create" ? this.saveRecipe() : this.EditRecip();
    }
  }
};
</script>
