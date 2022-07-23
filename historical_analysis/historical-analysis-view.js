/**
 *
 */
import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function HistoricalAnalysisView({ itemState, appPrefs, onOption }) {
  const nav = useNavigate();
  const x = window.location.pathname;

  let automatedTradeTableRows2 = [];
  // fill latest tradestable
  if (
    itemState != null &&
    itemState.items != null &&
    itemState.items.length > 0
  ) {
    for (let i = 0; i < itemState.items.length; i++) {
      let cells = [];
      cells.push(<td key="NAME">{itemState.items[i].name}</td>);
      cells.push(<td key="STOCK">{itemState.items[i].stock}</td>);
      cells.push(<td key="TYPE">{itemState.items[i].type}</td>);
      cells.push(<td key="STARTDATE">{itemState.items[i].stringedStartTime}</td>);
      cells.push(<td key="ENDDATE">{itemState.items[i].stringedEndTime}</td>);
      cells.push(<td key="AMOUNT">{itemState.items[i].amount}</td>);
      cells.push(<td key="ALGORITHUM">{itemState.items[i].algorithm}</td>);
      cells.push(
        <td key="PROFITLIMIT">{itemState.items[i].profitLimit}</td>
      );
      cells.push(
        <td key="TRAILINGSTOPPERCENT">
          {itemState.items[i].trailingStopPercent}
        </td>
      );
      cells.push(<td key="MONEYSPENT">{itemState.items[i].moneySpent}</td>);
      cells.push(<td key="TOTALVALUE">{itemState.items[i].totalValue}</td>);
      cells.push(
        <td key="DELETE">
           <i
            className="fa fa-microchip fa-1"
            title="Modify"
            onClick={() => onOption("HISTORICAL_DETAIL_VIEW", itemState.items[i])}
          ></i>{" "}
          <i
            className="fa fa-trash fa-1"
            title="Delete"
            onClick={() => onOption("DELETE", itemState.items[i])}
          ></i>
        </td>
      );
      automatedTradeTableRows2.push(<tr key={i}>{cells}</tr>);
    }
  } else {
    automatedTradeTableRows2.push(
      <tr key="1">
        <td id="EMPTY">Empty</td>
      </tr>
    );
  }
  let automatedTradeTableBody2 = <tbody>{automatedTradeTableRows2}</tbody>;

  return (
    <div className="container">
      <div className="row">
        <p className="text-center fs-3 fw-bold"> Historical Analysis </p>
      </div>
      <div className="row">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Stock</th>
              <th scope="col">Type</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Algorithm</th>
              <th scope="col">Profit Limit</th>
              <th scope="col">Trailing Stop Percent</th>
              <th scope="col">Money Spent</th>
              <th scope="col">Total Value</th>
            </tr>
          </thead>
          {automatedTradeTableBody2}
        </table>
      </div>
    </div>
  );
}
