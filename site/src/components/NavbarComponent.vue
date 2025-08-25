<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSiteStore } from '@/stores/website';
import LogoutComponent from './LogoutComponent.vue';
import { RouterLink } from 'vue-router';

const navClasses = ref('navbar navbar-expand-lg shadow bg-light')
const compLogout = ref(null)
const siteStore = useSiteStore()

const doLogoutComponent = () => {
    if(compLogout.value){
        compLogout.value.showModal()
    }
}

const onScroll = () => {
  window.addEventListener('scroll', function(){
    if(this.window.pageYOffset >= 150){
      navClasses.value = 'navbar navbar-expand-lg shadow bg-light fixed-top'
    }else{
      navClasses.value = 'navbar navbar-expand-lg shadow bg-light'
    }
  })
}

onMounted(()=>{
  onScroll()
})
</script>

<template>
    <header>
        <nav :class="navClasses" data-bs-theme="light">
      <div class="container">
        <RouterLink class="navbar-brand d-flex" to="/">
          <img src="../assets/img/logo.png" alt="Logo do site" height="40">
        </RouterLink>
        <button class="navbar-toggler border-secondary" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarExpandButton" aria-controls="navbarExpandButton" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarExpandButton" >
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item ms-lg-4">
              <RouterLink to="/" class="nav-link fw-semibold">Home</RouterLink>
            </li>
            <li class="nav-item ms-lg-4">
              <RouterLink to="#about" class="nav-link fw-semibold">Sobre</RouterLink>
            </li>
            <li class="nav-item ms-lg-4">
              <RouterLink to="#schedule" class="nav-link fw-semibold">Programação</RouterLink>
            </li>
            <li class="nav-item ms-lg-4">
              <RouterLink to="#professors" class="nav-link fw-semibold">Professores</RouterLink>
            </li>
            <li class="nav-item ms-lg-4 d-grid">
              <RouterLink to="/subscribe" class="btn btn-success bg-gradient fw-semibold rounded-pill px-3 mb-3 mb-lg-0">Inscreva-se</RouterLink>
            </li>
            <li class="nav-item ms-lg-3 d-grid">
              <RouterLink to="/login" class="btn btn-success bg-gradient fw-semibold rounded-pill px-3">Login</RouterLink>
            </li>
            <li class="nav-item ms-lg-3 d-grid" v-if="siteStore.isAuthenticated">
              <a href="javascript:void(0)" @click="doLogoutComponent" class="btn btn-success bg-gradient fw-semibold rounded-pill px-3 my-3 my-lg-0">
                Sair
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>

    <LogoutComponent ref="compLogout" />
</template>

<style lang="scss" scoped>

</style>