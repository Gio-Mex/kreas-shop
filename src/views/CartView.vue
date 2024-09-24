<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";
import { CartProduct } from "../interfaces/product";

// Shadcn components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/toast/use-toast";
import { Button } from "@/components/ui/button";
//---------------------------------------------------------

const cartStore = useCartStore();
const router = useRouter();
const { toast } = useToast();

// Increment function
const increment = (product: CartProduct) => {
  product.cartQty += 1;
};

// Decrement function
const decrement = (product: CartProduct) => {
  if (product.cartQty > 1) {
    product.cartQty -= 1;
  } else {
    cartStore.removeFromCart(product);
  }
};

// Buy function
const buyHandler = () => {
  toastHandler();
  cartStore.cart = [];
  router.push("/");
};

// Toast handler
const toastHandler = () => {
  toast({
    description: "Thank you for your purchase!",
  });
};
</script>

<template>
  <h1 class="text-3xl text-center">Cart</h1>
  <div
    v-if="cartStore.cart.length > 0"
    class="text-md mt-4 px-2 pb-6 md:mt-0 md:p-20"
  >
    <Table>
      <!-- Table header -->
      <TableHeader>
        <TableRow class="text-lg">
          <TableHead class="w-6/12 text-center pb-4">Product</TableHead>
          <TableHead class="w-5/12 text-right pb-4"> Amount </TableHead>
        </TableRow>
      </TableHeader>
      <!-- Table body -->
      <TableBody>
        <!-- Table row -->
        <TableRow
          v-for="product in cartStore.cart"
          :key="product.id"
          :product="product"
        >
          <!-- Product cell -->
          <TableCell class="flex md:gap-8">
            <img
              class="w-20 md:w-28"
              :src="product.image"
              alt="Product image"
            />
            <Section class="flex flex-col ml-4 gap-4">
              <h2 class="text-lg text-center">{{ product.name }}</h2>
              <!-- Quantity buttons -->
              <Section class="flex flex-nowrap gap-1">
                <Button
                  class="w-6 h-6 p-3 items-center self-center mr-2 bg-gray-400"
                  @click="decrement(product)"
                  >-</Button
                >
                <span class="w-5 text-lg text-center">
                  {{ product.cartQty }}
                </span>
                <Button
                  class="w-6 h-6 p-3 self-center ml-2 bg-gray-400"
                  @click="increment(product)"
                  >+</Button
                >
              </Section>
            </Section>
          </TableCell>
          <!-- Product amount cell -->
          <TableCell class="text-right text-lg">
            € {{ (product.price * product.cartQty).toFixed(2) }}
          </TableCell>
          <!-- Product remove cell -->
          <TableCell class="text-center">
            <Button
              class="w-6 h-6 p-3 bg-red-700 hover:bg-red-800"
              @click="cartStore.removeFromCart(product)"
              >x</Button
            >
          </TableCell>
        </TableRow>
      </TableBody>
      <!-- Table footer -->
      <TableFooter>
        <TableRow class="text-2xl">
          <TableHead class="brandColor text-left py-6"> Total </TableHead>
          <!-- Total amount cell -->
          <TableHead class="brandColor text-right py-6">
            € {{ cartStore.getCartTotal.toFixed(2) }}
          </TableHead>
        </TableRow>
      </TableFooter>
    </Table>

    <!-- Action buttons -->
    <div class="flex justify-center gap-10">
      <Button class="brandButton w-28" @click="buyHandler()">Buy</Button>
      <Button class="w-28" @click="router.push('/')">Go to Shop</Button>
    </div>
  </div>
  <div v-else class="text-2xl text-center mt-10 brandColor">Cart is empty</div>
</template>
