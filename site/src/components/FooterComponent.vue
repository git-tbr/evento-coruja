<script setup lang="ts">
import { ref } from 'vue';

const instagram = ref('https://www.instagram.com/coruja_mentoria/')
</script>

<template>
    <footer class="container-fluid bg-footer">
        <div class="row shadow">
            <div class="col">
                <div class="container">
                    <div class="row py-4">
                        <div class="col-md-3">
                            <img src="../assets/img/logo_branco.png" alt="Logo branco" class="w-75 d-block mx-auto py-3">
                        </div>
                        <div class="col">
                            <p class="fs-5 text-light fw-semibold">
                                Entre em contato
                            </p>
                            <ul class="list-unstyled">
                                <li>
                                    <a href="tel:+5511947990277" class="text-decoration-none text-light">
                                        <font-awesome-icon icon="fa-solid fa-phone" /> (11) 9 4799-0277
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:email@corujamentoria.com" class="text-decoration-none text-light">
                                        <font-awesome-icon icon="fa-regular fa-envelope" /> email@corujamentoria.com
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" :href="instagram" class="text-decoration-none text-light">
                                        <font-awesome-icon icon="fa-brands fa-instagram" /> @coruja_mentoria
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="container">
                    <div class="row">
                        <div class="col-auto mx-auto">
                            <p class="mb-0 text-light fs-6 py-3">
                                Copyright &copy; 2025 - Todos os direitos reservados - <a href="https://tbr.com.br/"
                                    target="_blank" class="fw-bold text-light text-decoration-none">TBR Produções</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </footer>
</template>

<style lang="scss" scoped>
.bg-footer {
    background-color: #06652E;
}
</style>