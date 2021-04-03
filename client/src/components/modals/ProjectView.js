import React,{useState,useRef,useEffect,Fragment} from 'react';
import { Stage, Layer, Rect, Image} from 'react-konva';
import Konva from 'konva';
import Shape from "../create_ui_components/Shape";
import SettingBar from "../create_ui_components/SettingBar";
import {useProjectContext} from "../../context/ProjectContext";


const ProjectView = ({inputData}) => {
    const{
        view,
        viewIndex
    } = inputData

    const projectCtx = useProjectContext();
    const{
        onChangeProjectView
    } = projectCtx

    const viewRef = useRef(null)
    const canvasRef = useRef(null)
    const bgRef =useRef(null)

    const[canvas,setCanvas] = useState(null)
    const[canvasContent,setCanvasContent] = useState([])
    const[selectedIndex,setIndex] = useState(null)
    const[image,setImage] = useState(null)


    useEffect(()=>{
        setCanvas(viewRef.current)
    },[])
    useEffect(()=>{
        if(canvasContent.length>0 && canvasContent.filter(item=>item.selected === false).length === canvasContent.length) setIndex(null)
    })
    useEffect(()=>{
        if(view.src){
            const img = new window.Image();
            img.src = view.src
            img.onload = () => {
                setImage(img)
            }
        }
    },[view])
     const checkDeselect = (e) => {
        // deselect when clicked on empty area
        if ( e.target.attrs.name === "backgroundRect" || e.target.attrs.name ===  "backgroundImage") {
            const contentArray = [...canvasContent]
            contentArray.map(item=>{
                if(item.selected){
                    item.selected = false;
                }
            })
            setCanvasContent(contentArray)
        }
    };
    const selectItem = (index) => {
        const contentArray = [...canvasContent]
        contentArray[index].selected = !contentArray[index].selected
        contentArray.map((item,i)=>{
            if(item.selected && i !== index){
                item.selected = false;
            }
        })
        setCanvasContent(contentArray)
        setIndex(index)
    }
    const dragItem = (e,i) => {
        const newX = e.target.x();
        const newY = e.target.y();
        const contentArray = [...canvasContent];
        contentArray[i].x = newX;
        contentArray[i].y = newY;
        setCanvasContent(contentArray)
    }

    const onChangeShape = (name,value,i)=>{
        const contentArray = [...canvasContent];
        contentArray[i][name] = value;
        setCanvasContent(contentArray)
    }

    const onChangeItem = (i, node, scaleX, scaleY) => {
        const contentArray = [...canvasContent];
        contentArray[i].x = node.x();
        contentArray[i].y = node.y();
        contentArray[i].width = Math.max(5, node.width() * scaleX)
        contentArray[i].height = Math.max( node.height() * scaleY)
        setCanvasContent(contentArray)
    }

    const saveImage = (e) => {
        onChangeProjectView(canvasRef.current.toDataURL(),viewIndex)
        inputData.onSubmitUI(e)
    }

    const pushRect = (type) => {
        const contentArray = [...canvasContent];
        contentArray.push({
            type: type,
            x:canvas.getBoundingClientRect().width/2,
            y:canvas.getBoundingClientRect().height/2,
            width:100,
            height:100,
            background: "#ffffff",
            borderColor:"#000000",
            borderWidth:1,
            borderRadius:0,
            selected:false
        })
        return contentArray
    }
    const pushCircle = (type) => {
        const contentArray = [...canvasContent];
        contentArray.push({
            type: type,
            x:canvas.getBoundingClientRect().width/2,
            y:canvas.getBoundingClientRect().height/2,
            radius: 50,
            background: "#ffffff",
            borderColor:"#000000",
            borderWidth:1,
            selected:false
        })
        return contentArray
    }
    const pushLine = (type) => {
        const contentArray = [...canvasContent];
        contentArray.push({
            type: type,
            x:canvas.getBoundingClientRect().width/2,
            y:canvas.getBoundingClientRect().height/2,
            width:100,
            height:2,
            color: "#000000",
            selected:false
        })
        return contentArray
    }
    const pushText = (type) => {
        const contentArray = [...canvasContent];
        contentArray.push({
            type: type,
            x:canvas.getBoundingClientRect().width/2,
            y:canvas.getBoundingClientRect().height/2,
            text:"Hello",
            width:100,
            height:40,
            fontSize:22,
            color: "#000000",
            selected:false
        })
        return contentArray
    }

    const addItem = (type) => {
        switch (type) {
            case "rect":
                setCanvasContent(pushRect(type))
                break;
            case "circle":
                setCanvasContent(pushCircle(type))
                break;
            case "line":
                setCanvasContent(pushLine(type))
                break;
            case "doubleArrow":
                setCanvasContent(pushLine(type))
                break;
            case "singleArrow":
                setCanvasContent(pushLine(type))
                break;
            case "text":
                setCanvasContent(pushText(type))
                break;
            default: return canvasContent;
        }
    }
    const deleteItem = () => {
        if(selectedIndex !== null){
            const newCanvasContent = canvasContent.filter((item,i)=>selectedIndex !== i)
            setCanvasContent(newCanvasContent)
            setIndex(null)
        }
    }
    return (
        <div id="projectViewDiv">
            <div id="toolsDiv">
                <button  className="transparentBtn"><i className="far fa-save" onClick={(e)=>saveImage(e)}/></button>
                <button id={selectedIndex !== null ? "" : "disBtn"}  className="transparentBtn"><i className="far fa-trash-alt" onClick={()=>deleteItem()}/></button>
                <button  className="transparentBtn"><i className="fas fa-square" onClick={()=>addItem("rect")}/></button>
                <button  className="transparentBtn"><i className="far fa-circle" onClick={()=>addItem("circle")}/></button>
                <button  className="transparentBtn"><i className="fas fa-grip-lines-vertical" onClick={()=>addItem("line")}/></button>
                <button  className="transparentBtn"><i className="fas fa-arrows-alt-v" onClick={()=>addItem("doubleArrow")}/></button>
                <button  className="transparentBtn"><i className="fas fa-arrow-up" onClick={()=>addItem("singleArrow")}/></button>
                <button  className="transparentBtn"><i className="fas fa-font" onClick={()=>addItem("text")}/></button>
                <button  className="transparentBtn"><i className="fas fa-eraser" onClick={()=> {
                    setCanvasContent([])
                }}/></button>
            </div>
            <div id="canvasSettingsDiv">
                <div id="settingsDiv">
                    {canvasContent.length > 0 && <SettingBar
                        canvasContent={ canvasContent[selectedIndex]}
                        index={selectedIndex}
                        onChangeSetting={(name,value,i)=>onChangeShape(name,value,i)}
                    />}
                </div>
                <div ref={viewRef}  id="createUIDiv">
                    {canvas &&
                    <Stage
                        ref={canvasRef}
                        width={canvas.getBoundingClientRect().width}
                        height={canvas.getBoundingClientRect().height}
                        onMouseDown={(e)=>checkDeselect(e)}
                        onTouchStart={(e)=>checkDeselect(e)}
                    >
                        <Layer>
                            {!view ? <Rect ref={bgRef} name="backgroundRect" width={canvas.getBoundingClientRect().width} height={canvas.getBoundingClientRect().height} fill="white" />
                            : <Image name="backgroundImage" image={image} width={canvas.getBoundingClientRect().width} height={canvas.getBoundingClientRect().height}/>}
                            {canvasContent.map((layer,i)=>{
                                return(
                                    <Shape
                                        key={i}
                                        i={i}
                                        shape={layer}
                                        selectItem={(i)=>selectItem(i)}
                                        dragItem={(e,i)=>dragItem(e,i)}
                                        onChangeItem={(i,node,scaleX,scaleY)=>onChangeItem(i,node,scaleX,scaleY)}
                                    />
                                )
                            })}
                        </Layer>
                    </Stage>}
                </div>
            </div>
        </div>
    );
};


export default ProjectView;
