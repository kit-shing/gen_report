import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getInfo, generate } from "../../actions/generate";

//css
import "../../../static/css/report.css";

export class Report extends Component {
  static propTypes = {
    getInfo: PropTypes.func.isRequired,
    generate: PropTypes.func.isRequired,
  };

  state = {
    count: 0,
    total_alphabetical: "",
    total_real_number: "",
    total_integer: "",
    total_alphanumeric: "",
    file: "",
  };

  componentDidMount() {
    this.props.getInfo(this.state.count);
  }

  onSubmit = (e) => {
    e.preventDefault();

    let allItem = {
      count: this.state.count,
      total_alphabetical: 0,
      total_real_number: 0,
      total_integer: 0,
      total_alphanumeric: 0,
      file: "",
    };

    Promise.resolve(this.props.generate(this.state.count, allItem)).then(
      (res) => {
        this.props.history.push("/report");
      }
    );
  };

  downloadFile(base64) {
    var linkSource = `data:text/plain;base64,${base64}`;
    var downloadLink = document.createElement("a");
    var dateTime = this.getYMDHMS();
    var fileName = "Report_" + dateTime + ".txt";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  // Get date time with format (YYYYMMDD_HHMMSS)
  getYMDHMS() {
    var today = new Date();
    var date =
      today.getFullYear().toString() +
      (today.getMonth() + 1).toString() +
      today.getDate().toString() +
      "_" +
      today.getHours().toString() +
      today.getMinutes().toString() +
      today.getSeconds().toString();

    return date;
  }

  render() {
    const {
      total_alphabetical,
      total_real_number,
      total_integer,
      total_alphanumeric,
      file,
    } = this.props.report;

    return (
      <div className="container mt-5">
        <form
          onSubmit={this.onSubmit}
          className="textform"
          encType="multipart/form-data"
        >
          <div className="">
            <button type="submit" className="report-generate-btn">
              Generate File
            </button>
          </div>
        </form>
        <div className="mt-3">
          <label>Link:&nbsp;</label>
          <a
            className="report-download-link"
            onClick={() => {
              this.downloadFile(file);
            }}
          >
            <span className="report-download-link">Download File Here</span>
          </a>
        </div>
        <div className="mt-3">
          <label>Alphabetical string:&nbsp;</label>
          <label>{total_alphabetical}</label>
        </div>
        <div className="mt-3">
          <label>Real Numbers:&nbsp;</label>
          <label>{total_real_number}</label>
        </div>
        <div className="mt-3">
          <label>Integer:&nbsp;</label>
          <label>{total_integer}</label>
        </div>
        <div className="mt-3">
          <label>total_alphanumeric:&nbsp;</label>
          <label>{total_alphanumeric}</label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  report: state.commonReducer.report,
});

export default connect(mapStateToProps, { getInfo, generate })(Report);
