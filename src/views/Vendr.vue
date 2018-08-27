<template>
  <div class='vendr'>
    <section class='items'>
      <article v-for='(item, index) in products' class='item' :key='index' @click='buyItem(index)'>
        <img :src='item.img' />
        <h3>{{item.cost}}</h3>
        <h6>{{item.stock}}</h6>
      </article>
    </section>
    <section class='money'>
      <button v-for='(coin, index) in coins' @click='addCoin(coin)' :key='index'>{{coin*100}}</button>
    </section>
    <section class='total'>
      <p>
        Change:
        <span class='change'>{{balance}}</span>
      </p>
    </section>
    <button :class='{ show: balance }' class='give-change' @click='emptyBalance()'>Give change</button>
    <section class='tray'>
      <img v-for='(item, index) in tray' :key='index' :src='item.img' @click='takeFromTray(index)' />
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    addCoin(coin) {
      this.$store.dispatch('addCoin', coin);
    },
    emptyBalance() {
      this.$store.dispatch('emptyBalance');
    },
    buyItem(item) {
      this.$store.dispatch('buyItem', item);
    },
    takeFromTray(index) {
      this.$store.dispatch('removeFromTray', index);
    }
  },
  computed: {
    products() {
      return this.$store.state.vendr.products;
    },
    coins() {
      return this.$store.state.vendr.acceptedCoins;
    },
    balance() {
      return this.$store.state.vendr.balance;
    },
    tray() {
      return this.$store.state.vendr.tray;
    }
  }
};
</script>


<style lang="scss" scoped>
.items {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  margin-bottom: 2rem;
}

.item {
  position: relative;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 2rem;
  }
  &.placeholder {
    filter: saturate(25%);

    & > img {
      background-color: #6a0edb;
      filter: none;
    }

    & > h3 {
      width: 2rem;
      height: 2rem;
      bottom: 0.75rem;
      border-radius: 0.1rem;
      background-color: #8932f3;
      &::before {
        content: '';
      }
    }
  }

  & > img {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    filter: brightness(50%);
    border-radius: 0.2rem;
  }

  & > h3 {
    font-size: 1.5rem;
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    margin: 0;
    color: white;
    font-weight: 600;
    &::before {
      content: '$';
    }
  }

  & > h6 {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    margin: 0;
    color: white;
    font-weight: 400;
  }
}

.money {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;

  & > button:not(:last-child) {
    margin-right: 0.5rem;
  }
  & > button::before {
    content: '¢';
    font-weight: 600;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    position: absolute;
    top: 50%;
    transform: translate(-125%, -60%);
  }
}

button {
  border: none;
  background: #8e42ec;
  color: white;
  font-size: 1.2rem;
  width: 4.8rem;
  height: 2.5rem;
  border-radius: 0.1rem;
  cursor: pointer;
  position: relative;
  padding-left: 1rem;
  transition: box-shadow 0.2s;
  &:active {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
}

.total {
  text-align: center;
  & .change {
    background-color: #444;
    color: white;
    padding: 0.3rem 0.5rem;
    border-radius: 0.1rem;
    &::before {
      content: '$';
    }
  }
}

.tray {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;

  & > img {
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border-radius: 0.2rem;
    cursor: pointer;
    transition: filter 0.2s;
    margin: 0.5rem;
    &:hover {
      filter: brightness(50%);
    }
  }
}

.give-change {
  width: 7rem;
  height: 2.25rem;
  padding: 0;
  margin-top: 1rem;
  font-size: 0.95rem;
}
</style>