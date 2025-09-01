<script setup>
import { onMounted, ref } from 'vue'
import { useSiteStore } from '@/stores/website';
import { useRouter } from 'vue-router'
import Layout from '@/layouts/outHomeLayout.vue'

const router = useRouter()
const siteStore = useSiteStore()
const treatment = ref('')
const name = ref('')
const email = ref('')
const message = ref('')
const ip = ref('')
const pagina = ref('Corujá - curso revisão pré-prova')
const urlApi = "https://eventos.tbr.com.br/apis/support/";
const txtSubmit = ref('Enviar')
const isSubmitting = ref(false);
const messageReturn = ref();
const errorReturn = ref();

async function handleSubmit() {
  let data = {
    tratamento: treatment.value,
    nome: name.value,
    email: email.value,
    mensagem: message.value,
    ip: ip.value,
    evento: siteStore.evento,
    pagina: pagina.value,
  }

  txtSubmit.value = 'Aguarde'
  isSubmitting.value = true

  try {
    const response = await fetch(urlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.estado == 1) {
        messageReturn.value = data.message
        setTimeout(() => {
          router.go(0)
        }, 2000);
        
      } else {
        throw new Error(data.message);
      }
    } else {
      throw new Error("Falha ao enviar os dados.");
    }
  } catch (error) {
    errorReturn.value = error
    setTimeout(() => {
      router.go(0)
    }, 2000);
  }
}

async function getIp() {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    ip.value = data.ip
  } catch (error) {
    console.error('Erro ao verificar o IP:', error)
  }
}

onMounted(() => {
  let size = document.getElementById('box_left').offsetHeight
  document.getElementById('box_right').style.height = size + 'px'
  getIp()
})
</script>

<template>
  <Layout>
  <main class="container-fluid bg-opaque-green" id="schedule">
    <!-- título e descrição -->
    <section class="container py-5">
      <h1 class="text-center fw-bold text-principal">Suporte</h1>
      <p class="fs-5 text-center text-principal mb-3">
        Curso Revisão Pré-Prova
      </p>
    </section>

    <!-- formulário de suporte -->
    <section class="container pb-5">
      <p class="text-secundario fw-bold">
        Preencha os campos e clique em enviar:
        <br />
        Campos marcados com <span class="text-secundario">*</span> são obrigatórios.
      </p>
      <form @submit.prevent="handleSubmit" class="text-principal">
        <div class="row mb-3">
          <div class="col-md-6 mb-3" id="box_left">
            <div class="row g-3">
              <div class="col-12">
                <label class="fw-bold">
                  <span class="text-secundario">*</span>
                  Como gostaria de ser tratado(a)?
                </label>
                <select class="form-select text-principal border-2 rounded-3 fs-5" v-model="treatment" required>
                  <option value="">Selecione</option>
                  <option value="Dr">Dr.</option>
                  <option value="Dra">Dra.</option>
                  <option value="Prof">Prof.</option>
                  <option value="Profa">Profa.</option>
                  <option value="Sr">Sr.</option>
                  <option value="Sra">Sra.</option>
                </select>
              </div>
              <div class="col-12">
                <label class="fw-bold">
                  <span class="text-secundario">*</span>
                  Nome completo
                </label>
                <input type="text" class="form-control border-2 rounded-3 fs-5" v-model="name" required />
              </div>
              <div class="col-12">
                <label class="fw-bold">
                  <span class="text-secundario">*</span>
                  Email
                </label>
                <input type="email" class="form-control border-2 rounded-3 fs-5" v-model="email" required />
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-3" id="box_right">
            <label class="fw-bold">
              <span class="text-secundario">*</span>
              Mensagem
            </label>
            <textarea class="form-control border-2 rounded-3 fs-5" v-model="message"></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-3 mx-auto d-grid">
            <button class="btn btn-success text-light rounded-pill btn-lg bg-gradient" :disabled="isSubmitting">
              {{ txtSubmit }}
            </button>
          </div>
        </div>
        <div class="row" v-if="messageReturn" >
          <div class="col">
            <p class="text-center text-success fs-5" >
              {{ messageReturn }}
            </p>
          </div>
        </div>
        <div class="row" v-if="errorReturn" >
          <div class="col">
            <p class="text-center text-danger fs-5" >
              {{ errorReturn }}
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
  </Layout>
</template>

<style scoped>
#box_right textarea {
  min-height: 90%;
}

.bg-opaque-green {
  background-color: #E5EBE5 !important;
}

#schedule {
  min-height: inherit;
}
</style>
