<script setup>
// проблемы:
// Если были снапшоты, но их удалили, остается меню, добавить вотчер который убирает это
import { reactive, ref, onMounted } from "vue";
import { updateCurrencyPrices, fetchCryptoCurrency } from "./api.js";
import inputCurrency from "./customInput.vue";
const counter = ref(0);
const currency1 = ref("");
const currency2 = ref("");
const currencyStore = ref([]);
const snapshots = ref([]);
const coinNameList = ref();

function normalizedDate() {
  const date = new Date();
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const normalizedDate = date.toLocaleDateString(undefined, options);
  return normalizedDate;
}
async function addToStore() {
  const currentCurrencyToStore = {
    name1: this.currency1.toUpperCase(),
    name2: this.currency2.toUpperCase(),
    price: "-",
    open: false,
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
function deleteSnapshot(snapshotToRemove) {
  this.snapshots = this.snapshots.filter(
    (snapshot) => snapshot != snapshotToRemove
  );
}
function snapshot(currencyToSnapshot) {
  const snapshotedCurrency = {
    name1: currencyToSnapshot.name1,
    name2: currencyToSnapshot.name2,
    price: currencyToSnapshot.price,
    date: normalizedDate(),
  };
  this.snapshots = [...this.snapshots, snapshotedCurrency];
}
function filtredSnapshots(currency) {
  return this.snapshots.filter(
    (snapshoted) =>
      snapshoted.name1 == currency.name1 && snapshoted.name2 == currency.name2
  );
}
onMounted(() => {
  fetchCryptoCurrency(coinNameList);
});
</script>

<template>
  <div class="container bg-green-500">
    <header class="bg-red-500 flex flex-col text-black justify-center">
      <h1 class="text-white text-3xl text-center">Custom Crypto Currency</h1>

      <label>currency 1 </label
      ><input
        type="text"
        v-model="currency1"
        placeholder="Type Currency here"
        class="w-screen"
      />
      <label>currency 2 </label>
      <input
        type="text"
        v-model="currency2"
        placeholder="Type Currency here"
        class="w-screen"
      />
      <button @click="addToStore()">add</button>
    </header>
    <main class="container">
      <div v-if="currencyStore != ''" class="flex flex-col">
        <div
          class="flex flex-col space-x-2"
          v-for="currency in currencyStore"
          :key="currency"
        >
          <div class="flex flex-row">
            <div class="w-20 border-2">{{ currency.name1 }}</div>
            <p class="w-20 border-2">/</p>
            <div class="w-20 border-2">{{ currency.name2 }}</div>
            <div class="w-20 border-2">{{ currency.price }}</div>

            <div class="w-20 border-2" @click.stop="snapshot(currency)">
              take snapshot
            </div>

            <div class="w-20 border-2" @click="currency.open = !currency.open">
              Open / close
            </div>
            <div class="w-20 border-2" @click.stop="deleteFromStore(currency)">
              delete
            </div>
          </div>
          <div v-show="currency.open" class="flex flex-col bg-blue-500">
            <div class="flex flex-row space-x-4">
              <p class="w-20 border-2">Date</p>
              <p class="w-20 border-2">Price at date shapshot</p>
              <p class="w-20 border-2">%</p>
            </div>
            <div
              class="flex flex-row w-screen space-x-4"
              v-for="snap in filtredSnapshots(currency)"
              :key="snap"
            >
              <p class="w-20 border-2">{{ snap.date }}</p>
              <p class="w-20 border-2">{{ snap.price }}</p>
              <p class="w-20 border-2">
                difference in % {{ (currency.price / snap.price) * 100 }}
              </p>
              <p class="w-20 border-2" @click="deleteSnapshot(snap)">
                delete snap
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
