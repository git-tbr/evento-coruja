<script setup lang="ts">
import NavbarComponent from '@/components/NavbarOutHomeComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>

<template>
    <NavbarComponent />
    <div id="main_content">
        <slot />
    </div>
    <FooterComponent id="system_footer" />
</template>

<style lang="scss" scoped>
#main_content{
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 304px);
}

#system_footer{
    margin-top: auto;
}
</style>