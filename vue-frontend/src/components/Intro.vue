<template>
  <div id="intro" class="container">
    <img class="logo" src="../assets/lemonade.svg">
    <h1>Welcome to Lemonade Stonks</h1>
    <p>
      The stock is <b>not</b> just a ticker symbol. It represents a part of a <b>business! <i class="fas fa-industry"/></b>
    </p>
    <p>
      In the <b>long term</b> the price of the stock <b><i class="fas fa-chart-line"></i> reflects the quality</b> of the business!
    </p>
    <p>
      Lemonade stonks helps you choose the <b>right stock</b> to invest to.
    </p>


    <div class="arrowAnim">
      <p>more</p>
      <a href="#continue"><i class="fas fa-caret-down fa-10x" style="marginTop: -4.5rem"/></a>
    </div>
  </div>
  <div id="continue" class="container">
    <img class="logo" src="../assets/lemon.svg">
    <h1>Company as a lemonade stand?</h1>
    <p>
      Companies produce and sell it's own products <i class="fas fa-laptop"/> <i class="fas fa-car"/> <i class="fas fa-hamburger"/>
    </p>
    <p>
      But on the most fundamental level all the companies work the same.
    </p>
    <p>
      We can imagine any company as a <b>lemonade stand</b> which makes lemonade <i class="fas fa-wine-bottle"/> from lemons <i class="fas fa-lemon"/>
    </p>
      <div class="arrowAnim">
      <p>let's make some lemonade</p>
      <a href="#lemonadestand"><i class="fas fa-caret-down fa-10x" style="marginTop: -4.5rem"/></a>
    </div>
  </div>
  <div id="lemonadestand" class="container">
    <form @submit.prevent="submitStonk">
        <input v-model="stonk" name="stonk" placeholder="Enter your favourite stonk!"/>
    </form>
    <h3>If you buy $100 of shares you will own 0.0083% of Tesla. Tesla's profit is $3 annualy for every $100 invested!</h3>
    <img class="process" src="../assets/process.svg">
    <h3>If Tesla was a lemonade stand it would buy lemons for $17</h3>
  </div>
</template>

<script>
import {ref} from 'vue'; 

export default {
  setup(){
    const stonk = ref(''); 
    function submitStonk(){
        console.log(stonk.value);
        stonk.value = "";
    }
    return {
      stonk,
      submitStonk
    }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.process{
  margin: 5vh 0;
  width:100%;
}
.container{
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.logo{
  max-width:300px;
  animation: shake 8.2s cubic-bezier(.36,.07,.19,.97) 0s infinite both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}
input{
  font-weight: bold;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  background: #f2f2f2;
  padding: 12px; 
  border-radius: 3px;
  width: 200px;
  outline: none;
}

a {
  color: inherit;
  text-decoration: inherit;
}

input:focus::placeholder{
  color:transparent;
}

input::placeholder{
  color: #222;
  transition: color 0.3s ease;
}

.arrowAnim {
  margin-top: 3rem;
  animation: action 1s infinite alternate;
}

@keyframes shake {
  1%, 9% {
    transform: translate3d(-1px, 0, 0);
  }
  
  2%, 8% {
    transform: translate3d(2px, 0, 0);
  }

  3%, 5%, 7% {
    transform: translate3d(-4px, 0, 0);
  }

  4%, 6% {
    transform: translate3d(4px, 0, 0);
  }
}

@keyframes action {
    0% { transform: translateY(0); }
    100% { transform: translateY(-10px); }
}

</style>
