<script setup>
import { ref } from 'vue'

const bodyText = ref('')
const buttonText = ref('')

const closeModal = () => {
    const modal = document.querySelector('#modal')
    modal.close()
}

const showModal = (bodyTxt, buttonTxt) => {
    bodyText.value = bodyTxt
    buttonText.value = buttonTxt
    const modal = document.querySelector('#modal')
    modal.showModal()
}

defineExpose({
    closeModal,
    showModal
})

/*
const props = defineProps({
    bodyText: String,
    buttonText: String
})
*/

</script>

<template>
    <dialog id="modal" class="bg-light rounded-4 border-0">
        <div class="p-3">
            <section class="">
                <p class="text-center mb-1 display-4 text-danger">
                    <font-awesome-icon icon="fa-solid fa-triangle-exclamation" />
                </p>
                <p class=" fs-4 text-center mb-3 text-dark">
                    {{ bodyText }}
                </p>
                <div class="mt-3">
                    <div class="row justify-content-center">
                        <div class="col-6 d-grid">
                            <button type="button" class="btn btn-danger rounded-pill bg-gradient" @click="closeModal">{{
                                buttonText }}</button>
                        </div>
                        <!-- <div class="col-6 d-grid">
                            <button type="submit" class="btn btn-danger rounded-pill bg-gradient">Sim</button>
                        </div> -->
                    </div>
                </div>
            </section>
        </div>
    </dialog>
</template>

<style scoped>
::backdrop {
    background-color: #b8b8b8;
    opacity: 0.75;
}

dialog {
    width: 100%;
    max-width: 300px;
    margin: auto;
    animation: surgir 0.5s ease-out forwards;
}

@keyframes surgir {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>