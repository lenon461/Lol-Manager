<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters cols="sm">
      <v-col class="text-center" sm="1" style="line-height:200px;"></v-col>
      <v-col class="text-center" v-for="m in 5" :key="m" cols="sm"
        >${{ 6 - m }}</v-col
      >
    </v-row>
    <v-row v-for="n in 5" :key="n" no-gutters cols="xs">
      <v-col class="text-center" sm="1" style="line-height:200px;">{{
        line[n - 1]
      }}</v-col>
      <v-col v-for="m in 5" :key="m" cols="sm">
        <player-card
          :profile="list[m - 1][n - 1].profile"
          :name="list[m - 1][n - 1].name"
          :disable="
            LineUp[m - 1].name !== '' &&
              LineUp[m - 1].name !== list[n - 1][m - 1].name
          "
          @PlayerChoose="PlayerChoose(m, n)"
        ></player-card>
      </v-col>
    </v-row>
    <v-spacer />
    <div class="text-center">
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="SubmitLineUp">선택하기</v-btn>
      </v-card-actions>
    </div>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn color="red lighten-2" dark v-on="on" @click="SubmitLineUp"
            >Click Me</v-btn
          >
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title
            >Privacy Policy</v-card-title
          >

          <v-card-text>
            {{ message }}
            <v-alert :type="alerttype">{{ message }}</v-alert>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">I accept</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'
import PlayerCard from '../components/PlayerCard'

export default {
  components: { PlayerCard },
  data: () => ({
    LineUp: [
      {
        profile: '',
        name: ''
      },
      {
        profile: '',
        name: ''
      },
      {
        profile: '',
        name: ''
      },
      {
        profile: '',
        name: ''
      },
      {
        profile: '',
        name: ''
      }
    ],
    line: ['TOP', 'JG ', 'MID', 'AD ', 'SUP'],
    dialog: false,
    prices: [0, 0, 0, 0, 0],
    message: '',
    alerttype: ''
  }),

  computed: {
    list_test() {
      return new Array(5).fill().map(() =>
        new Array(5).fill({
          profile: '/FM/Faker.png',
          name: 'Faker'
        })
      )
    },
    list() {
      return [
        [
          {
            profile: '/FM/Canna.png',
            name: 'Canna'
          },
          {
            profile: '/FM/Cuzz.png',
            name: 'Cuzz'
          },
          {
            profile: '/FM/Faker.png',
            name: 'Faker'
          },
          {
            profile: '/FM/Teddy.png',
            name: 'Teddy'
          },
          {
            profile: '/FM/Effort.png',
            name: 'Effort'
          }
        ],
        [
          {
            profile: '/FM/Rascal.png',
            name: 'Rascal'
          },
          {
            profile: '/FM/Clid.png',
            name: 'Clid'
          },
          {
            profile: '/FM/Bdd.png',
            name: 'Bdd'
          },
          {
            profile: '/FM/Ruler.png',
            name: 'Ruler'
          },
          {
            profile: '/FM/Life.png',
            name: 'Life'
          }
        ],
        [
          {
            profile: '/FM/Doran.png',
            name: 'Doran'
          },
          {
            profile: '/FM/Pyosik.png',
            name: 'Pyosik'
          },
          {
            profile: '/FM/Chovy.png',
            name: 'Chovy'
          },
          {
            profile: '/FM/Deft.png',
            name: 'Deft'
          },
          {
            profile: '/FM/Keria.png',
            name: 'Keria'
          }
        ],
        [
          {
            profile: '/FM/Nuguri.png',
            name: 'Nuguri'
          },
          {
            profile: '/FM/Canyon.png',
            name: 'Canyon'
          },
          {
            profile: '/FM/ShowMaker.png',
            name: 'ShowMaker'
          },
          {
            profile: '/FM/Ghost.png',
            name: 'Ghost'
          },
          {
            profile: '/FM/BeryL.png',
            name: 'BeryL'
          }
        ],
        [
          {
            profile: '/FM/SoHwan.png',
            name: 'SoHwan'
          },
          {
            profile: '/FM/bonO.png',
            name: 'bonO'
          },
          {
            profile: '/FM/Kuro.png',
            name: 'Kuro'
          },
          {
            profile: '/FM/Aiming.png',
            name: 'Aiming'
          },
          {
            profile: '/FM/TusiN.png',
            name: 'TusiN'
          }
        ]
      ]
    }
  },
  methods: {
    PlayerChoose2(param) {
      console.log(param)
    },
    PlayerChoose(n, m) {
      console.log(this.list[n - 1][m - 1])
      if (this.LineUp[m - 1] !== this.list[n - 1][m - 1]) {
        this.LineUp[m - 1] = this.list[n - 1][m - 1]
        console.log(this.LineUp[m - 1], 'C  hoice!')
        this.prices[n - 1] = 6 - n
        console.log(this.prices)
      } else {
        this.LineUp[m - 1] = {
          profile: '',
          name: ''
        }
        console.log(this.line[m - 1], 'is Empty!')
      }
    },
    async SubmitLineUp() {
      for (let i = 0; i < 5; i++) {
        if (this.LineUp[i].name === '') {
          this.message = '5명을 선택해주세요'
          this.alerttype = 'error'
          return
        }
        if (this.prices.reduce((acc, cv) => acc + cv) !== 15) {
          this.message = '15원을 선택해주세요'
          this.alerttype = 'error'
          return
        }
      }
      console.log('Posting...')
      console.log({
        top: this.LineUp[0].name,
        jg: this.LineUp[1].name,
        mid: this.LineUp[2].name,
        adc: this.LineUp[3].name,
        sup: this.LineUp[4].name
      })

      const UpdateLineUp = await axios.post(
        'https://asia-northeast1-tribal-isotope-228803.cloudfunctions.net/UpdateLineUp',
        {
          top: this.LineUp[0].name,
          jg: this.LineUp[1].name,
          mid: this.LineUp[2].name,
          adc: this.LineUp[3].name,
          sup: this.LineUp[4].name
        }
      )
      if (UpdateLineUp.data === '')
        throw new Error('이 조합이 에러가 발생했어요 개발자에게 알려주세요')
      else {
        // this.$router.push('/rank')
      }
    }
  }
}
</script>
