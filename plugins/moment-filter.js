import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', function (value) {
  const date = moment(value);
  return date.isValid() ? date.format('YYYY/MM/DD') : value;
})
Vue.filter('datetime', function (value) {
  const date = moment(value);
  return date.isValid() ? date.format('YYYY/MM/DD HH:mm') : value;
})
