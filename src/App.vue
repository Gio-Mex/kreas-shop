<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>

<template>
  <header>
    <AppHeader />
  </header>
  <main>
    <RouterView />
  </main>
  <Toaster />
</template>

<style>
.brandButton:hover {
  background-color: #0f8200;
}
</style>
