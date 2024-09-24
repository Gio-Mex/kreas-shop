<script setup lang="ts">
import AppProductCard from "./AppProductCard.vue";
import { useGalleryStore } from "../stores/galleryStore";
import { onMounted } from "vue";

const galleryStore = useGalleryStore();

onMounted(() => {
  galleryStore.fetchGallery();
});
</script>

<template>
  <!-- Home gallery -->
  <div
    v-if="galleryStore.gallery.length > 0"
    class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 pb-8 md:px-8 md:gap-8"
  >
    <AppProductCard
      v-for="product in galleryStore.gallery"
      :key="product.id"
      :product="product"
    />
  </div>
  <div v-else>
    <p class="text-center text-2xl">No products found</p>
  </div>
</template>
