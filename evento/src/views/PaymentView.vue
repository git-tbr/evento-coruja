<script setup>
import Layout from '@/layouts/outHomeLayout.vue';
import { onMounted, ref } from 'vue';
import { useSiteStore } from '@/stores/website';

const siteStore = useSiteStore()
const userId = ref()
const company = ref()
const evento = ref()
const email = ref()
const cat = ref()
const valor = ref()
//const codigoCupom = ref()
//const showCupom = ref(false)

const url = "https://pagamentos.tbr.com.br/stripe/public/create_session.php"
//const urlCoupon = "https://eventos.tbr.com.br/apis/coruja/AplicaCupom.php"

const errorMessage = ref()
//const errorMessageCupom = ref()
const urlsucesso = "https://eventos.tbr.com.br/coruja-crpp2025/#/sucesso?";
const urlcancelado = "https://eventos.tbr.com.br/coruja-crpp2025/";
const linkPagamento = ref()

//config payment
const configPayment = async () => {
  try {
    const response = await fetch(url, {
      method: 'post',
      headers: new Headers(),
      body: JSON.stringify({
        userid: userId.value,
        company: company.value,
        descricao: 'Pagamento da taxa de inscrição do Curso Revisão Pré-Prova',
        urlsucesso,
        urlcancelado,
        produtoAluno: siteStore.pagamentoAluno,
        produtoNovo: siteStore.pagamentoNovo,
        produtoDesconto: siteStore.pagamentoDesconto,
        categoria: cat.value
      })
    })

    if (!response.ok) {
      throw new Error('Ocorreu um erro, por favor entre em contato com o suporte')
    }

    const responseData = await response.json()

    if (responseData.code == 0) {
      throw new Error(responseData.error)
    }

    linkPagamento.value = responseData.url

  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Ocorreu um erro, por favor entre em contato com o suporte'
    }
  }
}

/*
const aplicarCupom = async () => {
  if (codigoCupom.value != null && codigoCupom.value != '') {
    document.getElementById('button-addon2').disabled = true;
    try {
      const response = await fetch(urlCoupon, {
        method: 'post',
        headers: new Headers(),
        body: JSON.stringify({
          usuario: userId.value,
          dataCupomDesconto: codigoCupom.value,
          actualCategory: cat.value,
          newCategory: 1101,
        })
      })

      if (!response.ok) {
        throw new Error('Ocorreu um erro, por favor verifique o cupom informado e tente novamente')
      }

      const responseData = await response.json()

      if (responseData.code == 0) {
        throw new Error(responseData.message)
      }

      sessionStorage.setItem('categoria', responseData.dados.subscribe_training_center)

      window.location.reload()

    } catch (error) {
      if (error instanceof Error) {
        errorMessageCupom.value = error.message
      } else {
        errorMessageCupom.value = 'Ocorreu um erro, por favor entre em contato com o suporte'
      }
      document.getElementById('button-addon2').disabled = false;
      codigoCupom.value = ''
    }
  }
}
*/

const openLink = () => {
  window.location.href = linkPagamento.value
}

onMounted(async () => {
  userId.value = siteStore.userid
  company.value = siteStore.company
  evento.value = siteStore.evento
  email.value = siteStore.email

  if (sessionStorage.getItem('categoria') == 1098) {
    cat.value = 'aluno'
    valor.value = '90,00'
  } else if (sessionStorage.getItem('categoria') == 1099) {
    //showCupom.value = true
    cat.value = 'novo'
    valor.value = '210,00'
  } else {
    //codigoCupom.value = 'CORUJA10'
    cat.value = 'cupom'
    valor.value = '189,00'
  }

  await configPayment()
})

</script>

<template>
  <Layout>
    <main>
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-auto">
            <h2 class="text-center fw-semibold text-danger">Curso Revisão Pré-Prova</h2>

            <!--
            <div class="row" v-if="showCupom">
              <div class="col-lg-6 mx-auto">
                <div class="form-group">
                  <div class="input-group my-3">
                    <input type="text" v-model="codigoCupom" class="form-control rounded-pill fs-5 mb-1"
                      placeholder="Cupom de desconto" aria-label="Cupom de desconto" aria-describedby="button-addon2">
                    <button class="btn btn-success rounded-pill" type="button" id="button-addon2"
                      @click="aplicarCupom">Aplicar Cupom</button>
                  </div>
                </div>
              </div>
            </div>
            -->

            <p class="text-center fw-semibold fs-5" v-if="valor == '189,00'">
              Valor da taxa de inscrição: &euro; 210,00
              <br>
              Cupom de desconto: &euro; 21,00
              <br>
              Valor a pagar: &euro; 189,00
            </p>
            <p class="text-center fw-semibold fs-5" v-else>
              Valor da taxa de inscrição: &euro; {{ valor }}
            </p>

            <div class="row">
              <div class="col-lg-6 mx-auto">
                <button class="btn btn-lg btn-success rounded-pill" v-if="linkPagamento" @click="openLink()">
                  Pagar Agora
                </button>
              </div>
            </div>


            <p class="text-center fs-5 fw-semibold pt-3">
              Caso opte por fazer o pagamento posteriormente, retorne a esta página, faça o login e terá acesso a
              realizar o pagamento.
            </p>

            <P class="text-center fs-5 py-3">
              Caso tenha problemas com o pagamento, entre em contato com o suporte:
              <a class="fs-5 text-decoration-none fw-semibold text-dark pt-2" href="tel:+5511947990277"
                target="_blank"><font-awesome-icon icon="fa-solid fa-phone" /> +55 11 94799-0277</a>
              <a class="fs-5 fw-semibold text-success text-decoration-none py-2" href="https://wa.me/5511947990277"
                target="_blank"><font-awesome-icon icon="fa-brands fa-whatsapp" /> Whatsapp</a>
            </P>

            <p class="text-center text-danger" v-if="errorMessage">
              Não foi possível gerar seu pagamento, por favor entre em contato com o suporte.
              <br>
              Motivo: {{ errorMessage }}
            </p>
            <!--
            <p class="text-center text-danger" v-if="errorMessageCupom">
              Não foi possível aplicar o desconto.
              <br>
              Motivo: {{ errorMessageCupom }}
            </p>
            -->
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<style scoped>
/* Variables */
* {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #e5ebe5;
}

form {
  width: 30vw;
  min-width: 500px;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
  margin-top: auto;
  margin-bottom: auto;
}

.hidden {
  display: none;
}

#email {
  border-radius: 6px;
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  max-height: 44px;
  font-size: 16px;
  width: 100%;
  background: white;
  box-sizing: border-box;
}

#payment-message {
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
}

#payment-element {
  margin-bottom: 24px;
}

/* Buttons and links */
button {
  background: #06652e;
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
}

button:hover {
  filter: contrast(115%);
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}

/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
}

.spinner {
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

.spinner:before,
.spinner:after {
  position: absolute;
  content: "";
}

.spinner:before {
  width: 10.4px;
  height: 20.4px;
  background: #0055DE;
  border-radius: 20.4px 0 0 20.4px;
  top: -0.2px;
  left: -0.2px;
  -webkit-transform-origin: 10.4px 10.2px;
  transform-origin: 10.4px 10.2px;
  -webkit-animation: loading 2s infinite ease 1.5s;
  animation: loading 2s infinite ease 1.5s;
}

.spinner:after {
  width: 10.4px;
  height: 10.2px;
  background: #0055DE;
  border-radius: 0 10.2px 10.2px 0;
  top: -0.1px;
  left: 10.2px;
  -webkit-transform-origin: 0px 10.2px;
  transform-origin: 0px 10.2px;
  -webkit-animation: loading 2s infinite ease;
  animation: loading 2s infinite ease;
}

/* Payment status page */
#payment-status {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 30px;
  width: 30vw;
  min-width: 500px;
  min-height: 380px;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
  opacity: 0;
  animation: fadeInAnimation 1s ease forwards;
}

#status-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

h2 {
  margin: 0;
  color: #30313D;
  text-align: center;
}

a {
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  font-family: Arial, sans-serif;
  display: block;
}

a:hover {
  filter: contrast(120%);
}

#details-table {
  overflow-x: auto;
  width: 100%;
}

table {
  width: 100%;
  font-size: 14px;
  border-collapse: collapse;
}

table tbody tr:first-child td {
  border-top: 1px solid #E6E6E6;
  /* Top border */
  padding-top: 10px;
}

table tbody tr:last-child td {
  border-bottom: 1px solid #E6E6E6;
  /* Bottom border */
}

td {
  padding-bottom: 10px;
}

.TableContent {
  text-align: right;
  color: #6D6E78;
}

.TableLabel {
  font-weight: 600;
  color: #30313D;
}

#view-details {
  color: #0055DE;
}

#retry-button {
  text-align: center;
  background: #0055DE;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
}

@-webkit-keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes fadeInAnimation {
  to {
    opacity: 1;
  }
}

@media only screen and (max-width: 600px) {

  form,
  #payment-status {
    width: 80vw;
    min-width: initial;
  }
}
</style>
