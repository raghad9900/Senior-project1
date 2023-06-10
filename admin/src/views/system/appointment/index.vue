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
        <!-- <Button
          label="Add New"
          icon="pi pi-plus"
          class="p-ml-2 p-button-success"
          @click="$router.push('issues/add')"
        /> -->
      </template>
    </Toolbar>
    <br />
    <FullCalendar
      :options="calendarOptions"
      ref="calendar2"
      style="margin-right: 5vw;"
    />
  </div>
</template>

<script>
// import '@fullcalendar/core/vdom'; // solves problem with Vite
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';
// import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },

  data() {
    return {
      modalShow: false,
      minutes: 60,

      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        // initialView: 'resourceTimeGridDay',
        initialView: 'dayGridMonth',
        initialDate: new Date(),
        navLinks: true,
        slotDuration: '00:15:00',
        slotLabelInterval: 15,
        slotMinutes: 15,
        slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: false },

        businessHours: true,
        slotMinTime: '07:00',
        slotMaxTime: '22:00',
        selectMirror: true,

        events: [],
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        selectable: false,
        eventClick: this.handleEventClick,
      },
    };
  },

  methods: {
    handleEventClick(clickInfo) {
      console.log('handleEventClick', clickInfo);
      this.$router.push('/admin/system/appointment/show/' + clickInfo.event.id);
    },
    getData() {
      this.$http.get(`appointment?page=1&limit=3000000&sort=asc`).then(
        (response) => {
          const list = response.data.docs;
          for (const item of list) {
            if (item.labId) {
              this.calendarOptions.events.push({
                id: item._id,
                title:
                  item.labId.name +
                  ' By ' +
                  (item.userId
                    ? item.userId.firstName + ' ' + item.userId.lastName
                    : '--'),
                start: new Date(item.start),
                end: new Date(item.end),
                allDay: false,
              });
            }
          }
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

<style>
@media (max-width: 767.98px) {
  .fc .fc-view-harness {
    height: 856.296px !important;
  }
}

.fc .fc-scrollgrid-section table {
  width: 100% !important;
  /* height: 825px !important; */
}

.fc-scrollgrid-section-body .fc-scrollgrid-section table {
  width: 100% !important;
  /* height: 856.296px !important; */
}
.asa {
  font-weight: 700;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
}
</style>
