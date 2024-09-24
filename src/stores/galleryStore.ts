import { defineStore } from "pinia";
import { reactive } from "vue";
import { Product } from "@/interfaces/product";
import axios from "axios";

// Gallery store with Pinia
export const useGalleryStore = defineStore("gallery", {
  state: () => ({
    gallery: reactive<Product[]>([]),
  }),
  getters: {
    getProductById: (state) => {
      return (id: number) => {
        return state.gallery.find((product) => product.id == id);
      };
    },
    getProductByName: (state) => {
      return (query: string) => {
        return state.gallery.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
      };
    },
  },
  actions: {
    async fetchGallery() {
      await axios
        .get<Product[]>(
          "https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json"
        )
        .then(
          (response) =>
            (this.gallery = response.data.map((product, index) => ({
              ...product,
              id: index,
            })))
        );
    },
    searchProducts(query: string) {
      const filteredProducts = this.getProductByName(query);
      this.gallery = filteredProducts;
    },
  },
  persist: true, // enable state persistence in local storage
});
