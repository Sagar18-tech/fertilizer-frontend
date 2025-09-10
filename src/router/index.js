import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/LoginPage.vue";
import Signup from "../components/SignupPage.vue";
import FertilizerForm from "../components/FertilizerForm.vue";
import { isAuthenticated } from "../services/auth.js";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  {
    path: "/fertilizer",
    component: FertilizerForm,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next("/login");
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  const isAuth = isAuthenticated();

  // If trying to access login or signup while authenticated, redirect to fertilizer
  if ((to.path === "/login" || to.path === "/signup") && isAuth) {
    next("/fertilizer");
    return;
  }

  // If trying to access protected routes while not authenticated, redirect to login
  if (to.path === "/fertilizer" && !isAuth) {
    next("/login");
    return;
  }

  // Allow all other navigation
  next();
});

export default router;
