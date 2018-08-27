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
      ]
    }
  },
  mutations: {
    setHealth(state, health) {
      state.slapGame.target.health = health;
    },
    addItem(state, item) {
      state.slapGame.target.items.push(item);
    },
    reset(state) {
      state.slapGame.target.health = 100;
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
      commit('reset');
    }
  }
});
