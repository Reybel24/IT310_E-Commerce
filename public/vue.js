Vue.component('caps', 
{
  template: "<h1>Cap Catalog</h1>" + 
  "<div class='caps'>" + 
  "<div v-for='cap in capsData' track-by='$index' class='cap'>" + 
  "<div class='img' @click='viewCap(cap)' v-bind:style='{ backgroundImage: \"url(\" + cap.img + \")\" }' style='background-size: contain;'></div>" + 
  "<div class='title'><i>{{ cap.cap }}</i></div>" + 
  "<div class='price'><b><h2>{{ cap.price | currency }}</h2></b></div>" + 
  "<button @click='addToCart(cap)'><strong><h1 style=font-size:20px>＋</h1></strong></button><br><br></div>" + 
  "</div>" + 
  "<div class='popupWrapper' v-show='showPopup'>" + 
  "<div class='overlay' @click='hidePopup()'></div>" + 
  "<div class='popup'>" + 
  "<div class='imgWrapper'><div class='img' v-bind:style='{ backgroundImage: \"url(\" + capData.img + \")\" }' style='background-size: contain;'></div></div>" + 
  "<div class='title'><u><h2>{{ capData.cap }}</h2></u></div>" + 
  "<div class='details'><i>{{ capData.details }}</i></div>" + 
  "<h3 class='price'>{{ capData.price | currency }}</h3>" + 
  "<label for='popupqty'>Quantity: </label>" + 
  "<input id='popupqty' value='{{ popupqty }}' v-model='popupqty' class='qty' @keyup.enter='popupAddToCart(capData), hidePopup()'/>" + 
  "<button @click='popupAddToCart(capData), hidePopup()'><strong><h1 style=font-size:20px>＋</h1></strong></button>" + 
  "</div></div>", 

  props: ['capsData', 'cart', 'cartTotal'], 

  methods: {
    addToCart: function(cap) {
      var found = false;

      for (var i = 0; i < vue.cart.length; i++) {

        if (vue.cart[i].item === cap.item) {
          var newCap = vue.cart[i];
          newCap.qty = newCap.qty + 1;
          vue.cart.$set(i, newCap);
          found = true;
          break;
        }
      }

      if(!found) {
        cap.qty = 1;
        vue.cart.push(cap);
      }

      vue.cartTotal = vue.cartTotal + cap.price;
      vue.checkoutBool = true;
    }, 

    popupAddToCart: function(capData) {
      var self = this;
      for(var i = 0; i < self.popupqty; i++) {
        self.addToCart(capData);
      }
      self.popupqty = 1;
    }, 

    viewCap: function(cap) {
      var self = this;
      self.capData = (JSON.parse(JSON.stringify(cap)));
      self.showPopup = true;
    }, 

    hidePopup: function() {
      var self = this;
      self.capData = {};
      self.showPopup = false;
    }
  }, 

  data: function()
  {
    return {
      showPopup: false,
      capData: {},
      popupqty: 1,
    }
  }

});

Vue.component('cart', 
{
  template: '<div class="cart">' + 
  '<span class="cart" {{ cart }} </span><i class="fa fa-shopping-cart" @click="showCart = !showCart"></i>' + 
  '<div class="cart-items" v-show="showCart">' + 
  '<table class="cartTable">' + 
  '<tbody>' + 
  '<tr class="cap" v-for="cap in cart">' + 
  '<td class="align-center"><button @click="qtyChange(cap, \'decriment\')"><strong>－</strong></button></td>' + 
  '<td class="align-center">{{ cart[$index].qty }}</td>' + 
  '<td class="align-center"><button @click="qtyChange(cap, \'incriment\')"><strong>＋</strong></button></td>' + 
  '<td class="align-center">{{ cart[$index] | capTitle }}</td>' + 
  '<td>{{ cap.price | currency }}</td>' + 
  '</tbody>' + 
  '<table>' + 
  '</div>' + 
  '<h2 class="cartTotal" v-show="showCart"> {{ cartTotal | currency }} </h2></div>' + 
  '<button class="clearCart" v-show="checkoutBool" @click="clearCart()"><h1 style=font-size:20px>✖</h1></button>' + 
  '<button class="checkoutCart" v-show="checkoutBool" @click="proceedCheckout()"><h1 style=font-size:20px>✔</h1></button>', 

  props: ['checkoutBool', 'cart', 'cartTotal'], 

  data: function() {
    return {
      showCart: false
    }
  }, 

  filters: {
    capTitle: function(cart) {
      var newTitle;
      if(cart.qty > 1) {
        {
          newTitle = cart.cap + "s";
        }

        return newTitle;
      }

      return cart.cap;
    }
  }, 

  methods: {
    clearCart: function() {
      vue.cart = [];
      vue.cartTotal = 0;
      vue.checkoutBool = false;
      this.showCart = false;
    },

    qtyChange: function(cap, direction) {
      var qtyChange;

      for (var i = 0; i < vue.cart.length; i++) {
        if (vue.cart[i].item === cap.item) {

          var newCap = vue.cart[i];

          if(direction === "incriment") {
            newCap.qty = newCap.qty + 1;
            vue.cart.$set(i, newCap);

          } else {
            newCap.qty = newCap.qty - 1;

            if(newCap.qty == 0) {
              vue.cart.$remove(newCap);

            } else {
              vue.cart.$set(i, newCap);
            }
          }
        }
      }

      if(direction === "incriment") {
        vue.cartTotal = vue.cartTotal + cap.price;

      } else {
        vue.cartTotal = vue.cartTotal - cap.price;
      }

    }, 

    proceedCheckout: function() {
      vue.$dispatch("checkoutRequest");
    }
  }
});

Vue.component('checkout-section', 
{
  template: "<h1>Checkout</h1>" + 
  '<div class="checkout-section">' + 
  '<table>' + 
  '<thead>' + 
  '<tr>' + 
  '<th class="align-center">Item #</th>' + 
  '<th class="align-center">Title</th>' + 
  '<th class="align-center">Quantity</th>' + 
  '<th class="align-center">Price</th>' + 
  '</tr>' + 
  '</thead>' + 
  '<tbody>' + 
  '<tr v-for="cap in cart" track-by="$index">' + 
  '<td class="align-center">{{ cap.item }}</td>' + 
  '<td class="align-center">{{ cap.cap }}</td>' + 
  '<td class="align-center">{{ cart[$index].qty }}</td>' + 
  '<td class="align-center">{{ cap.price | currency }}</td>' + 
  '</tr>' + 
  '<tr>' + 
  '<td></td>' + 
  '<td></td>' + 
  '<td class="align-center"><h2>Total Price:</h2></td>' + 
  '<td class="align-center"><h2 v-if="cartTotal != 0"> {{ cartTotal | currency }} </h2></td>' + 
  '</tr>' + 
  '</tbody>' + 
  '</table>' + 
  '<button v-show="cartTotal" @click="checkoutPopup()"><strong><h2 style=font-size:20px>Checkout</h2></strong></button></div>' + 
  "<div class='popupWrapper' v-show='showPopup'>" + 
  "<div class='overlay' @click='hidePopup()'></div>" + 
  "<div class='popup checkout'>" + 
  "<h1>Checkout</h1>" + 
  "<h1> Total: {{ cartTotal | currency }} </h1>" + 
  "<br><div>Paypal here.</div>" + 
  "</div>", 

  props: ['cart', 'cartTotal'], 

  data: function() {
    return {
      showPopup: false
    }
  }, 

  methods: {
    hidePopup: function() {

      var self = this;
      self.showPopup = false;
    }, 

    removeCap: function(cap) {
      vue.cart.$remove(cap);
      vue.cartTotal = (cap.price * cap.qty);

      if(vue.cart.length <= 0) {
        vue.checkoutBool = false;
      }
    }, 

    checkoutPopup: function() {
      var self = this;
      self.showPopup = true;

      console.log("CHECKOUT", self.cartTotal);
    }
  },

  events: {
    "checkoutRequest": function() {
      var self = this;
      self.checkoutPopup();
    }
  }
});

Vue.config.debug = false;
var vue = new Vue(
{
  el: "#vue",

  data: {
    capsData: [
	{
        item: 1,
        cap: "Avocado Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/24a54a/1176036174/il_794xN.1176036174_kdik.jpg",
        details: "Details go here.",
        price: 8.00
      },

	  {
        item: 2,
        cap: "Alien Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/d86953/1074134650/il_794xN.1074134650_pcyg.jpg",
        details: "Details go here.",
        price: 10.00
      },

	  {
        item: 3,
        cap: "Airplane Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/b4cbb4/1145137314/il_794xN.1145137314_2fsh.jpg",
        details: "Details go here.",
        price: 5.50
      },

	  {
        item: 4,
        cap: "Bulldog Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/f6d181/1130555663/il_794xN.1130555663_b5zb.jpg",
        details: "Details go here.",
        price: 10.50
      },

	  {
        item: 5,
        cap: "Coffee Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/d7c24c/1168003091/il_794xN.1168003091_mb4q.jpg",
        details: "Details go here.",
        price: 5.00
      },

	  {
        item: 6,
        cap: "Corn Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/230833/1710570787/il_794xN.1710570787_3iiv.jpg",
        details: "Details go here.",
        price: 5.00
      },

	  {
        item: 7,
        cap: "Dachshund Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/5a398e/1709398111/il_794xN.1709398111_4ick.jpg",
        details: "Details go here.",
        price: 8.50
      },

	  {
        item: 8,
        cap: "Dinosaur Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/fae923/1611364770/il_794xN.1611364770_976m.jpg",
        details: "Details go here.",
        price: 15.00
      },

	  {
        item: 9,
        cap: "Duck Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/71d6d1/1168026863/il_794xN.1168026863_fo0o.jpg",
        details: "Details go here.",
        price: 12.00
      },

	  {
        item: 10,
        cap: "Eagle Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/822e8d/1145212788/il_794xN.1145212788_keho.jpg",
        details: "Details go here.",
        price: 10.50
      },

	  {
        item: 11,
        cap: "Egg Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/ed50b0/1623000029/il_794xN.1623000029_echw.jpg",
        details: "Details go here.",
        price: 5.00
      },

	  {
        item: 12,
        cap: "Flamingo Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/876bee/1223267293/il_794xN.1223267293_271u.jpg",
        details: "Details go here.",
        price: 5.50
      },

	  {
        item: 13,
        cap: "Fries Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/afb24b/1102223118/il_794xN.1102223118_ay4q.jpg",
        details: "Details go here.",
        price: 10.00
      },

	  {
        item: 14,
        cap: "Frog Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/ecb15f/1339342953/il_794xN.1339342953_2s2f.jpg",
        details: "Details go here.",
        price: 5.50
      },

	  {
        item: 15,
        cap: "'Happy' Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/e2c0e8/1088539390/il_794xN.1088539390_6ziv.jpg",
        details: "Details go here.",
        price: 15.00
      },

	  {
        item: 16,
        cap: "Ice Cream Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/57efc9/1148854049/il_794xN.1148854049_tdph.jpg",
        details: "Details go here.",
        price: 12.00
      },

	  {
        item: 17,
        cap: "Koala Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/9ad290/1709453127/il_794xN.1709453127_cq5v.jpg",
        details: "Details go here.",
        price: 12.50
      },

	  {
        item: 18,
        cap: "Lemon Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/3eae1b/1503714898/il_794xN.1503714898_dbdx.jpg",
        details: "Details go here.",
        price: 8.00
      },

	  {
        item: 19,
        cap: "Lightning Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/cc7dcd/1710163093/il_794xN.1710163093_2hpc.jpg",
        details: "Details go here.",
        price: 10.00
      },

	  {
        item: 20,
        cap: "Moon Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/0ec785/1300198929/il_794xN.1300198929_c6a9.jpg",
        details: "Details go here.",
        price: 16.00
      },

	  {
        item: 21,
		cap: "Owl Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/bedafd/1102438538/il_794xN.1102438538_rgap.jpg",
        details: "Details go here.",
        price: 10.50
      },

	  {
        item: 22,
        cap: "Pepper Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/5d806a/1145254584/il_794xN.1145254584_cvql.jpg",
        details: "Details go here.",
        price: 8.50
      },

	  {
        item: 23,
        cap: "Pizza Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/08cd5f/1176086042/il_794xN.1176086042_phrd.jpg",
        details: "Details go here.",
        price: 16.00
      },

	  {
        item: 24,
        cap: "Rainbow Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/5d0568/1158246625/il_794xN.1158246625_ezuy.jpg",
        details: "Details go here.",
        price: 16.00
      },

	  {
        item: 25,
        cap: "Rocket Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/f3c1d5/1124212796/il_794xN.1124212796_1u3o.jpg",
        details: "Details go here.",
        price: 15.00
      },

	  {
        item: 26,
        cap: "Sunflower Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/593633/1482450398/il_794xN.1482450398_lvzb.jpg",
        details: "Details go here.",
        price: 8.00
      },

	  {
        item: 27,
        cap: "Taco Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/a3c787/1111653904/il_794xN.1111653904_ab3v.jpg",
        details: "Details go here.",
        price: 15.50
      },

	  {
        item: 28,
        cap: "Whale Embroidered Cap",
        img: "https://i.etsystatic.com/13827272/r/il/b4f34a/1203639192/il_794xN.1203639192_sk9g.jpg",
        details: "Details go here.",
        price: 15.00
      }
    ], 
    checkoutBool: false, 
    cart: [], 
    cartTotal: 0
  }, 

  events: {
    "checkoutRequest": function() {
      vue.$broadcast("checkoutRequest");
    }
  }
});