const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    addToBasketUrl: '/getBasket.json',
    deleteFromBasket: '/deleteFromBasket.json',
    products: [],
    addToBaskets: [],
    imgCatalog: 'https://via.placeholder.com/200x150',
    imgCart: 'https://via.placeholder.com/50x100',
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(good) {
      console.dir(good);
      console.dir(this.addToBaskets);
      let productId = good.id_product;
      let find = this.addToBaskets.find(addToBasket => addToBasket.id_product === productId);
      if (find) {
        find.quantity++;
      } else {
        good.quantity = 1;
        this.addToBaskets.push(good);
      }
    },
    removeProduct(element) {
      this.getJson(`${API + this.deleteFromBasket}`)
        .then(data => {
          if (data.result === 1) {
            let productId = element.id_product;
            let find = this.addToBaskets.find(addToBasket => addToBasket.id_product === productId);
            if (find.quantity > 1) { // если товара > 1, то уменьшаем количество на 1
              find.quantity--;
            } else { // удаляем
              this.addToBaskets.splice(this.addToBaskets.indexOf(find), 1);
            }
          } else {
            alert('Error');
          }
        })
    }
  },
  computed: {

  },
  beforeCreate() {

  },
  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        this.products = data;
      });
    this.getJson(`${API + this.addToBasketUrl}`)
      .then(data => {
        this.addToBaskets = data.contents;
      });
  },
  beforeMount() {

  },
  mounted() {

  },
  beforeUpdate() {

  },
  updated() {

  },
  beforeDestroy() {

  },
  destroyed() {

  },
});
