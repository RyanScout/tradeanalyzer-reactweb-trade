/**
 *
 */
import React from "react";

export default function TradeModifyView({ itemState, inputChange, onOption }) {
  let id: number = 0;
  let name: string = "";
  let symbol: string = "";
  let currencyAmount: number = 0;
  let trailingStopType: string = "";
  let profitLimitType: string = "";
  let status: "Running" | "Not Running" = "Not Running";
  let trailingStopAmount: number = 0;
  let profitLimitAmount: number = 0;
  let iterations: number = 0;
  let budget: number = 0;
  let orderSide: "Buy" | "Sell" | "Bot" | "Default" = "Default";
  let orderType:
    | "Market"
    | "Profit Limit"
    | "Trailing Stop"
    | "Trailing Stop & Profit Limit"
    | "Default" = "Default";
  let currencyType: string = "";
  let evaluationPeriod: "DAY" | "MINUTE" = "DAY";
  let buyCondition: string = "";
  let sellCondition: string = "";

  if (itemState.item != null) {
    if (itemState.item.id != null) {
      id = itemState.item.id;
    }
    if (itemState.item.name != null) {
      name = itemState.item.name;
    }
    if (itemState.item.symbol != null) {
      symbol = itemState.item.symbol;
    }
    if (itemState.item.trailingStopAmount != null) {
      trailingStopAmount = itemState.item.trailingStopAmount;
    }
    if (itemState.item.profitLimitAmount != null) {
      profitLimitAmount = itemState.item.profitLimitAmount;
    }
    if (itemState.item.iterations != null) {
      iterations = itemState.item.iterations;
    }
    if (itemState.item.status != null) {
      status = itemState.item.status;
    }
    if (itemState.item.budget != null) {
      budget = itemState.item.budget;
    }
    if (itemState.item.orderType != null) {
      orderType = itemState.item.orderType;
    }
    if (itemState.item.orderSide != null) {
      orderSide = itemState.item.orderSide;
    }
    if (itemState.item.currencyType != null) {
      currencyType = itemState.item.currencyType;
    }
    if (itemState.item.currencyAmount != null) {
      currencyAmount = itemState.item.currencyAmount;
    }
    if (itemState.item.profitLimitType != null) {
      profitLimitType = itemState.item.profitLimitType;
    }
    if (itemState.item.trailingStopType != null) {
      trailingStopType = itemState.item.trailingStopType;
    }
    if (itemState.item.evaluationPeriod != null) {
      evaluationPeriod = itemState.item.evaluationPeriod;
    }
    if (itemState.item.buyCondition != null) {
      buyCondition = itemState.item.buyCondition;
    }
    if (itemState.item.sellCondition != null) {
      sellCondition = itemState.item.sellCondition;
    }
  }

  let variableSwitcher = (value) => {
    switch (value) {
      case "Dollars":
        return "Shares";
      case "Shares":
        return "Dollars";

      case "Profit Limit Price":
        return "Profit Limit Percent";
      case "Profit Limit Percent":
        return "Profit Limit Price";

      case "Trailing Stop Price":
        return "Trailing Stop Percent";
      case "Trailing Stop Percent":
        return "Trailing Stop Price";

      default:
        return "";
    }
  };

  let orderSideClassName = (value) => {
    switch (orderSide) {
      case value:
        return "nav-link active";
      default:
        return "nav-link";
    }
  };
  let orderSideAriaSelected = (value) => {
    switch (orderSide) {
      case value:
        return "true";
      default:
        return "false";
    }
  };

  function RenderTab(props) {
    return (
      <li className="nav-item" role="presentation">
        <button
          className={orderSideClassName(props.value)}
          id="orderSide"
          data-mdb-toggle="pill"
          role="tab"
          aria-selected={orderSideAriaSelected(props.value)}
          value={props.value}
          onClick={inputChange}
        >
          {props.value}
        </button>
      </li>
    );
  }

  let optionsStatus: any[] = [
    { label: "Running", value: "Running" },
    { label: "Not Running", value: "Not Running" },
  ];
  let selectOptionsStatus: any[] = [];
  for (let i = 0; i < optionsStatus.length; i++) {
    let label = "";
    if (
      optionsStatus[i].label == null &&
      optionsStatus[i].defaultText != null
    ) {
      label = optionsStatus[i].defaultText;
    } else if (optionsStatus[i].label != null) {
      label = optionsStatus[i].label;
    }
    selectOptionsStatus.push(
      <option key={i} value={optionsStatus[i].value}>
        {label}
      </option>
    );
  }

  let optionsOrderType: any[] = [
    { label: "Market", value: "Market" },
    { label: "Trailing Stop", value: "Trailing Stop" },
    { label: "Profit Limit", value: "Profit Limit" },
    {
      label: "Trailing Stop & Profit Limit",
      value: "Trailing Stop & Profit Limit",
    },
  ];
  let selectOptionsOrderType: any[] = [];
  for (let i = 0; i < optionsOrderType.length; i++) {
    let label = "";
    if (
      optionsOrderType[i].label == null &&
      optionsOrderType[i].defaultText != null
    ) {
      label = optionsOrderType[i].defaultText;
    } else if (optionsOrderType[i].label != null) {
      label = optionsOrderType[i].label;
    }
    selectOptionsOrderType.push(
      <option key={i} value={optionsOrderType[i].value}>
        {label}
      </option>
    );
  }

  let optionsEvaluationPeriod: any[] = [
    { label: "DAY", value: "DAY" },
    { label: "MINUTE", value: "MINUTE" },
  ];
  let selectOptionsEvaluationPeriod: any[] = [];
  for (let i = 0; i < optionsEvaluationPeriod.length; i++) {
    let label = "";
    if (
      optionsEvaluationPeriod[i].label == null &&
      optionsEvaluationPeriod[i].defaultText != null
    ) {
      label = optionsEvaluationPeriod[i].defaultText;
    } else if (optionsEvaluationPeriod[i].label != null) {
      label = optionsEvaluationPeriod[i].label;
    }
    selectOptionsEvaluationPeriod.push(
      <option key={i} value={optionsEvaluationPeriod[i].value}>
        {label}
      </option>
    );
  }

  let description = "Add Item";
  if (itemState.view == "MODIFY") {
    description = "Modify Item";
  }

  return (
    <div className="container">
      <div className="row">
        <div>{description}</div>
      </div>
      <div className="row">
        <ul className="nav nav-pills nav-fill mb-3" id="tabs" role="tablist">
          <RenderTab value="Buy" />
          <RenderTab value="Sell" />
          <RenderTab value="Bot" />
        </ul>
        <div>
          <label htmlFor="Name">Name</label>
          <input
            type="Text"
            id="name"
            name="name"
            className="form-control"
            autoCapitalize="off"
            onChange={inputChange}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="Symbol">Symbol</label>
          <input
            type="Text"
            id="symbol"
            name="symbol"
            className="form-control"
            autoCapitalize="off"
            onChange={inputChange}
            value={symbol}
          />
        </div>
        <div>
          <label htmlFor="OrderType">Order Type</label>
          <select
            id="orderType"
            name="orderType"
            value={orderType}
            className="form-control"
            onChange={inputChange}
          >
            {selectOptionsOrderType}
          </select>
        </div>
        <div>
          <label htmlFor="EvaluationPeriod">Evaluation Period</label>
          <select
            id="evaluationPeriod"
            name="evaluationPeriod"
            value={evaluationPeriod}
            className="form-control"
            onChange={inputChange}
          >
            {selectOptionsEvaluationPeriod}
          </select>
        </div>
        <div>
          <button
            onClick={inputChange}
            id="currencyType"
            value={variableSwitcher(currencyType)}
          >
            {currencyType}
          </button>
          <input
            type="Number"
            id="currencyAmount"
            name="currencyAmount"
            className="form-control"
            autoCapitalize="off"
            onChange={inputChange}
            value={currencyAmount}
          />
        </div>
        {(() => {
          if (orderType.includes("Profit Limit")) {
            return (
              <div>
                <button
                  onClick={inputChange}
                  id="profitLimitType"
                  value={variableSwitcher(profitLimitType)}
                >
                  {profitLimitType}
                </button>
                <input
                  type="Number"
                  id="profitLimitAmount"
                  name="profitLimitAmount"
                  className="form-control"
                  autoCapitalize="off"
                  onChange={inputChange}
                  value={profitLimitAmount}
                />
              </div>
            );
          }
        })()}

        {(() => {
          if (orderType.includes("Trailing Stop")) {
            return (
              <div>
                <button
                  onClick={inputChange}
                  id="trailingStopType"
                  value={variableSwitcher(trailingStopType)}
                >
                  {trailingStopType}
                </button>
                <input
                  type="Number"
                  id="trailingStopAmount"
                  name="trailingStopAmount"
                  className="form-control"
                  autoCapitalize="off"
                  onChange={inputChange}
                  value={trailingStopAmount}
                />
              </div>
            );
          }
        })()}
        {(() => {
          if (orderSide === "Buy" || orderSide === "Sell") {
            return (
              <div>
                <label htmlFor="Iterations">Iterations</label>
                <input
                  id="iterations"
                  name="iterations"
                  value={iterations}
                  className="form-control"
                  onChange={inputChange}
                />
              </div>
            );
          }
        })()}

        {(() => {
          if (orderSide === "Buy" || orderSide === "Bot") {
            return (
              <div>
                <i
                  className="fa fa-plus-square fa-1 float-start"
                  title="Select Algorithm"
                  onClick={() => {
                    onOption("SELECT_VIEW", "buyCondition");
                  }}
                ></i>
                <label htmlFor="BuyCondition">Buy Condition</label>
                <input
                  type="Text"
                  id="buyCondition"
                  name="buyCondition"
                  className="form-control"
                  autoCapitalize="off"
                  onChange={inputChange}
                  value={buyCondition}
                />
              </div>
            );
          }
        })()}

        {(() => {
          if (orderSide === "Sell" || orderSide === "Bot") {
            return (
              <div>
                <i
                  className="fa fa-plus-square fa-1 float-start"
                  title="Select Algorithm"
                  onClick={() => {
                    onOption("SELECT_VIEW", "sellCondition");
                  }}
                ></i>
                <label htmlFor="SellCondition">Sell Condition</label>
                <input
                  type="Text"
                  id="sellCondition"
                  name="sellCondition"
                  className="form-control"
                  autoCapitalize="off"
                  onChange={inputChange}
                  value={sellCondition}
                />
              </div>
            );
          }
        })()}
        <div>
          <label htmlFor="Status">Status</label>
          <select
            id="status"
            name="status"
            value={status}
            className="form-control"
            onChange={inputChange}
          >
            {selectOptionsStatus}
          </select>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm">
          <input
            type="submit"
            name="SaveButton"
            id="SaveButton"
            className="form-control btn-primary"
            value="Save"
            onClick={() => onOption("SAVE")}
          />
        </div>
        {(() => {
          if (id > 0) {
            return (
              <div>
                <input
                  type="submit"
                  name="ResetButton"
                  id="ResetButton"
                  className="form-control btn-primary"
                  value="Reset"
                  onClick={() => onOption("RESET", itemState.item)}
                />
              </div>
            );
          }
        })()}

        <div className="col-sm">
          <input
            type="submit"
            name="CancelButton"
            id="CancelButton"
            className="form-control"
            value="Cancel"
            onClick={() => onOption("CANCEL")}
          />
        </div>
      </div>
    </div>
  );
}
