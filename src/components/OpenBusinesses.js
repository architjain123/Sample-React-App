import { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import indicators from "highcharts/indicators/indicators";
indicators(Highcharts);

const OpenBusinesses = () => {
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
    console.log(process.env.REACT_APP_IP);
    const res = await fetch(process.env.REACT_APP_IP + "/get/open_businesses");
    const data = await res.json();
    console.log(data.data);
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
        name: "Open Businesses",
        id: "main",
        color: "#E5A823",
        data: data,
        tooltip: {
          valueDecimals: 2,
        },
      },
      {
        name: "7 Day Moving Average",
        type: "sma",
        linkedTo: "main",
        params: {
          period: 7,
        },
        color: "red",
      },
    ],
    credits: {
      enabled: false,
    },
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

export default OpenBusinesses;
