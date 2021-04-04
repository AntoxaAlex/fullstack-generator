import React, {useState,useEffect,useRef,useCallback} from "react";
import {useProjectContext} from "../../context/ProjectContext";
import ForceGraph3D from "react-force-graph-3d"
import ForceGraph2D from "react-force-graph-2d";

const Decomposition = ({project}) => {
    const projectCtx = useProjectContext();
    const diagramRef = useRef(null)
    const{
        activeTabs,
        openFileCreateModal,
        openFileModal,
        addNewFolder
    } = projectCtx
    const[diagramObj,setDiagramObj] = useState({
        div:null,
        width:null
    })
    const[diagramView,setDiagramView] = useState("2D")
    const[nodesData,setNodesData] = useState([])
    const[linksData,setLinksData] = useState([])

    useEffect(()=>{
        setDiagramObj({...diagramObj,div: diagramRef.current})
    },[activeTabs.decomposition])
    useEffect(()=>{
        if(diagramObj.div){
            setDiagramObj({...diagramObj,width: diagramObj.div.getBoundingClientRect().width})
        }
    },[diagramObj.div,window.ondeviceorientation])

    useEffect(()=>{
        if(project.frontend.files.concat(project.backend.files)){
            let nodes=[]
            project.frontend.files.concat(project.backend.files).map(file=>{
                nodes.push({
                    id: file._id.toString(),
                    name: file.title + ` (${file.folder && file.folder !== "" ? file.folder : "no folder"})`,
                    val: 0.5,
                    color: file.section === "frontend" ? "#f85032" : "#00B4DB"
                })
                setNodesData(nodes)
            })
        }
    },[project.frontend.files,project.backend.files])
    useEffect(()=>{
        if(project.interdependence){
            let links=[]
            project.interdependence.map(dep=>{
                links.push({
                    source: dep.sender._id.toString(),
                    target: dep.receiver._id.toString(),
                    name:dep.action,
                    width: 2,
                    color: dep.sender.section === "frontend" ? "#f85032" : "#00B4DB",
                })
                setLinksData(links)
            })
        }
    },[project.interdependence])
    const handleClick = useCallback(node=>{
        console.log(node)
        project.frontend.files.concat(project.backend.files).map((file,i)=>{
            if(node.id === file._id.toString()){
                openFileModal(file,i)
            }
        })
    })

    if(!activeTabs.decomposition) return null;
    return(
        <div>
            <div id="filesFolderBtnsDiv" className="text-center mb-2">
                <button type="button" className="createFileBtn" onClick={()=>addNewFolder()}><i className="fas fa-folder-plus"/></button>
                <button type="button" className="createFileBtn" onClick={()=>openFileCreateModal()}><i className="fas fa-file-signature"/></button>
            </div>
            <div id="diagramDiv" ref={diagramRef}>
                <div className="changeDiagramView d-flex">
                    <button type="button" className="transparentBtn" onClick={()=>setDiagramView("3D")}>3D</button>
                    <button type="button" className="transparentBtn" onClick={()=>setDiagramView("2D")}>2D</button>
                </div>
                {diagramView === "2D" ?
                    <ForceGraph2D
                        backgroundColor="rgb(20,20,20)"
                        graphData={{
                            nodes:nodesData,
                            links:linksData
                        }}
                        linkDirectionalArrowLength={3.5}
                        linkDirectionalArrowRelPos={1}
                        width={diagramObj.width}
                        height={diagramObj.width}
                        showNavInfo={false}
                        onNodeClick={handleClick}
                    />
                    :
                    <ForceGraph3D
                        backgroundColor="rgb(20,20,20)"
                        graphData={{
                            nodes:nodesData,
                            links:linksData
                        }}
                        linkDirectionalArrowLength={3.5}
                        linkDirectionalArrowRelPos={1}
                        width={diagramObj.width}
                        height={diagramObj.width}
                        showNavInfo={false}
                        onNodeClick={handleClick}
                    />
                }
            </div>
        </div>
    )
}

export default Decomposition