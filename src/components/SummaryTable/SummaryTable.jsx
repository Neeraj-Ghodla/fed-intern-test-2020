import React from "react";
import {
  Table,
  Container,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

const RecordsTable = ({
  staticResults,
  results,
  filterBy,
  setResults,
  setFilterBy,
}) => {
  /**
   * setTableHeadings is responsible for generating the heading for the table.
   */
  const setTableHeadings = () => {
    const headings = Object.keys(results[0]);
    return headings.map((heading, index) => (
      <th key={index}>{heading.toUpperCase()}</th>
    ));
  };

  /**
   *
   * @param {string} query The query by which the table needs to be filtered
   * The filtering also depends on the filterBy variable.
   */
  const filterTable = (query) => {
    if (query === "") setResults(staticResults);
    else {
      let data;
      if (filterBy === "age" || filterBy === "pclass" || filterBy === "fare")
        data = staticResults.filter(
          (item) => item[filterBy] === parseFloat(query)
        );
      else if (filterBy === "sex")
        data = staticResults.filter((item) =>
          item[filterBy].toLowerCase().startsWith(query.toLowerCase())
        );
      else
        data = staticResults.filter((item) =>
          item[filterBy].toLowerCase().includes(query.toLowerCase())
        );

      setResults(data);
    }
  };

  /**
   * JSX element that generates the searchBar used to filter the table.
   */
  const searchFilter = (
    <InputGroup>
      <FormControl
        placeholder="Enter filter query"
        type="search"
        onChange={(e) => filterTable(e.target.value)}
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
            document.getElementById("filter-dropdown").innerText = "Name";
          }}
        >
          Name
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={(e) => {
            setFilterBy("age");
            document.getElementById("filter-dropdown").innerText = "Age";
          }}
        >
          Age
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={(e) => {
            setFilterBy("sex");
            document.getElementById("filter-dropdown").innerText = "Sex";
          }}
        >
          Sex
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={(e) => {
            setFilterBy("fare");
            document.getElementById("filter-dropdown").innerText = "Fare";
          }}
        >
          Fare
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={(e) => {
            setFilterBy("embarked");
            document.getElementById("filter-dropdown").innerText = "Embarked";
          }}
        >
          Embarked
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={(e) => {
            setFilterBy("pclass");
            document.getElementById("filter-dropdown").innerText = "PClass";
          }}
        >
          PClass
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={(e) => {
            setFilterBy("survived");
            document.getElementById("filter-dropdown").innerText = "Survived";
          }}
        >
          Survived
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={() => {
            setFilterBy("fare category");
            document.getElementById("filter-dropdown").innerText =
              "Fare Category";
          }}
        >
          Fare Category
        </Dropdown.Item>
      </DropdownButton>
    </InputGroup>
  );

  return (
    <Container>
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
  );
};

export default RecordsTable;
