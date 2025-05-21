import { createWebHistory, createRouter } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import Survey from '../views/Survey.vue';
import store from '../store';
import AuthLayout from '../components/AuthLayout.vue';

const router = createRouter({
    history : createWebHistory(import.meta.env.BASE_URL), 
    routes : [
        
        {
            path : '/',
            redirect : '/dashboard',
        },
        {   
            path : '/dashboard',
            component : DefaultLayout,
            children : [
                { 
                    path : '/dashboard', 
                    name : 'Dashboard',
                    meta : { requiresAuth : true }, 
                    component : Dashboard
                },
                { 
                    path : '/survey',
                    name : 'Survey',
                    meta : { requiresAuth : true }, 
                    component : Survey, 
                },
                // {
                //     path : '/auth',
                //     redirect : '/login',
                //     name : 'Auth',
                //     meta : { isGuest : true }, 
                //     component: AuthLayout,
                //     children : [
                //         // { 
                //         //     path : '/login',
                //         //     name : 'Login',
                //         //     component : Login, 
                //         // },
                //         // { 
                //         //     path : '/register',
                //         //     name : 'Register',
                //         //     component : Register, 
                //         // },  
                //     ]
                // }
            ] 
        },
        {
            path : '/auth',
            redirect : '/login',
            name : 'Auth',
            meta : { isGuest : true }, 
            component: AuthLayout,
            children : [
                { 
                    path : '/login',
                    name : 'Login',
                    component : Login, 
                },
                { 
                    path : '/register',
                    name : 'Register',
                    component : Register, 
                },  
            ]
        }
]
})

router.beforeEach((to,from,next)=>{
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name : 'Login'});
    }else if(store.state.user.token && to.meta.isGuest ) { 
        next({name : 'Dashboard'});
    }else { 
        next();
    }
})

export default router; 