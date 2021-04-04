import React, {Fragment, useState, useEffect} from "react";
import Modal from "../modals/Modal";

import {useProjectContext} from "../../context/ProjectContext";

const UI = ({removeView}) => {

    const projectCtx = useProjectContext();
    const{
        openProjectView,
        projectViewState,
        addNewView,
        removeTextView,
        onChangeViewTitle
    } = projectCtx


    const[isAlertModalActive,setAlertModal] = useState(false)
    const[isTextModalOpened,setViewTextModal] = useState(false)
    useEffect(()=>{
        if(document.body.scrollWidth < 415){
            setAlertModal(true)
        }
    },[document.body.scrollWidth])

    const addNewCanvas = async (e) => {
        e.preventDefault();
        setViewTextModal(!isTextModalOpened)
        openProjectView(projectViewState[projectViewState.length-1],projectViewState.length-1)
    }
    return(
        <Fragment>
            {isAlertModalActive &&
                <Modal
                    closeModal={()=> {
                        if(document.body.scrollWidth > 415){
                            setAlertModal(false)
                        }
                    }}
                    type="alert"
                />
            }
            {isTextModalOpened && document.body.scrollWidth > 415 &&
            <Modal
                closeModal={()=> {
                    setViewTextModal(!isTextModalOpened)
                    removeTextView(projectViewState.length-1)
                }}
                type="viewTitle"
                inputData={{
                    fileIndex:projectViewState.length-1,
                    viewTitle:projectViewState[projectViewState.length-1].title,
                    onChangeValue: (e,i)=> {
                        const {value} = e.target;
                        onChangeViewTitle(value, i)
                    },
                    onSubmitForm: (e)=>addNewCanvas(e)
                }}
            />}
            <div id="viewsRow">
                <button
                    type="button"
                    onClick={()=> {
                        addNewView()
                        setViewTextModal(!isTextModalOpened)
                    }}
                    className="createViewBtn"
                >
                    <i className="fas fa-plus"/>
                </button>
                {projectViewState.map((view,i)=>{
                    return(
                        <div key={i} id={"rowItem" + i} className="viewsRowItem collapsed" style={{backgroundImage:`url(${projectViewState[i].image})`}}>
                            <div className="bottomPanel">
                                <h5 className="text-center">{view.title}</h5>
                                <div style={{display: "flex",alignItems:"center",justifyContent: "space-around"}}>
                                    <button type="button" className="btn btn-sm btn-primary" onClick={()=>openProjectView(view,i)}>See view</button>
                                    <button type="button" className="btn btn-sm btn-danger" onClick={(e)=>removeView(e,i)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}
export default UI