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

const url = "https://pagamentos.tbr.com.br/stripe/public/create_session.php"

//const alertType = ref('alert-danger')
const errorMessage = ref()
const urlsucesso = "https://eventos.tbr.com.br/coruja-crpp2025/#/sucesso?";
const urlcancelado = "https://eventos.tbr.com.br/coruja-crpp2025/";
const linkPagamento = ref()
//var stripe, elements;

/*
function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}

//submit
async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: returnUrl,
      receipt_email: document.getElementById("email").value,
    },
  });

  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}
*/

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

    /*
    //configuração do pagamento
    elements = stripe.elements(responseData.clientSecret)
    const paymentElementOptions = {
      layout: "accordion",
    }

    const paymentElement = elements.create("payment", paymentElementOptions)
    paymentElement.mount("#payment-element")

    document.querySelector("#payment-form").addEventListener("submit", handleSubmit);
    */

    linkPagamento.value = responseData.url

  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Ocorreu um erro, por favor entre em contato com o suporte'
    }
  }
}

const openLink = () => {
  window.location.href = linkPagamento.value
}

/*
//carregando o script base do stripe
const loadScript = async (src) => {
  const script = document.createElement('script')
  script.src = src
  script.onload = () => {
    console.log('Script carregado')
    stripe = Stripe('pk_live_51RJafKGmwrpUlslzdGpkJ4fGJsh0RptD0gU0d2ZoStCiVnyNr29jBywhRJmZDvIrY6u7XgGVJGq3Rbjciyx9iVLQ00ohnugh6x')
  }
  script.onerror = () => {
    console.log('Erro ao carregar')
  }
  document.body.appendChild(script)
}
*/

onMounted(async () => {
  userId.value = siteStore.userid
  company.value = siteStore.company
  evento.value = siteStore.evento
  email.value = siteStore.email

  if(sessionStorage.getItem('categoria') == 1098){
    cat.value = 'aluno'
    valor.value = '90,00'
  }else if(sessionStorage.getItem('categoria') == 1099){
    cat.value = 'novo'
    valor.value = '210,00'
  }else{
    cat.value = 'cupom'
    valor.value = '199,50'
  }

  //await loadScript('https://js.stripe.com/basil/stripe.js')
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
            <p class="text-center fw-semibold fs-5" v-if="valor == '199,50'">
              Valor da taxa de inscrição: &euro; 210,00
              <br>
              Cupom de desconto: &euro; 10,50
              <br>
              Valor a pagar: &euro; 199,50
            </p>
            <p class="text-center fw-semibold fs-5" v-else>
              Valor da taxa de inscrição: &euro; {{ valor }}
            </p>

            <button class="btn btn-lg btn-success rounded-pill" v-if="linkPagamento" @click="openLink()">
              Pagar Agora
            </button>

            <P class="text-center fs-5 py-3">
              Caso tenha problemas com o pagamento, entre em contato com o suporte:
              <a class="fs-5 text-decoration-none fw-semibold text-dark pt-2" href="tel:+5511947990277" target="_blank"><font-awesome-icon icon="fa-solid fa-phone" /> +55 11 94799-0277</a> 
              <a class="fs-5 fw-semibold text-success text-decoration-none py-2" href="https://wa.me/5511947990277" target="_blank"><font-awesome-icon icon="fa-brands fa-whatsapp" /> Whatsapp</a>
            </P>

            <p class="text-center text-danger" v-if="errorMessage">
              Não foi possível gerar seu pagamento, por favor entre em contato com o suporte.
              <br>
              Motivo: {{ errorMessage }}
            </p>            
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
