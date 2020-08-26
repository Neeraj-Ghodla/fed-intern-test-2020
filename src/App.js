import React from "react";
import RecordsTable from "./components/SummaryTable/SummaryTable";
import Charts from "./components/Charts/Chart";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Tab } from "react-bootstrap";

const App = () => (
  <div className={"app"}>
    <h3 style={{ textAlign: "center" }} className="my-3">
      1912 Titanic Passenger Records
    </h3>
    <Tabs defaultActiveKey="table" className="justify-content-center mb-5">
      <Tab eventKey="table" title="Records Table">
        <RecordsTable />
      </Tab>
      <Tab eventKey="charts" title="Record Charts">
        <Charts />
      </Tab>
    </Tabs>
  </div>
);

export default App;
