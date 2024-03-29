import React, { useState } from "react";
import moment from "moment";

export default function DatabaseDetailView({
  onOption,
  itemState,
  inputChange,
}) {
  type TechnicalIndicator = {
    id: number;
    flashed: number;
    checked: number;
    firstCheck: number;
    lastCheck: number;
    symbol: string;

    updating: boolean;

    effectiveDetails: any[];
  };

  type TechnicalIndicatorDetail = {};

  let automatedTradeTableRows1: any[] = [];
  // fill latest tradestable
  if (
    itemState != null &&
    itemState.item != null &&
    itemState.item.technicalIndicators != null &&
    itemState.item.technicalIndicators.length > 0
  ) {
    let technicalIndicators: TechnicalIndicator[] =
      itemState.item.technicalIndicators.slice();
    technicalIndicators.sort((a, b) => {
      const symbolA: string = a.symbol;
      const symbolB: string = b.symbol;
      return symbolA.localeCompare(symbolB);
    });

    for (let i = 0; i < technicalIndicators.length; i++) {
      let technicalIndicator: TechnicalIndicator = technicalIndicators[i];

      if (technicalIndicator == null) {
        continue;
      }

      const [updating, setUpdating] = useState(technicalIndicator.updating);

      let cells: any[] = [];
      cells.push(<td key="SYMBOL">{technicalIndicator.symbol}</td>);

      cells.push(
        <td key="FIRST_CHECK">
          {moment(new Date(technicalIndicator.firstCheck * 1000)).format(
            "MMM Do, YYYY"
          )}
        </td>
      );

      cells.push(
        <td key="LAST_CHECK">
          {moment(new Date(technicalIndicator.lastCheck * 1000)).format(
            "MMM Do, YYYY"
          )}
        </td>
      );

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
            technicalIndicator.effectiveDetails.forEach((detail) => {
              total += detail.successPercent;
            });
            return (
              "" +
              Math.round(
                (total / technicalIndicator.effectiveDetails.length) * 10
              ) /
                10
            );
          })()}
        </td>
      );

      cells.push(
        <td key="GRAPH_VIEW">
          <i
            className="fa fas fa-chart-bar"
            title="DetailView"
            onClick={() => onOption("GRAPH_VIEW", technicalIndicator)}
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
              <th scope="col">First Check</th>
              <th scope="col">Last Check</th>
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
