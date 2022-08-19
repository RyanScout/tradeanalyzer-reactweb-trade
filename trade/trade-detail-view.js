/**
 *
 */
import React from "react";
import moment from "moment";

export default function TradeDetailView({ itemState, appPrefs, onOption }) {
  let automatedTradeTableRows1 = [];
  // fill latest tradestable
  if (
    itemState != null &&
    itemState.item.details != null &&
    itemState.item.details.length > 0
  ) {
    function compare(a, b) {
      if (a.placedAt < b.placedAt) return 1;
      if (a.placedAt > b.placedAt) return -1;
      return 0;
    }
    itemState.item.details.sort(compare);
    for (let i = 0; i < itemState.item.details.length; i++) {
      const detail = itemState.item.details[i];
      let cells = [];
      cells.push(<td key="ORDERSIDE">{detail.orderSide}</td>);
      cells.push(<td key="DOLLARAMOUNT">{detail.dollarAmount}</td>);
      cells.push(<td key="SHAREAMOUNT">{detail.shareAmount}</td>);
      cells.push(
        <td key="PLACEDAT">
          {moment(new Date(detail.placedAt * 1000)).format(
            "MMM Do, YYYY, h:mm:ss a"
          )}
        </td>
      );
      cells.push(
        <td key="FILLEDAT">
          {moment(new Date(detail.filledAt * 1000)).format(
            "MMM Do, YYYY, h:mm:ss a"
          )}
        </td>
      );
      cells.push(<td key="TOTALVALUE">{detail.totalValue}</td>);
      cells.push(<td key="AVAILABLEBUDGET">{detail.availableBudget}</td>);
      cells.push(<td key="SHARESHELD">{detail.sharesHeld}</td>);
      cells.push(<td key="FILLPRICE">{detail.assetPrice}</td>);
      cells.push(<td key="ORDERCONDITION">{detail.rawOrderCondition}</td>);
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
        <p className="text-center fs-3 fw-bold"> Trade Details </p>
      </div>
      <button onClick={() => onOption("CANCEL")}>Back</button>
      <div className="row">
        <div className="col-sm-3"></div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Order Side</th>
              <th scope="col">Dollar Amount</th>
              <th scope="col">Share Amount</th>
              <th scope="col">Placed At</th>
              <th scope="col">Filled At</th>
              <th scope="col">Total Value</th>
              <th scope="col">Available Budget</th>
              <th scope="col">Shares Held</th>
              <th scope="col">Fill Price</th>
              <th scope="col">Order Condition</th>
            </tr>
          </thead>
          {automatedTradeTableBody1}
        </table>
      </div>
    </div>
  );
}
