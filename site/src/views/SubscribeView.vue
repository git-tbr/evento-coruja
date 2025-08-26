<script setup lang="ts">
import Layout from '@/layouts/outHome.vue'
import { onMounted, ref } from 'vue';

const cpf = ref<string>('')
const treatment = ref<string>('')
const fullname = ref<string>('')

const cpfFormat = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  const value = target.value;

  const cpfPattern = value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
  
   cpf.value = cpfPattern
}

const getCountries = async (): Promise<void> => {
  const headers = new Headers();
  headers.append('X-CSCAPI-KEY', 'API_KEY');
  
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: headers,
    redirect: 'follow' as RequestRedirect
  };

  try{
    const response = await fetch('https://api.countrystatecity.in/v1/countries', requestOptions)
    const result = await response.text();
    console.log(result);
  }catch(error){
    console.error('error', error)
  }
}

onMounted(async () =>{
  await getCountries();
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
        <div class="row g-3">
          <div class="col-md-6 col-lg-3 align-self-end">
            <label for="cpf">CPF(Somente Brasileiros)</label>
            <input type="text" class="form-control fs-5" id="cpf" v-model="cpf" @keyup="cpfFormat" placeholder="999.999.999-99">
          </div>
          <div class="col-md-6 col-lg-3 align-self-end">
            <label for="treatment">
              <span class="text-success">*</span> Tratamento
            </label>
            <select class="form-select fs-5" id="treatment" v-model="treatment">
              <option value="" selected disabled>Selecione</option>
              <option value="Dr">Dr</option>
              <option value="Dra">Dra</option>
              <option value="Prof">Prof</option>
              <option value="Profa">Profa</option>
              <option value="Sr">Sr</option>
              <option value="Sra">Sra</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="">
              <span class="text-success" for="fullname">*</span> Nome completo
            </label>
            <input type="text" class="form-control fs-5" id="fullname" v-model="fullname">
          </div>
          <div class="col-12">
            <label for="">Nome social</label>
            <input type="text" name="" id="">
          </div>
          <div class="col-md-4 col-lg-2">
            <label for=""></label>
            
          </div>
          <div class="col-md-2 col-lg-1"></div>
          <div class="col-md-4 col-lg-2"></div>
          <div class="col-md-2 col-lg-1"></div>
        </div>
      </section>
    </main>
  </Layout>
</template>

<style lang="scss" scoped>
.bg-opaque-green{
  background-color: #E5EBE5 !important;
}
</style>