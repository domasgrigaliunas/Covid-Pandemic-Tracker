import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { colorsByCase } from "./util";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType, ...props }) {
  const color = colorsByCase();
  const [data, setData] = useState({});

  //TODO: make it work
  // const [datasets, setDataset] = useState({});

  // if (casesType === "cases") {
  //   const newDatasets = [
  //     {
  //       backgroundColor: "rgba(204, 16, 52, 0.5)",
  //       borderColor: color.cases.hex,
  //       data: data,
  //     },
  //   ];
  //   setDataset(newDatasets);
  // } else if (casesType === "recovered") {
  //   const newDatasets = [
  //     {
  //       backgroundColor: "rgba(204, 16, 52, 0.5)",
  //       borderColor: color.recovered.hex,
  //       data: data,
  //     },
  //   ];
  //   setDataset(newDatasets);
  // } else if (casesType === "deaths") {
  //   const newDatasets = [
  //     {
  //       backgroundColor: "rgba(204, 16, 52, 0.5)",
  //       //borderColor: "#CC1034",
  //       borderColor: color.deaths.hex,
  //       data: data,
  //     },
  //   ];
  //   setDataset(newDatasets);
  // }

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  {
    console.log(props.className);

    console.log(color);
    //let colors = props.colorsByCase.colors;
    //console.log(colors);
  }
  return (
    // ClassName might be useless
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          data={
            //(datasets = { datasets })
            {
              datasets: [
                {
                  backgroundColor: "rgba(204, 16, 52, 0.5)",
                  borderColor: "#CC1034",
                  //borderColor: color.cases.hex,
                  data: data,
                },
              ],
            }
          }
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
