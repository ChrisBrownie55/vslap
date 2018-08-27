<template>
  <div class="home">
    <h1 :class='{green: !dead, red: dead}'>{{target.name}}: {{target.health}}</h1>
    <button v-for='(damage, name) in target.attacks' @click='attack(name)' :disabled='dead' :key='name'>{{name}}</button>
    <button v-if='dead' @click='reset'>Reset</button>
    <div class="items">
      <button class="item" v-for="item in availableItems" :key="item.id" @click='giveItem(item)'>{{item.name}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {};
  },
  methods: {
    reset() {
      this.$store.dispatch('reset');
    },
    giveItem(item) {
      this.$store.dispatch('giveItem', item);
    },
    attack(attackType) {
      this.$store.dispatch('attack', attackType);
    }
  },
  computed: {
    target() {
      return this.$store.state.target;
    },
    availableItems() {
      return this.$store.state.availableItems;
    },
    dead() {
      return this.$store.state.target.health <= 0;
    }
  }
};
</script>
<style>
.red {
  background-color: rgb(243, 62, 62);
}
.green {
  background-color: rgb(111, 240, 111);
}
.red,
.green {
  color: white;
}
</style>