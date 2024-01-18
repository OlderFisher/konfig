import { createRouter, createWebHashHistory,createWebHistory } from "vue-router";

import FmMainPage from "@/components/fm-main-page.vue";
import FmTabsPage from '@/components/fm-tabs-page.vue';


export default createRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  history: process.env.NODE_ENV === 'development' ? createWebHashHistory(process.env.BASE_URL) : createWebHistory(process.env.BUILD_DEV == 'true' ? process.env.BASE_URL_DEV : process.env.BASE_URL_PROD),
  routes: [
    {
      path: '/',
      name: "Cannabis Rezeptkonfigurator",
      component: FmMainPage,
      children: [
        {
          path: "cannabisbluete",
          name: "Cannabisblüte",
          component: FmTabsPage,
        },
        {
          path: "cannabisextrakt",
          name: "Cannabisextrakt",
          component: FmTabsPage,
        },
        {
          path: "olige-cbd-losung",
          name: "Ölige CBD-Lösung",
          component: FmTabsPage,
        },
        {
          path: "dronabinol",
          name: "Dronabinol",
          component: FmTabsPage,
        },
        {
          path: "hilfsmittel",
          name: "Hilfsmittel",
          component: FmTabsPage,
        },
        {
          path: "cannaxan-701-1-2",
          name: "Cannaxan-701-1.2",
          component: FmTabsPage,
        },
      ]
    },
  ],
});
