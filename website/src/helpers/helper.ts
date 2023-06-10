import moment from 'moment';
import Vue from 'vue';
import { HTTP, baseUploadURL, baseURL } from './axios';

Vue.prototype.$baseUploadURL = baseUploadURL;

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

Vue.prototype.$durationFormatFull = (value) => {
  if (value) {
    const duration = moment(String(value));

    // YYYY-MM-DD hh:mm A
    // 3 Nov 2023, 13:15 
    return duration.format('D MMM YYYY, HH:mm');
  } else {
    return '';
  }
};

Vue.prototype.$errorHandler = (event: any) => {
  event.target.src = '/images/def.svg';
};

Vue.prototype.$checkRoles = (name: any) => {
  const user = JSON.parse(localStorage.ujclassUser);
  const roles = user.roles ?? JSON.parse(user.roles);
  if (roles.includes(name)) {
    return true;
  }
  return false;
};

Vue.prototype.$eventHub = new Vue();

Vue.prototype.$toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
