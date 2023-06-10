<template>
  <div class="login_body">
    <div class="login text-center">
      <img src="@/assets/logo.png" alt="logo" />
      <b-form @submit.prevent="loginForm" method="post">
        <b-form-group>
          <b-form-input
            v-model="user.userName"
            placeholder="User Name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="password"
            v-model="user.password"
            placeholder="Password"
            required
          ></b-form-input>
        </b-form-group>

        

        <b-button type="submit" squared block variant="info">Login</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        userName: null,
        password: null,
      },
    };
  },

  methods: {
    loginForm() {
      if (
        this.user.userName &&
        this.user.password 
        
      ) {
        this.$http.post(`auth/adminLogin`, this.user).then(
          (response) => {
            localStorage.ujclassAdmin = JSON.stringify(response.data);

            location.reload();
          },
          (err) => {
            this.$toast.add({
              severity: 'error',
              summary: 'هناك خطأ',
              detail: err.response.data.message,
              life: 3000,
            });
          },
        );
      }
    },
  },
  created() {
  
    
  },
};
</script>

<style scoped>
.login_body {
  height: 100vh;
  background-image: url('../assets/class-size.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'DroidArabicKufiRegular', 'Cairo', sans-serif;
}
.login {
  width: 600px;
  height: 370px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
}
.login img {
  width: 15%;
  margin-bottom: 13px;
}
</style>
