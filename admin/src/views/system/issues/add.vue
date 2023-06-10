<template>
  <div class="home-part">
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
        
      </template>
    </Toolbar>
   
    <div class="row">
      <div class="col-5">
        <Card class="home-card mb-5">
          <template #content>
            <h3>
              <span style="font-size: 1rem;"> #{{ body.id }} </span>
              <br />
              {{ body.labId ? body.labId.name : '' }}
            </h3>
            <div class="row">
              <div class="col-6 pt-3">
                <p class="header">
                  Issue
                </p>
                <p class="date">
                  {{ body.body }}
                </p>
              </div>
              <div class="col-6 pt-3">
                <p class="header">
                  Reported in
                </p>
                <p class="date">
                  {{ $durationFormatFull(body.createdAt) }}
                </p>
              </div>
              <div class="col-6 pt-3">
                <Button
                  label="View attachments"
                  class="p-button-rounded p-button-secondary"
                  @click="showFile = !showFile"
                />
              </div>
              <div class="col-6 pt-3">
                <p class="header">
                  Instructor
                </p>
                <p class="date">
                  {{
                    body.userId
                      ? body.userId.firstName + ' ' + body.userId.lastName
                      : ''
                  }}
                </p>
              </div>

              <div class="col-12 p-1" v-if="showFile">
                <ul class="list-group mb-3">
                  <li
                    v-for="itm in body.files"
                    :key="itm"
                    class="list-group-item"
                  >
                    <a
                      :href="$baseUploadURL + itm"
                      target="_blank"
                      rel="noopener noreferrer"
                      >{{ itm }}</a
                    >
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-3 pt-3" style="border-top: #607d8b solid 2px;">
              <h4>
                Set Preority
              </h4>
              <div class="text-center">
                <Button
                  class="p-button-rounded mr-1  "
                  :class="
                    body.preority == 'High'
                      ? 'p-button-danger'
                      : 'p-button-info'
                  "
                  label="High"
                  
                ></Button>
                <Button
                  class="p-button-rounded mr-1 "
                  :class="
                    body.preority == 'Medium'
                      ? 'p-button-danger'
                      : 'p-button-info'
                  "
                  label="Medium"
                  
                ></Button>
                <Button
                  class="p-button-rounded mr-1 "
                  :class="
                    body.preority == 'Low' ? 'p-button-danger' : 'p-button-info'
                  "
                  label="Low"
                  
                ></Button>
              </div>
            </div>

         
         
          </template>
        </Card>
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item d-flex justify-content-between align-items-start"
          >
            <div class="ms-2 me-auto">
              <div class="fw-bold" style="font-weight: bold;">Created</div>
              by Instructor
            </div>

            <Chip class="new" label="New" icon="pi pi-envelope" />
          </li>

          <li
            class="list-group-item d-flex justify-content-between align-items-start"
            v-for="i of list"
            :key="i._id"
          >
            <div class="ms-2 me-auto">
              <div class="fw-bold" style="font-weight: bold;">
                Updated By {{ i.userId ? i.userId.firstName : '' }}
              </div>
              {{ i.body }}
              <br />

              {{ $durationFormatFull(i.createdAt) }}
            </div>

            <Chip
              class="biding"
              v-if="i.status == 'biding'"
              label="biding"
              icon="pi pi-clock"
            />
            <Chip
              class="fixed"
              v-if="i.status == 'fixed'"
              label="fixed"
              icon="pi pi-check-circle"
            />
          </li>
        </ul>
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
     
      issuesTypesList: [],
      body2: {
        body: null,
        status: null,
      },
      body: {
        labId: null,
        files: [],
        body: null,
        status: null,

        issueTypeId: null,
      },
      list: [],
      showFile: false,
    };
  },
  methods: {
    add() {
      const id = this.$route.params.id;
      if (this.body2.status && this.body2.body) {
        this.$http
          .post(`comments`, {
            ...this.body2,
            issueId: id,
          })
          .then(
            (response) => {
              this.$http
                .put(`issues/${id}`, {
                  status: this.body2.status,
                })
                .then((re) => {});
              this.getList();
              this.body2 = {
                body: null,
                status: null,
              };
              this.$toast.add({
                severity: 'success',
                summary: 'Done Success',
                detail: 'Added Done Success',
                life: 3000,
              });
              this.getData();
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
    getData() {
      const id = this.$route.params.id;
      this.$http.get(`issues/${id}`).then(
        (response) => {
          this.body = response.data;
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
    },
    getList() {
      const id = this.$route.params.id;
      this.$http
        .post(`comments/search?page=1&limit=10000`, {
          issueId: id,
        })
        .then(
          (response) => {
            this.list = response.data.docs;
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
    },

    setPreority(preority) {
      this.body.preority = preority;
      const id = this.$route.params.id;

      this.$http
        .put(`issues/${id}`, {
          preority,
        })
        .then(
          (response) => {
            this.$toast.add({
              severity: 'success',
              summary: 'Done Success',
              detail: 'Added Done Success',
              life: 3000,
            });
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
    },
  },
  created() {
    this.getData();

    this.getList();
  },
};
</script>

<style></style>
