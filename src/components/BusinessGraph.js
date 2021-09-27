import {useState, useEffect} from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'

const BusinessGraph = () => {
    const [text, setText] = useState('')
    const [options, setOptions] = useState({
        title: {
            text: 'Foot Traffic for NAIC CODE'
        },
        subtitle:{
            text: 'underlying data sourced from SafeGraph',
            style:{fontFamily: 'Helvetica Neue'}
        },
        rangeSelector:{
            selected: 3
        },
        yAxis: {
            title: {
                text: 'Units'
            }
        },
        xAxis: {
            type: "datetime"
        },
        series: [{
            name : 'San José',
            color: '#E5A823',
            tooltip:{
                valueDecimals:2
            },
            data: []
        }],
        credits: {
            enabled: false
        }
    })
    
    const fetchData = async () => {
        const res = await fetch("http://localhost:5000/get/name/" + text)
        const data = await res.json();
        // console.log(data.data);
        return data.data
    }

    const onSubmit = async (e) => {
        console.log("temp")
        // console.log(options.series[0].data)
        e.preventDefault();

        if (!text){
            alert("Please add Task")
            return
        }

        const theData = await fetchData()
        options.series[0].data = theData;
        setOptions({...options})
    }

    return (

        
        <div>
            <script src="https://code.highcharts.com/highcharts.js"></script>
            <script src="https://code.highcharts.com/modules/exporting.js"></script>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Enter Business Name</label>
                        <input
                            type='text'
                            placeholder='Business Name'
                            value = {text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                <input type='submit' value='Get Data'/>
            </form>

            <HighchartsReact
            highcharts={Highcharts}
            options={options}
            />
        </div>
    )
}

export default BusinessGraph
