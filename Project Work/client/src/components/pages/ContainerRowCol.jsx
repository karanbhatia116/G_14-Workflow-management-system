import { Widget } from '../pages/Widget';
import { ProgressBar } from '../layouts/ProgressBar';
import { PieChart } from '../layouts/PieChart';
import { DashProject } from '../pages/DashProject';
import { DashTasks } from '../pages/DashTasks';
import { DashProfile } from '../layouts/DashProfile';
import { Lists } from '../pages/Lists';

import "../../styles/ContainerRowCol.css"

export const ContainerRowCol = (props) => {

    // const progress = props.progress;
    const pie = props.pie;
    const budget = props.budget;
    const row = props.row;
    const col = props.col;

    return (
        <div className='rowC'>
            <div className='rowC cards'>
                {row[0] === 1.5 &&
                    <>
                        <div>
                            <Widget width={200} height={249}>
                                <DashProject number={0} width={792 / 4} height={396 / 4} />
                            </Widget>
                        </div>
                        <div>
                            <Widget width={200} height={249}>
                                <DashProject number={1} width={941 / 4} height={396 / 4} />
                            </Widget>
                        </div>
                        <div>
                            <Widget width={200} height={249}>
                                <DashProject number={3} width={850 / 4.2} height={396 / 4.2} />
                            </Widget>
                        </div>
                    </>
                }
            </div>

            <div>
                {col[0] === 0 &&
                    <div className='rowC'>
                        {row[0] === 0 &&
                            <Widget width={370} height={250}>
                                <h2>Budget</h2>
                                <ProgressBar width={300} percent={100 * budget[0] / budget[1]} />
                                <p>Allotted = ${budget[1]}
                                    <br />Utilized = ${budget[0]}</p>
                            </Widget>
                        }
                        {row[1] === 1 &&
                            <Widget width={700} height={250}>
                                {/* <h2>Cards</h2> */}
                                <ContainerRowCol row={[1.5, 1.5, 1.5]} col={[]} />
                            </Widget>
                        }
                    </div>
                }
                {col[1] === 1 &&
                    <div className='rowC'>
                        {row[0] === 0 &&
                            <Widget width={700} height={350}>
                                <DashTasks />
                            </Widget>
                        }
                        {row[1] === 1 &&
                            <Widget width={370} height={350}>
                                <PieChart values={pie} />
                            </Widget>
                        }
                    </div>
                }
            </div>

            <div className='sideProfile'>
                {col[2] === 2 &&
                    <div>
                        <Widget width={320} height={620}>
                            <DashProfile />
                        </Widget>
                    </div>
                }
            </div>

        </div>
    );
}

export default ContainerRowCol;
