<template>
  <div>
    <!-- <div class="row text-center">
      <div class="col-xs-12 col-md-6 col-lg-3">
        <div class=" overview-box overview-box-1">
          <div class="overview-box-title">
            <i class="pi pi-fw pi-user"></i><span>الموظفين</span>
          </div>
          <div class="overview-box-count">{{ adminCount }}</div>
        </div>
      </div>
      <div class="col-xs-12 col-md-6 col-lg-3">
        <div class=" overview-box overview-box-2">
          <div class="overview-box-title">
            <i class="pi pi-map-marker"></i><span>العملاء</span>
          </div>
          <div class="overview-box-count">{{ leagueCount }}</div>
        </div>
      </div>
      <div class="col-xs-12 col-md-6 col-lg-3">
        <div class=" overview-box overview-box-3">
          <div class="overview-box-title">
            <i class="pi pi-fw pi-sitemap"></i><span>العقود</span>
          </div>
          <div class="overview-box-count">{{ academiesCount }}</div>
        </div>
      </div>
      <div class="col-xs-12 col-md-6 col-lg-3">
        <div class=" overview-box overview-box-4">
          <div class="overview-box-title">
            <i class="pi pi-fw pi-id-card"></i><span>نوقص المخزون</span>
          </div>
          <div class="overview-box-count">{{ playersCount }}</div>
        </div>
      </div>
    </div>
    <div class="mt-4">
    
    
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      leagueList: [],
      adminCount: 0,
      leagueCount: 0,
      academiesCount: 0,
      playersCount: 0,
      selected: null,
      headerList: [],
      subheaderList: [],
    };
  },

  methods: {
    getCountTeams(list, id) {
      if (list.find((el) => el.id == id)) {
        return list.find((el) => el.id == id).playerCount;
      }
      return '';
    },
    getData() {
      this.$http
        .get(`years/findAllYearsAcademie?leaguesId=${this.selected}`)
        .then((res) => {
          this.headerList = res.data;
          this.subheaderList = [];
          if (this.headerList.length > 0) {
            for (const item of this.headerList) {
              for (const itm of item.yearsTeams) {
                this.subheaderList.push(itm);
              }
            }

            this.$http
              .get(`players/byLeaguesId/${this.selected}`)
              .then((res2) => {
                this.list = res2.data;
              });
          }
        });
    },
    onToggle(value) {
      console.log(value);
      this.getData();
    },
  },
  created() {
    // this.$http.post(`users/count`).then((res) => {
    //   this.adminCount = res.data;
    // });
    // this.$http.post(`league/count`).then((res) => {
    //   this.leagueCount = res.data;
    // });
    // this.$http.post(`academies/count`).then((res) => {
    //   this.academiesCount = res.data;
    // });
    // this.$http.post(`players/count`).then((res) => {
    //   this.playersCount = res.data;
    // });
    // this.$http
    //   .post(`league/search`, {
    //     relations: ['years'],
    //     order: {
    //       id: 'DESC',
    //     },
    //   })
    //   .then((res) => {
    //     this.leagueList = res.data;
    //     this.selected =
    //       this.leagueList.length > 0 ? this.leagueList[0].id : null;
    //     this.getData();
    //   });
  },
};
</script>

<style>
.overview-box {
  padding: 15px;
  color: #ffffff;
  min-height: 100px;
  border-radius: 4px;
  margin: 0 !important;
}
.overview-box .overview-box-title {
  font-weight: bold;
  width: 100%;
}
.overview-box .overview-box-title i {
  vertical-align: middle;
  font-size: 20px;
}
.overview-box .overview-box-title span {
  margin-right: 0.5em;
  vertical-align: middle;
}
.overview-box .overview-box-count {
  color: #ffffff;
  font-size: 24px;
  width: 100%;
  display: block;
  padding: 5px 0;
}
.overview-box.overview-box-1 {
  background-color: #007bff;
  border: solid 1px #007bff;
  color: #ffffff;
}
.overview-box.overview-box-2 {
  background-color: #28a745;
  border: solid 1px #28a745;
  color: #ffffff;
}
.overview-box.overview-box-3 {
  background-color: #fd7e14;
  border: solid 1px #fd7e14;
  color: #ffffff;
}
.overview-box.overview-box-4 {
  background-color: #6f42c1;
  border: solid 1px #6f42c1;
  color: #ffffff;
}
</style>
