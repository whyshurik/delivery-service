<script>
import App from "@/App.vue";
import axios from "axios";

export default {
  components: {App},
  name: 'OrderPage',
  props: [],
  data() {
    return {
      totalPrice: 0,
      products: [],
      orderPrice: 0,
      username: '',
      phoneNumber: '',
      isPhoneNumberValid: false,
      orderResponse: {}
    }
  },
  mounted() {
    this.fetchCartData()
    this.countOrderTotal()
  },
  methods: {
    async fetchCartData() {
      let array = JSON.parse(sessionStorage.getItem('data'))
      const productMap = new Map();
      array.forEach(product => {
        if (productMap.has(product.id)) {
          const existingProduct = productMap.get(product.id);
          existingProduct.amount += 1;
        } else {
          productMap.set(product.id, {...product, amount: 1});
        }
      });
      this.products = Array.from(productMap.values());
    },
    async removeItem(product) {
      this.products = this.products.filter(p => p.name !== product.name);
      sessionStorage.data = JSON.stringify(this.products)
      await this.countOrderTotal()
      console.log(sessionStorage.data)
    },
    async countOrderTotal() {
      this.orderPrice = this.products.reduce((total, product) => {
        return total + (product.price * product.amount);
      }, 0);
    },
    async postOrder() {
      try {
        const orderData = JSON.parse(sessionStorage.getItem('data'))
        if (!orderData || orderData.length === 0) {
          throw new Error('The order is empty');
        }
        this.validateNumber();
        if (!this.isPhoneNumberValid) {
          throw new Error('Phone number is invalid');
        }
        const userRequest = {
          username: this.username,
          phoneNumber: this.phoneNumber
        }

        const userResponse = await axios.post('http://localhost:3000/api/users', userRequest)
        const orderRequest = {
          products: this.transformArray(orderData),
          user_id: userResponse.data.id
        }
        console.log(orderRequest)
        const orderResponse = await axios.post('http://localhost:3000/api/orders', orderRequest)
        console.log('Order submitted successfully', orderResponse.data);
        this.orderResponse = orderResponse.data;
        alert('Order submitted successfully');
      } catch (err) {
        console.error(err.message);
        alert(err.message);
      }
    },
    validateNumber() {
      const regex = /^(\+?38)?0\d{9}$/; // Регулярное выражение для проверки украинского номера телефона
      this.isPhoneNumberValid = regex.test(this.phoneNumber);
    },
    transformArray(arr) {
      const productMap = new Map();

      // Populate the productMap with productId as key and quantity as value
      arr.forEach(item => {
        const productId = item.id;
        if (productMap.has(productId)) {
          // If productId already exists, increase quantity by 1
          productMap.set(productId, productMap.get(productId) + 1);
        } else {
          // If productId does not exist, set initial quantity to 1
          productMap.set(productId, 1);
        }
      });
      return Array.from(productMap, ([productId, quantity]) => ({
        productId: productId,
        quantity: quantity
      }));
    },
    async confirmDelivery() {
      try {

        const res = await axios.put('http://localhost:3000/api/orders', this.orderResponse)
        console.log('Order submitted successfully', res.data);
        alert('Order submitted successfully');
      } catch (err) {
        console.error(err.message);
        alert(err.message);
      }
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
          <td class="image"><img :src="'http://localhost:3000/api/images/' + product.name + '.png'"
                                 alt="Product Image"/></td>
          <td class="product-name">{{ product.name }}</td>
          <td class="amount">{{ product.amount }}</td>
          <td class="price">{{ product.price * product.amount }}.00₴</td>
          <td class="remove"><img src="D:\delivery-service\client\public\cross.png" alt="Remove" class="remove-image"
                                  @click="removeItem(product)"/></td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
  <div class="order-flex font-nanum">
    <div class="part1-flex">
      <div class="totalCount">Total price: {{ orderPrice }}.00₴</div>
      <p>How should we call you?</p>
      <input
          class="username"
          type="text"
          v-model="username"
          placeholder="Enter your username"
      >
      <p>Enter your phone number:</p>
      <input class="phone-number" type="tel"
             v-model="phoneNumber"
             @input="validateNumber"
             required
             placeholder="Enter your phone number"
      >
      <span v-if="!isPhoneNumberValid" style="color: red;">Invalid phone number</span>
    </div>
    <div class="buttons-flex">
      <button class="order-button" @click="postOrder()">Create order</button>
      <button class="confirm-button" @click="confirmDelivery()">Confirm delivery</button>
    </div>
  </div>
</template>
<style scoped>

section {
  display: flex;
  flex-direction: column;
  align-items: center;
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

span {
  font-size: 16px;
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

.remove-image {
  width: 50px;
  margin-left: 33%;
  cursor: pointer;
}

.order-flex {
  background-color: #B8D9C0;
  font-size: 28px;
  margin: 105px;
  margin-top: 55px;
  border-radius: 20px;
  border: 1px solid black;

}

.buttons-flex {
  display: flex;
  justify-content: space-between; /* Distribute space evenly between items */
  align-items: center;
  width: 100%;
  padding: 20px 0; /* Adjust vertical padding as needed */
  box-sizing: border-box;
}

p {
  font-size: 24px;
  margin-top: 10px;
}

.order-button {
  width: 200px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-left: 10%; /* Margin equally distributes space on both sides */
}

button {
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid black;
}

button:hover {
  background-color: #23B680;
  color: white;
  border: white;
}

.confirm-button {
  width: 200px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-right: 10%; /* Margin equally distributes space on both sides */
}

.part1-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

input {

  font-size: 14px;
  border-radius: 6px;
  line-height: 1.5;
  padding: 5px 10px;
  transition: box-shadow 100ms ease-in, border 100ms ease-in, background-color 100ms ease-in;
  border: 2px solid #dee1e2;
  color: rgb(14, 14, 16);
  background: #dee1e2;
  display: block;
  height: 36px;
}

input:hover {
  border-color: #ccc;
}

input:focus {
  border-color: #1a8d60;
  background: #fff;
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