/**
 *
 */
import React from "react";
import moment from "moment";

export default function HistoricalAnalysisView({
  itemState,
  appPrefs,
  inputChange,
  onOption,
}) {
  let startTime = 1641016800;
  let endTime = 1641016800;
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
            min="2022-01-01"
            max="2022-12-31"
            id="startTime"
            name="startTime"
            className="startTime"
            onChange={inputChange}
            value={moment(new Date(startTime * 1000)).format("YYYY-MM-DD")}
          />
          <div id="End-Date">
            <label>End Date</label>
            <input
              type="date"
              min="2022-01-01"
              max="2022-12-31"
              id="endTime"
              name="endTime"
              className="endTime"
              onChange={inputChange}
              value={moment(new Date(endTime * 1000)).format("YYYY-MM-DD")}
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
              onOption("HISTORICALLY_ANALYZE_SWING_TRADE", itemState.item);
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
