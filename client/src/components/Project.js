import React,{useEffect,Fragment} from "react";
import Loading from "./layout/Loading";

import {useProjectContext} from "../context/ProjectContext";

import {Redirect} from "react-router-dom";
import {useParams} from "react-router";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../actions/auth";
import {getProjectById,deleteProject,editProject} from "../actions/project";
import { createFile,editFile, removeFile} from "../actions/files"
import GeneralInfo from "./project-component/GeneralInfo";
import Checklist from "./project-component/Checklist";
import UI from "./project-component/UI";
import Decomposition from "./project-component/Decomposition";
import Modal from "./modals/Modal";


const Project = ({getProjectById, deleteProject, editProject,createFile, project:{project, loading,isProjectDeleted},auth}) =>{
    const{id} = useParams()

    const projectCtx = useProjectContext()

    const{
        activeTabs,
        formData,
        setFormData,
        goals,
        setGoals,
        folders,
        setFolders,
        users,
        setUsers,
        projectViewState,
        setProjectView,
        workingTime,
        setWorkingTime,
        modalForm,
        setModal,
        intedepData,
        setIntedepData,
        onChangeGoals,
        onChangeValue,
        onChangeUsers,
        addNewDep,
        onChangeFolder,
        onChangeFolderFiles,
        onChangeInterdep,
    } = projectCtx



    const{
        title,
        purpose,
        frontend,
        backend,
        checklist,
        theme
    } = formData


    useEffect(()=>{
        if(auth.token){
            getProjectById(id)
        }
    },[id,auth.token])
    useEffect(()=>{
        if(project){
            setFormData({...formData,
                title: loading || !project.title ? "" : project.title,
                purpose: loading || !project.purpose ? "" : project.purpose,
                theme: loading || !project.theme ? "" : project.theme,
                date: loading || !project.date ? null : project.date,
                projectView: loading || !project.projectView  ? [] : project.projectView,
                frontend: loading ? {} : project.frontend,
                backend: loading ? {} : project.backend,
                checklist: loading || !project.checklist ? [] : project.checklist
            })
            setWorkingTime(loading || !project.workingTime ? 0 : project.workingTime,)
            setIntedepData(loading || !project.interdependence ? null : project.interdependence)
            setGoals(  loading || !project.goals ? null : project.goals)
            setProjectView(  loading || !project.projectView ? null : project.projectView)
            setUsers(loading || !project.users ? null : project.users)
            setFolders(loading || !project.folders ? null : project.folders)
        }
    },[project])


    if(isProjectDeleted){
        return <Redirect to="/"/>
    }

    const removeView = (e,i) => {
        e.preventDefault();
        const viewArr = [...projectViewState]
        viewArr.splice(i,1)
        setProjectView(viewArr)
        editProject("manual",id,title,purpose,goals,users,frontend,backend,folders,checklist,intedepData,viewArr,workingTime)
    }

    const deleteFile= (e,file) => {
        e.preventDefault()
        if(file.section === "frontend"){
            const newFrontArr = formData.frontend.files.filter(searchedFile=>searchedFile._id !== file._id)
            setFormData({...formData,frontend:{files :newFrontArr}})

            const array = [...intedepData]
            const newInterDep = array.filter(item=>item.sender._id !== file._id && item.receiver._id !== file._id)
            setIntedepData(newInterDep)

            editProject("manual",id,title,purpose,goals,users, {files:newFrontArr,archType:formData.frontend.archType},backend,folders,checklist,newInterDep,projectViewState,workingTime,theme)
        } else if(file.section === "backend"){
            const newBackArr = formData.backend.files.filter(searchedFile=>searchedFile._id !== file._id)
            setFormData({...formData,backend:{files :newBackArr}})

            const array = [...intedepData]
            const newInterDep = array.filter(item=>item.sender._id !== file._id && item.receiver._id !== file._id)
            setIntedepData(newInterDep)
            editProject("manual",id,title,purpose,goals,users,frontend,{files:newBackArr,archType:formData.backend.archType},folders,checklist,newInterDep,projectViewState,workingTime,theme)
        }

    }

    const changeCheckbox = (listIndex,liIndex) => {
        const newChecklist = [...formData.checklist]
        newChecklist[listIndex].paragraphs[liIndex].isParCompleted = !newChecklist[listIndex].paragraphs[liIndex].isParCompleted
        setFormData({...formData,checklist: newChecklist})
        if(newChecklist[listIndex].paragraphs.filter(paragraph=>!paragraph.isParCompleted).length === 0){
            newChecklist[listIndex].isItemCompleted = true;
        } else {
            newChecklist[listIndex].isItemCompleted = false;
        }
        editProject("manual",id,title,purpose,goals,users,frontend,backend,folders,checklist,intedepData,projectViewState,workingTime,theme)
    }

    const onSubmitProject = (e) => {
        e.preventDefault();
        editProject("manual",id,title,purpose,goals,users,frontend,backend,folders,checklist,intedepData,projectViewState,workingTime,theme)
    }

    const onSubmitNewFile = (e,modalFormData,features) => {
        e.preventDefault();
        const{fileSection,folderIndex,fileType,fileTitle} = modalFormData
        createFile(id,folderIndex,project.folders.length > 0 ? project.folders[folderIndex].title : null,fileSection,fileType,fileTitle,features)
        setModal({...modalForm,fileCreateModal: {isModalActive: !modalForm.fileCreateModal.isModalActive}});
    }



    return( <Fragment>
            {!loading && project ? <main>
                {modalForm.editGeneralInfo.isModalActive &&
                    <Modal
                        closeModal={()=>setModal({...modalForm,editGeneralInfo: {isModalActive: false,name: "",value: ""}})}
                        type="editInfo"
                        inputData={{
                            inputValue: modalForm.editGeneralInfo.name === "title" ? title : modalForm.editGeneralInfo.name === "purpose" ? purpose : goals,
                            inputName: modalForm.editGeneralInfo.name,
                            onChangeValue:(e)=>onChangeValue(e),
                            onChangeGoals:(e,i)=>onChangeGoals(e,i),
                            onSubmitForm:(e)=> {
                                onSubmitProject(e)
                                setModal({...modalForm,editGeneralInfo: {isModalActive: false,name: "",value: ""}})
                            }
                        }}
                    />
                }
                {modalForm.fileCreateModal.isModalActive &&
                <Modal
                    closeModal={()=>setModal({...modalForm,fileCreateModal: {isModalActive: !modalForm.fileCreateModal.isModalActive}})}
                    type="newFile"
                    inputData={{
                        folders: folders,
                        onSubmitForm: (e,modalFormData,features)=>onSubmitNewFile(e,modalFormData,features)
                    }}
                />}
                {modalForm.fileModal.isModalActive &&
                    <Modal
                        closeModal={()=> {
                            setModal({...modalForm, fileModal: {isModalActive: !modalForm.fileModal.isModalActive}})
                        }}
                        type="displayFile"
                        inputData={{
                            file:modalForm.fileModal.file,
                            interdepFiles:intedepData,
                            files:project.frontend.files.concat(project.backend.files),
                            fileIndex:intedepData.length-1,
                            closeNewDep:()=>{
                                const newInterdep = [...intedepData]
                                newInterdep.splice(intedepData.length-1,1)
                                setIntedepData(newInterdep)
                            },
                            addNewDep:()=>addNewDep(),
                            onSubmitDepForm:(e)=>onSubmitProject(e),
                            onChangeValue:(e,i,id)=>onChangeInterdep(e,i,id),
                            removeFile: (e,file)=>deleteFile(e,file)
                        }}
                    />}
                {modalForm.viewModal.isModalActive &&
                    <Modal
                        closeModal={()=> {
                            setModal({...modalForm, viewModal: {isModalActive: false,view: null}})
                        }}
                        type="seeView"
                        inputData={{
                            view:modalForm.viewModal.view,
                            viewIndex: modalForm.viewModal.index,
                            onSubmitUI:(e)=>onSubmitProject(e)
                        }}
                    />
                }
                {modalForm.addUserModal.isModalActive &&
                    <Modal
                        closeModal={()=> {
                            setModal({...modalForm, addUserModal: {isModalActive: false,index: ""}})
                            const usersArr = [...users];
                            usersArr.splice(modalForm.addUserModal.index,1);
                            setUsers(usersArr)
                        }}
                        type="newUser"
                        inputData={{
                            users:users,
                            index: modalForm.addUserModal.index,
                            onChangeValue:(e,i)=>onChangeUsers(e,i),
                            onSubmitForm:(e)=>onSubmitProject(e)
                        }}
                    />
                }
                {modalForm.addFolderModal.isModalActive && folders.length > 0 &&
                    <Modal
                        closeModal={()=> {
                            setModal({...modalForm, addFolderModal: {isModalActive: false,index: null}})
                            const foldersArr = [...folders];
                            foldersArr.splice(folders.length-1,1);
                            setFolders(foldersArr)
                        }}
                        type="newFolder"
                        inputData={{
                            files: project.frontend.files.concat(project.backend.files),
                            folderIndex: folders.length-1,
                            folderSection: folders[folders.length-1].section,
                            folderTitle:folders[folders.length-1].title,
                            folderFiles:folders[folders.length-1].files,
                            onChangeValue:(e,i)=>onChangeFolder(e,i),
                            onChangeFolderFiles:(value,i)=>onChangeFolderFiles(value,i),
                            onSubmitForm: (e)=> {
                                onSubmitProject(e)
                                setModal({...modalForm,addFolderModal: {isModalActive: false,index: null}})
                            }
                        }}
                    />
                }
                <div id="project-main">
                    <div id="project-content">
                        <GeneralInfo
                            id={id}
                            project={project}
                            onSubmitForm={(e)=>onSubmitProject(e)}
                            onChangeValue={(e)=>onChangeValue(e)}
                            onChangeGoals={(e,i)=>onChangeGoals(e,i)}
                            deleteProject={(id)=>deleteProject(id)}
                        />
                        <Decomposition
                            id={id}
                            project={project}
                        />
                        <Checklist
                            checklist={project.checklist}
                            changeCheckbox={(listIndex,liIndex)=>changeCheckbox(listIndex,liIndex)}
                        />
                        {activeTabs.ui && <UI
                            removeView={(e,i)=>removeView(e,i)}
                        />}
                    </div>
                </div>
            </main> : <Loading/>}
    </Fragment>
    )
}

Project.protoTypes = {
    project: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    getProjectById: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    editProject: PropTypes.func.isRequired,
    createFile: PropTypes.func.isRequired,
    createSubfile: PropTypes.func.isRequired,
    editFile: PropTypes.func.isRequired,
    removeFile: PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    project: state.project,
    auth: state.auth
})

export default connect(mapStateToProps,{getProjectById, deleteProject, editProject, createFile,removeFile,editFile,logout})(Project)