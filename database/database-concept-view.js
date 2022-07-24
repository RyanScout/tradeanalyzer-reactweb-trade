import React from "react";
import moment from "moment";

export default function DatabaseConceptView({ onOption, itemState, inputChange }) {
  let genericOrderCondition = {
    symbol: "",
    flashed: 0,
    checked: 0,
    successes: 0,
  };
  let goldenCross = {
    day: genericOrderCondition,
    minute: genericOrderCondition,
  };
  let lowerBollingerBand = {
    day: genericOrderCondition,
    minute: genericOrderCondition,
  };
  let upperBollingerBand = {
    day: genericOrderCondition,
    minute: genericOrderCondition,
  };

  let GOLDEN_CROSS_DAY_SYMBOL = "GENERAL";
  let GOLDEN_CROSS_MINUTE_SYMBOL = "GENERAL";
  let LOWER_BOLLINGER_BAND_DAY_SYMBOL = "GENERAL";
  let LOWER_BOLLINGER_BAND_MINUTE_SYMBOL = "GENERAL";
  let UPPER_BOLLINGER_BAND_DAY_SYMBOL = "GENERAL";
  let UPPER_BOLLINGER_BAND_MINUTE_SYMBOL = "GENERAL";

  let item = {};

  if (itemState != null) {
    if (itemState.GOLDEN_CROSS_DAY_SYMBOL != null) {
      GOLDEN_CROSS_DAY_SYMBOL = itemState.GOLDEN_CROSS_DAY_SYMBOL;
    }
    if (itemState.GOLDEN_CROSS_MINUTE_SYMBOL != null) {
      GOLDEN_CROSS_MINUTE_SYMBOL = itemState.GOLDEN_CROSS_MINUTE_SYMBOL;
    }
    if (itemState.LOWER_BOLLINGER_BAND_DAY_SYMBOL != null) {
      LOWER_BOLLINGER_BAND_DAY_SYMBOL =
        itemState.LOWER_BOLLINGER_BAND_DAY_SYMBOL;
    }
    if (itemState.LOWER_BOLLINGER_BAND_MINUTE_SYMBOL != null) {
      LOWER_BOLLINGER_BAND_MINUTE_SYMBOL =
        itemState.LOWER_BOLLINGER_BAND_MINUTE_SYMBOL;
    }
    if (itemState.UPPER_BOLLINGER_BAND_DAY_SYMBOL != null) {
      UPPER_BOLLINGER_BAND_DAY_SYMBOL =
        itemState.UPPER_BOLLINGER_BAND_DAY_SYMBOL;
    }
    if (itemState.UPPER_BOLLINGER_BAND_MINUTE_SYMBOL != null) {
      UPPER_BOLLINGER_BAND_MINUTE_SYMBOL =
        itemState.UPPER_BOLLINGER_BAND_MINUTE_SYMBOL;
    }

    if (itemState.cache != null) {
      if (
        itemState.cache.goldenCross != null &&
        itemState.cache.goldenCross.day != null &&
        itemState.cache.goldenCross.minute != null
      ) {
        goldenCross = itemState.cache.goldenCross;
      }
      if (
        itemState.cache.lowerBollingerBand != null &&
        itemState.cache.lowerBollingerBand.day != null &&
        itemState.cache.lowerBollingerBand.minute != null
      ) {
        lowerBollingerBand = itemState.cache.lowerBollingerBand;
      }
      if (
        itemState.cache.upperBollingerBand != null &&
        itemState.cache.upperBollingerBand.day != null &&
        itemState.cache.upperBollingerBand.minute != null
      ) {
        upperBollingerBand = itemState.cache.upperBollingerBand;
      }
    }
  }

  let automatedTradeTableRows = [];

  function genericTradeSignal(
    tradeSignal,
    evaluationPeriod,
    symbol,
    symbolName
  ) {
    let cells = [];
    let tempTradeSignal1 = "";
    let tempTradeSignal2 = "";
    let tempEvaluationPeriod1 = "";
    let tempEvaluationPeriod2 = "";
    switch (tradeSignal) {
      case goldenCross:
        tempTradeSignal1 = "Golden Cross";
        tempTradeSignal2 = "GOLDEN_CROSS_";
        break;
      case lowerBollingerBand:
        tempTradeSignal1 = "Lower Bollinger Band";
        tempTradeSignal2 = "LOWER_BOLLINGER_BAND_";
        break;
      case upperBollingerBand:
        tempTradeSignal1 = "Upper Bollinger Band";
        tempTradeSignal2 = "UPPER_BOLLINGER_BAND_";
        break;
      default:
        console.log("ERROR");
    }
    switch (evaluationPeriod) {
      case "day":
        tempEvaluationPeriod1 = "Day";
        tempEvaluationPeriod2 = "DAY";
        break;
      case "minute":
        tempEvaluationPeriod1 = "Minute";
        tempEvaluationPeriod2 = "MINUTE";
        break;
      default:
        console.log("ERROR");
    }

    cells.push(<td key="ORDERCONDITION">{tempTradeSignal1}</td>);
    cells.push(<td key="PERIOD">{tempEvaluationPeriod1}</td>);
    cells.push(
      <td key="CHECKED">{String(tradeSignal[evaluationPeriod].checked)}</td>
    );
    cells.push(
      <td key="FLASHED">{String(tradeSignal[evaluationPeriod].flashed)}</td>
    );
    cells.push(
      <td key="SUCCESSES">{String(tradeSignal[evaluationPeriod].successes)}</td>
    );
    cells.push(
      <td key="FLASHPERCENTAGE">
        {Math.round(
          (tradeSignal[evaluationPeriod].flashed /
            tradeSignal[evaluationPeriod].checked) *
            1000
        ) / 10}
        %
      </td>
    );
    cells.push(
      <td key="SUCCESSPERCENTAGE">
        {Math.round(
          (tradeSignal[evaluationPeriod].successes /
            tradeSignal[evaluationPeriod].flashed) *
            1000
        ) / 10}
        %
      </td>
    );
    cells.push(
      <td key="SYMBOL">
        <input
          type="text"
          id={symbolName}
          name={symbolName}
          className="form-control"
          autoCapitalize="off"
          onChange={inputChange}
          value={symbol}
        />
      </td>
    );
    cells.push(
      <td key="SYMBOL_SELECTOR">
        <i
          className="fa fa-bullseye fa-1"
          title="Modify"
          onClick={() =>
            onOption(
              "GET_SYMBOL",
              Object.assign(item, {
                tradeSignal: tempTradeSignal2 + tempEvaluationPeriod2,
                symbol: symbol,
              })
            )
          }
        ></i>
      </td>
    );
    cells.push(
      <td key="DETAIL_VIEW">
        <i
          className="fa fa-microchip fa-1"
          title="Modify"
          onClick={() => onOption("DETAIL_VIEW", tradeSignal[evaluationPeriod])}
        ></i>
      </td>
    );
    return cells;
  }

  automatedTradeTableRows.push(
    <tr key={0}>
      {genericTradeSignal(
        goldenCross,
        "day",
        GOLDEN_CROSS_DAY_SYMBOL,
        "GOLDEN_CROSS_DAY_SYMBOL"
      )}
    </tr>
  );
  automatedTradeTableRows.push(
    <tr key={1}>
      {genericTradeSignal(
        goldenCross,
        "minute",
        GOLDEN_CROSS_MINUTE_SYMBOL,
        "GOLDEN_CROSS_MINUTE_SYMBOL"
      )}
    </tr>
  );
  automatedTradeTableRows.push(
    <tr key={2}>
      {genericTradeSignal(
        lowerBollingerBand,
        "day",
        LOWER_BOLLINGER_BAND_DAY_SYMBOL,
        "LOWER_BOLLINGER_BAND_DAY_SYMBOL"
      )}
    </tr>
  );
  automatedTradeTableRows.push(
    <tr key={3}>
      {genericTradeSignal(
        lowerBollingerBand,
        "minute",
        LOWER_BOLLINGER_BAND_MINUTE_SYMBOL,
        "LOWER_BOLLINGER_BAND_MINUTE_SYMBOL"
      )}
    </tr>
  );
  automatedTradeTableRows.push(
    <tr key={4}>
      {genericTradeSignal(
        upperBollingerBand,
        "day",
        UPPER_BOLLINGER_BAND_DAY_SYMBOL,
        "UPPER_BOLLINGER_BAND_DAY_SYMBOL"
      )}
    </tr>
  );
  automatedTradeTableRows.push(
    <tr key={5}>
      {genericTradeSignal(
        upperBollingerBand,
        "minute",
        UPPER_BOLLINGER_BAND_MINUTE_SYMBOL,
        "UPPER_BOLLINGER_BAND_MINUTE_SYMBOL"
      )}
    </tr>
  );

  let automatedTradeTableBody = <tbody>{automatedTradeTableRows}</tbody>;
  return (
    <div className="container">
      <div className="row">
        <p className="text-center fs-3 fw-bold"> Database </p>
      </div>
      <div className="row">
        <div className="col-sm-9" />
        <div className="col-sm-3">
          <i
            className="fa fa-plus-square fa-1 float-end"
            title="Modify"
            onClick={() => onOption("MODIFY_VIEW")}
          ></i>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Order Condition</th>
              <th scope="col">Evaluation Period</th>
              <th scope="col">Checked</th>
              <th scope="col">Flashed</th>
              <th scope="col">Successes</th>
              <th scope="col">Flash %</th>
              <th scope="col">Success %</th>
              <th scope="col">Symbol</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {automatedTradeTableBody}
        </table>
      </div>
    </div>
  );
}
