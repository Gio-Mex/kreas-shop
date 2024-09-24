<script setup lang="ts">
import { Product } from "@/interfaces/product";
import { useRouter } from "vue-router";

// Shadcn components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//----------------------------

const router = useRouter();

const props = defineProps<{
  product: Product;
}>();

</script>

<template>
  <div>
    <!-- Gallery card -->
    <Card
      class="rounded-sm shadow-md"
      @click="router.push(`/product/${product.id}`)"
    >
      <CardHeader>
        <img :src="props.product.image" alt="Product image" />
      </CardHeader>
      <CardContent>
        <CardTitle class="text-center"> {{ product.name }}</CardTitle>
        <CardDescription class="pt-2 text-md text-center">
          € {{ product.price.toFixed(2) }}</CardDescription
        >
      </CardContent>
    </Card>
  </div>
</template>
