<script setup>
import { ref, onMounted, watch } from "vue";
const isActive = ref(true);
const currency = ref("");
const suggestions = ref([]);
const filtered = ref([]);
// Написать пропсы и эмиты для импута

async function fetchCryptoCurrencies() {
  const response = await fetch(
    "https://min-api.cryptocompare.com/data/all/coinlist?summary=true"
  );
  const currenciesNotТormalized = await response.json();

  const currencies = Object.keys(currenciesNotТormalized.Data);
  suggestions.value = currencies;
}

onMounted(() => {
  fetchCryptoCurrencies();
});

watch(currency, () => {
  filtered.value = suggestions.value;
  const search = currency.value.toUpperCase();
  const filteredSuggestions = suggestions.value.filter((suggestion) =>
    suggestion.toUpperCase().startsWith(search)
  );
  filtered.value = filteredSuggestions;
  if (filtered.value.length == 1 || search == "") {
    isActive.value = false;
  } else {
    isActive.value = true;
  }
});

function onSelect(selectedCurrency) {
  currency.value = selectedCurrency;
  filtered.value = [];
  isActive.value = false;
}
</script>
<template>
  <div class="w-screen">
    <input
      type="text"
      v-model="currency"
      placeholder="Type Currency here"
      class="w-screen"
    />
    <ul v-if="isActive" class="absolute">
      <li
        v-for="suggestion in filtered.splice(0, 6)"
        :key="suggestion"
        class="p-2 hover:bg-green-500 border border-gray-400"
        @click="onSelect(suggestion)"
      >
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>
