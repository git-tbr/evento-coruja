<script setup>
import Layout from '@/layouts/outHomeLayout.vue';
sessionStorage.setItem('enable', 1)
</script>

<template>
  <Layout>
    <main class="bg-body-tertiary">
      <!-- título e descrição -->
      <section>
        <article class="container py-5">
          <h2 class="text-center text-principal">
            Curso Revisão Pré-Prova
          </h2>
          <p class="pt-3 fs-4 text-center">
            <b>Seu pagamento foi realizado com sucesso!</b>
          </p>
          <p class="fs-5 text-principal text-center">
            O curso será realizado nos dias 07, 08 e 09 de novembro de 2025.
          </p>
          <div class="row justify-content-center">
            <div class="col-auto">
              <p class="fw-semibold fs-5 mb-0">
                Presencial:
              </p>
              <ul class="mb-3">
                <li>Hotel Íbis Porto São João</li>
                <li>Rua Dr. Plácido da Costa, 4200-450 Porto</li>
              </ul>
              <p class="fw-semibold fs-5 mb-0">
                Ao vivo pela internet:
              </p>
              <ul class="mb-3">
                <li>Acesse essa plataforma</li>
              </ul>
              <p class="fw-semibold fs-5 mb-0">
                Aulas gravadas após o curso:
              </p>
              <ul class="mb-3">
                <li>Acesse essa plataforma</li>
              </ul>
            </div>
          </div>
        </article>
      </section>
    </main>
  </Layout>
</template>



<style scoped>
main {
  min-height: calc(100vh - 304px);
}
</style>
