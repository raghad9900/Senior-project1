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
            <SpeedDial
              class="speedbtn"
              :model="items2"
              type="quarter-circle"
              showIcon="fa fa-pencil"
              buttonClassName="p-button-text"
              :radius="100"
              @click="active2(item)"
              direction="down-left"
            />

            <h3>
              {{ item.labId ? item.labId.name : '' }}
            </h3>
            <p>
              By
              {{
                item.userId
                  ? item.userId.firstName + ' ' + item.userId.lastName
                  : ''
              }}
            </p>
            <div class="row">
              <div class="col-5" style="padding-right: 0;">
                <p class="header">
                  Starts
                </p>
                <p class="date">
                  {{ $durationFormatFull(item.start) }}
                </p>
              </div>
              <div class="col-2  text-center">
                <i class="pi pi-arrow-right"></i>
              </div>
              <div class="col-5" style="padding: 0;">
                <p class="header">
                  Ends
                </p>
                <p class="date">
                  {{ $durationFormatFull(item.end) }}
                </p>
              </div>
            </div>
            <div class="text-right pt-1">
              <Chip
                class="Canceled"
                label="Canceled"
                icon="pi pi-times-circle"
                v-if="item.cancelid"
              />
              <Chip
                v-else
                class="upcoming"
                label="upcoming"
                icon="pi pi-clock"
              />
            </div>
          </template>
        </Card>
      </div>
      <div class="col-3"></div>
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
      item: {
        labId: null,
      },
      items2: [
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
            this.$http.delete(`appointment/${this.itemId2}`).then(
              (response) => {
                this.getData();
                this.$toast.add({
                  severity: 'error',
                  summary: 'Delete',
                  detail: 'Data Deleted',
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
        {
          label: 'cancelid',
          icon: 'pi pi-pencil',
          command: () => {
            this.$http
              .put(`appointment/${this.itemId2}`, {
                cancelid: true,
              })
              .then(
                (response) => {
                  this.getData();
                  this.$toast.add({
                    severity: 'error',
                    summary: 'Cancelid',
                    detail: 'Cancelid Done',
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

        {
          label: 'show',
          icon: 'pi pi-eye',
          command: () => {
            this.$router.push('/console/showAppointment/' + this.itemId2);
          },
        },
      ],
      itemId2: null,
      userId: null,
    };
  },
  methods: {
    active2(item) {
      this.itemId2 = item._id;
    },
    getData() {
      const id = this.$route.params.id;
      this.$http.get(`appointment/${id}`).then(
        (response) => {
          this.item = response.data;
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
  },
};
</script>

<style></style>
