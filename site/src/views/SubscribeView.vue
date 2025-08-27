<script setup lang="ts">
import Layout from '@/layouts/outHome.vue'
import { onMounted, reactive, ref } from 'vue';
import countries from '@/util/countries';

type formUserData = {
  cpf: string,
  tratamento: string,
  nomeCompleto: string,
  nomeSocial?: string,
  pais: string,
  cidade: string,
  celular: string,
  areaAtuacao: string,
  email: string,
  confEmail: string,
  senha: string,
  confSenha: string,
  participation: string,
  participationNumber: number,
  aluno: string,
  tipoCurso: string,
  cursoRealizado: string,
  contactOrganization: string,
  veracity: string,
}

const countryList: Object = countries
const ip = ref<string>('')
const urlApi = 'https://eventos.tbr.com.br/apis/subscribe/'
const submit_txt = ref<string>('Fazer a minha inscrição!')
const alertEmail = ref<string>('')
const alertPassword = ref<string>('')

const form = reactive<formUserData>({
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
  veracity: ''
})

const cpfFormat = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  const value = target.value;

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

const checkPassword = () => {
  if (form.senha !== form.confSenha) {
    alertPassword.value = 'As senhas não conferem'
  } else {
    alertPassword.value = ''
  }
}

const getIp = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    ip.value = data.ip
  } catch (error) {
    console.error('Erro ao verificar o IP:', error)
  }
}

const handleSubmit = async () => {
  const data = {
    dataCategory: form.,
    dataTreatment: treatment.value,
    dataCellphone: cellphone.value,
    dataCpf: cpf.value,
    dataName: name.value,
    dataCouncilNumber: councilNumber.value,
    dataCouncilState: councilState.value,
    dataEmail: email.value,
    dataOccupation: occupation.value,
    dataInstitution: institution.value,
    dataEvento: lojaStore.evento,
    dataIp: ip.value,
    dataPagina: 'SBGG - Highlights AAIC 2025',
    dataContatoTbr: contactOrganization.value,
    dataEnable: 1,
  }
}

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
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p class="text-success small fw-semibold">
              Campos obrigatórios *
            </p>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="row">
          <div class="col-12">
            <div class="container px-0">
              <div class="row mb-3">
                <!-- CPF -->
                <div class="col-md-6 col-lg-3 align-self-end">
                  <label for="cpf" class="form-label">CPF(Somente Brasileiros)</label>
                  <input type="text" v-model="form.cpf" class="form-control fs-5" id="cpf" @keyup="cpfFormat"
                    placeholder="999.999.999-99" required>
                </div>

                <!-- Tratamento -->
                <div class="col-md-6 col-lg-3 align-self-end">
                  <label for="tratamento" class="form-label"><span class="text-success">*</span>Tratamento</label>
                  <select v-model="form.tratamento" class="form-select fs-5" id="tratamento" required>
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
                  <input type="text" v-model="form.nomeCompleto" class="form-control fs-5" id="nomeCompleto" required>
                </div>

                <!-- Nome Social -->
                <div class="col-lg-6">
                  <label for="nomeSocial" class="form-label">Nome Social</label>
                  <input type="text" v-model="form.nomeSocial" class="form-control fs-5" id="nomeSocial">
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
                  <input type="text" v-model="form.cidade" class="form-control fs-5" id="cidade" required>
                </div>

                <!-- Celular -->
                <div class="col-md-4 align-self-end">
                  <label for="celular" class="form-label"><span class="text-success">*</span>Celular</label>
                  <input type="tel" v-model="form.celular" class="form-control fs-5" id="celular"
                    placeholder="(99) 99999-9999" required>
                </div>
              </div>
              <div class="row mb-3">
                <!-- Área de Atuação -->
                <div class="col-12">
                  <label for="areaAtuacao" class="form-label"><span class="text-success">*</span>Área de Atuação</label>
                  <input type="text" v-model="form.areaAtuacao" class="form-control fs-5" id="areaAtuacao">
                </div>
              </div>
              <div class="row mb-3">
                <!-- Email -->
                <div class="col-md-6">
                  <label for="email" class="form-label"><span class="text-success">*</span>E-mail</label>
                  <input type="email" v-model="form.email" class="form-control fs-5" id="email" required>
                </div>

                <!-- Confirmação de Email -->
                <div class="col-md-6">
                  <label for="confEmail" class="form-label"><span class="text-success">*</span>Confirme o E-mail</label>
                  <input type="email" v-model="form.confEmail" class="form-control fs-5" id="confEmail"
                    @blur="checkEmail" required>
                  <div v-if="alertEmail != ''" class="text-danger small">
                    {{ alertEmail }}
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <!-- Senha -->
                <div class="col-md-6">
                  <label for="senha" class="form-label"><span class="text-success">*</span>Senha</label>
                  <input type="password" v-model="form.senha" class="form-control fs-5" id="senha" required>
                </div>

                <!-- Confirmação de Senha -->
                <div class="col-md-6">
                  <label for="confSenha" class="form-label"><span class="text-success">*</span>Confirme a Senha</label>
                  <input type="password" v-model="form.confSenha" class="form-control fs-5" id="confSenha"
                    @blur="checkPassword" required>
                  <div v-if="alertPassword != ''" class="text-danger small">
                    {{ alertPassword }}
                  </div>
                </div>
              </div>
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
                  <input type="number" id="participationNumber" class="form-control fs-5"
                    v-model="form.participationNumber">
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
                        v-model="form.aluno" value="SIM">
                      <label class="form-check-label fs-5" for="alunoMentoria1">
                        Sim
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input rounded-1 fs-5" type="radio" name="aluno" id="alunoMentoria2"
                        v-model="form.aluno" value="NAO">
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
                    <input class="form-check-input fs-5" type="checkbox" value="S" id="contactOrganization"
                      v-model="form.contactOrganization">
                    <label class="form-check-label fs-5 fw-semibold" for="contactOrganization">
                      Aceito receber informações de eventos conforme apresentado na política de privacidade da TBR;
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input fs-5" type="checkbox" value="S" id="veracity" v-model="form.veracity"
                      required>
                    <label class="form-check-label fs-5 fw-semibold" for="veracity">
                      Declaro, para os devidos fins, a veracidade das informações preenchidas.
                    </label>
                  </div>
                </div>
              </div>
              <div class="row py-3">
                <!-- Submit button -->
                <div class="col-6 col-md-4 col-lg-3 d-grid mx-auto">
                  <button type="submit" class="btn btn-success rounded-pill btn-lg">
                    {{ submit_txt }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  </Layout>
</template>

<style lang="scss" scoped>
.bg-opaque-green {
  background-color: #E5EBE5 !important;
}
</style>