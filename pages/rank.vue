<template>
  <v-container class="grey lighten-5">
    <div class="headline mb-1 title">
      <h1>인기 팀 랭킹</h1>
    </div>
    <div class="text-center table">
      <v-row v-if="loading" class="line row" cols="36">
        <v-col class="text-center" sm="1" style="line-height:200px;"></v-col>
        <v-col class="text-center" v-for="line in lines" :key="line">
          <v-chip color="grey" dark>{{ line }}</v-chip>
        </v-col>
        <v-col class="text-center" sm="1" style="line-height:200px;"></v-col>
      </v-row>
      <v-row v-for="rank in 5" :key="rank" no-gutters cols="36">
        <v-col class="text-center" sm="1" style="line-height:120px;">
          <v-chip color="black" dark>{{ rank }}위</v-chip>
        </v-col>
        <v-col v-for="line in lines" :key="line">
          <v-card outlined>
            <v-container>
              <img
                :class="ranking[rank - 1][line]"
                :alt="ranking[rank - 1][line]"
                :src="makeImgPathByName(ranking[rank - 1][line])"
                width="100%"
                height="100%"
              />
              <div>{{ ranking[rank - 1][line] }}</div>
            </v-container>
          </v-card>
        </v-col>
        <v-col class="text-center" sm="1" style="line-height:120px;">
          <!-- <v-chip color="orange" dark>{{ranking[rank-1]["PRICE"]}}$</v-chip> -->
          <p />
          <v-chip color="red" dark>
            <v-icon>mdi-heart</v-icon>
            {{ ranking[rank - 1]['COUNT'] }}
          </v-chip>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    lines: ['TOP', 'JG', 'MID', 'ADC', 'SUP'],
    ranking: [
      {
        TOP: 'ques',
        JG: 'ques',
        MID: 'ques',
        ADC: 'ques',
        SUP: 'ques'
      },
      {
        TOP: 'ques',
        JG: 'ques',
        MID: 'ques',
        ADC: 'ques',
        SUP: 'ques'
      },
      {
        TOP: 'ques',
        JG: 'ques',
        MID: 'ques',
        ADC: 'ques',
        SUP: 'ques'
      },
      {
        TOP: 'ques',
        JG: 'ques',
        MID: 'ques',
        ADC: 'ques',
        SUP: 'ques'
      },
      {
        TOP: 'ques',
        JG: 'ques',
        MID: 'ques',
        ADC: 'ques',
        SUP: 'ques'
      }
    ],
    loading: false
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
      for (let i = 0; i < 5; i++) {
        const { top, jg, mid, adc, sup, price, count } = ReadLineUp.data[i]
        this.ranking[i] = {
          TOP: top,
          JG: jg,
          MID: mid,
          ADC: adc,
          SUP: sup,
          PRICE: price,
          COUNT: count
        }
      }
      console.log(this.ranking)
      this.loading = true
    },
    makeImgPathByName(name) {
      return `${name}.png`
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
