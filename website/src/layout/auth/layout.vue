<template>
  <div>
    <app-header />

    <router-view />
  </div>
</template>

<script>
import AppHeader from '@/layout/auth/header.vue';
export default {
  components: {
    AppHeader,
  },
};
</script>
