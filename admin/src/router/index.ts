import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/login.vue';

Vue.use(VueRouter);
const ifAuthenticated = (to: any, from: any, next: any) => {
  if (localStorage.ujclassAdmin) {
    next();
    return;
  }
  next('/');
};

const ifNotAuthenticated = (to: any, from: any, next: any) => {
  if (!localStorage.ujclassAdmin) {
    next();
    return;
  }
  next('/admin');
};

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/admin',
    component: () => import('../layout/layout.vue'),

    beforeEnter: ifAuthenticated,
    children: [
      {
        path: '/',
        component: () => import('../views/index.vue'),
      },
      // System
      {
        path: 'system',
        component: () => import('../layout/links.vue'),
        children: [
          // labs
          {
            path: 'labs',
            component: () => import('../views/system/labs/index.vue'),
          },
          {
            path: 'labs/add',
            component: () => import('../views/system/labs/add.vue'),
          },
          {
            path: 'labs/edit/:id',
            component: () => import('../views/system/labs/add.vue'),
          },
          // issuesTypes
          {
            path: 'issuesTypes',
            component: () => import('../views/system/issuesTypes/index.vue'),
          },
          {
            path: 'issuesTypes/add',
            component: () => import('../views/system/issuesTypes/add.vue'),
          },
          {
            path: 'issuesTypes/edit/:id',
            component: () => import('../views/system/issuesTypes/add.vue'),
          },
          // issues
          {
            path: 'issues',
            component: () => import('../views/system/issues/index.vue'),
          },
        
          {
            path: 'issues/show/:id',
            component: () => import('../views/system/issues/add.vue'),
          },
           // issues
           {
            path: 'appointment',
            component: () => import('../views/system/appointment/index.vue'),
          },
        
          {
            path: 'appointment/show/:id',
            component: () => import('../views/system/appointment/add.vue'),
          },
        ],
      },

      // Users
      {
        path: 'users',
        component: () => import('../layout/links.vue'),
        children: [
          // admins
          {
            path: 'admins',
            component: () => import('../views/users/admins/index.vue'),
          },
          {
            path: 'admins/add',
            component: () => import('../views/users/admins/add.vue'),
          },
          {
            path: 'admins/edit/:id',
            component: () => import('../views/users/admins/add.vue'),
          },

          // admins
          {
            path: 'users',
            component: () => import('../views/users/users/index.vue'),
          },
          {
            path: 'users/add',
            component: () => import('../views/users/users/add.vue'),
          },
          {
            path: 'users/edit/:id',
            component: () => import('../views/users/users/add.vue'),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
