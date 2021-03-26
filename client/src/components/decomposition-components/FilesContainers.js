import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const FilesContainers = ({id,project,openFileModal,removeFile,openFile,addNewFolder}) => {

    const hideFolder = (section,index) => {
        const row = document.querySelector("#"+section+"folderContainer" + index + " .projectGridEndSection");
        if(row.classList.contains("opened")){
            row.classList.remove("opened")
            setTimeout(()=>{
                row.classList.toggle("collapsed")
            },500)
        } else {
            row.classList.toggle("collapsed");
            setTimeout(()=>{
                row.classList.add("opened")
            },500)
        }

    }
    const addHiddenBtn = (section,folderIndex,i) => {
        document.querySelector("#"+section+"folderFile"+folderIndex+i).classList.add("showBtn")
    }
    const removeHiddenBtn = (section,folderIndex,i) => {
        document.querySelector("#"+section+"folderFile"+folderIndex+i).classList.remove("showBtn")
    }

    return (
        <section id="files-containers">
            <div>
                <div id="filesFolderBtnsDiv" className="text-center">
                    <button type="button" className="createFileBtn" onClick={()=>addNewFolder()}><i className="fas fa-folder-plus"/></button>
                    <button type="button" className="createFileBtn" onClick={()=>openFileModal()}><i className="fas fa-file-signature"/></button>
                </div>
                <div id="ends" className="row">
                    <div className="col-12 col-lg-6">
                        <div id="frontFilesContainer" className="filesContainer">
                            {project.folders.filter(folder=>folder.section === "frontend").map((folder,folderIndex)=>{
                                return(
                                    <div key={uuidv4()} className="folderDiv">
                                        <div className="folderPanel">
                                            <p className="m-0">{folder.title}</p>
                                            <button className="transparentBtn"  onClick={()=> {
                                                if(folder.files.length>0){
                                                    hideFolder(folder.section, folderIndex)
                                                }
                                            }}><i className="fas fa-minus"/></button>
                                        </div>
                                        <div id={folder.section+"folderContainer" + folderIndex} className="folderContainer">
                                            <div className="projectGridEndSection opened">
                                                {folder.files.map((file,i)=>{
                                                    return(
                                                        <div id={folder.section+"folderFile"+folderIndex+i} key={uuidv4()} className="folderItem" onMouseEnter={()=>addHiddenBtn(folder.section,folderIndex,i)} onMouseLeave={()=>removeHiddenBtn(folder.section,folderIndex,i)}>
                                                            <div className="folderFile" onMouseDown={()=>openFile(file.file,i)}>
                                                                <div className="folderFileImg">
                                                                    <img alt="" width={50} src={file.file.type === "html" ? "https://res.cloudinary.com/antoxaalex/image/upload/v1615658671/fullstack-generator/html5-1_yncjw1.svg" :
                                                                        (file.file.type === "css" ? "https://res.cloudinary.com/antoxaalex/image/upload/v1615658669/fullstack-generator/css-5_hosf1y.svg" :
                                                                            (file.file.type === "js" ? "https://res.cloudinary.com/antoxaalex/image/upload/v1615658666/fullstack-generator/logo-javascript_hna3sy.svg" : "https://res.cloudinary.com/antoxaalex/image/upload/v1616014365/fullstack-generator/files_xsvvka.svg"))}/>
                                                                </div>
                                                                <h5 className="card-title">{file.file.title}</h5>
                                                            </div>
                                                            <div className="hiddenBtnDiv">
                                                                <button className="btn btn-sm btn-outline-danger" onClick={()=>removeFile(id,file.file._id)}>X</button>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div id="backFilesContainer"  className="filesContainer">
                            {project.folders.filter(folder=>folder.section === "backend").map((folder,folderIndex)=>{
                                return(
                                    <div key={uuidv4()} className="folderDiv">
                                        <div className="folderPanel">
                                            <p className="m-0">{folder.title}</p>
                                            <button className="transparentBtn" onClick={()=>{
                                                if(folder.files.length>0){
                                                    hideFolder(folder.section, folderIndex)
                                                }
                                            }}><i className="fas fa-minus"/></button>
                                        </div>
                                        <div id={folder.section+"folderContainer" + folderIndex} className="folderContainer">
                                            <div className="projectGridEndSection opened">
                                                {folder.files.map((file,i)=>{
                                                    return(
                                                        <div id={folder.section+"folderFile"+folderIndex+i} key={uuidv4()} className="folderItem" onMouseEnter={()=>addHiddenBtn(folder.section,folderIndex,i)} onMouseLeave={()=>removeHiddenBtn(folder.section,folderIndex,i)}>
                                                            <div className="folderFile" onMouseDown={()=>openFile(file.file,i)}>
                                                                <div className="folderFileImg">
                                                                    <img alt="" width={50} src={file.file.type === "html" ? "https://res.cloudinary.com/antoxaalex/image/upload/v1615658671/fullstack-generator/html5-1_yncjw1.svg" :
                                                                        (file.file.type === "css" ? "https://res.cloudinary.com/antoxaalex/image/upload/v1615658669/fullstack-generator/css-5_hosf1y.svg" :
                                                                            (file.file.type === "js" ? "https://res.cloudinary.com/antoxaalex/image/upload/v1615658666/fullstack-generator/logo-javascript_hna3sy.svg" : "https://res.cloudinary.com/antoxaalex/image/upload/v1616014365/fullstack-generator/files_xsvvka.svg"))}/>
                                                                </div>
                                                                <h5 className="card-title">{file.file.title}</h5>
                                                            </div>
                                                            <div className="hiddenBtnDiv">
                                                                <button className="btn btn-sm btn-outline-danger" onClick={()=>removeFile(id,file.file._id)}>X</button>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilesContainers;
