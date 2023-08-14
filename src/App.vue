<template>
  <Menu></Menu>  
   <router-view></router-view>
 </template>
 
 
 <script>
 import Menu from './Components/Menu.vue'
 
 export default {
   components: {
     Menu
   }
 }
 </script>