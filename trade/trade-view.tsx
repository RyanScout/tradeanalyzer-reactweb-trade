/**
 *
 */
import React from "react";

export default function TradeView({ itemState, appPrefs, onOption }) {
  let automatedTradeTableRows1: any[] = [];
  // fill latest tradestable
  if (
    itemState !== null &&
    itemState.items !== undefined &&
    itemState.items.length > 0
  ) {
    type Trade = {
      name: string;
      rawBuyCondition: string;
      rawSellCondition: string;
      budget: number;
      equity: number;
      tradeDetails: any[];
      status: "Running" | "Not Running";
    };

    for (let i = 0; i < itemState.items.length; i++) {
      const trade: Trade = itemState.items[i];

      let cells: any[] = [];
      cells.push(<td key="NAME">{trade.name}</td>);
      cells.push(<td key="BUYCONDITION">{trade.rawBuyCondition}</td>);
      cells.push(<td key="SELLCONDITION">{trade.rawSellCondition}</td>);
      cells.push(
        <td key="PROFIT">
          {Math.round(((trade.equity - trade.budget) / trade.budget) * 1000) /
            10}
          %
        </td>
      );
      cells.push(
        <td key="CONTROL">
          {(() => {
            if (trade.tradeDetails == null || trade.tradeDetails.length == 0) {
              return 0;
            }
            function compare(a, b) {
              if (a.placedAt > b.placedAt) return 1;
              if (a.placedAt < b.placedAt) return -1;
              return 0;
            }
            let arr = itemState.items[i].tradeDetails.slice().sort(compare);
            for (let i = arr.length - 1; i >= 0; i--) {
              if (arr[i].assetPrice == null) {
                arr.splice(i, 1);
              }
            }
            return (
              Math.round(
                ((arr[arr.length - 1].assetPrice - arr[0].assetPrice) /
                  arr[0].assetPrice) *
                  1000
              ) / 10
            );
          })()}
          %
        </td>
      );
      cells.push(<td key="STATUS">{trade.status}</td>);
      cells.push(
        <td key="MODIFY">
          <i
            className="fa fa-edit fa-1"
            title="Modify"
            onClick={() => onOption("MODIFY", trade)}
          ></i>{" "}
          <i
            className="fa fa-clipboard fa-1"
            title="Historical_Analysis"
            onClick={() => onOption("HISTORICAL_ANALYSIS_VIEW", trade)}
          ></i>{" "}
          <i
            className="fa fa-solid fa-bars"
            title="Modify"
            onClick={() => onOption("TRADE_DETAIL_VIEW", trade)}
          ></i>{" "}
          <i
            className="fa fas fa-chart-bar"
            title="Graph"
            onClick={() => onOption("TRADE_GRAPH_VIEW", trade)}
          ></i>{" "}
          <i
            className="fa fa-trash fa-1"
            title="Delete"
            onClick={() => onOption("DELETE", trade)}
          ></i>
        </td>
      );
      automatedTradeTableRows1.push(<tr key={i}>{cells}</tr>);
    }
  } else {
    automatedTradeTableRows1.push(
      <tr key="1">
        <td id="EMPTY">Empty</td>
      </tr>
    );
  }

  let automatedTradeTableBody1 = <tbody>{automatedTradeTableRows1}</tbody>;

  return (
    <div className="container">
      <div className="row">
        <p className="text-center fs-3 fw-bold"> Automated Trades </p>
      </div>
      <div className="row">
        <div className="col-sm-9" />
        <div className="col-sm-3">
          <i
            className="fa fa-plus-square fa-1 float-end"
            title="Modify"
            onClick={() => onOption("MODIFY")}
          ></i>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Buy Condition</th>
              <th scope="col">Sell Condition</th>
              <th scope="col">Profit</th>
              <th scope="col">Control</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {automatedTradeTableBody1}
        </table>
      </div>
    </div>
  );
}
