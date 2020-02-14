<template>
  <div class="row justify-content-between mb-4">
    <div class="col d-flex align-items-center">
      <slot name="back-btn"></slot>
      <slot name="title"></slot>
    </div>
    <div class="px-3">
      <slot name="nav-actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNav"
};
</script>
