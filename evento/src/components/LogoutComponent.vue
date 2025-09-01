<script setup>
import { useSiteStore } from '@/stores/website';
import { useRouter } from 'vue-router';

const siteStore = useSiteStore()
const router = useRouter()

const closeModal = () => {
    const modal = document.querySelector('#modal')
    modal.close()
}

const doLogout = () => {
    siteStore.logout()
    router.push({
        name: 'home'
    })
    closeModal()
}

const showModal = () => {
    const modal = document.querySelector('#modal')
    modal.showModal()
}

defineExpose({
    closeModal,
    doLogout,
    showModal
})
</script>

<template>
    <dialog id="modal" class="bg-light rounded-4 border-0">
        <div class="p-3">
            <section class="">
                <p class="text-center mb-1 fs-1 text-danger">
                    <font-awesome-icon icon="fa-regular fa-circle-question" />
                </p>
                <p class="fw-semibold fs-4 text-center mb-3 text-dark">
                    Deseja sair?
                </p>
                <form @submit.prevent="doLogout">
                    <div class="mt-3">
                        <div class="row">
                            <div class="col-6 d-grid">
                                <button type="button" class="btn btn-secondary rounded-pill bg-gradient" @click="closeModal">Não</button>
                            </div>
                            <div class="col-6 d-grid">
                                <button type="submit" class="btn btn-danger rounded-pill bg-gradient">Sim</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    </dialog>
</template>

<style scoped>
::backdrop{
    background-color: #b8b8b8;
    opacity: 0.75;
}

dialog{
    width: 100%;
    max-width: 300px;
    margin: auto;
    animation: surgir 0.5s ease-out forwards;
}

@keyframes surgir {
    from{
        opacity: 0;
        transform: translateY(30px);
    }

    to{
        opacity: 1;
        transform: translateY(0);
    }
}
</style>