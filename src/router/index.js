import Vue from "vue";
import VueRouter from "vue-router";
import Kitchen from "../views/Kitchen.vue";
import testForm from "../views/testForm.vue";
import RecipesList from "../components/Recipes/RecipesList.vue";
import CreateRecipe from "../components/Recipes/AddNewRecipe.vue";
import EditRecipe from "../components/Recipes/EditRecipe.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/testForm",
    name: "testForm",
    component: testForm
  },
  {
    path: "/",
    name: "Kitchen",
    component: Kitchen
  },
  {
    path: "/Recipes",
    name: "RecipesList",
    component: RecipesList
  },
  {
    path: "/Recipes/create",
    name: "CreateRecipe",
    component: CreateRecipe,
    props: true,
  },
  {
    path: "/Recipes/Edit",
    name: "EditRecipe",
    component: EditRecipe,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;