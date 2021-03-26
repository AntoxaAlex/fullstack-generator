import React from 'react';
import NewProject from "../NewProject";
import NewUser from "./NewUser";
import ProjectView from "./ProjectView";
import NewViewTitle from "./NewViewTitle";
import NewFile from "./NewFile";
import NewFolder from "./NewFolder";
import File from "./File";
import EditGeneralInfo from "./EditGeneralInfo";
import AlertModal from "./AlertModal";

const Modal = ({closeModal,type,inputData}) => {
    return (
        <div className="modalBackground">
            <div className="modal-div">
                <div className="nav justify-content-end">
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={()=>closeModal()}>X</button>
                </div>
                {type === "newProject" &&
                    <NewProject/>
                }
                {type === "editInfo" &&
                    <EditGeneralInfo inputData={inputData}/>}
                {type === "newUser" &&
                    <NewUser inputData={inputData}/>
                }
                {type === "seeView" &&
                    <ProjectView inputData={inputData}/>
                }
                {type === "viewTitle" &&
                    <NewViewTitle inputData={inputData}/>
                }
                {type === "newFile" &&
                    <NewFile inputData={inputData}/>
                }
                {type === "newFolder" &&
                    <NewFolder inputData={inputData}/>
                }
                {type === "displayFile" &&
                <File inputData={inputData}/>}
                {type === "alert" &&
                <AlertModal/>
                }
            </div>
        </div>
    );
};

export default Modal;
