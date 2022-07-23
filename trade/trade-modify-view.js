/**
 *
 */
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import { element } from "prop-types";
import { render } from "react-dom";

export default function TradeModifyView({
  itemState,
  appPrefs,
  inputChange,
  onOption,
  AutoComplete,
  Testform,
}) {
  const nav = useNavigate();
  const x = window.location.pathname;

  let name = "";
  let symbol = "";
  let currencyAmount = "";
  let trailingStopType = "";
  let profitLimitType = "";
  let status = "";
  let trailingStopAmount = "";
  let profitLimitAmount = "";
  let iterations = "";
  let budget = "";
  let orderSide = "";
  let orderType = "";
  let currencyType = "";
  let evaluationPeriod = "";

  let test = "";

  let suggestions = [];

  if (itemState.item != null) {
    if (itemState.item.test != null) {
      test = itemState.item.test;
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
    if (itemState.item.calendar != null) {
      calendarValue = itemState.item.calendar;
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
    if (itemState.customTechnicalIndicators != null) {
      suggestions = itemState.customTechnicalIndicators.map(
        (customTechnicalIndicator) => {
          return customTechnicalIndicator.name;
        }
      );
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

  let dynamicallyShowOrderCondition = (value) => {
    if (orderSide == value || orderSide == "Bot") return "";
    else return "invisible-element";
  };

  let dynamicallyShowElement = (value) => {
    if (orderType.includes(value)) return "";
    else return "invisible-element";
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

  let saveTxt = "Save";

  let optionsStatus = [
    { label: "Running", value: "Running" },
    { label: "Not Running", label: "Not Running" },
  ];
  let selectOptionsStatus = [];
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

  let optionsOrderType = [
    { label: "Market", value: "Market" },
    { label: "Trailing Stop", value: "Trailing Stop" },
    { label: "Profit Limit", value: "Profit Limit" },
    {
      label: "Trailing Stop & Profit Limit",
      value: "Trailing Stop & Profit Limit",
    },
  ];
  let selectOptionsOrderType = [];
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

  let optionsEvaluationPeriod = [
    { label: "DAY", value: "DAY" },
    { label: "MINUTE", value: "MINUTE" },
  ];
  let selectOptionsEvaluationPeriod = [];
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
        <div className={dynamicallyShowElement("Profit Limit")}>
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
        <div className={dynamicallyShowElement("Trailing Stop")}>
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
        <div
          className={(function () {
            if (orderSide == "Buy" || orderSide == "Sell") return "";
            else return "invisible-element";
          })()}
        >
          <label htmlFor="Iterations">Iterations</label>
          <input
            id="iterations"
            name="iterations"
            value={iterations}
            className="form-control"
            onChange={inputChange}
          />
        </div>
        <div className={dynamicallyShowOrderCondition("Bot")}>
          <label htmlFor="Budget">Budget</label>
          <input
            type="Number"
            min="0"
            step="1"
            id="budget"
            name="budget"
            className="form-control"
            autoCapitalize="off"
            onChange={inputChange}
            value={budget}
          />
        </div>
        <div className={dynamicallyShowOrderCondition("Buy")}>
          <label htmlFor="BuyCondition">Buy Condition</label>
          {AutoComplete(suggestions, "buyCondition")}
        </div>

        <div className={dynamicallyShowOrderCondition("Sell")}>
          <label htmlFor="SellCondition">Sell Condition</label>
          {AutoComplete(suggestions, "sellCondition")}
        </div>

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
        <div
          className={(() => {
            if (itemState.item.id == null) {
              return "invisible-element";
            }
            return "col-sm";
          })()}
        >
          <input
            type="submit"
            name="ResetButton"
            id="ResetButton"
            className="form-control btn-primary"
            value="Reset"
            onClick={() => onOption("RESET",itemState.item)}
          />
        </div>
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
