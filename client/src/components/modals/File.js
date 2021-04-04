import React, {Fragment, useState,useEffect} from "react";
import ForceGraph2D from 'react-force-graph-2d';

const File = ({inputData}) => {

    const[hiddenContent,setHiddenContent] = useState({
        isInterdepActive: true,
        isNewDepActive: false,
        submitButton: false
    })

    const{
        file,
        interdepFiles,
        files,
        fileIndex
    } = inputData

    const diagramSize = () => {
        console.log( document.body.scrollHeight)
        let value;
        if(document.body.scrollWidth > 900){
            value = 400;
        }else if(document.body.scrollWidth > 415 && document.body.scrollWidth < 900 && document.body.scrollHeight > 410){
            value = 200;
        } else if (document.body.scrollWidth < 415){
            value = 150
        }
        return value
    }

    const[nodesData,setNodesData] = useState([])
    const[linksData,setLinksData] = useState([])
    const selectFileImg = (type) => {
        if(type === "html"){
            return "https://res.cloudinary.com/antoxaalex/image/upload/v1615658671/fullstack-generator/html5-1_yncjw1.svg";
        }else if(type === "css"){
            return "https://res.cloudinary.com/antoxaalex/image/upload/v1615658669/fullstack-generator/css-5_hosf1y.svg";
        }else if(type === "js"){
            return "https://res.cloudinary.com/antoxaalex/image/upload/v1615658666/fullstack-generator/logo-javascript_hna3sy.svg";
        }
    }


    useEffect(()=>{
        if(interdepFiles){
            let nodes=[{
                id: file._id.toString(),
                name: file.title,
                val: 2,
                color: file.section === "frontend" ? "#f85032" : "#00B4DB"
            }]
            let links=[]
            interdepFiles.map(dep=>{
                if(dep.sender._id === file._id || dep.receiver._id === file._id){
                    links.push({
                        source: dep.sender._id.toString(),
                        target: dep.receiver._id.toString(),
                        name:dep.action,
                        width: 2,
                        color: dep.sender.section === "frontend" ? "#f85032" : "#00B4DB",
                    })
                    if(dep.sender._id === file._id){
                        nodes.push({
                            id: dep.receiver._id.toString(),
                            name: dep.receiver.title,
                            val: 4,
                            color: dep.receiver.section === "frontend" ? "#f85032" : "#00B4DB"
                        })
                    }else if(dep.receiver._id === file._id){
                        nodes.push({
                            id: dep.sender._id.toString(),
                            name: dep.sender.title,
                            val: 0.5,
                            color: dep.sender.section === "frontend" ? "#f85032" : "#00B4DB"
                        })
                    }
                    setNodesData(nodes)
                    setLinksData(links)
                }
            })
        }
    },[interdepFiles])


    return(
        <div id={file.type+"ModalDiv"} className="fileDiv">
            <h2 className="text-center">{file.title}</h2>
            <div className="featuresDiv">
                <div className="d-flex">
                    <p className="mb-3 mr-3">Type</p>
                    <img alt="" width={30} height={30} src={selectFileImg(file.type)}/>
                </div>
                <p className="mb-3">Features</p>
                <ul className="featuresList">
                    {file.features.map((feature,i)=>{
                        return(
                            <li key={i}>{feature.text}</li>
                        )
                    })}
                </ul>
            </div>
            <div className="text-center">
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={(e)=>inputData.removeFile(e,file)}>Delete file</button>
            </div>
            <ul className="nav nav-tabs">
                <li className="nav-item d-flex">
                    <button type="button" className="nav-link active" onClick={()=>setHiddenContent({...hiddenContent, isInterdepActive: true})}>Dependencies</button>
                </li>
            </ul>
            {nodesData.length === 0 || linksData.length === 0  ? (<div>
                <p>No depending files</p>
                <button type="button" className="btn btn-sm btn-outline-success mb-3" onClick={()=> {
                    setHiddenContent({...hiddenContent, isNewDepActive: !hiddenContent.isNewDepActive})
                    hiddenContent.isNewDepActive ? inputData.closeNewDep() : inputData.addNewDep()

                }}>Add dependent file</button>
            </div>) :<Fragment>
                <div className="fileDiagram">
                    <ForceGraph2D
                        backgroundColor="rgb(255,255,255)"
                        width={diagramSize()}
                        height={diagramSize()}
                        graphData={{
                            nodes:nodesData,
                            links:linksData
                        }}
                        autoPauseRedraw={false}
                        linkDirectionalArrowLength={3.5}
                        linkDirectionalArrowRelPos={1}
                    />
                </div>
                <hr/>
                <button type="button" className="btn btn-sm btn-outline-success mb-3" onClick={()=> {
                    setHiddenContent({...hiddenContent, isNewDepActive: !hiddenContent.isNewDepActive})
                    hiddenContent.isNewDepActive ? inputData.closeNewDep() : inputData.addNewDep()

                }}>Add dependent file</button>
            </Fragment>}

            {hiddenContent.submitButton && <button type="button" onClick={(e)=> {
                inputData.onSubmitDepForm(e);
                setHiddenContent({...hiddenContent, isNewDepActive: false, isInterdepActive:true,submitButton: !hiddenContent.submitButton})

            }}>Submit modifications</button>}

            {hiddenContent.isNewDepActive && <div>
                <form onSubmit={(e)=> {
                    inputData.onSubmitDepForm(e)
                    setHiddenContent({...hiddenContent, isNewDepActive: !hiddenContent.isNewDepActive})
                }}>
                    <div className="mb-3">
                        <select className="form-control" id="receiver" name="receiver" value={interdepFiles[fileIndex].receiver} onChange={(e)=>inputData.onChangeValue(e,fileIndex,file._id)} aria-label="Default select example">
                            <option value="">Select file</option>
                            <option value="">Frontend</option>
                            {files.filter(searchedFile=>searchedFile._id !== file._id && searchedFile.section === "frontend").map((file,i)=>{
                                return(
                                    <option key={i} value={file._id}>{file.title}</option>
                                )
                            })}
                            <option value="">Backend</option>
                            {files.filter(searchedFile=>searchedFile._id !== file._id && searchedFile.section === "backend").map((file,i)=>{
                                return(
                                    <option key={i} value={file._id}>{file.title}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" autoComplete="off" id="action" name="action" placeholder="Action" value={interdepFiles[fileIndex].action} onChange={(e)=>inputData.onChangeValue(e,fileIndex,file._id)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>}
        </div>
    )
}

export default File