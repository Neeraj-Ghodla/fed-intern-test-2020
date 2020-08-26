import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

import RecordsTable from "./components/SummaryTable/SummaryTable";
import Charts from "./components/Charts/Chart";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [staticResults, setStaticResults] = useState([]);
  const [results, setResults] = useState([]);
  const [filterBy, setFilterBy] = useState("name");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const {
        data: { records },
      } = await axios.get(
        "https://public.opendatasoft.com/api/records/1.0/search/?dataset=titanic-passengers&q=&rows=1000"
      );
      const results = records.map((item) => item.fields);

      const filteredResults = results
        .filter((item) => item.fare > 0)
        .map(({ name, sex, fare, embarked, pclass, survived, age }) => ({
          name,
          age: age || "Unknown",
          sex: sex === "male" ? "Male" : "Female",
          fare: Math.round(fare * 100) / 100,
          embarked:
            embarked === "C"
              ? "Cherbourg"
              : embarked === "Q"
              ? "Queenstown"
              : "Southampton",
          pclass,
          survived,
          "fare category":
            fare < 20
              ? "Cheap"
              : fare >= 20 && fare <= 100
              ? "Regular"
              : "Expensive",
        }));

      setStaticResults(filteredResults);
      setResults(filteredResults);
      setData(results);
    };
    fetchAPI();
  }, []);

  return (
    <>
      {staticResults.length ? (
        <>
          <h3 style={{ textAlign: "center" }} className="mt-3 mb-5">
            1912 Titanic Passenger Records
          </h3>
          <Tabs
            defaultActiveKey="table"
            className="justify-content-center mb-5"
          >
            <Tab eventKey="table" title="Records Table">
              <RecordsTable
                staticResults={staticResults}
                results={results}
                setResults={setResults}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
              />
            </Tab>
            <Tab eventKey="charts" title="Record Charts">
              <Charts data={data} />
            </Tab>
          </Tabs>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default App;
