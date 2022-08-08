<template>
  <div class="topnav">
    <div class="left_nav">
      <div class="main_title">三十六小時天氣預報</div>
    </div>

    <div class="right_nav">
      <div>{{ nav_date }}</div>
      <div>{{ nav_week }}</div>
      <div style="color: #FFFFFF">{{ nav_time }}</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  export default {
    name: "header.vue",
    data() {
      return {
        week_arr: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        nav_date: '',
        nav_week: '',
        nav_time: '',
        show_home: false,
      }
    },
    methods: {
      getNowDateTime() {
        const now = new Date()
        this.nav_date = (now.getMonth() + 1) + '月' + now.getDate() + '日'
        this.nav_week = this.week_arr[now.getDay()]
        this.nav_time = ((now.getHours() < 12) ? '上午' : '下午') + now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes()
      }
    },
    mounted() {
      setInterval(this.getNowDateTime, 500)
    },
    created() {
      this.getNowDateTime()

    }
  }
</script>

<style scoped>
  @media (min-width: 415px) {
    .topnav {
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      background-color: #536DFE;
      height: 50px;
    }

    .main_title {
      background-color: #536DFE;
      color: white;
      font-size: 25px;
    }

    .left_nav {
      display: flex;
      align-items: center;
      padding-left: 20px;
    }

    .right_nav {
      display: flex;
      align-items: center;
    }
 }
  @media (max-width: 415px) {
    .topnav {
        justify-content: space-between;
        overflow: hidden;
        background-color: #536DFE;
        height: 65px;
      }

      .main_title {
        background-color: #536DFE;
        color: white;
        font-size: 25px;
      }

      .left_nav {
        display: flex;
      }

      .right_nav {
        display: flex;
      }
 }

  /* .topnav {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    background-color: #536DFE;
    height: 50px;
  }

  .main_title {
    background-color: #536DFE;
    color: white;
    font-size: 25px;
  }

  .left_nav {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .right_nav {
    display: flex;
    align-items: center;
  } */

</style>
