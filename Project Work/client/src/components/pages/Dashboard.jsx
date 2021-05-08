// import logo from './logo.svg';
// import widgets from 'react-widgets';
// import { Sidebar } from './components/Sidebar';
// import { Widget } from './components/Widget'
// import { ProgressBar } from 'react-bootstrap';
// import { Landing } from './components/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { ContainerRowCol } from '../pages/ContainerRowCol';

export const Dashboard = (props) => {
    return (
        <React.Fragment>
            <div className="Dashboard">

                {/* <ContainerRow row={0} progress={5} budget={[100, 500]} />
                <ContainerRow row={1} pie={[200, 100, 75]} /> */}
                <ContainerRowCol row={[0, 1]} col={[0, 1, 2]} budget={[100, 500]} pie={[200, 100, 75]} />  {/* budget section */}

            </div>
        </React.Fragment>
    );
}

export default Dashboard;
