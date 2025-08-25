<script setup lang="ts">
import Layout from '@/layouts/outHome.vue'
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useSiteStore } from '@/stores/website';

const router = useRouter()
const siteStore = useSiteStore()
const urlApi = 'https://eventos.tbr.com.br/apis/login/'
const email = ref<string>('')
const txt_submit = ref<string>('Acessar')
const eyeType = ref<string>('fa-solid fa-eye')
const inputType = ref<string>('password')
const showError = ref<boolean>(false)
const alertType = ref<string>('alert-danger')
const errorMessage = ref<string>('')

const changePassVisibility = (): void => {
    if (eyeType.value == 'fa-solid fa-eye') {
        eyeType.value = 'fa-solid fa-eye-slash'
        inputType.value = 'text'
    } else {
        eyeType.value = 'fa-solid fa-eye'
        inputType.value = 'password'
    }
}

const handleSubmit = async (): Promise<void> => {
    txt_submit.value = 'Aguarde'
    try {
        const urlGet = urlApi + `?evento=${siteStore.evento}&email=${email.value}`
        const response = await fetch(urlGet, {
            method: 'get',
            headers: new Headers()
        })

        if (!response.ok) {
            throw new Error('Ocorreu um erro, por favor tente novamente mais tarde')
        }

        const data = await response.json()

        if(data.estado != 1){
            throw new Error(data.message)
        }

        if(data.dados.enable != 1){
            router.push({
                path: '/payment'
            })
        }

        siteStore.login({
            name: `${data.dados.firstname} ${data.dados.lastname}`,
            email: data.dados.email,
            id: data.dados.id,
        })

        sessionStorage.setItem('isAuthenticated', 'true')
        sessionStorage.setItem('name', `${data.dados.firstname} ${data.dados.lastname}`)
        sessionStorage.setItem('email', data.dados.email)
        sessionStorage.setItem('userid', data.dados.id)
        sessionStorage.setItem('categoria', data.dados.subscribe_training_center)
        sessionStorage.setItem('tratamento', data.dados.treatment)
        sessionStorage.setItem('ip', data.dados.ip)
        sessionStorage.setItem('city', data.dados.city)
        sessionStorage.setItem('state', data.dados.state)
        sessionStorage.setItem('enable', data.dados.enable)

        router.push({
            path: '/live'
        })

    } catch (error) {
        alertType.value = 'alert-danger'
        if(error instanceof Error){
            errorMessage.value = error.message;
        }else{
            errorMessage.value = 'Ocorreu um erro desconhecido.'
        }   
        showError.value = true
    }
}
</script>

<template>
    <Layout>
        <main class="container-fluid bg-opaque-green" id="schedule">
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
                            <form class="row g-3 mb-3" @submit.prevent="handleSubmit">
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
                                            <input :type="inputType" class="form-control fs-5"
                                                placeholder="Insira sua senha" aria-label="Insira sua senha"
                                                aria-describedby="password_button">
                                            <button class="btn btn-light" type="button" id="password_button"
                                                @click="changePassVisibility()"><font-awesome-icon
                                                    :icon="eyeType" /></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group d-grid">
                                        <button class="btn btn-lg btn-success rounded-pill">{{ txt_submit }}</button>
                                    </div>
                                </div>
                            </form>
                            <div class="row" v-if="showError">
                                <div class="col">
                                    <div :class="['alert', 'alert-dismissible', 'fade', 'show', alertType]" role="alert">
                                        {{ errorMessage }}
                                        <button type="button" class="btn-close" data-bs-dismiss="alert"
                                            aria-label="Close">
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <p class="text-center mb-0">
                                        Ainda não se cadastrou? Faça seu cadastro clicando <RouterLink to="/subscribe"
                                            class="text-decoration-none text-darkgreen fw-bold">aqui.</RouterLink>
                                    </p>
                                    <p class="text-center">
                                        Esqueceu a senha? Clique <RouterLink to="/forget-password"
                                            class="text-decoration-none text-darkgreen fw-bold">aqui.</RouterLink>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    </Layout>
</template>

<style lang="scss" scoped>
.bg-opaque-green {
    background-color: #E5EBE5 !important;
}

#schedule {
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