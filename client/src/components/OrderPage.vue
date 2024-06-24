<script>
export default {
  components: {},
  name:'OrderPage',
  props:[],
  data() {
    return {
      products: [],
    }
  },
  mounted() {
    this.fetchCartData()
  },
  methods:{
    async fetchCartData () {
      let array = JSON.parse(sessionStorage.getItem('data'))
        const productMap = new Map();
        array.forEach(product => {
          if (productMap.has(product.id)) {
            const existingProduct = productMap.get(product.id);
            existingProduct.amount += 1;
          } else {
            productMap.set(product.id, { ...product, amount: 1 });
          }
        });
        this.products = Array.from(productMap.values());
        console.log(this.products)
    },
    async removeItem(product) {
      this.products = this.products.filter(p => p.name !== product.name);
      sessionStorage.data = JSON.stringify(this.products)
      console.log(sessionStorage.data)
    }
  }
}
</script>
<template>
  <section>
    <div class="flex-container">
      <router-link
          to="/"
          custom
          v-slot="{ href, route, navigate, isActive, isExactActive }">
        <a :href="href" @click="navigate" class="head-block"><p class="text1">Click to return</p></a>
      </router-link>
    </div>
    <div class="table-container font-nanum">
      <table>
        <thead>
        <tr>
          <th class="image">Image</th>
          <th class="product-name">Product Name</th>
          <th class="amount">Amount</th>
          <th class="price">Total price</th>
          <th class="remove">Remove</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="image"><img :src="'http://localhost:3000/api/images/' + product.name + '.png'" alt="Product Image" /></td>
          <td class="product-name">{{ product.name }}</td>
          <td class="amount">{{ product.amount }}</td>
          <td class="price">{{ product.price*product.amount }}.00₴</td>
          <td class="remove"><img src="E:\zxc\delivery-service\client\public\cross.png" alt="Remove" class="remove" @click="removeItem(product)"/></td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<style scoped>
section {
  background-color: #FFF9F9;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
.frontline-image {
  width: 345px;
  height: 345px;
}
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.head-block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1201px;
  height: 140px;
  background-color: #B8D9C0;
  font-size: 30px;
  font-weight: normal;
}

.table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 991px;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th, td {
  background-color: #B8D9C0;
  border: 2px solid #D9D9D9;
  text-align: center;
  vertical-align: middle;
  font-weight: normal;
}

th:first-child {
  border-top-left-radius: 10px; /* Top-left corner */
}

th:last-child {
  border-top-right-radius: 10px; /* Top-right corner */
}

th.image {
  width: 168px;
  height: 110px;
}

th.product-name {
  width: 328px;
  height: 112px;
}

th.amount {
  width: 159px;
  height: 112px;
}

th.price {
  width: 168px;
  height: 111px;
}

th.remove {
  width: 168px;
  height: 110px;
}

td.image {
  width: 168px;
  height: 110px;
}

td.product-name {
  width: 328px;
  height: 112px;
}

td.amount {
  width: 159px;
  height: 112px;
}

td.price {
  width: 168px;
  height: 111px;
}

td.remove {
  width: 168px;
  height: 110px;
}

td img {
  width: 100%;
  height: auto;
}

td button {
  background-color: #23B680;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

td button:hover {
  background-color: #1a8d60;
}
</style>