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
  type TechnicalIndicatorType =
    | "GoldenCross"
    | "LowerBollingerBand"
    | "UpperBollingerBand"
    | "Default";

  let name: string = "";
  let evaluationPeriod: string = "";
  let symbol: string = "";
  let technicalIndicatorType: TechnicalIndicatorType = "Default";
  let shortSMAEvaluationDuration: number = 0;
  let lbbEvaluationDuration: number = 0;
  let ubbEvaluationDuration: number = 0;
  let standardDeviations: number = 0;
  let longSMAEvaluationDuration: number = 0;
  let symbols: string[] = [];

  if (itemState.item != null) {
    if (
      itemState.item.name != null &&
      typeof itemState.item.name === "string"
    ) {
      name = itemState.item.name;
    }
    if (
      itemState.item.evaluationPeriod != null &&
      typeof itemState.item.evaluationPeriod === "string"
    ) {
      evaluationPeriod = itemState.item.evaluationPeriod;
    }
    if (
      itemState.item.symbol != null &&
      typeof itemState.item.symbol === "string"
    ) {
      symbol = itemState.item.symbol;
    }
    if (
      itemState.item.technicalIndicatorType != null &&
      typeof itemState.item.technicalIndicatorType === "string"
    ) {
      technicalIndicatorType = itemState.item.technicalIndicatorType;
    }
    if (
      itemState.item.shortSMAEvaluationDuration != null &&
      typeof itemState.item.shortSMAEvaluationDuration === "number"
    ) {
      shortSMAEvaluationDuration = itemState.item.shortSMAEvaluationDuration;
    }
    if (
      itemState.item.longSMAEvaluationDuration != null &&
      typeof itemState.item.longSMAEvaluationDuration === "number"
    ) {
      longSMAEvaluationDuration = itemState.item.longSMAEvaluationDuration;
    }
    if (
      itemState.item.lbbEvaluationDuration != null &&
      typeof itemState.item.lbbEvaluationDuration === "number"
    ) {
      lbbEvaluationDuration = itemState.item.lbbEvaluationDuration;
    }
    if (
      itemState.item.ubbEvaluationDuration != null &&
      typeof itemState.item.ubbEvaluationDuration === "number"
    ) {
      ubbEvaluationDuration = itemState.item.ubbEvaluationDuration;
    }
    if (
      itemState.item.standardDeviations != null &&
      typeof itemState.item.standardDeviations === "number"
    ) {
      standardDeviations = itemState.item.standardDeviations;
    }
    if (itemState.item.symbols != null) {
      symbols = itemState.item.symbols.slice();
    }
  }

  function RenderTab(type: TechnicalIndicatorType) {
    return (
      <li className="nav-item" role="presentation">
        <button
          className={(() => {
            switch (technicalIndicatorType) {
              case type:
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
              case type:
                return "true";
              default:
                return "false";
            }
          })()}
          value={type}
          onClick={inputChange}
        >
          {type}
        </button>
      </li>
    );
  }

  let optionsEvaluationPeriod: any[] = [
    { label: "DAY", value: "DAY" },
    { label: "MINUTE", value: "MINUTE" },
  ];
  let selectOptionsEvaluationPeriod: any[] = [];
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
          {RenderTab("GoldenCross")}
          {RenderTab("LowerBollingerBand")}
          {RenderTab("UpperBollingerBand")}
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

        {(() => {
          if (technicalIndicatorType === "GoldenCross") {
            console.log(longSMAEvaluationDuration);
            return (
              <div>
                <label htmlFor="shortSMAEvaluationDuration">
                  Short SMA Type
                </label>
                <input
                  type="Text"
                  id="shortSMAEvaluationDuration"
                  name="shortSMAEvaluationDuration"
                  className="form-control"
                  autoCapitalize="off"
                  onChange={(event) => {
                    let x = event.target.value.substring(
                      0,
                      event.target.value.length - evaluationPeriod.length - 1
                    );
                    let num = Number(x);
                    if (Number.isNaN(num)) return;
                    if (
                      event.target.value.endsWith(
                        "-" + evaluationPeriod.toLowerCase()
                      )
                    ) {
                      manuallyInputChange("shortSMAEvaluationDuration", num);
                    }
                  }}
                  value={
                    shortSMAEvaluationDuration +
                    "-" +
                    evaluationPeriod.toLowerCase()
                  }
                />
                <label htmlFor="longSMAEvaluationDuration">Long SMA Type</label>
                <input
                  type="Text"
                  id="longSMAEvaluationDuration"
                  name="longSMAEvaluationDuration"
                  className="form-control"
                  autoCapitalize="off"
                  onChange={(event) => {
                    let x = event.target.value.substring(
                      0,
                      event.target.value.length - evaluationPeriod.length - 1
                    );
                    let num : number = Number(x);
                    if (Number.isNaN(num)) return;
                    if (
                      event.target.value.endsWith(
                        "-" + evaluationPeriod.toLowerCase()
                      )
                    ) {
                      console.log("changing to - " + x);
                      manuallyInputChange("longSMAEvaluationDuration", num);
                    }
                  }}
                  value={
                    longSMAEvaluationDuration +
                    "-" +
                    evaluationPeriod.toLowerCase()
                  }
                />
              </div>
            );
          }
        })()}

        {(() => {
          if (technicalIndicatorType === "LowerBollingerBand") {
            return (
              <div>
                <label htmlFor="lbbEvaluationDuration">LBB Type</label>
                <input
                  type="Text"
                  id="lbbEvaluationDuration"
                  name="lbbEvaluationDuration"
                  className="form-control"
                  autoCapitalize="off"
                  onChange={(event) => {
                    let x = event.target.value.substring(
                      0,
                      event.target.value.length - evaluationPeriod.length - 1
                    );
                    let num = Number(x);
                    if (Number.isNaN(num)) return;
                    if (
                      event.target.value.endsWith(
                        "-" + evaluationPeriod.toLowerCase()
                      )
                    ) {
                      manuallyInputChange("lbbEvaluationDuration", num);
                    }
                  }}
                  value={
                    lbbEvaluationDuration + "-" + evaluationPeriod.toLowerCase()
                  }
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
            );
          }
        })()}

        {(() => {
          if (technicalIndicatorType === "UpperBollingerBand") {
            return (
              <div>
                <label htmlFor="ubbEvaluationDuration">UBB Type</label>
                <input
                  type="Text"
                  id="ubbEvaluationDuration"
                  name="ubbEvaluationDuration"
                  className="form-control"
                  autoCapitalize="off"
                  onChange={(event) => {
                    let x = event.target.value.substring(
                      0,
                      event.target.value.length - evaluationPeriod.length - 1
                    );
                    let num = Number(x);
                    if (Number.isNaN(num)) return;
                    if (
                      event.target.value.endsWith(
                        "-" + evaluationPeriod.toLowerCase()
                      )
                    ) {
                      manuallyInputChange("ubbEvaluationDuration", x);
                    }
                  }}
                  value={
                    ubbEvaluationDuration + "-" + evaluationPeriod.toLowerCase()
                  }
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
            );
          }
        })()}

        <div>
          <label htmlFor="current Symbols">Current Symbols</label>
          <ul>
            {(() => {
              let arr: any[] = [];
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
