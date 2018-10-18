<template>
  <div>
      <h2>Transaction completed successfully</h2>
      <table>
        <tr>
          <td>Withdraw Amount : </td>
          <td>{{amount}} </td>
        </tr>
        <tr>
          <td>Available Balance : </td>
          <td>{{balance}}</td>
        </tr>
      </table>
  </div>
</template>

<script>
export default {
  props: {
    transaction: Object
  },
  data () {
    return {
      amount: '',
      balance: ''
    }
  },
  mounted() {
    this.amount = this.transaction.amount
    this.balance = this.transaction.balance
    setTimeout(()=>{
      this.$router.push('/')
    }, 5000);
  }
}
</script>
