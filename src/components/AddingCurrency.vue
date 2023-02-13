<script setup>
import { ref, onMounted, watch, defineEmits } from "vue";
import { fetchCryptoCurrencies } from "./../api.js";
const crypto1 = ref("");
const crypto2 = ref("");
const emit = defineEmits(["addCurrencyToArray"]);
const cryptoList = ref([]);
const suggestion1 = ref([]);
const suggestion2 = ref([]);

onMounted(async () => {
  cryptoList.value = await fetchCryptoCurrencies();
});
function add(currency1, currency2) {
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
function firstSuggest(suggestion) {
  crypto1.value = suggestion;
  suggestion1.value = crypto1.value;
}
function secondSuggest(suggestion) {
  crypto2.value = suggestion;
  suggestion2.value = crypto2.value;
}
function suggestingForCrypto1(inputCrypto) {
  suggestion1.value = cryptoList.value.filter((crypto) =>
    crypto.startsWith(inputCrypto.toUpperCase())
  );
}
function suggestingForCrypto2(inputCrypto) {
  suggestion2.value = cryptoList.value.filter((crypto) =>
    crypto.startsWith(inputCrypto.toUpperCase())
  );
}
watch(crypto1, suggestingForCrypto1);
watch(crypto2, suggestingForCrypto2);
</script>
<template>
  <div class="container bg-white rounded-lg">
    <div class="flex justify-center py-2">
      <h1 class="text-gray-900 text-2xl font-bold w-full lg:w-1/3 text-center">
        Custom Crypto Currency
      </h1>
    </div>
    <div class="mx-7">
      <!--Currency #1-->
      <div class="my-4">
        <input
          type="text"
          v-model="crypto1"
          placeholder="Type Currency here"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <ul
          v-if="suggestion1.length > 2 && suggestion1.length < 50"
          class="absolute container w-96"
        >
          <li
            v-for="suggestion in suggestion1"
            :key="suggestion"
            class="bg-gray-50 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            @click="firstSuggest(suggestion)"
          >
            {{ suggestion }}
          </li>
        </ul>
      </div>
      <!--Currency #2-->
      <div class="my-4">
        <input
          type="text"
          v-model="crypto2"
          placeholder="Type Currency here"
          @keydown.enter="add(crypto1, crypto2)"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <ul
          v-if="suggestion2.length > 2 && suggestion2.length < 50"
          class="absolute w-96"
        >
          <li
            v-for="suggestion in suggestion2"
            :key="suggestion"
            class="bg-gray-50 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            @click="secondSuggest(suggestion)"
          >
            {{ suggestion }}
          </li>
        </ul>
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
