<template>
  <div id="cardDetail" class="hide">
        <div>
          <label for="cardNum">Card Number</label>
          <input type="text" name="cardNum" value="" v-model="cardNum">
        </div>
        <div>
          <label for="pin">PIN</label>
          <input type="password" name="pin" value="" v-model="pin">
        </div>
        <div class="error"></div>
        <div class="">
          <button type="button" v-on:click="verifyCardCredential" name="next">Next</button>
        </div>
      </div>
</template>

<script>
export default {
  data () {
    return {
      cardNum: '',
      pin: ''
    }
  },
  methods: {
    verifyCardCredential: function() {
      let cardData = {
        card_number : this.cardNum,
        pin : this.pin
      }
      if (this.cardNum !== '' && this.pin !== '') {
        axios({
          method: 'POST',
          url: 'http://localhost:5000/cardVerification',
          data: cardData
        })
        .then((result) => {
          this.$router.push({
            name: 'amount',
            params: {
              cardDetail: cardData
            }
          })
        })
        .catch(function(err) {
          console.log('err',err)
          $('#cardDetail .error').text(err.response.data.error)
        })
      }
      else {
        $('#cardDetail .error').text('Please enter card number and pin both')
      }

    }
  }
}
</script>
