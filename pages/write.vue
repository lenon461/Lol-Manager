<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">하루 일기s</v-card-title>
        <v-card-text>
          하루 일기는 오늘의 일기를 기록하는 공간입니다. 편하게 익명으로 쓰시고,
          다른 분들의 일기를 읽어보세요.
        </v-card-text>
        <v-card-text>
          <v-textarea solo label="Solo textarea" auto-grow></v-textarea>
          <div class="text-xs-right">
            <em>
              <small>&mdash; John Leider</small>
            </em>
          </div>
          <hr class="my-3" />
          <a href="https://nuxtjs.org/" target="_blank">Nuxt Documentation</a>
          <br />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="ToWrite">Go to Write</v-btn>
          <v-btn color="primary" @click="ToWrite">d">Go to Read</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data: () => ({
    goWrite: false,
    goRead: false
  }),
  methods: {
    ToWrite() {
      this.goWrite = true
    },
    ToRead() {
      this.goRead = true
    }
  }
}
</script>
