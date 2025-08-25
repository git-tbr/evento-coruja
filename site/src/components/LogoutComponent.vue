<script setup lang="ts">
import { useSiteStore } from '@/stores/website';
import { useRouter } from 'vue-router';

const siteStore = useSiteStore()
const router = useRouter()

const closeModal = () => {
    const modal = document.querySelector<HTMLDialogElement>('#modal')
    modal?.close()
}

const doLogout = () => {
    siteStore.logout()
    router.push({
        name: 'index'
    })
}

const showModal = () => {
    const modal = document.querySelector<HTMLDialogElement>('#modal')
    modal?.showModal()
}

defineExpose({
    closeModal,
    doLogout,
    showModal
})
</script>

<template>
    <dialog id="modal" class="bg-light rounded-4 border border-secondary">
        <div class="p-3">
            <section class="my-4">
                <h2 class="fw-bold text-center mb-3">
                    Deseja sair?
                </h2>
                <form @submit.prevent="doLogout">
                    <div class="mt-3">
                        <div class="row">
                            <div class="col-6 d-grid">
                                <button class="btn btn-secondary" @click="closeModal">Não</button>
                            </div>
                            <div class="col-6 d-grid">
                                <button type="submit" class="btn btn-danger">Sim</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    </dialog>
</template>

<style lang="scss" scoped>
::backdrop{
    background-image: linear-gradient(45deg, #999, #222);
    opacity: 0.75;
}

dialog{
    width: 100%;
    max-width: 300px;
    margin: auto;
    animation: surgir 0.3s ease-out forwards;
}

@keyframes surgir {
    from{
        opacity: 0;
        transform: translateX(20px);
    }

    to{
        opacity: 1;
        transform: translateY(0);
    }
}
</style>