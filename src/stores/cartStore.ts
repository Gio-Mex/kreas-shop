import { defineStore } from "pinia";
import { reactive } from "vue";
import { CartProduct } from "@/interfaces/product";

// Cart store with Pinia
export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: reactive<CartProduct[]>([]),
  }),
  actions: {
    addToCart(product: CartProduct) {
      const existingProduct = this.cart.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.cartQty += 1;
      } else {
        product.cartQty = 1;
        this.cart.push(product);
      }
    },
    removeFromCart(product: CartProduct) {
      this.cart.splice(this.cart.indexOf(product), 1);
    },
  },
  getters: {
    getCartTotalQty: (state) => {
      return state.cart.reduce((total, product) => total + product.cartQty, 0);
    },
    getCartTotal: (state) => {
      return state.cart.reduce(
        (total, product) => total + product.price * product.cartQty,
        0
      );
    },
  },
  persist: true, // enable state persistence in local storage
});
