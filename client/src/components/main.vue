<template>
  <div>
      <button type="button" v-on:click="moneyWithdraw" name="withdraw">Withdraw</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    moneyWithdraw: function() {
      this.$router.push({
        name: 'card-detail'
      })
    },
  }
}
</script>
