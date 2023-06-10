<template>
  <div class="admin-layout">
    <app-header></app-header>
    <div class="layout-main">
      <div class="p-grid">
        <div class="p-col-12">
          <div class="card">
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/layout/header.vue';
import AppFooter from '@/layout/footer.vue';
export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>
<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
