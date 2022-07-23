/**
 *
 */
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";

export default function HistoricalAnalysisView({
  itemState,
  appPrefs,
  inputChange,
  onOption,
}) {
  const nav = useNavigate();
  const x = window.location.pathname;

  let startTime = 1609507862;
  let endTime = 1640957462;
  if (itemState.item != null) {
    if (itemState.item.startTime != null) startTime = itemState.item.startTime;
    if (itemState.item.endTime != null) endTime = itemState.item.endTime;
  }
  return (
    <div className="container">
      <div className="row">
        <div>Historical Analysis</div>
      </div>
      <div className="row">
        <div>
          <label>Start Date</label>
          <input
            type="date"
            min="2021-01-01"
            max="2021-12-31"
            id="startTime"
            name="startTime"
            className="startTime"
            onChange={inputChange}
            value={
              moment(new Date(startTime *1000)).format("YYYY-MM-DD")
            }
          />
          <div id="End-Date">
            <label>End Date</label>
            <input
              type="date"
              min="2021-01-01"
              max="2021-12-31"
              id="endTime"
              name="endTime"
              className="endTime"
              onChange={inputChange}
              value={
                moment(new Date(endTime *1000)).format("YYYY-MM-DD")
              }
            />
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm">
          <input
            type="submit"
            name="HistoricalAnalysisButton"
            id="HistoricalAnalysisButton"
            className="form-control btn-primary"
            value="Historically Analyze"
            onClick={() => {
              if(itemState.item.evaluationPeriod == "Day")
              onOption("HISTORICALLY_ANALYZE_SWING_TRADE")
              else if(itemState.item.evaluationPeriod == "Minute")
              onOption("HISTORICALLY_ANALYZE_DAY_TRADE")
              else
              alert("EVALUATION PERIOD REQUIRED")
            }}
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
