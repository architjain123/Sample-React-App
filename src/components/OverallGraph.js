import { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const OverallGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();

      setData(data);
      console.log(data);
    };
    getData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(`http://localhost:5000/get/overall`);
    const data = await res.json();
    return data.data;
  };

  const options = {
    title: {
      text: "Foot Traffic for All",
    },
    subtitle: {
      text: "underlying data sourced from SafeGraph",
      style: { fontFamily: "Helvetica Neue" },
    },
    xAxis: {
      range: 6 * 30 * 24 * 3600 * 1000, // six months
    },
    rangeSelector: {
      enabled: true,
    },
    yAxis: {
      title: {
        text: "Units",
      },
    },
    tooltip: {
      shared: true,
      crosshairs: true,
    },
    series: [
      {
        name: "San José",
        color: "#E5A823",
        tooltip: {
          valueDecimals: 2,
        },
        credits: {
          enabled: false,
        },
        data: data,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};

export default OverallGraph;
