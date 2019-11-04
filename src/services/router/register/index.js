import Register from "@/components/register/Index"
import store from "../../store";

export default [
    {
        path: '/registers',
        name: 'registers',
        component: Register,
        beforeEnter(to, from, next) {
            if (store.state.authenticated) {
                    next()
                    return
            } 
            next("/")
        }
    },
]