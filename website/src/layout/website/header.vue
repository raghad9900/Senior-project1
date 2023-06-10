<template>
  <Menubar>
    <template #start>
      <img
        alt="uj class"
        @click="$router.push('/')"
        src="../../assets/wicon.png"
        height="40"
        class="p-mr-2"
      />
      <div class="eWmHWO">|</div>
      <span class="home_logo_text">
        Home
      </span>
    </template>
    <template #end>
      <!-- <i class="fas fa-bell"></i> -->
      <b-dropdown
        variant="link"
        @show="showNotifications"
        toggle-class="text-decoration-none notfy"
        :right="true"
        no-caret
      >
        <template #button-content>
          <span v-if="!lockNofy">
            <i
              class="fa fa-bell mr-3 d-inline-block"
              aria-hidden="true"
              v-if="notificationsCount == 0"
            ></i>
            <i
              v-else
              class="fa fa-bell mr-3 d-inline-block"
              aria-hidden="true"
              badgeClass="p-badge-custom"
              v-badge.danger="notificationsCount"
            ></i>
          </span>
        </template>
        <b-dropdown-item
          v-for="item of notificationsList"
          :key="item._id"
          :to="'/console/showIssues/' + item._id"
        >
          <div class="ms-2 me-auto" v-if="item.commentsId">
            <div class="fw-bold" style="font-weight: bold;">
              {{ item.body }}
            </div>
            #{{ item.issueId.id }} - {{ item.commentsId.body }}
          </div>
          <div class="ms-2 me-auto" v-else>
            <div class="fw-bold" style="font-weight: bold;">
              {{ item.body }}
            </div>
            #{{ item.issueId.id }} - {{ item.issueId.body }}
          </div>
        </b-dropdown-item>
        <b-dropdown-item to="/console/myNotifications"
          >More Notifications...</b-dropdown-item
        >
      </b-dropdown>
      |
      <img
        v-if="image"
        :src="image"
        class="rounded rounded-circle"
        :alt="name"
        style="width: 41px;height: 41px;"
      />
      <img
        v-else
        src="../../assets/wicon.png"
        class="rounded rounded-circle"
        :alt="name"
        style="width: 41px;height: 41px;"
      />
      <SplitButton
        :label="name"
        :model="items"
        class="p-button-text u-btn  mb-2"
      ></SplitButton>
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
  data() {
    const user = JSON.parse(localStorage.ujclassUser);
    const name = user.firstName + ' ' + user.lastName;
    const image = user.image;
    return {
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-user-edit',
          command: () => {
            this.$router.push('/console/profile');
          },
        },
        {
          label: 'Logout',
          icon: 'pi pi-trash',
          command: () => {
            delete localStorage.ujclassUser;
            location.reload();
          },
        },
      ],
      name,
      image,
      lockNofy: false,
      notificationsList: [],
      notificationsCount: 0,
    };
  },
  methods: {
    showNotifications(ev) {
      this.lockNofy = true;

      this.$http
        .post(`notifications`, {
          status: 'open',
        })
        .then(
          (response) => {
            this.notificationsCount = 0;
            this.lockNofy = false;
          },
          () => {
            this.lockNofy = false;
          },
        );
    },
    getMyNotifications() {
      const user = JSON.parse(localStorage.ujclassUser);

      this.$http
        .post(`notifications/count`, {
          userId: user._id,
          status: 'new',
        })
        .then((response) => {
          if (this.notificationsCount != response.data) {
            this.lockNofy = true;

            this.notificationsCount = response.data;

            this.$http
              .post(`notifications/search?limit=10`, {
                userId: user._id,
              })
              .then((res) => {
                this.lockNofy = false;
                this.notificationsList = res.data.docs;
              });
          }
        });
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.ujclassUser);

    this.lockNofy = true;
    this.$http
      .post(`notifications/count`, {
        userId: user._id,
        status: 'new',
      })
      .then((response) => {
        this.notificationsCount = response.data;
        this.$http
          .post(`notifications/search?limit=10`, {
            userId: user._id,
          })
          .then((res) => {
            this.lockNofy = false;
            this.notificationsList = res.data.docs;
          });
      });
    this.getMyNotifications();

    setInterval(() => {
      this.getMyNotifications();
    }, 5000);
  },
};
</script>
<style>
.u-btn button {
  background-color: transparent !important;
  color: #000 !important;
  border: none !important;
}
.eWmHWO {
  color: rgb(232, 232, 232);
  margin: 0px 16px;
  display: inline;
  font-size: 22px;
  font-weight: bold;
}
.home_logo_text {
  font-weight: bold;
}
</style>
