<script lang="ts">
//import {api} from "@/api";
import axios from "axios";
import type {Product} from "@/api/types";


export default {
  data() {
    return {
      products: []
    };
  },
  mounted() {
    this.fetchProducts('http://localhost:3000/api/products/all')
  },
  methods: {
    async fetchProducts(url: string) {
      return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
              this.products = response.data;
              resolve('all good');
            })
            .catch(error => {
              console.error('Error al obtener la lista de personajes:', error);
              reject(error);
            });
      })

    },
  },
}
;
</script>

<template>
  <section>
    <div class="flex-container mx-auto px-16 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="flex-box1 font-nanum">Pharmacy</div>
      <div class="flex-box2 ">
       <div class="parts" id="part1">1</div>
        <div class="parts" id="part2">2</div>
        <div class="parts" id="part3">3</div>
     </div>
    </div>

    <div class="bg-white">
      <div class="bg-lighter rounded-lg mx-auto max-w-xl px-4  py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-2">
        <h2 class="sr-only">Products</h2>

        <div class="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <a v-for="product in products" :key="product.id" class="group">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img :src="'http://localhost:3000/api/images/' + product.name + '.png'" alt="product.name" class="h-full w-full object-cover object-center group-hover:opacity-75" />
            </div>
            <h3 class="mt-4 text-sm text-gray-700 font-nanum">{{ product.name }}</h3>
            <p class="mt-1 text-lg font-medium text-gray-900 font-nanum">{{ product.price }}.00$</p>
          </a>
        </div>
      </div>
    </div>


<!--    <div class="container-cards">-->
<!--      <ul class="card-list">-->
<!--        <li v-for="product in products" :key="product.id" class="card">-->
<!--          <div class="image">-->
<!--            <img v-bind:src="'http://localhost:3000/api/images/' + product.name + '.png'" alt="product.name"/>-->
<!--          </div>-->
<!--          <div class="information">-->
<!--            <span>Name: {{ product.name }}</span>-->
<!--            <br>-->
<!--            <span>Price: {{ product.price }}</span>-->
<!--          </div>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
  </section>
</template>

<style scoped>


.flex-container {
  width: 1202px;
  display: flex;

}

.flex-box1 {
  background: #B8D9C0;
  height: 629px;
  width: 601px;
  align-content: center;
}

.flex-box2 {
  background: #DAEFDC;
  height: 629px;
  width: 601px;
  flex-direction: column;
}

.parts {
  height: auto;
  width: auto;
}

</style>