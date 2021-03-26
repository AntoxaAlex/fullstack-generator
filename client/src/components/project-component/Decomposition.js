import React, {useState} from "react";
import FilesContainers from "../decomposition-components/FilesContainers";
import Diagram from "../decomposition-components/Diagram";
import {useProjectContext} from "../../context/ProjectContext";

const Decomposition = ({id,project}) => {
    const projectCtx = useProjectContext();
    const{
        activeTabs,
        openFileCreateModal,
        removeFile,
        openFileModal,
        addNewFolder
    } = projectCtx

    const[decompositionPage,setDecompositionPage] = useState(true)
    if(!activeTabs.decomposition) return null;
    return(
        <div className="position-relative">
            <button type="button" className="changeDecompositionPage" onClick={()=>setDecompositionPage(!decompositionPage)}>
                {decompositionPage ? (<i className="fas fa-project-diagram"/>) : (<i className="far fa-file-alt"/>)}
            </button>
            {decompositionPage ?
                <FilesContainers
                id={id}
                openFile={(file,i)=>openFileModal(file,i)}
                project={project}
                openFileModal={()=>openFileCreateModal()}
                removeFile={(id,file_id)=>removeFile(id,file_id)}
                addNewFolder={()=>addNewFolder()}
                /> :
                <Diagram
                    theme={project.theme}
                    interdependence={project.interdependence}
                    files={project.frontend.files.concat(project.backend.files)}
                />
            }
        </div>
    )
}

export default Decomposition