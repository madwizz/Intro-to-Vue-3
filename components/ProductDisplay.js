app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
  /*html*/
  `<div class="product-display">
  <div class="product-container">
    <div class="'product-image">
      <img 
        :src="image" 
        :class="{ 'out-of-stock-img': !inStock }" />
    </div>
    <div class="product-info">
      <h1>{{ title }}</h1>
      <p>{{ sale }}</p>
      <p v-if="inStock">In Stock</p>
      <p v-else>Out of Stock</p>
      <p>Shipping: {{ shipping }}</p>
      <p>{{ description }}</p>
      <!-- details -->
      <product-details :details='details'></product-details>
      <div 
        v-for="(variant, index) in variants" 
        :key="variant.id" 
        @mouseover="updateVariant(index)"
        class="color-circle"
        :style="{ backgroundColor: variant.color }">
        </div>
      <div 
        v-for="variant in variants" 
        :key="variant.id">
        {{ variant.size }}
      </div>
      <div class="button-group">
      <!-- add to cart -->
        <button 
          class="button" 
          @click="addToCart" 
          :class="{ disabledButton: !inStock }" 
          :disabled="!inStock">
          Add to Cart
        </button>
        <!-- remove from cart -->
        <button 
          class="button" 
          @click="removeFromCart" 
          :class="{ disabledButton: !inStock }" 
          :disabled="!inStock">
          Remove from Cart
        </button>
      </div>
      <a :href="url">Link</a>
    </div>
  </div>
  <review-list 
    v-if="reviews.length" 
    :reviews="reviews">
  </review-list>
  <review-form 
    @review-submitted="addReview">
  </review-form>
</div>`,
data() {
  return {
    onSale: true,
    brand: 'Vue Mastery',
    product: 'Socks',
    description: 'Best socks ever',
    selectedVariant: 0,
    url: 'https://www.google.ru/search?newwindow=1&sca_esv=559050992&sxsrf=AB5stBh1gpEpx8eeYkHfkTX0b_KrjeGiHA:1692701675084&q=vue+mastery+socks&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjbzbaQjfCAAxUjSvEDHWxcDT0Q0pQJegQIDBAB&biw=780&bih=703&dpr=1.25#imgrc=tRXYwf5E6vJ4YM',
    details: [
        '50% cotton', 
        '30% wool', 
        '20% polyester'
      ],
    variants: [
      { id: 2234, 
        color: 'green', 
        size: 'S', 
        image: './assets/images/socks_green.jpg',
        quantity: 50,
      },
      { id: 2235, 
        color: 'blue', 
        size: 'M', 
        image: './assets/images/socks_blue.jpg',
        quantity: 0,
      },
    ],
    reviews: [],
  }
},
methods: {
  addToCart() {
    this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
  },
  removeFromCart() {
    this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
  },
  updateVariant(index) {
    this.selectedVariant = index
  },
  addReview(review) {
    this.reviews.push(review)
  }
},
computed: {
  title() {
    return this.brand + ' ' + this.product
  },
  image() {
    return  this.variants[this.selectedVariant].image
  },
  inStock() {
    return  this.variants[this.selectedVariant].quantity
  },
  sale() {
    if (this.onSale) {
      return this.brand + ' ' + this.product + ' is on sale'
    }
    return ''
  },
  shipping() {
    if (this.premium) {
      return 'Free'
    }
    return 2.99
  }
}
})