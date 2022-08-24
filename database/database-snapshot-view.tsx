import React, { useState } from "react";
import moment from "moment";

export default function DatabaseSnapshotView({
  onOption,
  itemState,
  inputChange,
}) {
  type Snapshot = {
    id: number;
    flashed: number;
    checked: number;
    firstCheck: number;
    lastCheck: number;
    symbol: string;
    updating: boolean;
    effectiveDetails: any[];
  };

  let automatedTradeTableRows1: any[] = [];
  // fill latest tradestable
  if (
    itemState != null &&
    itemState.item != null &&
    itemState.item.snapshots != null &&
    itemState.item.snapshots.length > 0
  ) {
    let snapshots: Snapshot[] = itemState.item.snapshots.slice();
    snapshots.sort((a, b) => {
      const symbolA: string = a.symbol;
      const symbolB: string = b.symbol;
      return symbolA.localeCompare(symbolB);
    });

    for (let i = 0; i < snapshots.length; i++) {
      let snapshot: Snapshot = snapshots[i];

      if (snapshot == null) {
        continue;
      }

      const [updating, setUpdating] = useState(snapshot.updating);

      let cells: any[] = [];
      cells.push(<td key="SYMBOL">{snapshot.symbol}</td>);

      cells.push(
        <td key="FIRST_CHECK">
          {moment(new Date(snapshot.firstCheck * 1000)).format("MMM Do, YYYY")}
        </td>
      );

      cells.push(
        <td key="LAST_CHECK">
          {moment(new Date(snapshot.lastCheck * 1000)).format("MMM Do, YYYY")}
        </td>
      );

      cells.push(
        <td key="FLASH_PERCENT">
          {Math.round((snapshot.flashed / snapshot.checked) * 1000) / 10}
        </td>
      );
      cells.push(
        <td key="AVG_SUCCESS_PERCENT">
          {(() => {
            let total = 0.0;
            snapshot.effectiveDetails.forEach((detail) => {
              total += detail.successPercent;
            });
            return (
              "" +
              Math.round((total / snapshot.effectiveDetails.length) * 10) / 10
            );
          })()}
        </td>
      );

      cells.push(
        <td key="GRAPH_VIEW">
          <i
            className="fa fas fa-chart-bar"
            title="DetailView"
            onClick={() => onOption("GRAPH_VIEW", snapshot)}
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
                onOption("CREATE_SNAPSHOT", snapshot);
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
