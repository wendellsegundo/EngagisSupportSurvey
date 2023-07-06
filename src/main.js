import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import SurveyVue from './App.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/home', component: SurveyVue },
  { path: '/*', component: SurveyVue },
  { path: '/', component: SurveyVue },

];

const router = new VueRouter({
  mode: 'history',
  routes: routes,
  bas: '/',

});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
