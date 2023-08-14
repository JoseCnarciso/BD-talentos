
// (npm install vue-router@4)    para instalar a biblioteca 


// Obrigatório este import desta maneira
import { createRouter,createWebHistory } from "vue-router";

// Importar as telas da aplicação
import About from '../views/About/About.vue'
import TalentNew from '../views/Talent/New/TalentNew.vue'
import Home from '../views/Home/Home.vue'

// Criar uma constante router 
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            // Tela inicial (Primeira tela a ser chamada)
            path:'/',
            name:'Home',
            component: Home
        }, 
        {
            path:'/sobre',
            name:'About',
            component: About
        },      
        {
            path:'/talento/novo',
            name:'TalentNew',
            component: TalentNew
        },
    
    ]    
})
// Sempre exportar 
export default router;