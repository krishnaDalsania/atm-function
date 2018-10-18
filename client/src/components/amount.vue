<template>
  <div id="amount">
    <div>
      <label for="amount">Amount</label>
      <input type="text" name="amount" value="" v-model="amount">
    </div>
    <div class="error"></div>
    <div class="">
      <button type="button" v-on:click="withdraw" name="withdraw">Withdraw</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardDetail : Object
  },
  data () {
    return {
      amount: 0
    }
  },
  methods: {
    withdraw: function() {
      console.log('this.cardData',this.cardDetail)
      if (this.cardDetail != undefined) {
        if (this.amount !== '' && this.amount > 0) {
          if (this.amount % 100 == 0) {
            let withDrawData = {
              card_number: this.cardDetail.card_number,
              amount: this.amount
            }
            console.log('withDrawData',withDrawData)
            axios({
              method: 'POST',
              url: 'http://localhost:5000/amountWithdraw',
              data: withDrawData
            })
            .then((result) => {
              console.log('result',result)
              this.$router.push({
                name: 'available-balance',
                params: {
                  transaction : {
                    amount : this.amount,
                    balance: result.data.balance
                  }
                }
              })
            })
            .catch(function(err) {
              console.log('err',err.response.data.error)
              $('#amount .error').text(err.response.data.error)
            })
          } else {
            $('#amount .error').text('Amount must be multiple of 100')
          }
          // if (this.cardData.amount > this.amount) {
          //   let withdrawAmount = this.cardData.amount - this.amount;
          //   let withDrawData = this.cardData;
          //   withDrawData.amount = withdrawAmount;
          //
          //   axios({
          //     method: 'POST',
          //     url: 'http://localhost:5000/amountWithdraw',
          //     data: withDrawData
          //   })
          //   .then(function(result) {
          //     console.log('result',result)
          //     $('#amount').addClass('hide')
          //     $('#showBalance').removeClass('hide')
          //   })
          //   .catch(function(err) {
          //     // console.log('err',err.response)
          //     $('#cardDetail .error').text(err.response.data.error)
          //   })
          // }
          // else {
          //   $('#amount .error').text('There is insufficient amount in account')
          // }
        }
        else {
          $('#amount .error').text('Please enter valid amount')
        }
      } else {
        $('#amount .error').text('Your session is expired!! You will redirected shortly')
        setTimeout(()=>{
          this.$router.push('/')
        },5000)
      }
    }
  }
}
</script>
