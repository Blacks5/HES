import Vue from 'vue';
import Router from 'vue-router';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../pages/login.vue'),
      meta: { title: 'login' },
    },
    { path: '*', component: () => import('../components/NotFound.vue') },
  ],
});

router.beforeEach((to, from, next) => {
  Nprogress.start();
  next();
});

router.afterEach(()=> {
  Nprogress.done();
});

export default router;