import { v4 as uuid } from 'uuid';

export var DashProject = ({ number, width, height }) => {
    const projectList = [
        {
            id: uuid(),
            img: "https://blog.hubspot.com/hubfs/image8-2.jpg",
            project_title: 'Google',
            team_assigned: 10,
            project_manager: '',
            project_description: 'This is a new description',
            projectDeadline: new Date()
        },
        {
            id: uuid(),
            img: "http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG",
            project_title: 'Amazon',
            team_assigned: 10,
            project_manager: '',
            project_description: 'How are you all?',
            projectDeadline: new Date()
        },
        {
            id: uuid(),
            img: "https://logos-world.net/wp-content/uploads/2020/04/Facebook-Logo.png",
            project_title: 'Facebook',
            team_assigned: 10,
            project_manager: '',
            project_description: 'I have successfully rendered projects!!',
            projectDeadline: new Date()
        },
        {
            id: uuid(),
            img: "https://assets.brand.microsites.netflix.io/assets/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png?v=26",
            project_title: 'Netflix',
            team_assigned: 12,
            project_manager: '',
            project_description: 'I am gonna watch new movies with Netflix. Building a new version of Netflix with my team. How cool is that. Why am I writing this gibber??',
            projectDeadline: new Date()
        },
    ]

    return (
        <div>
            <img src={projectList[number].img} width={width} height={height} />
            <h4>{projectList[number].project_title}</h4>
            <p>
                {/* <i>{projectList[number].project_description}</i> <br /> */}
                <b>Team assigned - {projectList[number].team_assigned}</b>
            </p>

        </div >
    )
}