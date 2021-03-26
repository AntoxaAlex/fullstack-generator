import React from 'react';

const ProjectView = ({inputData}) => {
    console.log(inputData)
    return (
        <div className="text-center">
            <h1>{inputData.view.title}</h1>
            <img alt="" style={{width: "100%"}} src={inputData.view.src}/>
        </div>
    );
};

export default ProjectView;
