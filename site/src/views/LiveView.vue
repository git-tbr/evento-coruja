<script lang="ts" setup>
import Layout from '@/layouts/outHome.vue'
import router from '@/router';
import { onMounted } from 'vue';

onMounted(() => {
    const enableStatus = sessionStorage.getItem('enable')

    if(enableStatus !== null && parseInt(enableStatus) !== 1){
        router.push({path: '/payment'})
    }else{
        //router.push({path: '/ondemand'})
        window.location.href = './live.php'
    }
})
</script>

<template>
    <Layout>
    <main class="bg-body-tertiary">
        <!-- título e descrição -->
        <section>
            <article class="container py-5">
                <h2 class="text-center text-principal">
                    
                </h2>
                <p class="fs-5 text-center text-principal">
                    
                </p>
            </article>
        </section>
    </main>
    </Layout>
</template>

<style scoped>
main {
    min-height: calc(100vh - 96px);
}

.proportion {
    aspect-ratio: 16/10;
}

.chatsize {
    min-height: 350px;
}
</style>
