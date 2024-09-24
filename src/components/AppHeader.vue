<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useGalleryStore } from "@/stores/galleryStore";
import { useCartStore } from "@/stores/cartStore";

// Shadcn components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//------------------------------------------------

const cartStore = useCartStore();
const galleryStore = useGalleryStore();
const route = useRoute();
const query = ref<string>("");

// Search function
const handleSearch = () => {
  if (query.value) {
    galleryStore.searchProducts(query.value);
    query.value = "";
  }
};
</script>

<template>
  <div class="flex justify-between md:px-3">

    <!-- Logo image -->
    <RouterLink to="/" @click="galleryStore.fetchGallery">
      <img
        class="w-32"
        src="../assets/img/logo-img.png"
        alt="Kreas Shop logo"
      />
    </RouterLink>

    <div class="flex items-center gap-8 pe-6">

      <!-- Search icon opens dialog -->
      <Dialog class="z-50">
        <DialogTrigger as-child>
          <img
            v-if="route.path === '/'"
            class="w-8 cursor-pointer"
            src="../assets/icons/search-icon.svg"
            alt="Search icon"
            @click="galleryStore.fetchGallery"
          />
        </DialogTrigger>
        <DialogContent class="bg-inherit sm:max-w-md gap-6">
          <DialogHeader>
            <DialogDescription>
              Search a product in our shop
            </DialogDescription>
          </DialogHeader>
          <div class="flex items-center space-x-2">
            <div class="grid flex-1 gap-2">
              <Input
                id="query"
                type="text"
                v-model="query"
                @keydown.enter="handleSearch()"
              />
            </div>
            <DialogClose as-child>
              <Button
                type="submit"
                size="sm"
                class="text-white brandButton px-3"
                @click="handleSearch()"
                @keydown.enter="handleSearch()"
              >
                Go
              </Button>
            </DialogClose>
          </div>
          <DialogFooter class="flex mx-auto">
            <DialogClose as-child>
              <Button type="button"> Close </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <!-- Cart icon -->
      <RouterLink to="/cart" class="relative"
        ><img
          class="w-8"
          src="../assets/icons/shopping-cart-icon.svg"
          alt="Cart icon"
        />
        <span
          v-if="cartStore.getCartTotalQty > 0"
          class="absolute -top-2 -right-1 w-5 h-5 p-1 bg-red-700 text-white text-xs flex justify-center items-center rounded-full"
          >{{ cartStore.getCartTotalQty }}</span
        >
      </RouterLink>
    </div>
  </div>
</template>
