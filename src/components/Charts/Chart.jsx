import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Legend,
} from "recharts";

import { Row, Col } from "react-bootstrap";

const Chart = ({ data }) => {
  /**
   * This function is reponsible for generating the gender based survial chart.
   *
   * @returns JSX element
   */
  const genderSurvivalChart = () => {
    // data for the BarChart
    const genderSurvivalData = [
      {
        name: "Male",
        survived: 0,
        died: 0,
      },
      {
        name: "Female",
        survived: 0,
        died: 0,
      },
    ];

    // populate the genderSurvivalData
    data.forEach(({ sex, survived }) => {
      if (sex === "male")
        survived === "No"
          ? genderSurvivalData[0]["died"]++
          : genderSurvivalData[0]["survived"]++;
      if (sex === "female")
        survived === "No"
          ? genderSurvivalData[1]["died"]++
          : genderSurvivalData[1]["survived"]++;
    });

    return (
      <BarChart width={500} height={300} data={survivalData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="survived" fill="#42f560" />
        <Bar dataKey="died" fill="#f54242" />
      </BarChart>
    );
  };

  /**
   * This is funtion is responsible for generating the age based survial chart.
   *
   * @returns JSX element
   */
  const ageSurvivalChart = () => {
    // data for the BarChart
    const ageData = [
      { name: "< 11", survived: 0, died: 0 },
      { name: "11 to 20", survived: 0, died: 0 },
      { name: "21 to 30", survived: 0, died: 0 },
      { name: "31 to 40", survived: 0, died: 0 },
      { name: "41 to 50", survived: 0, died: 0 },
      { name: "51 to 60", survived: 0, died: 0 },
      { name: "61 to 70", survived: 0, died: 0 },
      { name: "71 to 80", survived: 0, died: 0 },
    ];

    // populate the ageData
    data.forEach(({ age, survived }) => {
      if (age < 11)
        survived === "No" ? ageData[0]["died"]++ : ageData[0]["survived"]++;
      else if (age < 21)
        survived === "No" ? ageData[1]["died"]++ : ageData[1]["survived"]++;
      else if (age < 31)
        survived === "No" ? ageData[2]["died"]++ : ageData[2]["survived"]++;
      else if (age < 41)
        survived === "No" ? ageData[3]["died"]++ : ageData[3]["survived"]++;
      else if (age < 51)
        survived === "No" ? ageData[4]["died"]++ : ageData[4]["survived"]++;
      else if (age < 61)
        survived === "No" ? ageData[5]["died"]++ : ageData[5]["survived"]++;
      else if (age < 71)
        survived === "No" ? ageData[6]["died"]++ : ageData[6]["survived"]++;
      else if (age < 81)
        survived === "No" ? ageData[7]["died"]++ : ageData[7]["survived"]++;
    });

    return (
      <BarChart width={700} height={300} data={ageData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="survived" stackId="a" fill="#42f560" />
        <Bar dataKey="died" stackId="a" fill="#f54242" />
      </BarChart>
    );
  };

  /**
   * This function is reponsible for generating the class based survival chart.
   *
   * @returns JSX element
   */
  const classSurvivalChart = () => {
    // data for the BarChart
    const classSurvivalData = [
      { class: "Class 1", survived: 0, died: 0 },
      { class: "Class 2", survived: 0, died: 0 },
      { class: "Class 3", survived: 0, died: 0 },
    ];

    // populate the classSurvivalData
    data.forEach(({ pclass, survived }) => {
      if (pclass === 1)
        survived === "No"
          ? classSurvivalData[0]["died"]++
          : classSurvivalData[0]["survived"]++;
      else if (pclass === 2)
        survived === "No"
          ? classSurvivalData[1]["died"]++
          : classSurvivalData[1]["survived"]++;
      else
        survived === "No"
          ? classSurvivalData[2]["died"]++
          : classSurvivalData[2]["survived"]++;
    });

    return (
      <BarChart width={500} height={300} data={classSurvivalData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="class" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="survived" stackId="a" fill="#42f560" />
        <Bar dataKey="died" stackId="a" fill="#f54242" />
      </BarChart>
    );
  };

  /**
   * This is function is responsible for generating the survial chart based on the
   * boarding port.
   *
   * @returns JSX element
   */
  const portSurvivalChart = () => {
    // data for the BarChart
    const portSurvivalData = [
      {
        port: "Southampton",
        survived: 0,
        died: 0,
      },
      {
        port: "Cherbourg",
        survived: 0,
        died: 0,
      },
      {
        port: "Queenstown",
        survived: 0,
        died: 0,
      },
    ];

    // populate the portSurvivalData
    data.forEach(({ embarked, survived }) => {
      if (embarked === "S")
        survived === "No"
          ? portSurvivalData[0]["died"]++
          : portSurvivalData[0]["survived"]++;
      if (embarked === "C")
        survived === "No"
          ? portSurvivalData[1]["died"]++
          : portSurvivalData[1]["survived"]++;
      if (embarked === "Q")
        survived === "No"
          ? portSurvivalData[2]["died"]++
          : portSurvivalData[2]["survived"]++;
    });

    return (
      <BarChart width={500} height={300} data={portSurvivalData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="port" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="survived" stackId="a" fill="#42f560" />
        <Bar dataKey="died" stackId="a" fill="#f54242" />
      </BarChart>
    );
  };

  /**
   * This is funtion is reponsible for generating the survival chart based on the number
   * of family members onboard.
   *
   * @returns JSX element
   */
  const familySurvivalChart = () => {
    // data for the BarChart
    const familySurvivalData = {};

    // populate the familySurvivalData
    data.forEach(({ sibsp, survived }) => {
      if (!familySurvivalData.hasOwnProperty(sibsp))
        familySurvivalData[sibsp] = { sibsp, died: 0, survived: 0 };

      if (survived === "No") familySurvivalData[sibsp]["died"]++;
      else familySurvivalData[sibsp]["survived"]++;
    });

    return (
      <BarChart
        width={700}
        height={300}
        data={Object.values(familySurvivalData)}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sibsp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="survived" stackId="a" fill="#42f560" />
        <Bar dataKey="died" stackId="a" fill="#f54242" />
      </BarChart>
    );
  };

  return (
    <>
      {data.length ? (
        <Row
          className="mt-5"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <Col
            className="mb-5"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
            xl={4}
          >
            <h4 style={{ textAlign: "center" }}>Survival based on gender</h4>
            {genderSurvivalChart()}
          </Col>
          <Col
            className="mb-5"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
            xl={4}
          >
            <h4 style={{ textAlign: "center" }}>Survival based on class</h4>
            {classSurvivalChart()}
          </Col>
          <Col
            className="mb-5"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
            xl={4}
          >
            <h4 style={{ textAlign: "center" }}>
              Survival based on boarding port
            </h4>
            {portSurvivalChart()}
          </Col>
          <Col
            className="mb-5"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
            xl={6}
          >
            <h4 style={{ textAlign: "center" }}>Survival based on age</h4>
            {ageSurvivalChart()}
          </Col>
          <Col
            className="mb-5"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
            xl={6}
          >
            <h4 style={{ textAlign: "center" }}>
              Survival based on onboard family members
            </h4>
            {familySurvivalChart()}
          </Col>
        </Row>
      ) : null}
    </>
  );
};

export default Chart;
