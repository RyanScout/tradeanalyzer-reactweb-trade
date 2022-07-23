/**
 *
 */
import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function TradeView({ itemState, appPrefs, onOption }) {
  const nav = useNavigate();
  const x = window.location.pathname;

  let automatedTradeTableRows1 = [];
  // fill latest tradestable
  if (
    itemState != null &&
    itemState.items != null &&
    itemState.items.length > 0
  ) {
    for (let i = 0; i < itemState.items.length; i++) {
      let cells = [];
      cells.push(<td key="NAME">{itemState.items[i].name}</td>);
      cells.push(<td key="BUYCONDITION">{itemState.items[i].buyCondition}</td>);
      cells.push(
        <td key="SELLCONDITION">{itemState.items[i].sellCondition}</td>
      );
      cells.push(
        <td key="PROFIT">
          {Math.round(
            ((itemState.items[i].totalValue - itemState.items[i].budget) /
              itemState.items[i].budget) *
              1000
          ) / 10}
          %
        </td>
      );
      cells.push(
        <td key="CONTROL">
          {(() => {
            if (
              itemState.items[i].tradeDetails == null ||
              itemState.items[i].tradeDetails.length == 0
            ) {
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
      cells.push(<td key="STATUS">{itemState.items[i].status}</td>);
      cells.push(
        <td key="MODIFY">
          <i
            className="fa fa-edit fa-1"
            title="Modify"
            onClick={() => onOption("MODIFY", itemState.items[i])}
          ></i>{" "}
          <i
            className="fa fa-clipboard fa-1"
            title="Historical_Analysis"
            onClick={() =>
              onOption("HISTORICAL_ANALYSIS_VIEW", itemState.items[i])
            }
          ></i>{" "}
          <i
            className="fa fa-solid fa-bars"
            title="Modify"
            onClick={() => onOption("TRADE_DETAIL_VIEW", itemState.items[i])}
          ></i>{" "}
          <i
            className="fa fas fa-chart-bar"
            title="Graph"
            onClick={() => onOption("TRADE_GRAPH_VIEW", itemState.items[i])}
          ></i>{" "}
          <i
            className="fa fa-trash fa-1"
            title="Delete"
            onClick={() => onOption("DELETE", itemState.items[i])}
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
