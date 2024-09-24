<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useGalleryStore } from "@/stores/galleryStore";
import { useCartStore } from "@/stores/cartStore";
import { reactive, onBeforeMount } from "vue";
import { Product } from "@/interfaces/product";

// Shadcn components
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
//---------------------------------------------------------

const route = useRoute();
const router = useRouter();
const id = route.params.id as number;

const galleryStore = useGalleryStore();
const cartStore = useCartStore();

let product = reactive<Product>({});

const { toast } = useToast();

// Get product by id from store gallery
onBeforeMount(() => {
  product = galleryStore.getProductById(id);
});

// Add product to cart function
const addToCartHandler = () => {
  cartStore.addToCart(product);
  toastHandler();
};

// Toast handler
const toastHandler = () => {
  toast({
    description: "Product added to cart",
  });
};
</script>

<template>
  <div class="flex flex-col lg:flex-row pt-2 px-5 pb-6 md:px-8">
    <!-- Product image -->
    <img class="w-96 mx-auto" :src="product.image" alt="Product image" />
    <!-- Product details -->
    <div class="flex flex-col justify-between gap-5 pt-6 md:px-10 lg:w-8/12">
      <h1 class="text-3xl text-center lg:text-left brandColor">
        {{ product.name }}
      </h1>
      <p>{{ product.description }}</p>
      <p class="font-semibold">Price: € {{ product.price.toFixed(2) }}</p>
      <div class="flex justify-center gap-10">
        <!-- Action buttons -->
        <Button class="brandButton w-28 mt-4" @click="addToCartHandler()"
          >Add to cart</Button
        >
        <Button class="w-28 mt-4" @click="router.back()">Go Back</Button>
      </div>
    </div>
  </div>
</template>
