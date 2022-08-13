import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
} from 'chart.js'
import {Line} from 'react-chartjs-2'

function LineChart({arr = []}) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
    )

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'bottom'
            },
            datalabels: {
                display: false
            },
            title: {
                display: true,
                text: 'Oylik sotuvlar soni',
                padding: {
                    bottom: 30
                },
                font: {
                    size: 16
                },
                color: 'rgba(28, 28, 28, 0.7)'
            }
        }
    }

    const months = [
        'Yanvar',
        'Fevral',
        'Mart',
        'Aprel',
        'May',
        'Iyun',
        'Iyul',
        'Avgust',
        'Sentabr',
        'Oktabr',
        'Noyabr',
        'Dekabr'
    ]
    const labels = months.slice(0, new Date().getMonth())

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                data: arr,
                borderColor: 'rgb(0,144,163)',
                backgroundColor: 'rgba(0, 180, 204, 0.5)'
            }
        ]
    }
    return (
        <Line options={options} data={data} updateMode={'reset'} />
    )
}

export default LineChart