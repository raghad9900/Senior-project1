import moment from 'moment';
import Vue from 'vue';
import { HTTP, baseUploadURL, baseURL } from './axios';

Vue.prototype.$baseUploadURL = baseUploadURL;
Vue.prototype.$uploadfileURL = baseURL + '/api/exams/upload';

Vue.prototype.$http = HTTP;

Vue.prototype.$file2base64 = (
  ev: any,
  cb: (arg0: string | ArrayBuffer | null) => void,
) => {
  const file = ev.target.files[0];
  const reader = new FileReader();
  reader.onload = (e: ProgressEvent) => {
    const content = (e.target as FileReader).result;
    cb(content);
  };
  reader.readAsDataURL(file);
};

Vue.prototype.$getDay = (date) => {
  const days = [
    'الاحد',
    'الاثنين',
    'الثلاثاء',
    'الاربعاء',
    'الخميس',
    'الجمعه',
    'السبت',
  ];
  const d = new Date(date);
  const dayName = days[d.getDay()];
  return dayName;
};

Vue.prototype.$durationFormatFull = (value) => {
  if (value) {
    const duration = moment(String(value));

    return duration.format('YYYY-MM-DD hh:mm A');
  } else {
    return '';
  }
};

Vue.prototype.$durationFormatDate = (value) => {
  if (value) {
    const duration = moment(String(value));

    return duration.format('YYYY-MM-DD');
  } else {
    return '';
  }
};

Vue.prototype.$toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

Vue.prototype.$htmlPrint = (stylesHtml, prtHtml) => {
  prtHtml = prtHtml.replace(
    `<div class="table-header">`,
    `<div class="table-header"><img src="/logo.png" style="float: left;height: 50px;" />`,
  );

  return `<!DOCTYPE html>
  <html>
    <head>

    ${stylesHtml}
      <link href="https://unpkg.com/primevue/resources/themes/saga-blue/theme.css" rel="stylesheet">
      <link href="https://unpkg.com/primevue/resources/primevue.min.css" rel="stylesheet">
      <link href="https://unpkg.com/primeicons/primeicons.css" rel="stylesheet">
  <style>
  body{
    direction: rtl;
  }
   .p-sortable-column-icon , .p-filter-column{
   display: none;
   }

   .pi-chevron-right::before {
      content: "\e901";
      display: none;
  }

  .p-datatable .p-paginator-bottom {
      display: none;
  }

  .p-datatable .p-datatable-header {
      background: #495057;
      border: 1px solid #e9ecef;
          border-top-width: 1px;
          border-right-width: 1px;
          border-bottom-width: 1px;
          border-left-width: 1px;
      border-width: 1px 0 1px 0;
      padding: 3rem 1rem;
      font-weight: 600;
      color: #f8f9fa;
  }


   </style>
   </head>
    <body>
    <div class="layout-main">
    <div class="p-grid">
      <div class="p-col-12">
        <div class="card">
          <div class="p-datatable-customers table table-striped p-datatable p-component p-datatable-hoverable-rows">
      ${prtHtml}
          </div>
        </div>
      </div>
    </div>
  </div>
    </body>
  </html>`;
};

Vue.prototype.$durationFormatFull = (value) => {
  if (value) {
    const duration = moment(String(value));

    return duration.format('YYYY-MM-DD hh:mm A');
  } else {
    return '';
  }
};

Vue.prototype.$errorHandler = (event: any) => {
  event.target.src = '/images/def.svg';
};

Vue.prototype.$checkRoles = (name: any) => {
  const user = JSON.parse(localStorage.ujclassAdmin);
  const roles = user.roles ?? JSON.parse(user.roles);
  if (roles.includes(name)) {
    return true;
  }
  return false;
};

Vue.prototype.$eventHub = new Vue();
