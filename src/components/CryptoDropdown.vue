<script setup>
import { ref, onMounted, watch, defineEmits, defineProps } from "vue";
import { fetchCryptoCurrencies } from "./../api.js";
const cryptoList = ref([]);
const suggestions = ref([]);
const props = defineProps({
  inputCurrency: String,
});
const emit = defineEmits({ addCurrencyInInput: null });
onMounted(async () => {
  cryptoList.value = await fetchCryptoCurrencies();
});
function suggestingForCrypto(inputCurrency) {
  suggestions.value = cryptoList.value.filter((crypto) =>
    crypto.startsWith(inputCurrency.toUpperCase())
  );
}
function sendToParrent(suggestion) {
  console.log(suggestion);
  emit("addCurrencyInInput", suggestion);
}
watch(
  () => props.inputCurrency,
  (newValue) => suggestingForCrypto(newValue)
);
</script>
<template>
  <ul
    v-if="suggestions.length > 2 && suggestions.length < 50"
    class="absolute container w-96"
  >
    <li
      v-for="suggestion in suggestions"
      :key="suggestion"
      class="bg-gray-50 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      @click="sendToParrent(suggestion)"
    >
      {{ suggestion }}
    </li>
  </ul>
</template>
