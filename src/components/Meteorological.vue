<template>
  <div class="Meteorological">
    <div v-if="loading">資料載入中請稍等...</div>
    <div v-else>
      <select style="text-align: center;" class="form-select form-select-lg mb-3" v-model="selectName" v-on:change="getNameData">
        <option v-for="itemNameList in nameList" :value="itemNameList" :key="itemNameList">{{itemNameList}}</option>
      </select>
      <div v-if="Object.values(dataList).length > 0">
        <div style="font-size: 50px;background-color: #536DFE;color: white;">{{dataList.locationName}} 天氣</div>
        <div class="wrap" v-for="(itemWeatherElement,indexWeatherElement) in dataList.weatherElement" :value="itemWeatherElement" :key="indexWeatherElement">
          <div>時間區間：{{itemWeatherElement.startTime}} ~ {{itemWeatherElement.endTime}}</div>
          <div v-for="(itemChild,indexChild) in itemWeatherElement" :value="itemChild" :key="indexChild">
            <span v-if="itemChild.elementName == 'Wx'">
                <!-- {{itemChild.elementName}} -->
                {{itemChild.parameter.parameterName}}
            </span>
            <span v-else-if="itemChild.elementName == 'PoP'">
                降雨機率：
                <!-- {{itemChild.elementName}} -->
                {{itemChild.parameter.parameterName}}
            </span>
            <span v-else-if="itemChild.elementName == 'MinT'">
                最低溫：
                <!-- {{itemChild.elementName}} -->
                {{itemChild.parameter.parameterName}}
            </span>
            <span v-else-if="itemChild.elementName == 'MaxT'">
                最高溫：
                <!-- {{itemChild.elementName}} -->
                {{itemChild.parameter.parameterName}}
            </span>
            {{itemChild.parameter.parameterUnit}}
          </div>
        </div>
      </div>
      <div v-else>
        <div style="font-size: 50px;color: red;">請從上方選擇縣市</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Meteorological',
  data () {
    return {
      loading: true,
      weather_data: [],
      weatherFliterData: [],
      nameList: [],
      selectName: '',
      dataList: []
    }
  },
  mounted () {
    let url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-4942B096-85EE-467F-A16C-8C1BE01A5773'
    this.$axios.get(url).then((rt) => {
      console.log(rt)
      if (rt.status === 200) {
        this.loading = false
        this.weather_data = rt.data.records.location
        // console.log(this.weather_data)
        this.weather_data.forEach((item, index, array) => {
          // console.log(item.locationName)
          this.nameList.push(item.locationName)
        })
      }
    }).catch(error => console.log(error))
  },
  methods: {
    getNameData () {
      if (this.selectName) {
        this.dataList = []
        // this.dataList = this.weather_data.filter((value, index, arrSelf) => value.locationName === this.selectName)
        let oldSelectList = this.weather_data.filter((value, index, arrSelf) => value.locationName === this.selectName)
        console.log('oldSelectList = ', oldSelectList)
        // 深層拷貝
        let selectList = Object.assign([], oldSelectList)
        console.log('selectList = ', selectList)
        selectList.forEach((item, index, array) => {
          console.log(item.locationName)
          this.dataList['locationName'] = item.locationName
          this.dataList['weatherElement'] = []
          // this.dataList.push(item.locationName)
          item.weatherElement.forEach((itemWeatherElement, indexWeatherElement, arrayWeatherElement) => {
            // console.log(itemWeatherElement.time)
            // if (!this.dataList['weatherElement'][indexWeatherElement]) {
            //   this.dataList['weatherElement'][indexWeatherElement] = []
            // }
            // this.dataList['weatherElement'][indexWeatherElement]['startTime'] = []
            // this.dataList['weatherElement'][indexWeatherElement]['endTime'] = []
            itemWeatherElement.time.forEach((itemTime, indexTime, arrayTime) => {
              // console.log('index = ' + index)
              if (!this.dataList['weatherElement'][indexTime]) {
                this.dataList['weatherElement'][indexTime] = []
              }
              if (!this.dataList['weatherElement'][indexTime][indexWeatherElement]) {
                this.dataList['weatherElement'][indexTime][indexWeatherElement] = []
              }
              if (!this.dataList['weatherElement'][indexTime]['startTime']) {
                this.dataList['weatherElement'][indexTime]['startTime'] = ''
              }
              if (!this.dataList['weatherElement'][indexTime]['endTime']) {
                this.dataList['weatherElement'][indexTime]['endTime'] = ''
              }
              // if (index === indexTime) {
              itemTime['elementName'] = itemWeatherElement['elementName']
              this.dataList['weatherElement'][indexTime][indexWeatherElement] = itemTime
              this.dataList['weatherElement'][indexTime]['startTime'] = itemTime['startTime']
              this.dataList['weatherElement'][indexTime]['endTime'] = itemTime['endTime']
              // console.log('第' + indexWeatherElement + '筆 = ' + JSON.stringify(itemTime))
              // console.log('第' + indexWeatherElement + '筆 = ' + itemTime['startTime'])
              // }
              // console.log('第' + indexTime + '筆 = ')
              // console.log(itemTime)
              // if (index === indexTime) {
              //   console.log('第' + indexWeatherElement + '筆 = ' + JSON.stringify(itemTime))
              // }
            })
          })
        })
        console.log(this.dataList)
        console.log(Object.keys(this.dataList))
        console.log(Object.values(this.dataList).length)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media (min-width: 415px) {
    .wrap{
      border:  5px solid #666;
      width: 446px;
      height: 180px;
      border-radius: 50px;
      margin: auto;
      display: inline-block;
      padding: 20px;
      margin: 10px;
    }
    .Meteorological{
      margin-top: 10px;
    }
 }

 @media (max-width: 415px) {
    .wrap{
      border:  5px solid #666;
      width: 280px;
      height: 180px;
      border-radius: 50px;
      margin: auto;
      display: inline-block;
      padding: 20px;
      margin: 10px;
    }
    .Meteorological{
      margin-top: 10px;
    }
 }
</style>
