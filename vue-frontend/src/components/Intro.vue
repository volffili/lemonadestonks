<template>
  <div style="height: 100%">
    <div id="intro" class="container">
      <img class="logo" src="../assets/lemonade.svg" />
      <h1>Welcome to Lemonade Stonks</h1>
      <p>
        The stock is <b>not</b> just a ticker symbol. It represents a part of a
        <b>business! <i class="fas fa-industry" /></b>
      </p>
      <p>
        In the <b>long term</b> the price of the stock
        <b><i class="fas fa-chart-line"></i> reflects the quality</b> of the
        business!
      </p>
      <p>
        Lemonade stonks helps you choose the <b>right stock</b> to invest to.
      </p>

      <div class="arrowAnim">
        <p>more</p>
        <a href="#continue"
          ><i class="fas fa-caret-down fa-10x" style="margintop: -4.5rem"
        /></a>
      </div>
    </div>
    <div id="continue" class="container">
      <img class="logo" src="../assets/lemon.svg" />
      <h1>Company as a lemonade stand?</h1>
      <p>
        Companies produce and sell it's own products
        <i class="fas fa-laptop" /> <i class="fas fa-car" />
        <i class="fas fa-hamburger" />
      </p>
      <p>But on the most fundamental level all the companies work the same.</p>
      <p>
        We can imagine any company as a <b>lemonade stand</b> which makes
        lemonade <i class="fas fa-wine-bottle" /> from lemons
        <i class="fas fa-lemon" />
      </p>
      <div class="arrowAnim">
        <p>let's make some lemonade</p>
        <a href="#lemonadestand"
          ><i class="fas fa-caret-down fa-10x" style="margintop: -4.5rem"
        /></a>
      </div>
    </div>
    <div id="lemonadestand" class="container">
      <form @submit.prevent="submitStonk">
        <input
          v-model="stonk"
          name="stonk"
          placeholder="Enter your favourite stonk!"
        />
      </form>

      <p>You will get {{Math.round((1000/price) * 100) / 100}} shares of {{companyName}} for 1000$, which means <b>you will own {{(100000/marketCap).toFixed(10)}}%</b> 
      of the company. You can imagine <b>your</b> tiny part of {{companyName}} as a lemonade stand, which <b>{{eps > 0 ? 'earned' : 'lost'}} ${{(Math.abs(eps)*1000/price).toFixed(1)}}</b> in {{yearOfIncomStatement}} </p>
      <LemonadeCompany id="lemonadeCompany" />
      <div class="hintDiv">
        <div class="hint"><h3 id="lemon">Buying lemons</h3></div>
        <div class="hint">
          <h3 id="mixer">Making lemonade, paying wages</h3>
        </div>
        <div class="hint"><h3 id="lemonade">Selling lemonade, profit</h3></div>
        <div class="hint"><h3 id="netincome">Net income</h3></div>
      </div>
      <div class="chartDiv">
        <canvas id="myChart"></canvas>
      </div>
      <p>The graph shows the monthly price of {{companyName}} from {{startYear}} until now. The market is a voting machine in the short term, but weighing machine in the long term</p>
    </div>
  </div>
</template>

<script>
import { ref,onMounted } from "vue";
import LemonadeCompany from "./LemonadeCompany.vue";
import Chart from "chart.js";
import Service from "../services/stockDataService";

export default {
  components: {
    LemonadeCompany,
  },
  setup() {
    const stonk = ref("TSLA");
    const startYear = ref(2010);
    const companyName = ref("yet unknown company");
    const price = ref(1);
    const marketCap = ref(1);
    const netIncome = ref(0);
    const yearOfIncomStatement = ref(2020);
    const eps = ref(0);
    let chart;

    onMounted(()=>{
      chart = new Chart(document.getElementById("myChart"), {
        type: "line",
        data: {
          labels: new Array(131).fill(1),
          datasets: [{
              data: new Array(131).fill(0),
              fill: false,
              backgroundColor: "rgb(179, 229, 159)",
              borderColor: "rgb(120, 194, 164)",
              pointBorderColor: "rgba(0, 0, 0, 0)",
              pointBackgroundColor: "rgba(0, 0, 0, 0)",
              lineTension: 0,
            }],
        },
        options: {
          tooltips: {
              callbacks: {
                title: function() {}
              }
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                display: false,
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
              },
            ],
            yAxes: [
              {
                display: false,
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
              },
            ],
          },
        }
      });
      submitStonk();
    });

    async function extractIncomeStatement(){
    
      let incomeStatements = await Service.getIncomeStatement(stonk.value);
      let lastYear = incomeStatements[0];
      yearOfIncomStatement.value = lastYear.date.split('-')[0];
      eps.value = lastYear.eps;
    }

    async function submitStonk() {
      console.log(stonk.value)
      let _ = await Service.getMonthlyStockPrices(stonk.value);
      let [quote] = await Service.getCompanyQuote(stonk.value);
      price.value = quote.price;
      marketCap.value = quote.marketCap;
      companyName.value = quote.name;
      extractIncomeStatement();
      chart.data.labels = _.prices.map((_,idx)=>idx);
      chart.data.datasets[0].data = _.prices;
      chart.update();
      startYear.value = _.startYear;
      stonk.value = "";
    }
        
    return {
      stonk,
      submitStonk,
      startYear,
      companyName,
      price,
      marketCap,
      netIncome,
      yearOfIncomStatement,
      eps
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chartDiv{
  margin-top: 80px;
  width: 800px;
}
.hintDiv {
  display: flex;
  justify-content: center;
  width: 100%;
}
.hint {
  position: absolute;
}
#lemon {
  animation: fadeIn 20.5s ease-in-out 0s infinite both;
}
#mixer {
  animation: fadeIn 20.5s ease-in-out 5s infinite both;
}
#lemonade {
  animation: fadeIn 20.5s ease-in-out 10s infinite both;
}
#netincome {
  animation: fadeIn 20.5s ease-in-out 15s infinite both;
}
#lemonadeCompany {
  margin: 3vh 0;
  width: 100%;
}
.process {
  margin: 5vh 0;
  width: 100%;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.logo {
  max-width: 200px;
  animation: shake 8.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) 0s infinite both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}
input {
  font-weight: bold;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  background: #f2f2f2;
  padding: 12px;
  border-radius: 3px;
  margin-bottom: 30px;
  width: 200px;
  outline: none;
}

a {
  color: inherit;
  text-decoration: inherit;
}

input:focus::placeholder {
  color: transparent;
}

input::placeholder {
  color: #222;
  transition: color 0.3s ease;
}

.arrowAnim {
  margin-top: 3rem;
  animation: action 1s infinite alternate;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  20% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@keyframes shake {
  1%,
  9% {
    transform: translate3d(-1px, 0, 0);
  }

  2%,
  8% {
    transform: translate3d(2px, 0, 0);
  }

  3%,
  5%,
  7% {
    transform: translate3d(-4px, 0, 0);
  }

  4%,
  6% {
    transform: translate3d(4px, 0, 0);
  }
}

@keyframes action {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>
