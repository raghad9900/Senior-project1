<template>
  <div>
    <Toolbar class="p-mb-4">
      <template #left>
        <Button
          icon="pi pi-download"
          class="p-button-help"
          @click="exportCSV($event)"
        />
      </template>

      <template #right>
        <Button
          label="Add New"
          icon="pi pi-plus"
          class="p-ml-2 p-button-success"
          @click="$router.push('issuesTypes/add')"
        />
      </template>
    </Toolbar>

    <!-- :totalRecords="totalRecords" -->
    <!-- @page="onPage($event)" -->
    <DataTable
      ref="dt"
      :value="list"
      :paginator="true"
      class="p-datatable-customers"
      :rows="10"
      dataKey="_id"
      :rowHover="true"
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 25, 50, 100]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    >
      <template #header>
        <div class="table-header">
          Issues Types List

          <div style="text-align:left"></div>
        </div>
      </template>
      <template #empty>
        No Data
      </template>
      <template #loading>
        Data Loading... Please waiting...
      </template>
      <Column field="_id" header="#" />
      <Column field="name" header="Name" />

      <Column field="id" bodyStyle="text-align: center; overflow: visible">
        <template #body="slotProps">
          <Button
            type="button"
            @click="$router.push('issuesTypes/edit/' + slotProps.data._id)"
            icon="pi pi-pencil"
            class="p-button-success mr-2  p-button-rounded"
          ></Button>
          <Button
            type="button"
            icon="pi pi-trash"
            @click="deleteItem(slotProps.data._id)"
            class="p-button-warning  p-button-rounded"
          ></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      limit: 10,
      page: 0,
      totalRecords: 0,
      loading: true,
    };
  },
  methods: {
    onPage(event) {
      this.limit = event.rows;
      this.page = event.page;
      this.getData();
    },
    getData() {
      this.$http.get(`issuesTypes?page=${this.page + 1}&limit=10000`).then(
        (response) => {
          this.loading = false;
          this.list = response.data.docs;

          this.totalRecords = response.data.totalDocs;
        },
        (err) => {
          this.loading = false;
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: err.response.data.message,
            life: 3000,
          });
        },
      );
    },

    exportCSV() {
      this.$refs.dt.exportCSV();
    },

    deleteItem(id) {
      this.$confirm.require({
        message: 'Are you sure you want to delete the records',
        header: 'Confirm deletion',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.$http.delete(`issuesTypes/${id}`).then(
            () => {
              this.getData();
              this.$toast.add({
                severity: 'error',
                summary: 'Done Success',
                detail: 'Deleted Done Successfly',
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
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style></style>
