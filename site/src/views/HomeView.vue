<script setup lang="ts">
import Layout from '@/layouts/default.vue'
import router from '@/router'
import img01 from '../assets/img/img_01.jpg'
import img02 from '../assets/img/img_02.jpg'
import img03 from '../assets/img/img_03.jpg'
import img04 from '../assets/img/img_04.jpg'
import img05 from '../assets/img/img_05.jpg'
import img06 from '../assets/img/img_06.jpg'
import img07 from '../assets/img/img_07.jpg'
import img08 from '../assets/img/img_08.jpg'

const images = [
  {id: 1, url: img01},
  {id: 2, url: img02},
  {id: 3, url: img03},
  {id: 4, url: img04},
  {id: 5, url: img05},
  {id: 6, url: img06},
  {id: 7, url: img07},
  {id: 8, url: img08},
]

/*
const professors = [
  { id: 1, name: 'Dr. Jamil Ribeiro Cade', text: 'Clínico geral, cardiologista clínico e intervencionista. \n Aprovado com 19 em 20 valores na revalidação em Portugal.', url: jamil },
  { id: 2, name: 'Dra. Ana Carolina Facundo', text: 'Médica de família e comunidade, geriatra, e supervisora do Programa Mais Médicos. \n Aprovada com 17 em 20 valores; nota máxima na segunda fase e nota máxima atribuída em currículo na terceira fase.', url: ana }
]
*/

</script>

<template>
  <Layout>
    <main>
      <!-- banner -->
      <section class="container-fluid hero" id="hero">
        <div class="container py-5">
          <div class="py-5">
            <img src="../assets/img/logo_branco.png" alt="Logo branco corujá" id="logo_branco">
            <h1 class="rt-h1 fw-semibold text-light mb-5">
              Curso Revisão Pré-Prova
            </h1>
            <p class="text-light fw-semibold fs-2 fs-lg-1">
              <font-awesome-icon icon="fa-regular fa-calendar-check" />
              07, 08 e 09 de novembro
            </p>
            <p class="text-light fw-semibold fs-2 fs-lg-1">
              <font-awesome-icon icon="fa-regular fa-clock" />
              08h00 às 17h00
            </p>
          </div>
        </div>
      </section>

      <!-- sobre -->
      <section class="container-fluid" id="about">
        <article class="container py-3 py-lg-5">
          <div class="row">
            <div class="col-lg-8">
              <h2 class="text-danger fw-semibold display-4">
                Sobre nós
              </h2>
              <p class="fs-5">
                O CoruJÁ – Curso Revisão Pré-Prova é um intensivo preparatório para a prova de revalidação médica e para
                a Prova Nacional de Acesso (PNA) ao internato médico em Portugal, que acontecerão nos dias 17 e 26 de
                novembro de 202, respectivamente. Realizado nos dias 07, 08 e 09 de novembro, no Hotel Íbis Porto São
                João (Rua Dr. Plácido da Costa, 4200-450 Porto), o curso oferece aulas ao vivo, no formato híbrido:
                presenciais e transmitidas on-line pela plataforma da TBR. Com programação das 08:30h às 18:30h,
                proporciona uma revisão completa e focada para garantir o melhor desempenho nos exames.
              </p>
            </div>
            <div class="col-lg-4 d-none d-lg-flex">
              <img src="../assets/img/coruja.png" alt="imagem da coruja" class="w-75 d-block mx-auto">
            </div>
          </div>
        </article>
      </section>

      <!-- programação -->
      <section class="container-fluid bg-light-green" id="schedule">
        <article class="bg-white-curve row pt-5">
          <div class="col">
            <div class="container">
              <h2 class="text-darkgreen fw-semibold display-4">
                Programação
              </h2>
            </div>
          </div>
        </article>
        <article class="container py-3 py-lg-5">
          <div class="row mb-4">
            <div class="col-md-auto border-img">
              <p class="text-center text-danger display-4 fw-bold px-3">
                1º <br> Dia
              </p>
            </div>
            <div class="col col-lg-6 ps-3 border-bottom border-2 border-darkgreen">
              <span class="text-danger fs-4 fw-semibold">
                Manhã: Clínica Médica 1
              </span>
              <ul class="list-unstyled fs-5">
                <li class="text-darkgreen fw-semibold">Até 8h - Chegada dos alunos</li>
                <li class="text-darkgreen fw-semibold">8h até 8h30 - Boas-vindas</li>
                <li class="text-darkgreen fw-semibold">8h30 - inicío das atividades</li>
              </ul>
              <span class="text-danger fs-4 fw-semibold">
                Tarde: GO e Psiquiatria
              </span>
              <ul class="list-unstyled fs-5">
                <li class="text-darkgreen fw-semibold">13h até 14h30 - Almoço</li>
                <li class="text-darkgreen fw-semibold">14h30 - Retorno às atividades</li>
                <li class="text-darkgreen fw-semibold">18h30 - Término das atividades</li>
              </ul>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-auto border-img">
              <p class="text-center text-danger display-4 fw-bold px-3">
                2º <br> Dia
              </p>
            </div>
            <div class="col col-lg-6 ps-3 border-bottom border-2 border-darkgreen">
              <span class="text-danger fs-4 fw-semibold">
                Manhã: Clínica Médica 2
              </span>
              <ul class="list-unstyled fs-5">
                <li class="text-darkgreen fw-semibold">Até 8h - Chegada dos alunos</li>
                <li class="text-darkgreen fw-semibold">8h - inicío das atividades</li>
              </ul>
              <span class="text-danger fs-4 fw-semibold">
                Tarde: Pediatria
              </span>
              <ul class="list-unstyled fs-5">
                <li class="text-darkgreen fw-semibold">13h até 14h30 - Almoço</li>
                <li class="text-darkgreen fw-semibold">14h30 - Retorno às atividades</li>
                <li class="text-darkgreen fw-semibold">18h30 - Término das atividades</li>
              </ul>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-auto border-img">
              <p class="text-center text-danger display-4 fw-bold px-3">
                3º <br> Dia
              </p>
            </div>
            <div class="col col-lg-6 ps-3 border-bottom border-2 border-darkgreen">
              <span class="text-danger fs-4 fw-semibold">
                Manhã: Cirurgia
              </span>
              <ul class="list-unstyled fs-5">
                <li class="text-darkgreen fw-semibold">Até 8h - Chegada dos alunos</li>
                <li class="text-darkgreen fw-semibold">8h - inicío das atividades</li>
              </ul>
              <span class="text-danger fs-4 fw-semibold">
                Tarde: SP e MGF
              </span>
              <ul class="list-unstyled fs-5">
                <li class="text-darkgreen fw-semibold">13h até 14h30 - Almoço</li>
                <li class="text-darkgreen fw-semibold">14h30 - Retorno às atividades</li>
                <li class="text-darkgreen fw-semibold">18h30 - Término das atividades</li>
              </ul>
            </div>
          </div>

        </article>
      </section>

      <!-- professores -->
      <section class="container-fluid bg-gradient-green" id="professors">
        <article class="container py-3 py-lg-5">
          <div class="row">
            <div class="col">
              <h2 class="text-light fw-semibold display-4 mb-lg-3 text-center">
                Professores
              </h2>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 p-3">
              <div class="container">
                <div class="row">
                  <div class="col-6 p-0 rounded-start-4 bg-dark">
                    <img src="../assets/img/block-jamil.png" alt="Dr Jamil Ribeiro Cade" class="w-100 rounded-4">
                  </div>
                  <div class="col-6 p-0 bg-dark d-flex flex-column-reverse rounded-top-end-50">
                    <div class="p-3">
                      <h5 class="fw-semibold text-center text-light">
                        Dr. Jamil Ribeiro Cade
                      </h5>
                      <p class="text-center text-light small">
                        Clínico geral, cardiologista clínico e intervencionista.
                        Professor de Medicina e Doutor (PhD) no Brasil e Portugal.Aprovado com 19 em 20 valores na
                        revalidação em Portugal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 p-3">
              <div class="container">
                <div class="row">
                  <div class="col-6 p-0 bg-dark d-flex flex-column rounded-bottom-start-50">
                    <div class="p-3">
                      <h5 class="fw-semibold text-center text-light">
                        Dr. Jamil Ribeiro Cade
                      </h5>
                      <p class="text-center text-light small">
                        Médica de Família e Geriatra.
                        <br>
                        Supervisora do PMMB e professora de pós-graduação em MFC.
                        <br>
                        Aprovada com 17 em 20 valores na revalidação em Portugal.
                      </p>
                    </div>
                  </div>
                  <div class="col-6 p-0 rounded-end-4 bg-dark">
                    <img src="../assets/img/block-ana.png" alt="Dra Ana Carolina Facundo" class="w-100 rounded-4">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <!-- subscribe -->
      <section class="container-fluid bg-dark-green" id="subscribe_section">
        <article class="container pt-3 pt-lg-5">
          <div class="row">
            <div class="col-lg-6">
              <p class="fs-5 text-light">
                Estude e revise com quem mais entende da prova e dê o primeiro passo rumo à Medicina em Portugal.
              </p>
              <p class="fs-5 text-light">
                Sua aprovação começa com clareza, suporte e um plano validado.
              </p>
              <p class="fs-5 fw-semibold text-light">
                Garanta sua vaga agora!
              </p>
              <div class="d-grid my-5">
                <button class="btn btn-danger rounded-pill bg-gradient btn-lg"
                  @click="router.push({ name: 'subscribe' })">INSCREVA-SE</button>
              </div>
            </div>
            <div class="col-lg-6 d-none d-lg-flex">
              <img src="../assets/img/paper-airplane.png" alt="avião de papel" class="w-100">
            </div>
          </div>
        </article>
      </section>

      <!-- galeria -->
      <section class="container-fluid bg-dark-green" id="images">
        <article class="row bg-light-green">
          <h2 class="display-4 text-center py-3 fw-bold">
            Confira as imagens dos anos anteriores!
          </h2>
        </article>
        <article class="row">
          <div class="col">
            <div class="container">
              <div id="imgCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
                <div class="carousel-inner">

                  <div :class="['carousel-item', {active: img.id === 1}]" v-for="img in images" :key="img.id" data-bs-interval="3000">
                    <img :src="img.url" class="d-block w-100" alt="Imagem de anos anteriores">
                  </div>                  

                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#imgCarousel"
                  data-bs-slide="prev">
                  <span class="carousel-control-prev-icon bg-dark-green rounded" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#imgCarousel"
                  data-bs-slide="next">
                  <span class="carousel-control-next-icon bg-dark-green rounded" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  </Layout>
</template>

<style lang="scss" scoped>
.hero {
  background-image: url(../assets/img/banner.png);
  background-position: right;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 50vh;
}

#logo_branco {
  width: 60%;
  max-width: 500px;
}

.rt-h1 {
  font-size: clamp(2rem, 4.5vw, 6rem);
}

#subscribe_section {
  background-image: url(../assets/img/semi-circle.png);
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: 10%;
}

.bg-white-curve {
  background-image: url(../assets/img/white-curve.png);
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 285px;
  margin-bottom: -20px;
}

#about {
  background-color: #E5EBE5;
}

.border-img {
  border-right: 12px solid transparent;
  border-image: url(../assets/img/border-image.png) 24 round;
}

.border-darkgreen {
  border-color: #08311C !important;
}

.bg-gradient-green {
  background-color: #08311C;
  background: linear-gradient(30deg, #08311C 0%, #126530 50%, #08311C 100%);
}

@media (min-width: 1200px) {
  #schedule {
    background-image: url(../assets/img/mozaic.png);
    background-position: right;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 20vw;
  }

  .rounded-top-end-50 {
    border-top-right-radius: 100%;
  }

  .rounded-bottom-start-50 {
    border-bottom-left-radius: 100%;
  }
}
</style>
