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
      <!-- <product-details :details='details'></product-details> -->

      <ul class="product-description">
        <li>
          {{ selectedInfo }}
        </li>
      </ul>

      <div class="color-circle-container">
        <div 
          v-for="(variant, index) in variants" 
          :key="variant.id" 
          @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{ backgroundColor: variant.color }">
        </div>
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
          Remove Item
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
    brand: 'Smashing Pumpkins',
    product: 'Mellon Collie and Infinite Sadness',
    description: 'An iconic double album, spanning a diverse sonic landscape that explores themes of melancholy and emotional depth through a fusion of alternative rock, grunge, and dreamy psychedelia.',
    selectedVariant: 0,
    selectedInfo: '',
    url: 'https://www.google.ru/search?newwindow=1&sca_esv=559050992&sxsrf=AB5stBh1gpEpx8eeYkHfkTX0b_KrjeGiHA:1692701675084&q=vue+mastery+socks&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjbzbaQjfCAAxUjSvEDHWxcDT0Q0pQJegQIDBAB&biw=780&bih=703&dpr=1.25#imgrc=tRXYwf5E6vJ4YM',
    variants: [
      { id: 2234, 
        color: '#7F6236',
        image: './assets/images/mellon-reissue.jpg',
        quantity: 50,
        info: '180 gram with a booklet featuring personal notes and photos, and a 28 page lyric booklet. Shrink-wrapped with a liner covering the rear and spine of the slipcase. Each disc is housed in a custom inner sleeve, itself housed in a secondary custom sleeve.',
      },
      { id: 2235, 
        color: '#5B5D72',
        image: './assets/images/mellon-classic.jpg',
        quantity: 0,
        info: 'The first vinyl edition has a unique track order and 2 bonus tracks (and is 3xLP not 4xLP). This reprint follows the regular track order (as seen on the 1995 1st print 2xCD, 2xCassette, and 2xMiniDisc) and does not have the bonus tracks.',
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
    this.selectedInfo = this.variants[index].info
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
    return 78
  }
}
})