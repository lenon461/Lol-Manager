<template>
  <div class="all">
    <v-container class="grey lighten-5">
      <v-row no-gutters cols="sm">
        <v-col class="text-center" sm="1" style="line-height:200px;"></v-col>
        <v-col class="text-center" v-for="m in 5" :key="m" cols="sm">{{ line[m - 1] }}</v-col>
      </v-row>
      <v-row
        v-for="n in 5"
        :key="n"
        no-gutters
        cols="xs"
        class="ma-3 pa-6"
        style="background-color:pink;"
      >
        <v-col class="text-center" sm="1" align="center" style="line-height:90px;">
          <v-row no-gutters cols="xs">{{ n }}위</v-row>

          <v-row no-gutters cols="xs">
            <v-icon>mdi-heart</v-icon>
            <span class="subheading mr-2">
              {{
              list && list[n - 1] && list[n - 1][6]
              }}
            </span>
          </v-row>
        </v-col>
        <v-col v-for="m in 5" :key="m" cols="sm">
          <player-card
            :profile="
              list &&
                list[n - 1] &&
                list[n - 1][m - 1] &&
                makePathByName(list[n - 1][m - 1])
            "
            :name="list && list[n - 1] && list[n - 1][m - 1]"
            :disable="true"
            @PlayerChoose="PlayerChoose(n, m)"
          ></player-card>
        </v-col>
      </v-row>

      <v-spacer />
      <div class="text-center">
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" to="/rank">새로 쓰기</v-btn>
        </v-card-actions>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import PlayerCard from '../components/PlayerCard'
export default {
  components: { PlayerCard },
  data: () => ({
    list: [],
    line: ['TOP', 'JG', 'MID', 'ADC', 'SUP'],
    dialog: false,
    test: 'name'
  }),
  computed: {},

  async created() {
    await this.GetLineUpByRanked()
  },
  methods: {
    async GetLineUpByRanked() {
      const ReadLineUp = await axios.get(
        'https://asia-northeast1-tribal-isotope-228803.cloudfunctions.net/ReadLineUp'
      )
      this.list = ReadLineUp.data
      for (let i = 0; i < 5; i++) {
        const { top, jg, mid, adc, sup, price, count } = ReadLineUp.data[i]
        this.list[i] = [top, jg, mid, adc, sup, price, count]
      }
    },
    makePathByName(name) {
      return `/FM/${name}.png`
    }
  }
}
</script>
<style scoped>
.all {
  background-color: aqua;
}
n {
  background-color: pink;
}
</style>
