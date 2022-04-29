import Vue from 'vue';
import moment from 'moment';

Vue.filter('date', function (value) {
  if (!value) return undefined;
  const date = moment(value);
  return date.isValid() ? date.format('YYYY/MM/DD') : undefined;
});
Vue.filter('datetime', function (value) {
  if (!value) return undefined;
  const date = moment(value);
  return date.isValid() ? date.format('YYYY/MM/DD HH:mm') : undefined;
});
