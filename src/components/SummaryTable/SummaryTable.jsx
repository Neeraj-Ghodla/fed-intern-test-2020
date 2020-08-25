import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Container,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import CircularProgress from "@material-ui/core/CircularProgress";

const RecordsTable = () => {
  const [staticResults, setStaticResults] = useState([]);
  const [results, setResults] = useState([]);
  const [filterBy, setFilterBy] = useState("name");

  useEffect(() => {
    const fetchAPI = async () => {
      const {
        data: { records },
      } = await axios.get(
        "https://public.opendatasoft.com/api/records/1.0/search/?dataset=titanic-passengers&q=&rows=1000"
      );
      const results = records
        .map((item) => item.fields)
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
      setStaticResults(results);
      setResults(results);
    };
    fetchAPI();
  }, []);

  const setTableHeadings = () => {
    const headings = Object.keys(results[0]);
    return headings.map((heading, index) => (
      <th key={index}>
        {heading.toUpperCase()}
        {/* <FaSort
          style={{ cursor: "pointer" }}
          onClick={() => sortTable(heading)}
        /> */}
      </th>
    ));
  };

  const filterTable = (query) => {
    if (query === "") setResults(staticResults);
    else {
      let data;
      if (filterBy === "age" || filterBy === "pclass" || filterBy === "fare")
        data = staticResults.filter(
          (item) => item[filterBy] === parseFloat(query)
        );
      else
        data = staticResults.filter((item) =>
          item[filterBy].toLowerCase().includes(query.toLowerCase())
        );

      setResults(data);
    }
  };

  const searchFilter = (
    <InputGroup>
      <FormControl
        placeholder="Enter filter query"
        type="search"
        onChange={(e) => filterTable(e.target.value)}
        // onKeyPress={(e) => {
        //   if (e.key === "Enter") filterTable(e.target.value);
        // }}
      />
      <DropdownButton
        as={InputGroup.Append}
        variant="outline-secondary"
        title="Name"
        id="filter-dropdown"
      >
        <Dropdown.Item
          href="#"
          onClick={(e) => {
            setFilterBy("name");
            // filterTable("");
            document.getElementById("filter-dropdown").innerText = "Name";
          }}
        >
          Name
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={(e) => {
            setFilterBy("age");
            // filterTable("");
            document.getElementById("filter-dropdown").innerText = "Age";
          }}
        >
          Age
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={(e) => {
            setFilterBy("sex");
            // filterTable("");
            document.getElementById("filter-dropdown").innerText = "Sex";
          }}
        >
          Sex
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={(e) => {
            setFilterBy("fare");
            // filterTable("");
            document.getElementById("filter-dropdown").innerText = "Fare";
          }}
        >
          Fare
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={(e) => {
            setFilterBy("embarked");
            // filterTable("");
            document.getElementById("filter-dropdown").innerText = "Embarked";
          }}
        >
          Embarked
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={(e) => {
            setFilterBy("pclass");
            // filterTable("");
            document.getElementById("filter-dropdown").innerText = "PClass";
          }}
        >
          PClass
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={(e) => {
            setFilterBy("survived");
            // filterTable("");
            document.getElementById("filter-dropdown").innerText = "Survived";
          }}
        >
          Survived
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={() => {
            setFilterBy("fare category");
            // filterTable("");
            document.getElementById("filter-dropdown").innerText =
              "Fare Category";
          }}
        >
          Fare Category
        </Dropdown.Item>
      </DropdownButton>
    </InputGroup>
  );

  return staticResults.length ? (
    <Container>
      <h3 style={{ textAlign: "center" }} className="my-3">
        1912 Titanic Passenger Records
      </h3>

      {searchFilter}

      {results.length ? (
        <Table id="records-table" responsive striped>
          <thead>
            <tr>{setTableHeadings()}</tr>
          </thead>

          <tbody>
            {results.map((res, ind) => (
              <tr id={ind} key={ind}>
                {Object.values(res).map((d, i) => (
                  <td key={i}>{d}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          Nothing found
        </div>
      )}
    </Container>
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
  );
};

export default RecordsTable;
