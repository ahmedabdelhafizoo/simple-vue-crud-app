<template>
  <div class="col-lg-6 m-auto">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)" class="card p-4 ">
        <h4 class="text-center text-muted mb-4">Test Form</h4>
        <div class="form-group">
          <ValidationProvider
            name="E-mail"
            rules="required|email"
            v-slot="{ errors }"
          >
            <input
              v-model="email"
              placeholder="email"
              type="email"
              class="form-control"
            />
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <ValidationProvider
            name="First Name"
            rules="required|alpha"
            v-slot="{ errors }"
          >
            <input
              v-model="firstName"
              placeholder="First Name"
              type="text"
              class="form-control"
            />
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <ValidationProvider
            name="Last Name"
            rules="required|alpha"
            v-slot="{ errors }"
          >
            <input
              v-model="lastName"
              placeholder="Last Name"
              type="text"
              class="form-control"
            />
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <ValidationProvider
            name="password"
            rules="required|min:6"
            v-slot="{ errors }"
            vid="confirmation"
          >
            <input
              v-model="password"
              placeholder="password"
              type="password"
              class="form-control"
            />
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <ValidationProvider
            name="Confirm password"
            rules="required|confirmed:confirmation"
            v-slot="{ errors }"
          >
            <input
              v-model="confirmPassword"
              placeholder="Confirm password"
              type="password"
              class="form-control"
            />
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <button type="submit" class="btn btn-primary col py-2">Submit</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  }),
  methods: {
    onSubmit() {
      alert("Form has been submitted!");
    }
  }
};
</script>

<style lang="scss" scoped>
span {
  display: block;
}
</style>
