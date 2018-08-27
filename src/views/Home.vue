<template>
  <div class="home">
    <h1 :class='{green: !dead, red: dead}'>{{target.name}}: {{target.health}}</h1>
    <button v-for='damage, name in target.attacks' @click='attack(name)' :disabled='dead' :key='name'>{{name}}</button>
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
    return {
      target: {
        health: 100,
        name: 'Jimminy Billy Bob',
        attacks: {
          kick: 10,
          punch: 25,
          slap: 1,
          hadouken: 100
        },
        items: []
      },
      availableItems: [
        { name: 'Shield', modifier: Math.PI / 100, id: 0 },
        { name: 'Magic Shrooms', modifier: 1.0005, id: 1 }
      ]
    };
  },
  methods: {
    reset() {
      this.target.health = 100;
    },
    attack(attackString) {
      if (!this.target.attacks[attackString]) {
        return;
      }
      const damage =
        this.target.attacks[attackString] *
        this.target.items.reduce(
          (total, current) => current.modifier * total,
          1
        );
      this.target.health -= damage;
      if (this.target.health < 0) {
        this.target.health = 0;
      }
    },
    giveItem(item) {
      if (this.target.items.includes(item)) {
        return;
      }
      this.target.items.push(item);
    }
  },
  computed: {
    dead() {
      return this.target.health <= 0;
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