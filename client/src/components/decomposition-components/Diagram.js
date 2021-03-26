import React, {useState,useEffect} from 'react';
import ForceGraph3D from "react-force-graph-3d"

const Diagram = ({theme,files,interdependence}) => {

    const[nodesData,setNodesData] = useState([])
    const[linksData,setLinksData] = useState([])
    useEffect(()=>{
        if(files){
            let nodes=[]
            files.map(file=>{
                nodes.push({
                    id: file._id.toString(),
                    name: file.title,
                    val: 0.5,
                    color: file.section === "frontend" ? "#f85032" : "#00B4DB"
                })
                setNodesData(nodes)
            })
        }
    },[])
    useEffect(()=>{
        if(interdependence){
            let links=[]
            interdependence.map(dep=>{
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
    },[])

    const diagramSize = () => {
        console.log( document.body.scrollHeight)
        let value;
       if(document.body.scrollWidth > 900){
            value = 850;
       }else if(document.body.scrollWidth > 415 && document.body.scrollWidth < 900 && document.body.scrollHeight > 410){
           value = 400;
       } else if (document.body.scrollWidth < 415){
           value = 250
       }
       return value
    }

    return (
        <div id="diagramDiv">
            <ForceGraph3D
                backgroundColor={theme === "dark" ? "rgb(33,33,33)" : "#fff"}
                graphData={{
                    nodes:nodesData,
                    links:linksData
                }}
                linkDirectionalArrowLength={3.5}
                linkDirectionalArrowRelPos={1}
                width={diagramSize()}
                height={diagramSize()}
                showNavInfo={false}
            />
        </div>
    );
};

export default Diagram;
