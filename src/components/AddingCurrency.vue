<script setup>
import { ref, onMounted, watch, defineEmits } from "vue";
const crypto1 = ref("");
const crypto2 = ref("");
const emit = defineEmits(["addCurrencyToArray"]);

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
</script>
<template>
  <div class="bg-violet-600">
    <div>
      <h1 class="text-white text-3xl font-bold text-center">
        Custom Crypto Currency
      </h1>
    </div>
    <div class="space-y-4">
      <!--Currency #1-->
      <div class="w-screen">
        <input
          type="text"
          v-model="crypto1"
          placeholder="Type Currency here"
          class="w-screen h-10"
        />
        <ul v-if="false" class="absolute">
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
      <br />
      <!--Currency #2-->
      <div class="w-screen">
        <input
          type="text"
          v-model="crypto2"
          placeholder="Type Currency here"
          class="w-screen h-10"
        />
        <ul v-if="false" class="absolute">
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
    </div>
    <!-- Add Button-->
    <div class="flex justify-center">
      <button
        @click="add(crypto1, crypto2)"
        class="text-white text-3xl h-full w-full font-bold"
      >
        Add
      </button>
    </div>
  </div>
</template>
