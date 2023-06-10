<template>
  <div>
    <Breadcrumb
      :home="{ icon: 'pi pi-home', to: '/admin' }"
      :model="BreadcrumbItems"
    />

    <Toolbar class="p-mb-4 mt-2">
      <template #left>
        <Button
          icon="pi pi-times"
          class="p-button-danger"
          @click="$router.push('/admin/system/issuesTypes')"
        />
      </template>
      <template #right>
        Add New
      </template>
    </Toolbar>
    <div class="form-card row">
      <div class="col-md-12">
        <div class="mb-3">
          <label for="name" class="form-label">
             Name
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="body.name"
          />
        </div>
      </div>
      

      <div class="col-md-12">
        <div class="mb-3 text-center">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            class="p-ml-2 p-button-info"
            @click="update()"
            v-if="id"
          />
          <Button
            v-else
            label="Add"
            icon="pi pi-plus"
            class="p-ml-2 p-button-success"
            @click="save()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BreadcrumbItems: [
        {
          label: 'Admis',
          to: '/admin/system/issuesTypes',
        },
        { label: 'Add' },
      ],
      body: {
        name: null,
        
        
      },
      id: null,
    };
  },
  methods: {
    save() {
      if (
        this.body.name 
      ) {
        this.$http.post(`issuesTypes`, this.body).then(
          () => {
            this.$toast.add({
              severity: 'success',
              summary: 'Done Success',
              detail: 'Added Done Success',
              life: 3000,
            });
            this.$router.push('/admin/system/issuesTypes');
          },
          (err) => {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: err.response.data.message,
              life: 3000,
            });
          },
        );
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please fill fields',
          life: 3000,
        });
      }
    },
    update() {
      if (this.body.name) {
        this.$http.put(`issuesTypes/${this.id}`, this.body).then(
          () => {
            this.$toast.add({
              severity: 'success',
              summary: 'Done Success',
              detail: 'Edit Done Success',
              life: 3000,
            });
            this.$router.push('/admin/system/issuesTypes');
          },
          (err) => {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: err.response.data.message,
              life: 3000,
            });
          },
        );
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please fill fields',
          life: 3000,
        });
      }
    },
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.$http.get(`issuesTypes/${this.id}`).then(
        (res) => {
          this.body = res.data;
          this.body.password = null;
        },
        (err) => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: err.response.data.message,
            life: 3000,
          });
        },
      );
    }
  },
};
</script>
