import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import './ChartDisplay.css'

const ChartDisplay = props => {
    return (
        <section className='chart-display'>
            <h3>Your Finances</h3>
            <div>
                <Doughnut
                    data={{
                        labels: ['Income', 'Expenses'],
                        datasets: [{
                            backgroundColor: ['#21D500', '#F05D23'],
                            data: [props.income, props.expenses]
                        }]   
                    }}
                    options={{
                        legend: {
                            display: false
                        }
                    }} />
            </div>
        </section>
    )
}

export default ChartDisplay