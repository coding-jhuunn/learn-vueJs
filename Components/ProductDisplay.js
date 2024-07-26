app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `      <div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <!-- //create attribute binding -->
            <img :class="{ 'out-of-stock-img': !inStock }" v-bind:src="image" />
          </div>
          <div class="product-info">
            <h1>{{ productTitle }}</h1>
            <!-- you can use this v-show- to toggle -->
            <!-- <p v-show="inStock">In Stock</p> -->
            <p v-if="onSale">{{saleMessage}}</p>
            <p v-if="inStock >10">In Stock</p>
            <p v-else-if="inStock <=10 && inStock >0">Almost out of stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{shipping}}</p>
              <product-details :details="details"></product-details>
            <!-- list rendering -->
         
            <ul>
              <li v-for="size in sizes">{{size}}</li>
            </ul>
            <div
              v-for="(variant,index) in variants"
              :key="variant.id"
              @mouseover="updateVariant(index)"
              class="color-circle"
              :style="{backgroundColor:variant.color}"
            ></div>
            <button
              class="button"
              :disabled="!inStock"
              :class="{disabledButton:!inStock}"
              v-on:click="addToCart"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>`,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      details: ["50% cotton", "30% wool", "20% polyester"],
      // solution
      sizes: ["S", "M", "L", "XL"],
      // solution
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 0,
        },
      ],
      onSale: true,
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
  },
  computed: {
    productTitle() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    saleMessage() {
      if (this.onSale) {
        return this.brand + " " + this.product + " is on sale.";
      }
      return "";
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});
