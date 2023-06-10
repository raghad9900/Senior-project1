<template>
  <Menubar :model="items">
    <template #start>
      <img
        alt="logo"
        @click="$router.push('/admin/')"
        src="../assets/logo.png"
        height="40"
        class="p-mr-2"
      />
    </template>
    <template #end>
      <Button @click="logout" icon="pi pi-power-off" class="p-button-danger" />
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
    return {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          to: '/admin',
        },
      ],
    };
  },
  methods: {
    logout() {
      delete localStorage.ujclassAdmin;
      location.reload();
    },
  },
  created() {
    // this.items = [];
    this.items.push({
      label: 'Admins',
      icon: 'pi pi-fw pi-users',

      to: '/admin/users/admins',
    });

    this.items.push({
      label: 'Users',
      icon: 'pi pi-fw pi-users',

      to: '/admin/users/users',
    });
    this.items.push({
      label: 'Labs',
      icon: 'pi pi-fw pi-th-large',
      to: '/admin/system/labs',
    });
    this.items.push({
      label: 'Issues Types',
      icon: 'pi pi-fw pi-eye',
      to: '/admin/system/issuesTypes',
    });
    this.items.push({
      label: 'Issues',
      icon: 'pi pi-fw pi-ticket',
      to: '/admin/system/issues',
    });
    this.items.push({
      label: 'Appointment',
      icon: 'pi pi-fw pi-sitemap',
      to: '/admin/system/appointment',
    });
  },
};
</script>
