import { Pie } from 'react-chartjs-2';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    pie:{
        width: '100%',
        height: '100%',
        ['@media (max-width:1280px)']:{
            width: 230,
            height: 230,
            display: 'flex',
            justifyContent:'center',
            alignItems:'center'
        },
    }
});
export var PieChart = (values) => {

    const data_values = values.values;
    const classes = useStyles();
    const options = {
        maintainAspectRatio: false,
        // responsive: true,
        legend: {
            display: false,
            position: 'right'
        },
        // title: {
        //     display: true,
        //     text: 'Project Progress',
        //     fontSize: 20
        // },
        elements: {
            arc: {
                borderWidth: 3
            }
        }
    };

    const data = {
        labels: [' To-Do', ' In Progress', ' Done'],
        datasets: [
            {
                data: data_values, //[65, 59, 80],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(100, 205, 86)'
                ],
                hoverOffset: 4
            }
        ]
    };

    return (
        <article className = {classes.pie}>
        <Pie
            data={data}
            options={options}
        />
       </article>
    );
}

export default PieChart;