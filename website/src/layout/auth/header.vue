<template>
  <Menubar>
    <template #start>
      <img alt="uj class" @click="$router.push('/')" src="../../assets/logo.png" height="40" class="p-mr-2" />
    </template>
    <template #end>
      <button class="btn btn-header "  @click="$router.push('/login')">Login</button> |
      <button class="btn  btn-header btn-black " @click="$router.push('/')">Sign up</button>
    </template>
  </Menubar>
</template>

<script>
import Menubar from 'primevue/menubar';
export default {
  components: {
    Menubar,
  },
  name: 'app-header',
};
</script>
<style>
.btn-header {
  padding-top: 1px !important;
  padding-bottom: 1px !important;
  border-radius: 14px !important;
}
.btn-black {
  background-color: black !important;
  color: #fff !important;
}
</style>
