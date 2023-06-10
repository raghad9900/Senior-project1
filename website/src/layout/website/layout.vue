<template>
  <div>
    <app-header />

    <div class="row" style="overflow: hidden;margin: 0;">
      <div class="col-1 sidebar p-3 text-center ">
        <div v-if="type == 1">
          <i class="fa-solid fa-house" @click="$router.push('/console')"></i>
          <br />
          <br />
          <i
            class="fa-regular fa-calendar"
            @click="$router.push('/console/calendar')"
          ></i>
          <br />
          <br />

          <i
            class="fa-solid fa-plus"
            @click="$router.push('/console/addIssues')"
          ></i>
        </div>

        <div v-if="type == 2">
          <i
            class="fa-solid fa-house"
            @click="$router.push('/console/tech')"
          ></i>
          <br />
          <br />
          <i
          class="fa-solid fa-wrench"
            @click="$router.push('/console/list')"
          ></i>
        </div>

        <div class="footer-icon">
          <i class="fas fa-info-circle"></i>
        </div>
      </div>
      <div class="col-11">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/layout/website/header.vue';
export default {
  components: {
    AppHeader,
  },
  date() {
    return {
      type: 0,
    };
  },
  created() {
    const user = JSON.parse(localStorage.ujclassUser);
    this.type = user.type;
  },
};
</script>
<style>
.sidebar {
  background-color: #fff;
  height: 100vh;

  color: #495057;
  box-shadow: 0 2px 10px #03030310;
}
.sidebar i {
  font-size: 36px;
  margin-bottom: 20px;
  color: #777676;
}
.footer-icon {
  color: #777676;
  margin-top: auto;
  bottom: 0;
  position: fixed;
  padding-left: 20px;
}
</style>
