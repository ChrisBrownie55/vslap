import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/slap',
      name: 'slap',
      component: () => import('./views/Slap.vue')
    },
    {
      path: '/vendr',
      name: 'vendr',
      component: () => import('./views/Vendr.vue')
    }
  ]
});
