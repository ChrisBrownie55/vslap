import Vue from 'vue';
import Vuex from 'vuex';
import Target from './models/Target';
import Product from './models/Product';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    slapGame: {
      target: new Target({
        health: 100,
        name: 'Jimminy Billy Bob',
        attacks: {
          kick: 10,
          punch: 25,
          slap: 1,
          hadouken: 100
        },
        items: []
      }),
      availableItems: [
        { name: 'Shield', modifier: Math.PI / 100, id: 0 },
        { name: 'Magic Shrooms', modifier: 1.0005, id: 1 }
      ]
    },
    vendr: {
      products: [
        new Product({
          img: 'https://picsum.photos/1024/800?image=1080',
          cost: 2,
          stock: 10
        }),
        new Product({
          img:
            'https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/50/1513015699-red-green-grapes.jpg',
          cost: 1.25,
          stock: 10
        }),
        new Product({
          img:
            'https://globalassets.starbucks.com/assets/e2f42654ecf74c5b9da0f7d83855ad02.jpg',
          cost: 0.5,
          stock: 10
        })
      ],
      acceptedCoins: [0.25, 0.1, 0.05],
      balance: 0,
      tray: []
    }
  },
  mutations: {
    setHealth(state, health) {
      state.slapGame.target.health = health;
    },
    addItem(state, item) {
      state.slapGame.target.items.push(item);
    },

    setBalance(state, value) {
      state.vendr.balance = parseFloat(value.toFixed(2));
    },
    deliverItem(state, index) {
      const item = state.vendr.products[index];
      item.stock--;
      state.vendr.tray.push(item);
    },
    removeFromTray(state, index) {
      state.vendr.tray.splice(index, 1);
    }
  },
  actions: {
    attack({ commit, state }, payload) {
      let health = state.slapGame.target.health;
      if (state.slapGame.target.attacks[payload]) {
        health -= state.slapGame.target.attacks[payload];
        if (health < 0) {
          health = 0;
        }
      }
      commit('setHealth', health);
    },
    giveItem({ commit, state }, payload) {
      if (state.slapGame.target.items.includes(payload)) {
        return;
      }
      commit('addItem', payload);
    },
    reset({ commit }) {
      commit('setHealth', 100);
    },

    addCoin({ commit, state }, payload) {
      if (state.vendr.acceptedCoins.includes(payload)) {
        commit('setBalance', state.vendr.balance + payload);
      }
    },
    emptyBalance({ commit }) {
      commit('setBalance', 0);
    },
    buyItem({ dispatch, commit, state }, index) {
      if (index < 0 || index >= state.vendr.products.length) {
        return;
      }
      const item = state.vendr.products[index];
      if (item.stock <= 0) {
        return dispatch('modal', 'Out of stock!');
      }
      const newBalance = state.vendr.balance - item.cost;
      if (newBalance < 0) {
        return dispatch('modal', 'Insufficient funds!');
      }

      commit('setBalance', newBalance);
      commit('deliverItem', index);
    },
    removeFromTray({ commit, state }, index) {
      if (index < 0 || index >= state.vendr.tray.length) {
        return;
      }

      commit('removeFromTray', index);
    },

    modal(_, text) {
      const dialog = document.createElement('dialog');
      dialog.textContent = text;
      document.body.appendChild(dialog);
      dialog.showModal();
      setTimeout(() => document.body.removeChild(dialog), 1000);
    }
  }
});
