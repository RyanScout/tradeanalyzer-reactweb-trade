/**
 *
 */
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import { element } from "prop-types";
import { render } from "react-dom";

export default function DatabaseModifyView({
  itemState,
  inputChange,
  onOption,
  manuallyInputChange,
}) {
  let name = "";
  let evaluationPeriod = "";
  let symbol = "";
  let technicalIndicatorType = "";
  let shortSMAType = "";
  let lbbType = "";
  let ubbType = "";
  let standardDeviations = "";
  let longSMAType = "";
  let symbols = [];

  if (itemState.item != null) {
    if (itemState.item.name != null) {
      name = itemState.item.name;
    }
    if (itemState.item.evaluationPeriod != null) {
      evaluationPeriod = itemState.item.evaluationPeriod;
    }
    if (itemState.item.symbol != null) {
      symbol = itemState.item.symbol;
    }
    if (itemState.item.technicalIndicatorType != null) {
      technicalIndicatorType = itemState.item.technicalIndicatorType;
    }
    if (itemState.item.shortSMAType != null) {
      shortSMAType = itemState.item.shortSMAType;
    }
    if (itemState.item.longSMAType != null) {
      longSMAType = itemState.item.longSMAType;
    }
    if (itemState.item.lbbType != null) {
      lbbType = itemState.item.lbbType;
    }
    if (itemState.item.ubbType != null) {
      ubbType = itemState.item.ubbType;
    }
    if (itemState.item.standardDeviations != null) {
      standardDeviations = itemState.item.standardDeviations;
    }
    if (itemState.item.symbols != null) {
      symbols = itemState.item.symbols.slice();
    }
  }

  let dynamicallyShowTradeSignalParams = (value) => {
    if (technicalIndicatorType == value) return "";
    else return "invisible-element";
  };

  function RenderTab(props) {
    return (
      <li className="nav-item" role="presentation">
        <button
          className={(() => {
            switch (technicalIndicatorType) {
              case props.value:
                return "nav-link active";
              default:
                return "nav-link";
            }
          })()}
          id="technicalIndicatorType"
          data-mdb-toggle="pill"
          role="tab"
          aria-selected={(() => {
            switch (technicalIndicatorType) {
              case props.value:
                return "true";
              default:
                return "false";
            }
          })()}
          value={props.value}
          onClick={inputChange}
        >
          {props.value}
        </button>
      </li>
    );
  }

  let optionsEvaluationPeriod = [
    { label: "DAY", value: "DAY" },
    { label: "MINUTE", value: "MINUTE" },
  ];
  let selectOptionsEvaluationPeriod = [];
  for (let i = 0; i < optionsEvaluationPeriod.length; i++) {
    let label = "";
    if (optionsEvaluationPeriod[i].label == null) {
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
          <RenderTab value="GoldenCross" />
          <RenderTab value="LowerBollingerBand" />
          <RenderTab value="UpperBollingerBand" />
        </ul>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="Text"
            id="name"
            name="name"
            className="form-control"
            autoCapitalize="off"
            onChange={(event) => {
              if (event.target.value.indexOf(" ") > -1) {
                return;
              }
              if (event.target.value.indexOf("|") > -1) {
                return;
              }
              if (event.target.value.indexOf("&") > -1) {
                return;
              }
              inputChange(event);
            }}
            value={name}
          />
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
          <label htmlFor="symbol">Symbol</label>
          <i
            className="fa fa-plus-square fa-1 float-end"
            title="Add Symbol"
            onClick={() => {
              if (symbol === "" || symbol === null) {
                return;
              }
              symbols.push(symbol);
              manuallyInputChange("symbols", symbols);
              manuallyInputChange("symbol", "");
            }}
          ></i>
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

        <div className={dynamicallyShowTradeSignalParams("GoldenCross")}>
          <label htmlFor="shortSMAType">Short SMA Type</label>
          <input
            type="Text"
            id="shortSMAType"
            name="shortSMAType"
            className="form-control"
            autoCapitalize="off"
            onChange={(event) => {
              let x = event.target.value.substring(
                0,
                event.target.value.length - evaluationPeriod.length - 1
              );
              let num = Number(x);
              if (num >= 999) return;
              if (
                event.target.value.endsWith(
                  "-" + evaluationPeriod.toLowerCase()
                )
              ) {
                manuallyInputChange("shortSMAType", x);
              }
            }}
            value={shortSMAType + "-" + evaluationPeriod.toLowerCase()}
          />
          <label htmlFor="longSMAType">Long SMA Type</label>
          <input
            type="Text"
            id="longSMAType"
            name="longSMAType"
            className="form-control"
            autoCapitalize="off"
            onChange={(event) => {
              let x = event.target.value.substring(
                0,
                event.target.value.length - evaluationPeriod.length - 1
              );
              let num = Number(x);
              if (num > 999) return;
              if (
                event.target.value.endsWith(
                  "-" + evaluationPeriod.toLowerCase()
                )
              ) {
                manuallyInputChange("longSMAType", x);
              }
            }}
            value={longSMAType + "-" + evaluationPeriod.toLowerCase()}
          />
        </div>

        <div className={dynamicallyShowTradeSignalParams("LowerBollingerBand")}>
          <label htmlFor="lbbType">LBB Type</label>
          <input
            type="Text"
            id="lbbType"
            name="lbbType"
            className="form-control"
            autoCapitalize="off"
            onChange={(event) => {
              let x = event.target.value.substring(
                0,
                event.target.value.length - evaluationPeriod.length - 1
              );
              let num = Number(x);
              if (num > 999) return;
              if (
                event.target.value.endsWith(
                  "-" + evaluationPeriod.toLowerCase()
                )
              ) {
                manuallyInputChange("lbbType", x);
              }
            }}
            value={lbbType + "-" + evaluationPeriod.toLowerCase()}
          />
          <label htmlFor="standardDeviations">Standard Deviations</label>
          <input
            type="Number"
            id="standardDeviations"
            name="standardDeviations"
            className="form-control"
            autoCapitalize="off"
            onChange={inputChange}
            value={standardDeviations}
          />
        </div>

        <div className={dynamicallyShowTradeSignalParams("UpperBollingerBand")}>
          <label htmlFor="ubbType">UBB Type</label>
          <input
            type="Text"
            id="ubbType"
            name="ubbType"
            className="form-control"
            autoCapitalize="off"
            onChange={(event) => {
              let x = event.target.value.substring(
                0,
                event.target.value.length - evaluationPeriod.length - 1
              );
              let num = Number(x);
              if (num > 999) return;
              if (
                event.target.value.endsWith(
                  "-" + evaluationPeriod.toLowerCase()
                )
              ) {
                manuallyInputChange("ubbType", x);
              }
            }}
            value={ubbType + "-" + evaluationPeriod.toLowerCase()}
          />
          <label htmlFor="standardDeviations">Standard Deviations</label>
          <input
            type="Number"
            id="standardDeviations"
            name="standardDeviations"
            className="form-control"
            autoCapitalize="off"
            onChange={inputChange}
            value={standardDeviations}
          />
        </div>

        <div>
          <label htmlFor="current Symbols">Current Symbols</label>
          <ul>
            {(() => {
              let arr = [];
              for (let i = 0; i < symbols.length; i++) {
                arr.push(
                  <li key={i}>
                    {symbols[i]}{" "}
                    <i
                      className="fa fa-trash fa-1"
                      title="Delete"
                      onClick={() => {
                        symbols.splice(i, 1);
                        manuallyInputChange("symbols", symbols);
                      }}
                    />
                  </li>
                );
              }
              return arr;
            })()}
          </ul>
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
        <div className="col-sm">
          <input
            type="submit"
            name="CancelButton"
            id="CancelButton"
            className="form-control"
            value="Cancel"
            onClick={(e) => onOption("CANCEL")}
          />
        </div>
      </div>
    </div>
  );
}
