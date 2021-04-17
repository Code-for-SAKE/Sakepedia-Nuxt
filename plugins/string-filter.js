import Vue from 'vue'

Vue.filter('omitted', function (text) {
  return text != null && text.length > 10 ? text.slice(0, 10) + "…" : text;
})
