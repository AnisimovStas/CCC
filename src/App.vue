<script setup>
// проблемы:
// Если были снапшоты, но их удалили, остается меню, добавить вотчер который убирает это
import { reactive, ref, onMounted } from "vue";
import { updateCurrencyPrice } from "./api.js";
import AddCurrency from "./components/AddingCurrency.vue";
const counter = ref(0);
const currencyStore = ref([]);
const snapshots = ref([]);

function normalizedDate() {
  const date = new Date();
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const normalizedDate = date.toLocaleDateString(undefined, options);
  return normalizedDate;
}
function addToStore(currency) {
  console.log(currency);
  currencyStore.value = [...currencyStore.value, currency];
}

setInterval(async () => {
  currencyStore.value.forEach(
    async (currency) => await updateCurrencyPrice(currency)
  );
  console.log("heey");
}, 5000);

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
  <div class="bg-slate-100 h-screen">
    <div class="container m-auto p-7">
      <AddCurrency @addCurrencyToArray="addToStore" />

      <div class="bg-violet-400 w-full container m-auto">
        <main class="w-full items-center flex justify-center">
          <div v-if="currencyStore != ''" class="flex flex-col justify-center">
            <div
              class="flex flex-col justify-between space-x-2"
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

                <div
                  class="w-20 border-2"
                  @click="currency.open = !currency.open"
                >
                  Open / close
                </div>
                <div
                  class="w-20 border-2"
                  @click.stop="deleteFromStore(currency)"
                >
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
    </div>
  </div>
</template>
