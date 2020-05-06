<template>
  <v-container class="grey lighten-5">
    <div class="headline mb-1 title">
      <h1>15달러로 팀짜기</h1>
    </div>
    <div class="text-center table">
      <v-row class="dollar row" cols="sm">
        <v-col class="text-center" sm="1" style="line-height:200px;"></v-col>
        <v-col v-for="dollar in [0, 1, 2, 3, 4, 5]" :key="dollar" class="text-center">
          <v-chip color="green" dark>${{ 6 - dollar }}</v-chip>
        </v-col>
      </v-row>
      <v-row v-for="pos in [0, 1, 2, 3, 4]" :key="pos" no-gutters cols="xs">
        <v-col class="text-center" sm="1" style="line-height:200px;">
          <v-chip color="grey" dark>{{ positions[pos] }}</v-chip>
        </v-col>
        <v-col v-for="dollar in [0, 1, 2, 3, 4, 5]" :key="dollar">
          <v-card
            :dark="isdark(DataTable[pos][dollar], positions[pos])"
            outlined
            @click="Choose(DataTable[pos][dollar], positions[pos], 6 - dollar)"
          >
            <v-container>
              <img
                :class="DataTable[pos][dollar]"
                :src="DataTable[pos][dollar].pic"
                width="100%"
                height="100%"
              />
              <p class="text-center">{{ DataTable[pos][dollar].name }}</p>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="text-center myteam">
      <v-container class="grey lighten-5">
        <v-card-title>
          <h1>내가 선택한 멤버</h1>
        </v-card-title>
        <v-row class="myteam table" no-gutters cols="xs">
          <v-col v-for="pos in positions" :key="pos">
            <v-chip color="orange" dark>{{ pos }}</v-chip>
          </v-col>
        </v-row>
        <v-row class="myteam table" no-gutters>
          <v-col v-for="pos in positions" :key="pos">
            <v-card outlined>
              <v-container>
                <img
                  :class="myTeam[pos]"
                  :alt="myTeam[pos]"
                  :src="myTeam[pos].pic"
                  width="100%"
                  height="100%"
                />
                <p class="text-center">{{ myTeam[pos].name }}</p>
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="myteam table" no-gutters cols="xs">
          <v-col v-for="line in lines" :key="line">{{ myTeamValues[line] || '?' }}$</v-col>
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
          >선택 완료</v-btn>
          <v-snackbar v-model="snackbar">
            {{ snackbar_text }}
            <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-card-actions>
        <v-dialog v-model="dialog" width="100%">
          <div class="text-center myteam">
            <v-card>
              <v-card-title>
                <h1>내가 선택한 선수들</h1>
              </v-card-title>
              <v-row class="myteam table" no-gutters cols="xs">
                <v-col v-for="line in lines" :key="line">
                  <v-chip color="orange" dark>{{ line }}</v-chip>
                </v-col>
              </v-row>
              <v-row class="myteam table" no-gutters cols="xs">
                <v-col v-for="line in lines" :key="line">
                  <v-card outlined>
                    <v-container>
                      <img
                        :class="myTeam[line]"
                        :alt="myTeam[line]"
                        :src="makeImgPathByName(myTeam[line])"
                        width="90px"
                        height="75px"
                        min-width="60px"
                        min-height="50px"
                        max-width="120px"
                        max-height="100px"
                      />
                      <p class="text-center">{{ myTeam[line] }}</p>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>

              <v-row class="myteam table" no-gutters cols="xs">
                <v-col v-for="line in lines" :key="line">{{ myTeamValues[line] || '?' }}$</v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" to="/rank">인기랭킹 보러가기</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </div>
        </v-dialog>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'make_team',
  data: () => ({
    positions: ['메인보컬', '메인래퍼', '메인댄서', '서브보컬', '서브래퍼'],
    roles: ['청순', '섹시', '리더', '애교', '비주얼', '예능', '걸크러쉬'],
    idols: {
      // 메인보컬
      연정: {
        name: '연정',
        team: '우주소녀',
        position: '메인보컬',
        role: '청순',
        pic:
          'https://ww.namu.la/s/b0df35ab768ede3c042b55d3231668990e13682c18feadd307b85c697ac52b3716f898a1edef9074dc7336eae8f690de1578086a3575c2e6d0755e7c4d0c0b560b0c58190d8711e43878cd18dd6b9ce571cc74db282ca81ed149c93743f2f38e31f3cb21d6caf0be6eb08e53583411d0'
      },
      지효: {
        name: '지효',
        team: 'TWICE',
        position: '메인보컬',
        role: '섹시',
        pic: 'https://dimg.donga.com/wps/NEWS/IMAGE/2019/09/23/97546668.2.jpg'
      },
      김세정: {
        name: '김세정 ',
        team: '구구단',
        position: '메인보컬',
        role: '리더',
        pic:
          'https://w.namu.la/s/a7a417f5468d8308210225084873df17331a4eca823277b2547a4adc948841efbab4474fe714feca2e3659da95147ecba2ae511f0cef15298e60d8d8bc02c4807da190da2af4a495ba37a24dd6238fd8254721b15da8bc61cf329cdf1888a1799a1721a9a52235d5e0736ae0c7f6463a'
      },
      조유리: {
        name: '조유리',
        team: 'IZ*ONE',
        position: '메인보컬',
        role: '애교',
        pic:
          'https://ww.namu.la/s/7412b63daa9780c2b2f32184f43b4acdfbb3e9318750cbffcf70acfe720d1b4c07d8a85d5c023277ab1c8c45e61b5688a32b9ce956a07d7d8f0d5d00e29319bfc820857624b14a09f832d3dc59f5b66d4343bd55908c1027741710acc42dc26712af3ee94d2afab93b4610a86ee4e0b3'
      },
      태연: {
        name: '태연',
        team: '소녀시대',
        position: '메인보컬',
        role: '메인보컬',
        pic:
          'https://newsimg.hankookilbo.com/2019/04/04/201904040938077231_1.jpg'
      },
      승희: {
        name: '승희',
        team: '오마이걸',
        position: '메인보컬',
        role: '예능',
        pic:
          'https://w.namu.la/s/06d295e803cd27f833b402d551c02b12d7a73e6daaabfd27322b70e30aab7fededecee84944f50a465b0fa8c54615eeeaecb18038e85c51251ffdcd9c05ae834d861b5f7259b007fccd14e8fe54e931a3ee1b59c1a1c206804e665aa64185e74bf56b455680472fe6b987b8486dff8ae'
      },
      민니: {
        name: '민니',
        team: '여자아이들',
        position: '메인보컬',
        role: '걸크러쉬',
        pic:
          'https://ww.namu.la/s/8c298a259b2aaaee292356a501a72494eb85efc2afb85753409bef79e52339a14c3effc8a0d15cd71803ab6031dc402d87cc0bb7a375773d95f90a0545246ce3c6f50468a7d30ca728acf82eb63af90d5398ecc501990f461057a985ab375cf0a7cfad99649b013561a46af47e68a90e'
      },
      //메인래퍼
      제니: {
        name: '제니',
        team: '블랙핑크',
        position: '메인래퍼',
        role: '청순',
        pic:
          'https://upload.wikimedia.org/wikipedia/commons/d/d8/20190106_%28NEWSEN%29_%EB%B8%94%EB%9E%99%ED%95%91%ED%81%AC%28BLACKPINK%29%2C_%EC%88%98%EC%A4%8D%EC%9D%80_%EB%A7%8E%EC%9D%80_%EC%86%8C%EB%85%80%EC%A7%80%EB%A7%8C_%EB%8F%8B%EB%B3%B4%EC%9D%B4%EB%8A%94_%EC%95%84%EB%A6%84%EB%8B%A4%EC%9A%B4_%EB%AF%B8%EB%AA%A8_%28Golden_Disc_Awards_2019%29_%289%29.jpg'
      },
      미미: {
        name: '미미',
        team: '오마이걸',
        position: '메인래퍼',
        role: '섹시',
        pic:
          'https://ww.namu.la/s/ec1cf7990ff74172af23fb5a1be70bf711bb5583622d0cb5b55d164f534a3423d5c9ee0e0dc2458735b14d8d7b30613c1afb1e5a8bc9f99a172ac7a00871b3e45182d9487e254d0caca6da3be424093b43d0629048ba48893e474b30b71f000ac6a13d845e4be3c9cb49e7fd55b71c5f'
      },
      지민: {
        name: '지민',
        team: 'AOA',
        position: '메인래퍼',
        role: '리더',
        pic:
          'https://w.namu.la/s/ae6463a1b2f67c42a7cc950bbd64f6817c1b1673161c97e441321403eeed8dc84a37f85e8368d49265c4ec029eec4fd8512c6b6931d0b269d8ee8eb5327ebf069748324b24f7e25142283a9b17d7bb456072083d621756dc56efadcc3f01f85c'
      },
      최유정: {
        name: '최유정',
        team: '위키미키',
        position: '메인래퍼',
        role: '애교',
        pic:
          'https://ww.namu.la/s/3605f40bcc250b4597cf7ba4976ef0f0b055e219d4cd9904ee3db6a639addacf579af06db6b12a1cc58137ffdd5ece02d1fd1d3dea8b9aa7914f34da862f1bcea697ed4775b4fcc1ecbb2bf01a212aed3aadd4bf4d255d4c4dfbf6b9eca3a4c0f4f42b428a886ffd6b44718e2ccf4ac2'
      },
      채영: {
        name: '채영',
        team: 'TWICE',
        position: '메인래퍼',
        role: '비주얼',
        pic: 'https://t1.daumcdn.net/cfile/tistory/997329455CDD185923'
      },
      문별: {
        name: '문별',
        team: '마마무',
        position: '메인래퍼',
        role: '예능',
        pic:
          'https://ww.namu.la/s/a3df9171cb63e443358c5e917f3601535845c09800def822dfa5435997978ffe6235da6e6916706e7482553a619fca7cd7bad3446ef57b2cc46fa3b9d0717d862e07ff6a68c9512f904efd5eeace515aefffb207dd1166799ff404e67707960f'
      },
      소연: {
        name: '소연',
        team: '여자아이들',
        position: '메인래퍼',
        role: '걸크러쉬',
        pic:
          'https://ww.namu.la/s/258a8db1f76fbed1138e617d92086ed6f161daa6bd16251f73f46bb41c4c3e9971542107ed88b0001d4a1aff90715719b4706315ad92a36d2735745a94b36d58f010acd6f573f4e8e9cb1c2642e676c86e51454ef7edb9910b8ce3aef849aa59'
      },
      //메인댄서

      윤보미: {
        name: '윤보미',
        team: '에이핑크',
        position: '메인댄서',
        role: '청순',
        pic:
          'https://ww.namu.la/s/b4b9e89b3e91b5448e01498288e19b933e04365301036d7a4d7c57b7151eb03b0dd5622b16afa4af208a35a4f8b543ada3a3cbebcd837862a9565ed2ee0f3d93ba33369bb6d83d2c760482d82d43a0f23584e318a083a9696b7fc97d4db7dc471ee6c1263fe4a3088a8ba559670ff7ec'
      },
      현아: {
        name: '현아',
        team: '포미닛',
        position: '메인댄서',
        role: '섹시',
        pic: 'https://img.vogue.co.kr/vogue/2020/01/style_5e0d7e9bd1e22.jpg'
      },
      청하: {
        name: '청하',
        team: 'IOI',
        position: '메인댄서',
        role: '리더',
        pic:
          'https://i.pinimg.com/originals/f3/75/bd/f375bda6d747a083f12c389a3f847980.jpg'
      },
      유아: {
        name: '유아',
        team: '오마이걸',
        position: '메인댄서',
        role: '애교',
        pic:
          'https://ww.namu.la/s/75cdeefe4187fcf85e1c24c5478c2f79ec926b794bbe439a30eae02e5670811cd61df5333ea0378210e6bdfe42a116655ef203ab6b0d9bf521796719afa16894c9524275b16dd6fc6dc527fc949aab1cbca5062034da173dbbe1eccd53449d8959108a92c2f9bd22269841de82fd2ead'
      },
      정화: {
        name: '정화',
        team: 'EXID',
        position: '메인댄서',
        role: '비주얼',
        pic:
          'https://w.namu.la/s/877f7770ce7184bf94451583c404501ac9c420610d3a17b30d1253b681472e378e088a61db45d4f338219cae88c1c13e210139f2f7f027a0d38e329cf30fe272c8b3b6ae29d7549305910c9b57b29f72cadf2ba8c104f2b7632fbe84930c4cea81781e8adbe757f3bf205a3e8eaedfbd'
      },
      모모: {
        name: '모모',
        team: 'TWICE',
        position: '메인댄서',
        role: '예능',
        pic:
          'https://lh3.googleusercontent.com/proxy/qH15vwGlbOZlKsilpNdfod_xUFxDdMJrLTRG-JXJUyA1vctd-zyqPc0mxDYZGCsHhD6rygLPFIzswpQjlWY7DHHZLN4cbrF2Cg2Qg6D3aTw2r0fEk4UoUroclFja'
      },
      이채연: {
        name: '이채연',
        team: 'IZ*ONE',
        position: '메인댄서',
        role: '걸크러쉬',
        pic:
          'https://ww.namu.la/s/f0aa76e3e547d1e851e36756c9e5251cbf9d40384e2bb3d32c5e62dc17ef7f5b525cba9b4e0621ffb661f5c261e29e3823a6cd05d07b48dd41baa9a4644761c11a2d1d3b2d60d8f3d39af5e3db389b4210ec7939b2eaf59833d8f260c3853a96a34df513c0199c89c6326c0290027d98'
      },

      //roles: ['청순', '섹시', '리더', '애교', '비주얼', '예능', '걸크러쉬'],
      손나은: {
        name: '손나은',
        team: '에이핑크',
        position: '서브보컬',
        role: '청순',
        pic:
          'https://ww.namu.la/s/3970215264db6d04d38a30e2051846ef9d13ddeb9f8f34ad2efe4ebf7f34c6a3e75ab656734cdc476e0a27d11d6a57effdb345cd0e20fddab36b69bf936f3125ea094be77e2e5c1ff5248d0232b6962b3934982b4b972fae83820978b0a46084472c72ce7a9cec8a2ba7b95da42b592d'
      },
      설현: {
        name: '설현',
        team: 'AOA',
        position: '서브보컬',
        role: '청순',
        pic:
          'https://ww.namu.la/s/3514c3cfed81f8e279c7a0f43ef1ec29bb6bdf304662956d06dc254316422adc0244bf19a55abb45210297310e504a8b95bccf256cf289a8ed1e643a96fecffdd6902d22a2770e47c020f38a67dcb1a0cac9fa70c996523a42ba11c877c5847c720f58a24cf87153cb05c78aa4fb86b9'
      },

      전효성: {
        name: '전효성',
        team: '시크릿',
        position: '서브보컬',
        role: '섹시',
        pic:
          'https://lh3.googleusercontent.com/proxy/l1P9Y7gwFgk1RZnLDERcGsJ_iUoKujyEMHqano9Ibqq3S2v7b8g2CvJH1-44-21_B9JBM1vzD7H8UAED23Rmt52UI736_3O0eeSzSvniLTKGBJkZnZ_aF8hh'
      },
      조이: {
        name: '조이',
        team: '레드벨벳',
        position: '서브보컬',
        role: '섹시',
        pic:
          'data:image/jpeg;base64,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'
      },

      소원: {
        name: '소원',
        team: '여자친구',
        position: '서브보컬',
        role: '리더',
        pic:
          'https://ww.namu.la/s/7362020eceae14c2b59a91895f289e7d02af81757c358e2143d21a4d3b116b0589036b8df6b251066deb149444228e3f3892a7dd4886a3f3931cc1a4d4fec2a22e27345873cc40c7caa7948080e28143f357866b914a979a2afe48f00d23bc3236f29b70fb5addd88da6e99d92212011'
      },
      효정: {
        name: '효정',
        team: '오마이걸',
        position: '서브보컬',
        role: '리더',
        pic:
          'https://ww.namu.la/s/5b3a33967e6f22cf0ad2925d55846a436c6fe81ec860157e5804bba69e6bc14750f78bd1476d43bbab7ce0c9f2cdbf7918d55d8b40fec4b2ce9819bf84e83702d8d35d84712aa5666699eb3d46f66788dd4d88e0eb95cd325746249f27fca2b191fe614b92c76a4fc677b86e140ae7da'
      },

      혜리: {
        name: '혜리',
        team: '걸스데이',
        position: '서브보컬',
        role: '애교',
        pic:
          'https://w.namu.la/s/c340e2af24c02fc50a1d39e342efedc45909b71df6fb53cddcc1439ed6d2524b6b4e7ce872e3f1bec7f25b4364a68da0d493622cbe243dc498c0b62b9d3842a97131f79243e599a4416ea76bc3546dc4d7e6c2ac0008bf7754b94362bbd26fb32c14b7c1899e3d448c83bc7077b85889'
      },
      케이: {
        name: '케이',
        team: '러블리즈',
        position: '서브보컬',
        role: '애교',
        pic:
          'https://ww.namu.la/s/8dfc01b47d96b2d42fbabe6b4f48551404ab0086d15b1ea25e90a343bef9bceaeab2dd96919fcfb27131f5f877c692813ecfa6fdabfe5d10605f6462a9212483f0a0f795e1fa7100753d0b03c250b36ba470df8082df588e728adf871a01e480b05c4a542b6a8ee4aa31f2c7a162c54f'
      },
      아이린: {
        name: '아이린',
        team: '레드벨벳',
        position: '서브보컬',
        role: '비주얼',
        pic:
          'https://ww.namu.la/s/a86bf3ce80a4ef80b46e37dbbbc887d9cef2b74011089bf1ea63b2fb94053917be0dc3a22983f2cdbc011ab6b2ec19deaf16ac2878392480b111137f071a963c090516772ed5e87131d3c4c162d5091546742db4658886cdb0b59a068497711aa10532eb9b36809d1468679e1fdd61e3'
      },
      연우: {
        name: '연우',
        team: '모모랜드',
        position: '서브보컬',
        role: '비주얼',
        pic:
          'https://w.namu.la/s/e16dd4702b8fe24b230b35fa38b2b45f2a197dfed8452791670fc3806e4a19f768e0f477b680fa01a08be42104250542add009e019f09ed50511d42c82759924c638dfdf92f437d71548efaf34ed3c0acc38ebac97ea33e66ad470bc9bc1d075720fad5e9ebe216de78deab8d92a5319'
      },
      주이: {
        name: '주이',
        team: '모모랜드',
        position: '서브보컬',
        role: '예능',
        pic:
          'https://w.namu.la/s/f83409cc322a82c40577ff5913d1e37fd02776224c02e2689fcf47802716966a6c4a5622ecd18244b6735c60d1d5457b25e196affc96d4c9c68fa0f5dec68461586955087113f80e4fdaea5190095cead8426df5d65c8446e6a29ee580b9721d66056952d771079b3fc7aa1a6be15b78'
      },
      다현: {
        name: '다현',
        team: '트와이스',
        position: '서브보컬',
        role: '예능',
        pic:
          'https://spnimage.edaily.co.kr/images/Photo/files/NP/S/2019/09/PS19092000030.jpg'
      },

      정은지: {
        name: '정은지',
        team: '에이핑크',
        position: '메인보컬',
        role: '연기',
        pic:
          'https://ww.namu.la/s/c662d8d14a4006021385a5e8f02075b05df41872e7d3089f3d91095b1cf3fc49515a0b81c490c36c5449e332a36eab7f78ab9680313025aa5b835c1da6db27b519784d24da8169937c88f2312a77b8796cfc34ada0999a0d6f8092e9e5488ce4ec1a750e9c111a6786c86b2bd7baa2f2'
      }
    },
    // DataTable[position][dollar]

    myTeam: {
      메인보컬: '',
      메인래퍼: '',
      메인댄서: '',
      서브보컬: '',
      서브래퍼: '',
      서브댄서: ''
    },
    myTeamValues: {
      메인보컬: 0,
      메인래퍼: 0,
      메인댄서: 0,
      서브보컬: 0,
      서브래퍼: 0,
      서브댄서: 0
    },
    total: 0,
    loading: false,
    snackbar: false,
    snackbar_text: "Hello, I'm a snackbar",
    dialog: false
  }),
  computed: {
    DataTable() {
      return [
        [
          this.idols['태연'],
          this.idols['김세정'],
          this.idols['지효'],
          this.idols['조유리'],
          this.idols['승희'],
          this.idols['연정']
        ],
        [
          this.idols['제니'],
          this.idols['문별'],
          this.idols['지민'],
          this.idols['미미'],
          this.idols['최유정'],
          this.idols['채영']
        ],
        [
          this.idols['유아'],
          this.idols['정화'],
          this.idols['청하'],
          this.idols['윤보미'],
          this.idols['모모'],
          this.idols['현아']
        ],
        [
          this.idols['아이린'],
          this.idols['손나은'],
          this.idols['전효성'],
          this.idols['혜리'],
          this.idols['소원'],
          this.idols['주이']
        ],
        [
          this.idols['설현'],
          this.idols['조이'],
          this.idols['효정'],
          this.idols['연우'],
          this.idols['케이'],
          this.idols['다현']
        ]
      ]
    }
  },
  methods: {
    makeImgPathByName(name) {
      return `${name}.png`
    },
    Choose(idol, pos, dollar) {
      this.myTeam[pos] = idol
      this.myTeamValues[pos] = dollar
      console.log(idol, pos)
      console.log(this.myTeam[pos] === idol)
    },
    isdark(idol, pos) {
      return this.myTeam[pos] === idol
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
