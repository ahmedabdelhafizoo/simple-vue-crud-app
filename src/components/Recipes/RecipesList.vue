<template>
  <div>
    <!-- page nav -->
    <PageNav>
      <div slot="back-btn">
        <button class="btn back-btn" v-backBtn>
          <i class="fas fa-chevron-left"></i>
        </button>
      </div>
      <h4 slot="title" class="m-0">Recipes</h4>
      <button slot="nav-actions" class="btn btn-primary" @click="newRecipe">
        <i class="fas fa-plus-circle mr-2"></i> New Recipe
      </button>
    </PageNav>
    <!-- end page nav -->

    <div class="table-responsive">
      <template v-if="recipesList && recipesList.length > 0">
        <table class="table border mb-4">
          <thead>
            <tr class="gray-text">
              <th>id</th>
              <th>Dish Name</th>
              <th>Preparation time</th>
              <th class="table-action">View</th>
              <th class="table-action">Edit</th>
              <th class="table-action">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in recipesList" :key="item.id">
              <th scope="row">{{ item.id }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.time }}</td>
              <td class="gray-text table-action">
                <i
                  class="fas fa-eye table-icon"
                  @click="viewRecipe(item.id)"
                ></i>
              </td>
              <td class="gray-text table-action">
                <i
                  class="fas fa-pencil-alt table-icon"
                  @click="EditRecipe(item)"
                ></i>
              </td>
              <td class="gray-text table-action">
                <i
                  class="fas fa-trash table-icon"
                  @click="showConfirmDeleteModal(item)"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          align="center"
          @input="paginateRecipesList"
          hide-goto-end-buttons
        ></b-pagination>
      </template>
      <h6
        class="text-muted text-center mt-5"
        v-else-if="recipesList && recipesList.length == 0"
      >
        You can add new recipe!!
      </h6>
      <h6 class="text-muted text-center mt-5" v-else>
        Sorry try again later :)
      </h6>
    </div>

    <!-- view recipe modal -->
    <ViewRecipeModal :recipeItem="activeItem" />

    <!-- delete recipe modal -->
    <DeleteRecipe :itemId="activeItemId" @deleteRecipe="getRecipesList" />

    <!-- select dish modal -->
    <SelectDishModal />
  </div>
</template>
<style lang="scss" scoped>
.table {
  background: #fff;

  .gray-text {
    color: rgba(128, 128, 128, 0.7);
  }

  .table-icon {
    cursor: pointer;
    padding: 5px;
  }

  .table-action {
    width: 50px;
    text-align: center;
  }
}
</style>

<script>
import PageNav from "../layout/PageNav";
import ViewRecipeModal from "./viewRecipe";
import DeleteRecipe from "./DeleteRecipe";
import SelectDishModal from "./SelectDish";
import axios from "../../axios";
import { mapGetters } from "vuex";
export default {
  name: "RecipesList",
  components: {
    PageNav,
    ViewRecipeModal,
    DeleteRecipe,
    SelectDishModal
  },
  data() {
    return {
      recipesList: null,
      activeItem: {},
      perPage: 6,
      currentPage: 1,
      rows: 0
    };
  },
  computed: {
    activeItemId() {
      return this.activeItem.id;
    },
    ...mapGetters(["getAddRecipeStatus", "getEditRecipeStatus"])
  },
  created() {
    this.getRecipesList();
    console.log(this.getAddRecipeStatus);
    if (this.getAddRecipeStatus) {
      this.displayToast("item added successfully ", "Done", "success");
      this.$store.dispatch("toggleAddRecipeStatus");
    }
    if (this.getEditRecipeStatus) {
      this.displayToast("item edited successfully ", "Done", "success");
      this.$store.dispatch("toggleEditRecipeStatus");
    }
  },
  methods: {
    getRecipesList() {
      axios
        .get(`?_page=${this.currentPage}&_limit=${this.perPage}`)
        .then(res => {
          this.recipesList = res.data;
          console.log(res.data);
          this.rows = res.headers["x-total-count"];
        })
        .catch(err => {
          console.log(err.data);
        });
    },
    paginateRecipesList() {
      this.getRecipesList();
    },
    viewRecipe(id) {
      // axios.get(`/${id}`)
      //     .then(res => {
      //         console.log(res.data);
      //         this.activeItem = res.data;
      //         this.$bvModal.show('view-recipe-modal')
      //     })
      //     .catch(err => {
      //         console.log(err.data);
      //     });
      this.activeItem = this.recipesList.find(item => item.id == id);
      this.$bvModal.show("view-recipe-modal");
      console.log(id);
    },
    showConfirmDeleteModal(item) {
      this.activeItem = item;
      this.$bvModal.show("delete-recipe-modal");
    },
    newRecipe() {
      this.$bvModal.show("select-dish-modal");
    },
    EditRecipe(item) {
      this.$router.push({
        name: "EditRecipe",
        params: {
          dish: item
        }
      });
    }
  }
};
</script>
