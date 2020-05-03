<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center"><haru-logo /></div>
      <v-card class="card-center" raised>
        <v-card-title class="headline">하루 일기</v-card-title>

        <v-card-text>
          하루 일기는 오늘의 일기를 기록하는 공간입니다. 편하게 익명으로 쓰시고,
          다른 분들의 일기를 읽어보세요.
        </v-card-text>
        <v-card-text v-if="goWrite">
          <v-textarea
            solo
            label="What's Your Think?"
            auto-grow
            v-model="description"
          ></v-textarea>
          <div class="text-xs-right">
            <em>
              <small
                ><v-text-field
                  solo
                  dense
                  label="name"
                  v-model="writer"
                ></v-text-field
              ></small>
            </em>
          </div>
          <v-btn color="primar" @click="SubmitHaru">Submit</v-btn>
          <br />
        </v-card-text>

        <v-card-text v-if="goRead" :loading="cardloading">
          {{ description }}
          <div class="text-xs-right">
            <em>
              <small>&mdash; {{ writer }}</small>
            </em>
          </div>
          <hr class="my-3" />
          <br />
          <v-row align="center" justify="end">
            <v-btn icon @click="heartClick">
              <v-icon class="iconify">mdi-heart</v-icon>
            </v-btn>
            <span class="subheading mr-2">{{ heartCount }}</span>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="NewWrite">새로 쓰기</v-btn>
          <v-btn color="primary" @click="NewRead">새로 읽기</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import Logo from '~/components/Logo.vue'
import HaruLogo from '~/components/HaruLogo.vue'
export default {
  components: {
    Logo,
    HaruLogo
  },
  data: () => ({
    goWrite: false,
    goRead: false,
    keys: '',

    cardloading: false,
    heart: false,

    id: '',
    description: '',
    writer: '',
    heartCount: ''
  }),
  async created() {
    this.keys = await this.GetKeys()
  },
  methods: {
    NewWrite() {
      this.goWrite = true
      this.goRead = false
    },
    async NewRead() {
      if (this.keys.length === 0) return
      this.cardloading = true
      this.goWrite = false
      this.goRead = true
      this.heart = false

      const key = Math.floor(Math.random() * 1000) % this.keys.length
      this.id = this.keys[key]
      const contents = await this.GetContents(this.id)

      this.writer = contents.writer
      this.description = contents.description
      this.heartCount = contents.heartCount || 0
    },
    heartClick() {
      this.heart = !this.heart
      if (!this.heart) this.heartCount--
      else this.heartCount++
      this.UpdateHaruHeart(this.id)
    },

    // APIs
    async GetKeys() {
      const KeysHaru = await axios.get(
        'https://asia-northeast1-tribal-isotope-228803.cloudfunctions.net/KeysHaru'
      )
      return KeysHaru.data
    },
    async GetContents(id) {
      const ReadHaru = await axios.get(
        'https://asia-northeast1-tribal-isotope-228803.cloudfunctions.net/ReadHaru' +
          `?id=${id}`
      )
      this.cardloading = false

      return ReadHaru.data[0]
    },
    async SubmitHaru() {
      this.cardloading = true
      const CreateHaru = await axios.post(
        'https://asia-northeast1-tribal-isotope-228803.cloudfunctions.net/CreateHaru',
        {
          description: this.description,
          writer: this.writer
        }
      )
      if (CreateHaru.status === 202) {
        const contents = await this.GetContents(CreateHaru.data)
        this.writer = contents.writer
        this.description = contents.description
        this.goWrite = false
        this.goRead = true
        this.cardloading = false
        console.log('Success')
      }

      return CreateHaru
    },
    async UpdateHaruHeart(id) {
      const UpdateHaruHeart = await axios.patch(
        'https://asia-northeast1-tribal-isotope-228803.cloudfunctions.net/UpdateHaruHeart',
        {
          id,
          heart: this.heart ? 1 : -1
        }
      )
    }
  }
}
</script>
<style scoped>
.iconify {
  color: red;
}
</style>
