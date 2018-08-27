import Vue from 'vue';
import Vuex from 'vuex';
import Target from './models/Target';

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
        {
          img: 'https://picsum.photos/1024/800?image=1080',
          cost: 2
        },
        {
          img:
            'https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/50/1513015699-red-green-grapes.jpg',
          cost: 1.25
        },
        {
          img:
            'https://globalassets.starbucks.com/assets/e2f42654ecf74c5b9da0f7d83855ad02.jpg',
          cost: 0.5
        }
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
    deliverItem(state, value) {
      state.vendr.tray.push(value);
    },
    removeFromTray(state, index) {
      state.vendr.tray.splice(index);
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
    buyItem({ commit, state }, payload) {
      if (!state.vendr.products.includes(payload)) {
        return;
      }
      const newBalance = state.vendr.balance - payload.cost;
      if (newBalance < 0) {
        return false;
      }

      commit('setBalance', newBalance);
      commit('deliverItem', payload);
      return true;
    },
    removeFromTray({ commit, state }, index) {
      if (index < 0 || index >= state.vendr.tray.length) {
        return;
      }

      commit('removeFromTray', index);
    }
  }
});
