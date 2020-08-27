import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

import RecordsTable from "./components/SummaryTable/SummaryTable";
import Charts from "./components/Charts/Chart";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  // both contain the same data initially for the Table element, but "staticResults"
  // never change its state and is used to bring "results" to the default state.
  const [staticResults, setStaticResults] = useState([]);
  const [results, setResults] = useState([]);

  // Field name based on which the filtering happens
  const [filterBy, setFilterBy] = useState("name");

  // data used by the Charts element
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetches the data from the API and populates all the state variables.
    const fetchAPI = async () => {
      const {
        data: { records },
      } = await axios.get(
        "https://public.opendatasoft.com/api/records/1.0/search/?dataset=titanic-passengers&q=&rows=1000"
      );

      const results = records.map((item) => item.fields);

      // filter out all the unwanted fields from the results
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

  // Renders the app if the data is loaded from the API, otherwise renders a circular
  // progress indicator.
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
