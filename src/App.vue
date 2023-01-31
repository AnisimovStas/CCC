<script setup>
import { reactive, ref } from "vue";
import { updateCurrencyPrices } from "./api.js";
const counter = ref(0);
const currency1 = ref("");
const currency2 = ref("");
const currencyStore = ref([]);
const snapshots = ref([]);

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
</script>

<template>
  <div class="container bg-slate-300">
    <header class="bg-red-500 flex flex-col text-white">
      <h1>Custom Crypto Currency</h1>
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

        <div
          class="flex flex-row space-x-2"
          v-for="currency in currencyStore"
          :key="currency"
        >
          <div class="w-16 border-2">{{ currency.name1 }}</div>
          <div class="w-16 border-2">{{ currency.name2 }}</div>
          <div class="w-16 border-2">{{ currency.price }}</div>
          <div
            class="w-32 border-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 duration-300"
            v-for="snap in filtredSnapshots(currency)"
            :key="snap"
            @click="deleteSnapshot(snap)"
          >
            Price: {{ snap.price }} date: {{ snap.date }}
          </div>
          <button @click.stop="snapshot(currency)" class="w-16">
            take snapshot
          </button>
          <button @click.stop="deleteFromStore(currency)" class="w-16">
            delete
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
