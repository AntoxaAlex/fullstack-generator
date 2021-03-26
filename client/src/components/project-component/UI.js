import React, {Fragment, useState, useEffect, useRef} from "react";
import { v4 as uuidv4 } from 'uuid';

import PropTypes from "prop-types";
import {connect} from "react-redux"

import ToolBar from "../create_ui_components/ToolBar";
import {setTool,setCanvas} from "../../actions/ui";
import SettingBar from "../create_ui_components/SettingBar";
import Modal from "../modals/Modal";

import {useProjectContext} from "../../context/ProjectContext";

const UI = ({removeView,setCanvas,setTool,onSubmitUI,ui:{canvas,tool,loading}}) => {

    const projectCtx = useProjectContext();
    const{
        activeTabs,
        projectViewState,
        addNewView,
        removeTextView,
        onChangeProjectView,
        onChangeViewTitle
    } = projectCtx


    const[isAlertModalActive,setAlertModal] = useState(false)
    const[isTextModalOpened,setViewTextModal] = useState(false)
    const[viewState,setView] = useState({
        isViewOpened: false,
        index: null,
        backgroundColor: ""
    })
    const[uiData,setUiData] = useState({
        canvas:null,
        ctx:null,
        toolItem:"",
        mouseDown:false
    })

    const[coordinates, setCoordinates] = useState({
        startX: "",
        startY: "",
        currentX: "",
        currentY: "",
        width: "",
        height:"",
        savedImg: null
    })


    const[settingsData,setSettingsData] = useState({
        brush:{
            lineWidth:"",
            lineColor:"#000000"
        },
        rectangular:{
            lineWidth:"",
            lineColor:"#000000",
            backgroundColor:"#000000"
        },
        circle:{
            lineWidth:"",
            lineColor:"#000000",
            backgroundColor:"#000000",
            radius: ""
        },
        line:{
            lineWidth:"",
            lineColor:"#000000"
        },
        eraser:{
            lineWidth:""
        },
        text:{
            text:"",
            fontSize:"",
            fontStyle: "",
            fontColor: "#000000"
        }
    })

    let {
        startX,
        startY,
        savedImg
    } = coordinates

    const canvasRef = useRef(null)

    const[settingBarState, setSettingBarState] = useState({
        isSettingBarActive: false,
        settings: null
    })
    const[isShapedDivActive,setShapesDiv] = useState(false);

    const[undoList,setUndoList] = useState([])
    const[redoList,setRedoList] = useState([])


    useEffect(()=>{
        setCanvas(canvasRef.current)
    },[viewState.isViewOpened])

    useEffect(()=>{
        setUiData({...uiData,
            canvas: loading || !canvas ? null : canvas,
            ctx: loading || !canvas ? null : canvas.getContext("2d"),
            toolItem: loading || !tool ? null : tool
        })
    },[canvas,tool,activeTabs.ui])

    // useEffect(()=>{
    //     if(uiData.ctx && uiData.canvas){
    //         const img = new Image();
    //         img.src = projectViewState[0]
    //         img.onload = () => {
    //             uiData.ctx.drawImage(img,0,0,canvas.width,canvas.height);
    //         }
    //
    //     }
    // },[uiData.ctx,uiData.canvas])

    useEffect(()=>{
        if(document.body.scrollWidth < 415){
            setAlertModal(true)
        }
    },[document.body.scrollWidth])

    useEffect(()=>{
        if(uiData.ctx && activeTabs.ui && canvas && uiData.ctx){
            console.log(uiData.ctx)
            console.log(viewState.index)
            const img = new Image();
            img.src = viewState.index ? projectViewState[viewState.index].src : projectViewState[0].src
            img.onload = () => {
                uiData.ctx.clearRect(0,0,canvas.width,canvas.height)
                uiData.ctx.drawImage(img,0,0,canvas.width,canvas.height)
                console.log("Inage done")
            }
        }
    },[viewState.index,uiData.ctx,activeTabs.ui])


    const addNewCanvas = async (e) => {
        e.preventDefault();
        setViewTextModal(!isTextModalOpened)
        try {
            await setView({...viewState,isViewOpened: true})
            uiData.ctx.clearRect(0,0,canvas.width,canvas.height)
            onChangeProjectView(uiData.canvas.toDataURL(),viewState.index)
        }catch (e) {
            console.log(e.message)
        }
    }

    const openView = (index) => {
        setView({...viewState, isViewOpened: true,index: index });
    }

    const onMouseUp = (e) => {
        setUiData({...uiData,mouseDown: false})
    }
    const onMouseDown = (e) => {
        setUiData({...uiData,mouseDown: true})
        setCoordinates({...coordinates,startX: e.pageX - e.target.offsetLeft,startY: e.pageY - e.target.offsetTop,savedImg: uiData.canvas.toDataURL()})
        onChangeProjectView(uiData.canvas.toDataURL(),viewState.index)
        pushToUndo(uiData.canvas.toDataURL())
        uiData.ctx.beginPath()
        if(uiData.toolItem === "brush" || uiData.toolItem === "eraser"){
            uiData.ctx.moveTo(e.pageX - e.target.offsetLeft,e.pageY - e.target.offsetTop)
        }
    }
    const onMouseMove = (e) => {
        const currentX = e.pageX - e.target.offsetLeft
        const currentY = e.pageY - e.target.offsetTop
        if(uiData.mouseDown){
            onChangeProjectView(uiData.canvas.toDataURL(),viewState.index)
            if(uiData.toolItem === "brush"){
                drawBrush(e.pageX - e.target.offsetLeft,e.pageY - e.target.offsetTop)
            } else if(uiData.toolItem === "rectangular"){
                const width = currentX - startX
                const height = currentY - startY
                drawRect(startX,startY,width,height)
            }  else if(uiData.toolItem === "circle"){
                const r = Math.sqrt(Math.pow(currentX-startX,2) + Math.pow(currentY-startY,2))
                drawCircle(startX,startY,r,0,2*Math.PI)
            } else if(uiData.toolItem === "line"){
                drawLine(currentX,currentY)
            } else if(uiData.toolItem === "eraser"){
                erase(e.pageX - e.target.offsetLeft,e.pageY - e.target.offsetTop)
            } else if(uiData.toolItem === "text"){
                const width = currentX - startX
                drawTextField(e,startX,startY,width)
            }
        }
    }

    const onKeyDown = (e) =>{
        if(uiData.toolItem === "text"){
            console.log(e)
            drawTextField(e,startX,startY)
        }
    }

    const drawBrush = (x,y) => {
        const{
            lineColor,
            lineWidth
        } = settingsData.brush
        uiData.ctx.lineTo(x,y);
        uiData.ctx.stroke();
        uiData.ctx.strokeStyle = settingsData.brush.lineColor !== "" ? lineColor : "#000"
        uiData.ctx.lineWidth = settingsData.brush.lineWidth !== "" ? lineWidth : 10
    }
    const drawRect = (x,y,w,h) => {
        const {
            lineColor,
            lineWidth,
            backgroundColor
        } = settingsData.rectangular
        const img = new Image();
        img.src = savedImg
        img.onload = () => {
            uiData.ctx.clearRect(0,0,canvas.width,canvas.height)
            uiData.ctx.drawImage(img,0,0,canvas.width,canvas.height);
            uiData.ctx.beginPath();
            uiData.ctx.rect(x,y,w,h);
            uiData.ctx.fill();
            uiData.ctx.strokeStyle = settingsData.rectangular.lineColor !== "" ? lineColor : (settingsData.rectangular.backgroundColor !== "" ? backgroundColor : "#000")
            uiData.ctx.fillStyle = settingsData.rectangular.backgroundColor !== "" ? backgroundColor : "#000"
            uiData.ctx.lineWidth = settingsData.rectangular.lineWidth !== "" ? lineWidth : 1
            uiData.ctx.stroke();
        }
    }
    const drawCircle = (x1,y1, r, startAngle,endAngle) => {
        const{
            lineColor,
            lineWidth,
            backgroundColor
        } = settingsData.circle
        const img = new Image();
        img.src = savedImg
        img.onload = () => {
            uiData.ctx.clearRect(0,0,canvas.width,canvas.height)
            uiData.ctx.drawImage(img,0,0,canvas.width,canvas.height);
            uiData.ctx.beginPath();
            uiData.ctx.arc(x1,y1,r,startAngle,endAngle);
            uiData.ctx.strokeStyle = settingsData.circle.lineColor !== "" ? lineColor : (settingsData.circle.backgroundColor !== "" ? backgroundColor : "#000")
            uiData.ctx.fillStyle = settingsData.circle.backgroundColor !== "" ? backgroundColor : "#000"
            uiData.ctx.lineWidth = settingsData.circle.lineWidth !== "" ? lineWidth : 1
            uiData.ctx.fill();
            uiData.ctx.stroke();
        }
    }
    const drawLine = (x,y) => {
        const{
            lineColor,
            lineWidth
        } = settingsData.line
        const img = new Image();
        img.src = savedImg
        img.onload = () => {
            uiData.ctx.clearRect(0,0,canvas.width,canvas.height)
            uiData.ctx.drawImage(img,0,0,canvas.width,canvas.height);
            uiData.ctx.beginPath();
            uiData.ctx.moveTo(startX,startY)
            uiData.ctx.lineTo(x,y);
            uiData.ctx.strokeStyle = settingsData.line.lineColor !== "" ? lineColor : "#000"
            uiData.ctx.lineWidth = settingsData.line.lineWidth !== "" ? lineWidth : 1
            uiData.ctx.stroke();
        }
    }
    const erase = (x,y) => {
        const {lineWidth} = settingsData.eraser
        uiData.ctx.lineTo(x,y);
        uiData.ctx.stroke();
        uiData.ctx.strokeStyle = '#ffffff'
        uiData.ctx.lineWidth = settingsData.eraser.lineWidth !== "" ? lineWidth : 1
        console.log("brush")
    }

    const drawTextField = (e,x,y,w) =>{
        const {
            text,
            fontColor,
            fontSize,
            fontStyle
        } = settingsData.text
        const img = new Image();
        img.src = savedImg
        img.onload = () => {
            uiData.ctx.clearRect(0,0,canvas.width,canvas.height)
            uiData.ctx.drawImage(img,0,0,canvas.width,canvas.height);
            uiData.ctx.beginPath();
            uiData.ctx.font = `${settingsData.text.fontSize !== "" ? fontSize : 12}px ${settingsData.text.fontStyle !== "" ? fontStyle : "serif"}`;
            uiData.ctx.fillText(text,x,y,w)
            uiData.ctx.fillStyle = settingsData.text.fontColor !== "" ? fontColor : "#000"

        }
    }

    const onChangeSetting = (e,tool) => {
        const {name,value} = e.target;
        setSettingsData({...settingsData,[tool]:{...settingsData[tool],[name]:value}})
    }

    const setSetting = (value) => {
        setSettingBarState({isSettingBarActive: true,settings: value})
    }

    const pushToUndo = (data) =>{
        const undoArr = [...undoList]
        undoArr.push(data)
        setUndoList(undoArr)
    }

    const pushToRedo = (data) => {
        const redoArr = [...redoList]
        redoArr.push(data)
        setRedoList(redoArr)
    }

    const undo = () => {
        if(undoList.length > 0) {
            let dataUrl = undoList.pop();
            console.log(dataUrl)
            pushToRedo(uiData.canvas.toDataURL())
            let img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                uiData.ctx.clearRect(0,0,uiData.canvas.width,uiData.canvas.height);
                uiData.ctx.drawImage(img,0,0,uiData.canvas.width,uiData.canvas.height)
            }
        }else {
            uiData.ctx.clearRect(0,0,uiData.canvas.width,uiData.canvas.height)
        }
    }
    const redo = () => {
        if(redoList.length > 0) {
            let dataUrl = redoList.pop();
            pushToUndo(uiData.canvas.toDataURL())
            let img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                uiData.ctx.clearRect(0,0,uiData.canvas.width,uiData.canvas.height);
                uiData.ctx.drawImage(img,0,0,uiData.canvas.width,uiData.canvas.height)
            }
        }
    }

    const clearCanvas = () => {
        pushToUndo(uiData.canvas.toDataURL())
        uiData.ctx.clearRect(0,0,uiData.canvas.width,uiData.canvas.height)
        onChangeProjectView(uiData.canvas.toDataURL())
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
                    backgroundColor: viewState.backgroundColor === "" ? "#fff" : viewState.backgroundColor,
                    onChangeValue: (e,i)=> {
                        const {value} = e.target;
                        onChangeViewTitle(value, i)
                        setView({...viewState,index: projectViewState.length-1})
                    },
                    onChangeColor:(color)=>setView({...viewState, backgroundColor: color}),
                    onSubmitForm: (e)=>addNewCanvas(e)
                }}
            />}
            <div id="viewsRow">
                {projectViewState.map((view,i)=>{
                    return(
                        <div key={uuidv4()}>
                            <img alt="" width={70} height={70} src={projectViewState[i].src}/>
                            <p>{view.title}</p>
                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={()=>openView(i)}>See view</button>
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={(e)=>removeView(e,i)}>Delete</button>
                        </div>
                    )
                })}
                <button
                    type="button"
                    onClick={()=> {
                        addNewView()
                        setViewTextModal(!isTextModalOpened)
                    }}
                    className="transparentBtn"
                >
                    <i className="fas fa-plus"/>
                </button>
            </div>
            {viewState.isViewOpened && document.body.scrollWidth > 415 && <div className="drawingSection">
                <div className="canvasDiv">
                    <ToolBar
                        setTool={(tool)=> {
                            setTool(tool)
                            setCoordinates({
                                startX: "",
                                startY: "",
                                currentX: "",
                                currentY: "",
                                width: "",
                                height: ""
                            })
                        }}
                        setShapes={()=>setShapesDiv(!isShapedDivActive)}
                        setSetting={(value)=>setSetting(value)}
                        isShapedDivActive={isShapedDivActive}
                        undo={()=>undo()}
                        redo={()=>redo()}
                        clearCanvas={()=>clearCanvas()}
                        save={(e)=> {
                            uiData.ctx.globalCompositeOperation = 'destination-over'
                            uiData.ctx.fillStyle = viewState.backgroundColor;
                            uiData.ctx.fillRect(0, 0, canvas.width, canvas.height);
                            onChangeProjectView(uiData.canvas.toDataURL(),viewState.index)
                            onSubmitUI(e)
                            setView({...viewState,isViewOpened: false})
                        }}

                    />
                    <div className="canvasFlexDiv">
                        <canvas
                            ref={canvasRef}
                            width={document.body.scrollWidth < 600 ? 300 :800}
                            style={{backgroundColor: viewState.backgroundColor}}
                            height={document.body.scrollWidth < 600 ? 200 : 600}
                            onMouseDown={(e)=> {
                                if(uiData.toolItem){
                                    onMouseDown(e)
                                }
                            }}
                            onTouchStart={(e)=> {
                                if (uiData.toolItem) {
                                    onMouseDown(e)
                                }
                            }}
                            onMouseUp={(e)=> {
                                if(uiData.toolItem){
                                    onMouseUp(e)
                                }
                            }}
                            onTouchEnd={(e)=> {
                                if(uiData.toolItem){
                                    onMouseUp(e)
                                }
                            }}
                            onTouchMove={(e)=> {
                                if(uiData.toolItem){
                                    onMouseMove(e)
                                }
                            }}
                            onMouseMove={(e)=> {
                                if(uiData.toolItem){
                                    onMouseMove(e)
                                }
                            }}

                            onKeyDown={(e)=> {
                                if(uiData.toolItem){
                                    onKeyDown(e)
                                }
                            }}
                        />
                        {settingBarState.isSettingBarActive && <SettingBar
                            settings={settingBarState.settings}
                            tool={uiData.toolItem}
                            values={tool === "brush" ? settingsData.brush : (
                                tool === "rectangular" ? settingsData.rectangular :(
                                    tool === "circle" ? settingsData.circle : (
                                        tool === "line" ? settingsData.line: (
                                            tool === "eraser" ? settingsData.eraser : (
                                                tool === "text" ? settingsData.text : null
                                            )
                                        )
                                    )
                                )
                            )}
                            onChangeSetting={(e,tool)=>onChangeSetting(e,tool)}
                        />}
                    </div>
                </div>
            </div>}

        </Fragment>
    )
}

UI.protoTypes = {
    setCanvas:PropTypes.func.isRequired,
    ui:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    ui: state.ui
})


export default connect(mapStateToProps,{setTool,setCanvas})(UI)