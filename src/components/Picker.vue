<template>
    <div>
        <p>
            <label class="picklist-label" for="weatherLocation">Forecast for</label><br/>
                <select class="selectBox" id="weatherLocation"  name="weatherLocation" :style="{ width: weatherLocation.length+3 + 'ch' }" v-model="weatherLocation" v-on:change="this.checkForecast(this.weatherLocation), this.clearPicks(), button_text='Choose'">
                    <option value="Richmond, CA">Richmond, CA</option>
                    <option value="Hong Kong, HK">Hong Kong, HK</option>
                    <option value="Toronto, CA">Toronto, CA</option>
                </select>
            <br/><br/><span class="forecast" v-show="forecastTemp && forecastWeather">{{ forecastTemp }}°C | {{ forecastWeather }}</span>
        </p><br/>
        <button @click="chooseClothes(weatherLocation), button_text='Choose again!'">
            {{ button_text }}
        </button>
        <p>
            <span v-if="chosenTop">Top: {{ chosenTop }} <br /><br /></span>
            <span v-if="chosenBottom">Bottom: {{ chosenBottom }}</span>
        </p>
        <br/>
        <p v-if="!this.$store.state.user.data">
            <em>**Using demo clothing. Go to the <router-link to="/closet">Closet</router-link> to add your own clothes.</em>
        </p>
    </div>
</template>

<script>
import { SHOW_WEATHER_CLOTHES } from "../constants/gql.js"
import { getAuth, onAuthStateChanged } from '@firebase/auth'

export default {
  name: "Picker",
  data() {      
      return {
        weatherApproClothes: [],
        tops: [],
        bottoms: [],
        button_text: "Choose",
        chosenTop: '',
        chosenBottom: '',
        forecastTemp: '',
        forecastWeather: '',
        weatherLastChecked: '',        
        weatherLastLocation: '',
        approWeight: '',
        weatherLocation: 'Richmond, CA',
        uid: '',
      }
  },
  created: function () {
       this.setUid();
  },

  beforeMount: function () {
       this.checkForecast(this.weatherLocation);
  },

  updated: function () {
    //    this.setUid();
       this.updateClothes();
  },

  methods: {
      setUid:
        function() {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.uid = this.$store.state.user.data.uid;
            }
            else {
                this.uid = "demo"
            }
            // console.log(this.uid)
        })
      },

    updateClothes:
        function() {
            // this.weatherApproClothes = []
            this.$apollo.queries.weatherApproClothes.refetch();
            // console.log("Clothes updated")
        },

    chooseClothes:
        function() {
            this.checkForecast(this.weatherLocation)
            this.setWeight(this.forecastTemp);
            this.sortClothing();
            this.topPicker();
            this.bottomPicker();
        },

    checkForecast:    
        function(cityName) {
            var twoHoursAgo = new Date()
            twoHoursAgo.setHours(twoHoursAgo.getHours() - 2)
            

            async function getWeatherData() {
                const response = await fetch(url);
                return await response.json();                
            }

            if ( this.weatherLastLocation != this.weatherLocation || this.weatherLastChecked < twoHoursAgo || !this.forecastTemp || !this.forecastWeather ) {
                var key = process.env.VUE_APP_OWM_TOKEN;
                var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key

                getWeatherData()
                .then( (data) => {          
                    this.forecastTemp = Math.round(parseFloat(data.main.temp)-273.15);
                    this.forecastWeather = data.weather[0].description;
                    this.weatherLastChecked = Date.now();
                    this.weatherLastLocation = cityName;
                    this.setWeight(this.forecastTemp);
                    console.log("Got weather")
                })

                .catch(function() {
                        alert("Error updating weather data. Please try again.")
                    });            
            }
            else {
                // console.log(`Weather last checked less than two hours ago at ${Date(this.weatherLastChecked).toString()}. Using old results.`)
            }

        },
    setWeight:
        function(forecastTemp) {
            if ( forecastTemp > 20 ) {
                this.approWeight = "Light";
            }
            else if  ( forecastTemp <=  20 && forecastTemp > 15 )  {
                this.approWeight = "Medium";
            }
            else {
                this.approWeight = "Heavy";
            }
        },
    sortClothing: 
        function() {
            let tops = []
            let bottoms = []
            let clothes = this.weatherApproClothes

            for ( let i = 0; i < clothes.length; i++ ) {
                if (clothes[i].type == "Top") { 
                    tops.push(`${clothes[i].weight} ${clothes[i].colour} ${clothes[i].article}`)
                }
                else if (clothes[i].type == "Bottom") { 
                    bottoms.push(`${clothes[i].weight} ${clothes[i].colour} ${clothes[i].article}`)
                }
            }

            this.tops = tops;
            this.bottoms = bottoms;
        },
    topPicker:
        function() {
            var chosenNum = Math.floor(Math.random() * this.tops.length)
            var chosenTop = this.tops[chosenNum]
            this.chosenTop = chosenTop
        },
    bottomPicker:
        function() {
            var chosenNum = Math.floor(Math.random() * this.bottoms.length)
            var chosenBottom = this.bottoms[chosenNum]
            this.chosenBottom = chosenBottom
        },
    clearPicks:
        function() {
            this.chosenTop = ''
            this.chosenBottom = ''
        }
    },
    apollo: {
        weatherApproClothes: { 
            query: SHOW_WEATHER_CLOTHES,
            variables() {
                return {
                    approWeight: this.approWeight,
                    userid: this.uid,
                }
            }
        }
    },
};

</script>

<style scoped>
.selectBox {
    border: 0px dashed #000000;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    margin: 5px 2px;
    /* -webkit-appearance: none; */
    /* -moz-appearance: none; */
    /* padding: 2px 5px; */
    text-align: center;
    /* width: 150px; */
}

.forecast {
    font-size: 1.25rem;
    font-weight: bold;
}

.picklist-label {
    font-size: 0.75rem;
}

</style>