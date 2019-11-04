import Vue from "vue"
import VueRouter from "vue-router"
import AuthRoutes from "./auth"
import ArticleRoutes from "./article"
import UserRoutes from "./user"
import RbacRoutes from "./rbac"
import RegisterRoutes from "./register"

Vue.use(VueRouter)

let allRoutes = []

allRoutes = allRoutes.concat(AuthRoutes, UserRoutes, RbacRoutes, ArticleRoutes, RegisterRoutes)

export default new VueRouter({
    mode: "history",
    routes: allRoutes
})