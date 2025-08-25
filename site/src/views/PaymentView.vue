<script lang="ts" setup>
import { useSiteStore } from '@/stores/website';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const siteStore = useSiteStore();
const nome = ref<string>('');
const email = ref<string>('');
const evento = ref<number>(0);

async function setPayment() {

  try {
    const response = await fetch("https://eventos.tbr.com.br/coruja-crpp2025/public/setdata.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: email.value,
        evento: evento.value,
        empresa: siteStore.company,
        descricao: 'Taxa de inscrição - Curso Revisão Pré-Prova',
        urlretorno: 'https://eventos.tbr.com.br/coruja-crpp2025/#/paymentreturn'
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.estado == 1) {
        window.location.href = 'https://eventos.tbr.com.br/coruja-crpp2025/public/checkout.html?control='+data.paymenthash;
      } else {
        throw new Error(data.message);
      }
    } else {
      throw new Error("Falha ao gerar a cobrança. Por favor entre em contato com o suporte.");
    }
  } catch (error) {
    console.log(error);
  }
}

const verifyLogin = async () => {
  try {
    const urlGet = `https://eventos.tbr.com.br/apis/login/?evento=${siteStore.evento}&email=${siteStore.email}`
    const response = await fetch(urlGet, {
      method: 'GET',
      headers: new Headers()
    })

    if (response.ok) {
      const data = await response.json()
      if (data.estado == 1) {
        const uNome = `${data.dados.firstname} ${data.dados.lastname}`
        const uEmail = data.dados.email
        const uId = data.dados.id
        const uCategory = data.dados.subscribe_training_center

        sessionStorage.setItem('isAuthenticated', 'true')
        sessionStorage.setItem('name', uNome)
        sessionStorage.setItem('email', uEmail)
        sessionStorage.setItem('userid', uId)
        sessionStorage.setItem('categoria', uCategory)
        sessionStorage.setItem('tratamento', data.dados.treatment)
        sessionStorage.setItem('ip', data.dados.ip)
        sessionStorage.setItem('city', data.dados.city)
        sessionStorage.setItem('state', data.dados.state)
        sessionStorage.setItem('enable', data.dados.enable)

        if (data.dados.enable == 1) {
          router.push({ path: '/live' })
        }
      }
    } else {
      const data = await response.json()
      throw new Error(data.message)
    }
  } catch (error) {
    if(error instanceof Error){
        alert('Ocorreu um erro inesperado, por favor entre em contato com o suporte')
    }else{
        alert('Ocorreu um erro inesperado, por favor entre em contato com o suporte')
    }
  }

}

onMounted(async () => {
  await verifyLogin()
  nome.value = siteStore.name;
  email.value = siteStore.email;
  evento.value = siteStore.evento;

  setPayment();
})

</script>

<template>
  <main>
    
  </main>
</template>