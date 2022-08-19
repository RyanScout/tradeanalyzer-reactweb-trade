import React from "react";
import moment from "moment";

export default function TradeSelectView({
  itemState,
  onOption,
  selectInputChange,
}) {
  let automatedTradeTableRows1: JSX.Element[] = [];
  // fill latest tradestable
  if (
    itemState != null &&
    itemState.item.customTechnicalIndicators != null &&
    itemState.item.customTechnicalIndicators.length > 0
  ) {
    const field: string = itemState.field;
    const fieldValue: string = itemState.item[field];

    for (let i = 0; i < itemState.item.customTechnicalIndicators.length; i++) {
      let cells: JSX.Element[] = [];

      const customTechnicalIndicator: any =
        itemState.item.customTechnicalIndicators[i];

      cells.push(<td key="NAME">{customTechnicalIndicator.name}</td>);
      cells.push(
        <td key="KEY">{customTechnicalIndicator.technicalIndicatorKey}</td>
      );
      cells.push(
        <td key="EVALPERIOD">{customTechnicalIndicator.evaluationPeriod}</td>
      );
      cells.push(
        <td key="SELECT">
          <i
            className="fa fa-plus-square fa-1 float-start"
            title="Select Algorithm"
            onClick={() => {
              selectInputChange(
                field,
                fieldValue + " " + customTechnicalIndicator.name + " "
              );
            }}
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
        <p className="text-center fs-3 fw-bold"> Algorithm Analysis </p>
      </div>
      <button onClick={() => onOption("MODIFY", itemState.item)}>Back</button>
      <div className="row">
        <div className="col-sm-9" />
        <div className="col-sm-3"></div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Key</th>
              <th scope="col">Evaluation Period</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {automatedTradeTableBody1}
        </table>
      </div>
    </div>
  );
}
