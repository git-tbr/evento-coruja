<script setup>
import Layout from '@/layouts/outHomeLayout.vue'
import { onMounted, reactive, ref } from 'vue';
import countries from '@/util/countries';
import { useSiteStore } from '@/stores/website';
import { useRouter } from 'vue-router';
//import { VueTelInput } from 'vue-tel-input';
//import '../../node_modules/vue-tel-input/dist/vue-tel-input.css';

const router = useRouter();
const countryList = countries
const ip = ref('')
const urlApi = 'https://eventos.tbr.com.br/apis/coruja/subscribe.php'
const submit_txt = ref('Fazer a minha inscrição!')
const alertEmail = ref('')
// const alertPassword = ref('')
const siteStore = useSiteStore()
const alertType = ref('alert-danger')
const errorMessage = ref('')
const cupomDesconto = ref(false)
const errorMessageEmail = ref(false)


/*
//celular
const phoneNumber = ref('');
const validationInfo = ref(null);

const onValidate = (info) => {
  validationInfo.value = info;
  console.log('Informações de validação:', info);
  form.celular = info.number;
};
*/

const form = reactive({
  cpf: '',
  tratamento: '',
  nomeCompleto: '',
  nomeSocial: '',
  pais: '',
  cidade: '',
  celular: '',
  areaAtuacao: '',
  email: '',
  confEmail: '',
  senha: '',
  confSenha: '',
  participation: '',
  participationNumber: 0,
  aluno: '',
  tipoCurso: '',
  cursoRealizado: '',
  contactOrganization: '',
  veracity: '',
  cupom: '',
})

const cpfFormat = (evt) => {
  const value = evt.target.value
  const cpfPattern = value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')

  form.cpf = cpfPattern
}

const checkEmail = () => {
  if (form.email !== form.confEmail) {
    alertEmail.value = 'Os emails não conferem'
  } else {
    alertEmail.value = ''
  }
}

// const checkPassword = () => {
//   if (form.senha !== form.confSenha) {
//     alertPassword.value = 'As senhas não conferem'
//   } else {
//     alertPassword.value = ''
//   }
// }

const getIp = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    ip.value = data.ip
  } catch (error) {
    console.error('Erro ao verificar o IP:', error)
  }
}

const sendForm = async (data) => {
  submit_txt.value = 'Por favor, aguarde'

  try {
    const response = await fetch(urlApi, {
      method: 'post',
      headers: new Headers(),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Ocorreu um erro, por favor entre em contato com o suporte')
    }

    const responseData = await response.json()

    if (responseData.code == 0) {
      throw new Error(responseData.message)
    }

    if (responseData.code == 2) {
      errorMessageEmail.value = true
      return false;
    }

    const userName = `${responseData.dados.firstname} ${responseData.dados.lastname}`
    const userEmail = responseData.dados.email
    const userId = responseData.dados.id
    const userCategory = responseData.dados.subscribe_training_center

    siteStore.login({
      name: userName,
      email: userEmail,
      id: userId
    })

    sessionStorage.setItem('isAuthenticated', 'true')
    sessionStorage.setItem('name', userName)
    sessionStorage.setItem('email', userEmail)
    sessionStorage.setItem('userid', userId)
    sessionStorage.setItem('categoria', userCategory)
    sessionStorage.setItem('enable', responseData.dados.enable)

    //window.location.href = './public/checkout.html'
    router.push({
      path: '/payment'
    })

  } catch (error) {
    alertType.value = 'alert-danger'

    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Ocorreu um erro, por favor entre em contato com o suporte'
    }
  }
}

const handleSubmit = async () => {
  document.getElementById('btnSubmit').disabled = true;
  const data = {
    dataCpf: form.cpf,
    dataTreatment: form.tratamento,
    dataName: form.nomeCompleto,
    dataSocialName: form.nomeSocial,
    dataPais: form.pais,
    dataCidade: form.cidade,
    dataEmail: form.email,
    dataCategory: form.aluno == 's' ? 1098 : 1099,
    dataCellphone: form.celular,
    dataOccupation: form.areaAtuacao,
    dataEvento: siteStore.evento,
    dataIp: ip.value,
    dataPagina: 'Coruja - Curso Revisão Pré-Prova',
    dataContatoTbr: form.contactOrganization,
    dataEnable: 0,
    dataParticipation: form.participation,
    dataParticipationNumber: form.participationNumber,
    dataAluno: form.aluno,
    dataTipoCurso: form.tipoCurso,
    dataCursoRealizado: form.cursoRealizado,
    dataCupomDesconto: form.cupom,
  }

  sendForm(data)
}

// const loadScript = () => {
//   return new Promise((resolve, reject) => {
//     const scriptElement = document.createElement('script');
//     scriptElement.src = externalScript;
//     scriptElement.async = true;

//     scriptElement.onload = () => {
//       console.log('Script carregado')
//       resolve();
//     };

//     scriptElement.onerror = (error) => {
//       console.error('Falha ao carregar o script: ', error);
//       reject(error);
//     }

//     document.body.appendChild(scriptElement);
//   })
// }

onMounted(async () => {
  getIp()
})

</script>

<template>
  <Layout>
    <main class="bg-opaque-green">
      <section class="container py-5">
        <div class="row">
          <div class="col py-3">
            <h2 class="display-5 fw-bold text-center text-darkgreen">
              INSCRIÇÃO
            </h2>
            <p class="text-center fs-5">
              As vagas presenciais são limitadas e serão preenchidas por ordem de chegada
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p class="text-success small fw-semibold">
              Campos obrigatórios *
            </p>
            <p class="text-small" v-if="cupomDesconto">
              Validade do cupom: de 02/09/2025 a partir das 21:00h até 03/09/2025 às 23:00h (Hora de Lisboa)
            </p>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="row">
          <div class="col-12">
            <div class="container px-0">
              <div class="row mb-3" v-if="cupomDesconto">
                <div class="col-md-6">
                  <label for="cupomDesconto">Cupom de desconto:</label>
                  <input type="text" v-model="form.cupom" class="form-control fs-5 border-secondary-subtle rounded-3"
                    id="cupomDesconto">
                </div>
              </div>
              <div class="row mb-3">
                <!-- CPF -->
                <div class="col-md-6 col-lg-3 align-self-end">
                  <label for="cpf" class="form-label">CPF(Somente Brasileiros)</label>
                  <input type="text" v-model="form.cpf" class="form-control fs-5 border-secondary-subtle rounded-3"
                    id="cpf" @keyup="cpfFormat" placeholder="999.999.999-99">
                </div>

                <!-- Tratamento -->
                <div class="col-md-6 col-lg-3 align-self-end">
                  <label for="tratamento" class="form-label"><span class="text-success">*</span>Tratamento</label>
                  <select v-model="form.tratamento" class="form-select fs-5 border-secondary-subtle rounded-3"
                    id="tratamento" required>
                    <option value="" selected disabled>Selecione</option>
                    <option value="Dr">Dr</option>
                    <option value="Dra">Dra</option>
                    <option value="Prof">Prof</option>
                    <option value="Profa">Profa</option>
                    <option value="Sr">Sr</option>
                    <option value="Sra">Sra</option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <!-- Nome Completo -->
                <div class="col-lg-6">
                  <label for="nomeCompleto" class="form-label"><span class="text-success">*</span>Nome Completo</label>
                  <input type="text" v-model="form.nomeCompleto"
                    class="form-control fs-5 border-secondary-subtle rounded-3" id="nomeCompleto" required>
                </div>

                <!-- Nome Social -->
                <div class="col-lg-6">
                  <label for="nomeSocial" class="form-label">Nome Social</label>
                  <input type="text" v-model="form.nomeSocial"
                    class="form-control fs-5 border-secondary-subtle rounded-3" id="nomeSocial">
                </div>
              </div>
              <div class="row mb-3">
                <!-- País -->
                <div class="col-md-4 align-self-end">
                  <label for="pais" class="form-label"><span class="text-success">*</span>País</label>
                  <select id="pais" class="form-select fs-5" v-model="form.pais">
                    <option value="" selected disabled>Selecione</option>
                    <option v-for="(c, key) in countryList" :value="c.nome_pais" :key="key">{{ c.nome_pais }}</option>
                  </select>
                </div>

                <!-- Cidade -->
                <div class="col-md-4 align-self-end">
                  <label for="cidade" class="form-label"><span class="text-success">*</span>Cidade</label>
                  <input type="text" v-model="form.cidade" class="form-control fs-5 border-secondary-subtle rounded-3"
                    id="cidade" required>
                </div>

                <!-- Celular -->
                <div class="col-md-4 align-self-end">
                  <label class="form-label" for="phone"><span class="text-success">*</span> Informe o Celular com código
                    do país</label>
                  <!-- <vue-tel-input
                    :placeholder="'Insira seu número'"
                    v-model="phoneNumber"
                    :autoDefaultCountry="true"
                    :preferredCountries="['br', 'pt']"
                    class="form-control border-secondary-subtle rounded-3" @validate="onValidate">
                  </vue-tel-input> -->
                  <input type="tel" v-model="form.celular" class="form-control fs-5 border-secondary-subtle rounded-3"
                    id="phone" placeholder="Ex: +55 11 91234-5678" required>
                </div>
              </div>
              <div class="row mb-3">
                <!-- Área de Atuação -->
                <div class="col-12">
                  <label for="areaAtuacao" class="form-label"><span class="text-success">*</span>Área de Atuação</label>
                  <input type="text" v-model="form.areaAtuacao"
                    class="form-control fs-5 border-secondary-subtle rounded-3" id="areaAtuacao">
                </div>
              </div>
              <div class="row mb-3">
                <!-- Email -->
                <div class="col-md-6">
                  <label for="email" class="form-label"><span class="text-success">*</span>E-mail</label>
                  <input type="email" v-model="form.email" class="form-control fs-5 border-secondary-subtle rounded-3"
                    id="email" required>
                </div>

                <!-- Confirmação de Email -->
                <div class="col-md-6">
                  <label for="confEmail" class="form-label"><span class="text-success">*</span>Confirme o E-mail</label>
                  <input type="email" v-model="form.confEmail"
                    class="form-control fs-5 border-secondary-subtle rounded-3" id="confEmail" @blur="checkEmail"
                    required>
                  <div v-if="alertEmail != ''" class="text-danger small">
                    {{ alertEmail }}
                  </div>
                </div>
              </div>
              <!-- <div class="row mb-3">
                !-- Senha --
                <div class="col-md-6">
                  <label for="senha" class="form-label"><span class="text-success">*</span>Senha</label>
                  <input type="password" v-model="form.senha" class="form-control fs-5 border-secondary-subtle rounded-3" id="senha" required>
                </div>

                !-- Confirmação de Senha --
                <div class="col-md-6">
                  <label for="confSenha" class="form-label"><span class="text-success">*</span>Confirme a Senha</label>
                  <input type="password" v-model="form.confSenha" class="form-control fs-5 border-secondary-subtle rounded-3" id="confSenha"
                    @blur="checkPassword" required>
                  <div v-if="alertPassword != ''" class="text-danger small">
                    {{ alertPassword }}
                  </div>
                </div>
              </div> -->
              <div class="row pt-3 mb-3">
                <div class="col">
                  <p class="fs-5 mb-0 fw-semibold">
                    Esta é a primeira vez que você faz a prova para revalidação de diploma de Medicina em Portugal?
                  </p>
                  <div class="form-group">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input rounded-1 fs-5" type="radio" name="participacao" id="participacao1"
                        v-model="form.participation" value="SIM">
                      <label class="form-check-label fs-5" for="participacao1">
                        Sim
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input rounded-1 fs-5" type="radio" name="participacao" id="participacao2"
                        v-model="form.participation" value="NAO">
                      <label class="form-check-label fs-5" for="participacao2">
                        Não
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-auto">
                  <label for="participationNumber" class="fs-5 fw-semibold">Se afirmativo, quantas vezes já fez a
                    prova?</label>
                  <input type="number" id="participationNumber"
                    class="form-control fs-5 border-secondary-subtle rounded-3" v-model="form.participationNumber">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col">
                  <p class="fs-5 mb-0 fw-semibold">
                    Você já foi aluno do CoruJÁ Mentoria?
                  </p>
                  <div class="form-group">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input rounded-1 fs-5" type="radio" name="aluno" id="alunoMentoria1"
                        v-model="form.aluno" value="s">
                      <label class="form-check-label fs-5" for="alunoMentoria1">
                        Sim
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input rounded-1 fs-5" type="radio" name="aluno" id="alunoMentoria2"
                        v-model="form.aluno" value="n">
                      <label class="form-check-label fs-5" for="alunoMentoria2">
                        Não
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-12">
                  <p class="fs-5 mb-0 fw-semibold">
                    Se afirmativo, qual curso realizou?
                  </p>
                  <div class="form-check">
                    <input class="form-check-input fs-5 rounded-1" type="radio" name="cursoRealizado"
                      id="cursoRealizado1" value="Curso da Primeira Fase" v-model="form.cursoRealizado">
                    <label class="form-check-label fs-5" for="cursoRealizado1">
                      Curso da Primeira Fase
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input fs-5 rounded-1" type="radio" name="cursoRealizado"
                      id="cursoRealizado2" value="Curso de Revisão" v-model="form.cursoRealizado">
                    <label class="form-check-label fs-5" for="cursoRealizado2">
                      Curso de Revisão
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input fs-5 rounded-1" type="radio" name="cursoRealizado"
                      id="cursoRealizado3" value="Curso para a Segunda Fase" v-model="form.cursoRealizado">
                    <label class="form-check-label fs-5" for="cursoRealizado3">
                      Curso para a Segunda Fase
                    </label>
                  </div>
                </div>
              </div>
              <div class="row py-3 g-1">
                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input fs-5" type="checkbox" value="s" id="contactOrganization"
                      v-model="form.contactOrganization">
                    <label class="form-check-label fs-5 fw-semibold" for="contactOrganization">
                      Aceito receber informações de eventos conforme apresentado na política de privacidade da TBR;
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input fs-5" type="checkbox" value="s" id="veracity" v-model="form.veracity"
                      required>
                    <label class="form-check-label fs-5 fw-semibold" for="veracity">
                      Declaro que as informações aqui prestadas são verdadeiras.
                    </label>
                  </div>
                </div>
              </div>
              <div class="row py-3">
                <!-- Submit button -->
                <div class="col-6 col-md-4 col-lg-3 d-grid mx-auto">
                  <button type="submit" id="btnSubmit" class="btn btn-success rounded-pill btn-lg">
                    {{ submit_txt }}
                  </button>
                </div>
              </div>
              <div class="row">
                <div :class="['alert', 'alert-dismissible', 'fade', 'show', alertType]" role="alert"
                  v-if="errorMessage">
                  {{ errorMessage }}
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              </div>
              <div class="row">
                <div :class="['alert', 'alert-dismissible', 'fade', 'show', 'alert-danger']" role="alert"
                  v-if="errorMessageEmail">
                    Este cadastro já está ativo. Clique <a href='https://eventos.tbr.com.br/coruja-crpp2025/#/login'>aqui para fazer seu login</a>. 
                    <br>
                    Em caso de dúvidas por favor entre em contato com o suporte.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  </Layout>
</template>

<style scoped>
.bg-opaque-green {
  background-color: #E5EBE5 !important;
}
</style>
