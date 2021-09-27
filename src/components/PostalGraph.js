import {useState, useEffect} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const PostalGraph = () => {
    const [text, setText] = useState('')
    const [options, setOptions] = useState({
        title: {
        text: 'Foot Traffic for All'
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
        tooltip: {
        shared: true,
        crosshairs: true
        },
        series: [{
        name : 'San José',
        color: '#E5A823',
        tooltip:{
            valueDecimals:2
        },
        credits: {
            enabled: false
        },
        data: []
        }]
    })
    // const [data, setData] = useState([])

    // useEffect(()=>{
    //     const getData = async () => {
    //         const data = await fetchData()
    //         setData(data)
    //         console.log(data)
    //     }
    //     getData()
    // }, [])

    const fetchData = async () => {
        const res = await fetch("http://localhost:5000/get/postal/" + text)
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
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Enter Postal Code</label>
                        <input
                            type='text'
                            placeholder='Postal Code'
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

export default PostalGraph
