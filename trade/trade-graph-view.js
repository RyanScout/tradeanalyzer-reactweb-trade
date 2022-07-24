import "chart.js/auto";
import React from "react";
import { Chart, Line } from "react-chartjs-2";
export default function TradeGraphView({ itemState, onOption }) {
  let tradeHistory = [];
  let symbolHistory =[]
  let colors = [];
  let borderColor =""

  function compare(a, b) {
    if (a.x > b.x) return 1;
    if (a.x < b.x) return -1;
    return 0;
  }

  if (itemState != null) {
    if(itemState.symbols != null){
      itemState.symbols.forEach(symbol=>{
        if(symbol[0] != null && symbol[1] != null){
          symbolHistory.push({x: symbol[0] , y :symbol[1]})
        }
      })
    }
    if (itemState.item != null) {
        if(itemState.item.totalValue > itemState.item.budget){
            borderColor = "rgb(170, 250, 167)"
        }
        else{
            borderColor = "rgb(250, 150, 157)"
        }
      if (itemState.item.tradeDetails != null) {
        itemState.item.tradeDetails.forEach((detail) => {
          if (detail.assetPrice != null && detail.filledAt != null) {
            if (detail.orderSide == "BUY") {
              colors.push("rgb(34, 179, 29)");
            }
            if (detail.orderSide == "SELL") {
              colors.push("rgb(237, 14, 22)");
            }
            tradeHistory.push({ x: detail.filledAt , y: detail.assetPrice })
          }
        });
      }
    }
  }
  
  return (
    <div>
      <button onClick={() => onOption("CANCEL")}>Back</button>
      <Line
        data={{
          datasets: [
            {
              label: "Symbol History",
              type:"line",
              data: symbolHistory.sort(compare),
              xAxisID: "Time",
              yAxisID: "Price",
              borderColor : borderColor,
              spanGaps: true
            },
            {
              label: "Trade History",
              type:"scatter",
              data: tradeHistory,
              xAxisID: "Time",
              yAxisID: "Price",
              pointBackgroundColor: colors
            }
          ],
        }}

        options={{

          animation: false,
          parsing:false,

          datasets: {
            scatter:{
              pointRadius:5,
            },
            line: {
              pointRadius: 0,
            },
          },

          scales: {
            Time: {
              axis: "x",
              type: "linear",
              display: "auto",
              title: {
                display: true,
                text: "Time",
              },
            },

            Price: {
              axis: "y",
              type: "linear",
              display: "auto",
              title: {
                display: true,
                text: "Price",
              },
            },

          },
        }}
      />
    </div>
  );
}
