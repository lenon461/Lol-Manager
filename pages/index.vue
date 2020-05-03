<template>
  <v-container class="grey lighten-5">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <div class="headline mb-1 title">
      <h1>15달러로 팀짜기</h1>
    </div>
    <div class="text-center table">
      <v-row class="dollar row" cols="36">
        <v-col class="text-center" sm="1" style="line-height:200px;"></v-col>
        <v-col v-for="dollar in 5" :key="dollar" class="text-center">
          <v-chip color="green" dark>${{ 6 - dollar }}</v-chip>
        </v-col>
      </v-row>
      <v-row v-for="line in lines" :key="line" no-gutters cols="36">
        <v-col class="text-center" sm="1" style="line-height:200px;">
          <v-chip color="grey" dark>{{ line }}</v-chip>
        </v-col>
        <v-col v-for="dollar in ['5', '4', '3', '2', '1']" :key="dollar">
          <v-card
            :dark="isdark(PricedPlayers[dollar][line], line)"
            outlined
            @click="Choose(PricedPlayers[dollar][line], line, dollar)"
          >
            <v-container>
              <img
                :class="PricedPlayers[dollar][line]"
                :alt="PricedPlayers[dollar][line]"
                :src="makeImgPathByName(PricedPlayers[dollar][line])"
                width="100%"
                height="100%"
              />
              <p class="text-center">
                {{ Belongs[PricedPlayers[dollar][line]] }}
                {{ PricedPlayers[dollar][line] }}
              </p>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="text-center myteam">
      <v-container class="grey lighten-5">
        <div class="">
          <v-card-title>
            <h1>내가 선택한 선수들</h1>
          </v-card-title>
          <v-row class="myteam table" no-gutters>
            <v-col v-for="line in lines" :key="line">
              <v-chip color="orange" dark>{{ line }}</v-chip>
            </v-col>
          </v-row>
          <v-row class="myteam table" no-gutters>
            <v-col v-for="line in lines" :key="line">
              <v-card outlined>
                <v-container>
                  <img
                    :class="myTeam[line]"
                    :alt="myTeam[line]"
                    :src="makeImgPathByName(myTeam[line])"
                    width="100%"
                    height="100%"
                  />
                  <p class="text-center">{{ myTeam[line] }}</p>
                </v-container>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="myteam table" no-gutters cols="xs">
            <v-col v-for="line in lines" :key="line"
              >{{ myTeamValues[line] || '?' }}$</v-col
            >
          </v-row>
          <v-spacer></v-spacer>

          <v-card-text>
            <v-chip color="rgb(224, 161, 161)">{{ total }}$</v-chip>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="ma-2"
              :loading="loading"
              :disabled="loading"
              color="info"
              @click="SubmitLineUp"
              >선택 완료</v-btn
            >
            <v-snackbar v-model="snackbar">
              {{ snackbar_text }}
              <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
            </v-snackbar>
          </v-card-actions>
        </div>
      </v-container>
    </div>
    <div class="result dialog">
      <v-dialog v-model="dialog" width="100%">
        <div class="text-center myteam">
          <v-container class="grey lighten-5">
            <div class="">
              <v-card-title>
                <h1>내가 선택한 선수들</h1>
              </v-card-title>
              <v-row class="myteam table" no-gutters>
                <v-col v-for="line in lines" :key="line">
                  <v-chip color="orange" dark>{{ line }}</v-chip>
                </v-col>
              </v-row>
              <v-row class="myteam table" no-gutters>
                <v-col v-for="line in lines" :key="line">
                  <v-card outlined>
                    <v-container>
                      <img
                        :class="myTeam[line]"
                        :alt="myTeam[line]"
                        :src="makeImgPathByName(myTeam[line])"
                        width="100%"
                        height="100%"
                      />
                      <p class="text-center">{{ myTeam[line] }}</p>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>

              <v-row class="myteam table" no-gutters cols="xs">
                <v-col v-for="line in lines" :key="line"
                  >{{ myTeamValues[line] || '?' }}$</v-col
                >
              </v-row>
              <v-spacer></v-spacer>

              <v-card-text>
                <v-chip color="rgb(224, 161, 161)">{{ total }}$</v-chip>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-card-actions>
                  <v-btn color="primary" to="/rank">인기랭킹 보러가기</v-btn>
                </v-card-actions>
              </v-card-actions>
            </div>
          </v-container>
        </div>
      </v-dialog>
    </div>
  </v-container>
</template>
<script>
import axios from 'axios'

export default {
  name: 'make_team',
  data: () => ({
    lines: ['TOP', 'JG', 'MID', 'ADC', 'SUP'],
    teams: ['T1', 'GEN', 'DRX', 'DWG', 'KT'],
    players: {
      T1: {
        TOP: 'Canna',
        JG: 'Cuzz',
        MID: 'Faker',
        ADC: 'Teddy',
        SUP: 'Effort'
      },
      GEN: {
        TOP: 'Rascal',
        JG: 'Clid',
        MID: 'Bdd',
        ADC: 'Ruler',
        SUP: 'Life'
      },
      DRX: {
        TOP: 'Doran',
        JG: 'Pyosik',
        MID: 'Chovy',
        ADC: 'Deft',
        SUP: 'Keria'
      },
      DWG: {
        TOP: 'Nuguri',
        JG: 'Canyon',
        MID: 'ShowMaker',
        ADC: 'Ghost',
        SUP: 'BeryL'
      },
      KT: {
        TOP: 'SoHwan',
        JG: 'bonO',
        MID: 'Kuro',
        ADC: 'Aiming',
        SUP: 'TusiN'
      }
    },

    PricedPlayers: {
      5: {
        TOP: 'Nuguri',
        JG: 'Clid',
        MID: 'Chovy',
        ADC: 'Teddy',
        SUP: 'Keria'
      },
      4: {
        TOP: 'Kiin',
        JG: 'Cuzz',
        MID: 'Faker',
        ADC: 'Aiming',
        SUP: 'Effort'
      },
      3: {
        TOP: 'Rascal',
        JG: 'bonO',
        MID: 'Bdd',
        ADC: 'Deft',
        SUP: 'Life'
      },
      2: {
        TOP: 'Canna',
        JG: 'Canyon',
        MID: 'Kuro',
        ADC: 'Ruler',
        SUP: 'Lehends'
      },
      1: {
        TOP: 'Doran',
        JG: 'Pyosik',
        MID: 'ShowMaker',
        ADC: 'HyBriD',
        SUP: 'TusiN'
      }
    },
    Belongs: {
      Canna: 'T1',
      Cuzz: 'T1',
      Faker: 'T1',
      Teddy: 'T1',
      Effort: 'T1',
      Rascal: 'GEN',
      Clid: 'GEN',
      Bdd: 'GEN',
      Ruler: 'GEN',
      Life: 'GEN',
      Doran: 'DRX',
      Pyosik: 'DRX',
      Chovy: 'DRX',
      Deft: 'DRX',
      Keria: 'DRX',
      Nuguri: 'DWG',
      Canyon: 'DWG',
      ShowMaker: 'DWG',
      Ghost: 'DWG',
      BeryL: 'DWG',
      SoHwan: 'KT',
      bonO: 'KT',
      Kuro: 'KT',
      Aiming: 'KT',
      TusiN: 'KT',
      Kiin: 'AF',
      HyBriD: 'APK',
      Lehends: 'HLE'
    },
    myTeam: {
      TOP: '',
      JG: '',
      MID: '',
      ADC: '',
      SUP: ''
    },
    myTeamValues: {
      TOP: 0,
      JG: 0,
      MID: 0,
      ADC: 0,
      SUP: 0
    },
    total: 0,
    loading: false,
    snackbar: false,
    snackbar_text: "Hello, I'm a snackbar",
    dialog: false
  }),
  methods: {
    makeImgPathByName(name) {
      return `${name}.png`
    },
    Choose(name, line, dollar) {
      console.log(name, line, dollar)
      this.myTeam[line] = name
      this.myTeamValues[line] = Number(dollar)
      this.calc()
    },
    isdark(name, line) {
      return this.myTeam[line] === name
    },
    calc() {
      const result = this.lines
        .map((line) => this.myTeamValues[line])
        .reduce((acc, cv) => acc + cv)
      console.log(result)
      this.total = result
    },
    async SubmitLineUp() {
      if (!this.myTeamValid()) return
      this.loading = true
      this.dialog = true
      const UpdateLineUp = await axios.post(
        'https://asia-northeast1-tribal-isotope-228803.cloudfunctions.net/UpdateLineUp',
        {
          top: this.myTeam[this.lines[0]],
          jg: this.myTeam[this.lines[1]],
          mid: this.myTeam[this.lines[2]],
          adc: this.myTeam[this.lines[3]],
          sup: this.myTeam[this.lines[4]]
        }
      )
      if (UpdateLineUp.data === '')
        throw new Error('이 조합이 에러가 발생했어요 개발자에게 알려주세요')
      else {
        this.loading = false
        console.log(UpdateLineUp)
        // this.$router.push('/rank')
      }
    },
    myTeamValid() {
      if (this.total > 15) {
        this.snackbar = true
        this.snackbar_text = '돈을 초과하였습니다.'
        return false
      }
      for (let i = 0; i < 5; i++) {
        if (this.myTeam[this.lines[i]] === '') {
          this.snackbar = true
          this.snackbar_text = '선택되지 않은 라인이 있습니다.'
          return false
        }
      }
      return true
    }
  }
}
</script>
<style scoped>
.myteam table {
  border-style: solid;
  /* background-color: rgb(224, 161, 161); */
}
</style>
