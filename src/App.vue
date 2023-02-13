<script setup>
// проблемы:
// Если были снапшоты, но их удалили, остается меню, добавить вотчер который убирает это
import { reactive, ref, onMounted, watch } from "vue";
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
}, 5000);

function formatPrice(price) {
  if (!price || typeof price !== "number") {
    return (price = "-");
  }
  return price > 1 ? price.toFixed(2) : price.toPrecision(2);
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

function setToLocalStorageCurrency() {
  localStorage.setItem("Currencies-list", JSON.stringify(currencyStore.value));
}
function setToLocalStorageSnap() {
  localStorage.setItem("Snap-list", JSON.stringify(snapshots.value));
}
function loadFromLocalStorageCurrency() {
  const currenciesData = localStorage.getItem("Currencies-list");

  if (currenciesData) {
    currencyStore.value = JSON.parse(currenciesData);
  }
}
function loadFromLocalStorageSnap() {
  const snapData = localStorage.getItem("Snap-list");

  if (snapData) {
    snapshots.value = JSON.parse(snapData);
  }
}
onMounted(loadFromLocalStorageCurrency);
onMounted(loadFromLocalStorageSnap);

watch(currencyStore, setToLocalStorageCurrency);
watch(snapshots, setToLocalStorageSnap);
</script>

<template>
  <div class="bg-gray-100 h-screen">
    <div class="container m-auto p-7">
      <AddCurrency @addCurrencyToArray="addToStore" />

      <div class="bg-white rounded-lg">
        <main class="w-full items-center flex justify-center">
          <div
            v-if="currencyStore != ''"
            class="flex flex-col justify-center w-full"
          >
            <div
              class="flex flex-col"
              v-for="currency in currencyStore"
              :key="currency"
            >
              <div
                class="flex justify-between mx-7 items-center border-b border-black"
              >
                <div class="flex flex-row justify-start">
                  <div class="border-r-2 border-black pr-1">
                    {{ currency.name1 }}
                  </div>
                  <div class="pl-1">
                    {{ currency.name2 }}
                  </div>
                </div>
                <div class="flex justify-center">
                  {{ formatPrice(currency.price) }}
                </div>
                <div
                  class="flex flex-row justify-end space-x-1 h-10 items-center"
                >
                  <div
                    class="hover:border border-black hover: rounded-lg p-1"
                    @click.stop="snapshot(currency)"
                  >
                    <img src="./assets/snapshot.svg" class="w-7 h-7" />
                  </div>

                  <div
                    :class="{
                      'flex justify-center rotate-180  hover:border border-black hover: rounded-lg p-1':
                        !currency.open,
                      '  hover:border border-black hover: rounded-lg p-1':
                        currency.open,
                    }"
                    @click="currency.open = !currency.open"
                  >
                    <img src="./assets/arrow.svg" class="w-7 h-7" />
                  </div>
                  <div
                    class="hover:border border-black hover: rounded-lg p-1"
                    @click.stop="deleteFromStore(currency)"
                  >
                    <img src="./assets/delete.svg" class="w-7 h-7" />
                  </div>
                </div>
              </div>
              <div
                v-show="currency.open"
                class="flex flex-col bg-gray-800 text-gray-50"
              >
                <div
                  class="flex flex-row justify-between mx-7 space-x-4 h-10 border-gray-50 border-b items-center"
                  v-for="snap in filtredSnapshots(currency)"
                  :key="snap"
                >
                  <p class="">{{ snap.date }}</p>
                  <p class="">{{ formatPrice(snap.price) }}</p>
                  <div class="flex flex-row">
                    <p class="">
                      {{
                        ((currency.price / snap.price - 1) * 100).toPrecision(
                          2
                        ) + "%"
                      }}
                    </p>
                    <img
                      v-show="currency.price / snap.price > 1"
                      src="./assets/priceArrowUP.svg"
                      class="w-7 h-7"
                    />
                    <img
                      v-show="currency.price / snap.price < 1"
                      src="./assets/priceArrowDown.svg"
                      class="w-7 h-7"
                    />
                  </div>
                  <div
                    class="hover:border border-gray-50 hover: rounded-lg p-1"
                    @click="deleteSnapshot(snap)"
                  >
                    <img src="./assets/delete-w.svg" class="w-7 h-7" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
