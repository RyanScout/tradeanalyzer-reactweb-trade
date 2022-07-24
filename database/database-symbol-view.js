import React, { useState } from "react";
import moment from "moment";

export default function DatabaseSymbolView({
  onOption,
  itemState,
  inputChange,
}) {
  let automatedTradeTableRows1 = [];
  // fill latest tradestable
  if (
    itemState != null &&
    itemState.item != null &&
    itemState.item.technicalIndicators != null &&
    itemState.item.technicalIndicators.length > 0
  ) {
    let technicalIndicators = itemState.item.technicalIndicators.slice();
    technicalIndicators.sort((a, b) => a.symbol.localeCompare(b.symbol));

    for (let i = 0; i < technicalIndicators.length; i++) {
      let technicalIndicator = technicalIndicators[i];

      if (technicalIndicator == null) {
        continue;
      }

      const [updating, setUpdating] = useState(technicalIndicator.updating);

      let cells = [];
      cells.push(<td key="SYMBOL">{technicalIndicator.symbol}</td>);
      cells.push(
        <td key="FLASH_PERCENT">
          {Math.round(
            (technicalIndicator.flashed / technicalIndicator.checked) * 1000
          ) / 10}
        </td>
      );
      cells.push(
        <td key="AVG_SUCCESS_PERCENT">
          {(() => {
            let total = 0.0;
            technicalIndicator.details.forEach((detail) => {
              total += detail.successPercent;
            });
            return (
              "" +
              Math.round((total / technicalIndicator.details.length) * 10) / 10
            );
          })()}
        </td>
      );
      cells.push(
        <td key="DETAIL_VIEW">
          <i
            className="fa fas fa-chart-bar"
            title="DetailView"
            onClick={() => onOption("DETAIL_VIEW", technicalIndicator)}
          ></i>{" "}
          <i
            className={(() => {
              if (updating) {
                return "spinner-border spinner-border-sm";
              }
              return "fa fas fa-bolt";
            })()}
            title={(() => {
              if (updating) {
                return "Loading...";
              }
              return "Backload";
            })()}
            onClick={() => {
              if (!updating) {
                onOption("BACKLOAD", technicalIndicator);
                setUpdating(true);
              }
            }}
          ></i>{" "}
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
      <button onClick={() => onOption("CANCEL")}>Back</button>
      <div className="row">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Symbol</th>
              <th scope="col">Flash %</th>
              <th scope="col">Avg. Success %</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {automatedTradeTableBody1}
        </table>
      </div>
    </div>
  );
}
