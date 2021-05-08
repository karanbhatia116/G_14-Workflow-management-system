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
                    '#9CC3D5FF',
                    '#B1B3B3FF',
                    '#ADEFD1FF',
                ],
                hoverBackgroundColor: [
                    '#9CC3D5D0',
                    '#B1B3B3D0',
                    '#ADEFD1D0',
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