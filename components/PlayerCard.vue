<template>
  <v-card outlined tile @click="hi" :dark="dark">
    <v-container>
      <img :class="name" :alt="name" :src="profile" width="100%" height="100%" />
      <p class="text-center">{{ name }}</p>
    </v-container>
  </v-card>
</template>

<script>
export default {
  components: {},
  data: () => ({
    dark: false
  }),
  name: 'PlayerCard',
  props: ['profile', 'name', 'disable'],
  created() {},
  methods: {
    hi() {
      if (this.disable) return
      this.dark = !this.dark
      this.$emit('PlayerChoose', this.dark)
    }
  }
}
</script>
