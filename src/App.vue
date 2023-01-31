<script setup>
import { reactive, ref } from "vue";
import { fetchPrice } from "./api.js";
const counter = ref(0);
const currency1 = ref("");
const currency2 = ref("");
const currencyStore = ref([]);
const test = ref("test");

async function addToStore() {
  const currentCurrencyToStore = {
    name1: this.currency1.toUpperCase(),
    name2: this.currency2.toUpperCase(),
    price: "-",
  };
  this.currencyStore = [...this.currencyStore, currentCurrencyToStore];

  this.updateCurrencyPrices(
    currentCurrencyToStore.name1,
    currentCurrencyToStore.name2
  );
}
function deleteFromStore(currencyToRemove) {
  this.currencyStore = this.currencyStore.filter(
    (currency) => currency != currencyToRemove
  );
}
function updateCurrencyPrices(currencyName1, currencyName2) {
  fetchPrice(currencyName1, currencyName2);
  this.test = price;
  this.currencyStore.find(
    (currency) =>
      currency.name1 === currencyName1 && currency.name2 === currencyName2
  ).price = price.tsyms;
  this.currency1 = "";
  this.currency2 = "";
}
</script>

<template>
  <div class="container bg-slate-300">
    <header class="bg-red-500 flex flex-col text-white">
      <h1>Custom Crypto Currency</h1>
      {{ test }}
      <label>currency 1 </label
      ><input class="text-black" v-model="currency1" />
      <label>currency 2 </label
      ><input
        @keydown.enter="addToStore()"
        class="text-black"
        v-model="currency2"
      />
      <button @click="addToStore()">add</button>
    </header>
    <main class="container">
      <div v-if="currencyStore != ''" class="flex flex-col">
        <div class="flex flex-row space-x-2">
          <div class="w-16">Name1</div>
          <div class="w-16">Name2</div>
          <div class="w-16">Price</div>
        </div>

        <div class="flex flex-row space-x-2" v-for="currency in currencyStore">
          <div class="w-16">{{ currency.name1 }}</div>
          <div class="w-16">{{ currency.name2 }}</div>
          <div class="w-16">{{ currency.price }}</div>
          <button @click.stop="deleteFromStore(currency)" class="w-16">
            delete
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
