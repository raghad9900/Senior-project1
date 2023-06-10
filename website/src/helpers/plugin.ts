import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';

// Install BootstrapVue
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Install VueTelInput
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';

Vue.use(VueTelInput);

// Install PrimeVue
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
Vue.use(PrimeVue, { ripple: true });
Vue.use(ToastService);
Vue.use(ConfirmationService);
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// Install Component
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import MultiSelect from 'primevue/multiselect';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import SplitButton from 'primevue/splitbutton';
import Fieldset from 'primevue/fieldset';
import PickList from 'primevue/picklist';
import InputSwitch from 'primevue/inputswitch';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Dialog from 'primevue/dialog';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Editor from 'primevue/editor';
import InputNumber from 'primevue/inputnumber';
import OrderList from 'primevue/orderlist';
import Chip from 'primevue/chip';
import InputText from 'primevue/inputtext';
import BadgeDirective from 'primevue/badgedirective';
import TieredMenu from 'primevue/tieredmenu';
import OverlayPanel from 'primevue/overlaypanel';
import Calendar from 'primevue/calendar';
// import Chart from 'primevue/chart';
import Card from 'primevue/card';
import Knob from 'primevue/knob';
import Tooltip from 'primevue/tooltip';
import Breadcrumb from 'primevue/breadcrumb';
import FileUpload from 'primevue/fileupload';
import ScrollPanel from 'primevue/scrollpanel';
import RadioButton from 'primevue/radiobutton';
import SpeedDial from 'primevue/speeddial';


Vue.directive('tooltip', Tooltip);
Vue.directive('badge', BadgeDirective);
Vue.component('Button', Button);
Vue.component('Toolbar', Toolbar);
Vue.component('DataTable', DataTable);
Vue.component('Column', Column);
Vue.component('MultiSelect', MultiSelect);
Vue.component('Toast', Toast);
Vue.component('ConfirmDialog', ConfirmDialog);
Vue.component('SplitButton', SplitButton);
Vue.component('Fieldset', Fieldset);
Vue.component('PickList', PickList);
Vue.component('InputSwitch', InputSwitch);
Vue.component('TabView', TabView);
Vue.component('TabPanel', TabPanel);
Vue.component('Dialog', Dialog);
Vue.component('ColumnGroup', ColumnGroup);
Vue.component('Row', Row);
Vue.component('Dropdown', Dropdown);
Vue.component('Checkbox', Checkbox);
Vue.component('Editor', Editor);
Vue.component('InputNumber', InputNumber);
Vue.component('OrderList', OrderList);
Vue.component('Chip', Chip);
Vue.component('InputText', InputText);
Vue.component('TieredMenu', TieredMenu);
Vue.component('OverlayPanel', OverlayPanel);
Vue.component('Calendar', Calendar);
// Vue.component('Chart', Chart);
Vue.component('Card', Card);
Vue.component('Knob', Knob);
Vue.component('Breadcrumb', Breadcrumb);
Vue.component('FileUpload', FileUpload);
Vue.component('ScrollPanel', ScrollPanel);
Vue.component('RadioButton', RadioButton);
Vue.component('SpeedDial', SpeedDial);


import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
});

import AudioRecorder from 'audio-recorder-vue';

Vue.use(AudioRecorder);
