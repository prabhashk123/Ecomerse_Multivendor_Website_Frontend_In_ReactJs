import SellerSidebar from './SellerSidebar'
import { useState, useEffect } from 'react';
import Chart from "react-apexcharts";

function YearlyReports() {
    const baseApiUrl = 'http://127.0.0.1:8000/api';
    const vendor_id = localStorage.getItem('vendor_id');
    const [Dates, setDates] = useState([]);
    const [Count, setCount] = useState([]);

    function fetch_report(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setDates(data.show_chart_yearly_orders.dates);
                setCount(data.show_chart_yearly_orders.count);
            });
    }
    useEffect(() => {
        fetch_report(baseApiUrl + '/vendor/' + vendor_id + '/');
    }, []);

    //need for apexchart react first install for https://apexcharts.com/docs/react-charts/ 
    const chartOptions = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: Dates
            }
        },
        series: [
            {
                name: "Orders",
                data: Count
            }
        ]
    };
    const chartElement = <Chart options={chartOptions.options} series={chartOptions.series} type="bar" width="500" />

    return (

        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <SellerSidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <h4><strong>Yearly Report.</strong></h4>
                    <div className='row mt-2'>
                        {chartElement}
                    </div>
                </div>
            </div>
        </div>


    );
}
export default YearlyReports;