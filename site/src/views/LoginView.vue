<script setup lang="ts">
import Layout from '@/layouts/outHome.vue'
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const email = ref<string>('')
const txt_submit = ref<string>('Acessar')
const eyeType = ref<string>('fa-solid fa-eye')
const inputType = ref<string>('password')

const changePassVisibility = (): void => {
    if(eyeType.value == 'fa-solid fa-eye'){
        eyeType.value = 'fa-solid fa-eye-slash'
        inputType.value = 'text'
    }else{
        eyeType.value = 'fa-solid fa-eye'
        inputType.value = 'password'
    }
}



</script>

<template>
    <Layout>
        <section class="container-fluid bg-opaque-green" id="schedule">
            <article class="container py-3 py-lg-5">
                <div class="row mb-4">
                    <div class="col-md-6 mx-auto ms-lg-0">
                        <div class="container pt-3">
                            <div class="row">
                                <div class="col-6 mx-auto d-none d-lg-flex">
                                    <img src="../assets/img/logo.png" alt="" class="w-100">
                                </div>
                                <div class="col-6 mx-auto d-lg-none">
                                    <h2 class="display-4 mb-3 fw-bold text-center text-darkgreen">Login</h2>                                    
                                </div>
                            </div>
                            <form class="row g-3 mb-3">
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="email">Email:</label>
                                        <input v-model="email" type="email"
                                            placeholder="Insira aqui seu email cadastrado" class="form-control fs-5"
                                            id="email" />
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label>Email:</label>
                                        <div class="input-group mb-3">
                                            <input :type="inputType" class="form-control fs-5" placeholder="Insira sua senha"
                                                aria-label="Insira sua senha" aria-describedby="password_button">
                                            <button class="btn btn-light" type="button"
                                                id="password_button" @click="changePassVisibility()"><font-awesome-icon :icon="eyeType" /></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group d-grid">
                                        <button class="btn btn-lg btn-success rounded-pill">{{ txt_submit }}</button>
                                    </div>
                                </div>
                            </form>
                            <div class="row">
                                <div class="col">
                                    <p class="text-center mb-0">
                                        Ainda não se cadastrou? Faça seu cadastro clicando <RouterLink to="/subscribe" class="text-decoration-none text-darkgreen fw-bold">aqui.</RouterLink>
                                    </p>
                                    <p class="text-center">
                                        Esqueceu a senha? Clique <RouterLink to="/forget-password" class="text-decoration-none text-darkgreen fw-bold">aqui.</RouterLink>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    </Layout>
</template>

<style lang="scss" scoped>
.bg-opaque-green {
    background-color: #E5EBE5 !important;
}

#schedule{
    min-height: inherit;
}

@media (min-width: 992px) {
    #schedule {
        background-image: url(../assets/img/mozaic.png);
        background-position: right;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: 20vw;
    }
}
</style>