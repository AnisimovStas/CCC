<script setup>
import { ref, onMounted, watch, defineEmits } from "vue";
import { fetchCryptoCurrencies } from "./../api.js";
import suggestingCrypto from "./CryptoDropdown.vue";
const crypto1 = ref("");
const crypto2 = ref("");
const cryptoList = ref([]);
const emit = defineEmits({ addCurrencyToArray: null });
const emptyField1 = ref(false);
const emptyField2 = ref(false);

onMounted(async () => {
  cryptoList.value = await fetchCryptoCurrencies();
});
function add(currency1, currency2) {
  if (currency1 != "" && currency2 != "") {
    const currency = {
      name1: currency1.toUpperCase(),
      name2: currency2.toUpperCase(),
      price: "-",
      Open: false,
    };
    emit("addCurrencyToArray", currency);
    crypto1.value = "";
    crypto2.value = "";
  }
  if (currency1 == "") {
    emptyField1.value = !emptyField1.value;
    setTimeout(() => (emptyField1.value = !emptyField1.value), 1000);
  }
  if (currency2 == "") {
    emptyField2.value = !emptyField2.value;
    setTimeout(() => (emptyField2.value = !emptyField2.value), 1000);
  }
}
</script>
<template>
  <div class="container bg-white rounded-lg">
    <div class="flex justify-center py-2">
      <h1 class="text-gray-900 text-2xl font-bold w-full lg:w-1/3 text-center">
        Custom Crypto Currency
      </h1>
    </div>
    <!-- <div class="shake">test text</div>-->
    <div class="mx-7">
      <!--Currency #1-->
      <div class="my-4">
        <input
          type="text"
          v-model="crypto1"
          placeholder="Type Currency here"
          :class="{ 'shake placeholder:text-red-500': emptyField1 }"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <suggestingCrypto
          @addCurrencyInInput="(suggestion) => (crypto1 = suggestion)"
          :inputCurrency="crypto1"
        />
      </div>
      <!--Currency #2-->
      <div class="my-4">
        <input
          type="text"
          v-model="crypto2"
          placeholder="Type Currency here"
          @keydown.enter="add(crypto1, crypto2)"
          :class="{ 'shake  placeholder:text-red-500': emptyField2 }"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <suggestingCrypto
          @addCurrencyInInput="(suggestion) => (crypto2 = suggestion)"
          :inputCurrency="crypto2"
        />
      </div>
    </div>
    <!-- Add Button-->
    <div class="flex justify-center m-3">
      <button
        @click="add(crypto1, crypto2)"
        class="text-white bg-gray-800 w-36 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Add
      </button>
    </div>
  </div>
</template>
