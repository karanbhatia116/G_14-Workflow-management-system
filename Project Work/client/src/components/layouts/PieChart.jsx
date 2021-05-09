import { Pie } from 'react-chartjs-2';

export var PieChart = (values) => {

    const data_values = values.values;

    const options = {
        legend: {
            display: true,
            position: 'right'
        },
        title: {
            display: true,
            text: 'Project Progress',
            fontSize: 20
        },
        elements: {
            arc: {
                borderWidth: 3
            }
        }
    };

    const data = {
        maintainAspectRatio: false,
        responsive: false,
        labels: [' To-Do', ' In Progress', ' Done'],
        datasets: [
            {
                data: data_values, //[65, 59, 80],
                backgroundColor: [
                    '#9CD9FF',
                    '#035EE2',
                    '#0022AC',
                ],
                hoverBackgroundColor: [
                    '#9CD9FA',
                    '#035EE0',
                    '#0022AC',
                ]
            }
        ]
    };

    return (
        <Pie
            data={data}
            options={options}
        />
    );
}

export default PieChart;