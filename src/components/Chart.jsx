import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatDate } from '../utils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
)

const Chart = ({ transactions }) => {
    console.log(transactions)
    const labels = transactions.map(t => formatDate(t.date))
    const amounts = transactions.map(t => t.amount)

    const firstLabel = labels[0];
    const lastLabel = labels[labels.length - 1];

    const data = {
        labels: labels,
        label: '',
        datasets: [{
            data: amounts,
            borderColor: '#FF5403',
            borderJoinStyle: 'round',
            fill: true,
            borderWidth: 1,
            pointRadius: 0,
            tension: 0.4
        }]
    }

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    min: firstLabel,
                    max: lastLabel,
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                },
                display: false
            }
        },
        legend: {
            labels: {
                fontSize: 26
            }
        },
    }
    return (
        <div className='chart-cont'>
            <Line
                data={data}
                options={options}
                height={400}
            />
            <div className='month-range'>
                <span>{firstLabel}</span>
                <span>{lastLabel}</span>
            </div>
        </div>
    )
}

export default Chart
