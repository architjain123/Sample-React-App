import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const NaicsGraph = () => {
  const [text, setText] = useState("");
  const [options, setOptions] = useState({
    title: {
      text: "Foot Traffic for NAIC CODE",
    },
    subtitle: {
      text: "underlying data sourced from SafeGraph",
      style: { fontFamily: "Helvetica Neue" },
    },
    rangeSelector: {
      selected: 3,
    },
    yAxis: {
      title: {
        text: "Units",
      },
    },
    xAxis: {
      type: "datetime",
    },
    series: [
      {
        name: "San José",
        color: "#E5A823",
        tooltip: {
          valueDecimals: 2,
        },
        data: [],
      },
    ],
    credits: {
      enabled: false,
    },
  });

  const fetchData = async (val) => {
    const res = await fetch(process.env.REACT_APP_IP + "/get/naics/" + val);
    const data = await res.json();
    return data.data;
  };

  const onSubmitDropdown = async (e) => {
    e.preventDefault();
    const t = e.target[0];
    const val = t.options[t.selectedIndex].value;

    const theData = await fetchData(val);
    options.series[0].data = theData;

    setOptions({ ...options });
  };

  const onSubmitText = async (e) => {
    e.preventDefault();

    if (!text) {
      alert("Naics Code cannot be Empty");
      return;
    }

    const theData = await fetchData(text);
    options.series[0].data = theData;

    setOptions({ ...options });
  };

  return (
    <div>
      <form onSubmit={onSubmitDropdown}>
        <label for="cars">Choose Naics Category:</label>
        <select name="cars" id="cars">
          <optgroup label="NAICS Categories">
            <option value="23">Construction (23)</option>
            <option value="44">Retail Trade (44) </option>
            <option value="54">
              Professional, Scientific, and Technical Services (54)
            </option>
            <option value="72">Accommodation and Food Services (72)</option>
            <option value="62">Health Care and Social Assistance </option>
          </optgroup>
        </select>
        <input type="submit" value="Submit" />
      </form>

      <form className="add-form" onSubmit={onSubmitText}>
        <div className="form-control">
          <label>Enter Naics code</label>
          <input
            type="text"
            placeholder="Naics Code"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <input type="submit" value="Get Data" />
      </form>

      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default NaicsGraph;
