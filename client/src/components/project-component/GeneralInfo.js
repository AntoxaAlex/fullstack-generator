import React, {Fragment,useRef,useEffect,useState,useContext} from "react";
import Chart from "chart.js"
import {useProjectContext} from "../../context/ProjectContext";
import { v4 as uuidv4 } from 'uuid';


const GeneralInfo = ({id,project,deleteProject}) => {
    const projectCtx = useProjectContext();
    const{
        activeTabs,
        editContent,
        formData,
        goals,
        openUserModal,
        openFileModal,
        openProjectView
    } = projectCtx


    const canvasRef = useRef(null)
    const[chartsCanvas,setChartsCanvas] = useState({
        canvas:null,
        ctx:null,
        centerX:null,
        centerY:null,
        radius:null,
        startAngle:0,
        endAngle:null
    })
    let{
        canvas,
        ctx
    } = chartsCanvas
    useEffect(()=>{
        if(activeTabs.generalInfo){
            setChartsCanvas({...chartsCanvas,canvas:canvasRef.current,ctx: canvasRef.current.getContext("2d")})
        }
    },[activeTabs.generalInfo])
    useEffect(()=>{
        if(canvas && project){
            setChartsCanvas({...chartsCanvas,
                centerX: canvas.width/2,
                centerY: canvas.height/2,
                radius: Math.min(canvas.width/2,canvas.height/2)
            })
            drawProgressChart()
        }
    },[canvas])

    const selectFileImg = (type) => {
        if(type === "html"){
            return "https://res.cloudinary.com/antoxaalex/image/upload/v1615658671/fullstack-generator/html5-1_yncjw1.svg";
        }else if(type === "css"){
            return "https://res.cloudinary.com/antoxaalex/image/upload/v1615658669/fullstack-generator/css-5_hosf1y.svg";
        }else if(type === "js"){
            return "https://res.cloudinary.com/antoxaalex/image/upload/v1615658666/fullstack-generator/logo-javascript_hna3sy.svg";
        }
    }


    const drawProgressChart = () => {
        let completedTasks = 0;
        let allTasks = 0;
        project.checklist.map(item=>{
            const arrLength = item.paragraphs.filter(paragraph=>paragraph.isParCompleted).length
            const allLength = item.paragraphs.length
            completedTasks += arrLength
            allTasks += allLength
        })
        let completedTasksPer = Math.floor(completedTasks*100/allTasks)

        Chart.pluginService.register({
            id: "progressText",
            beforeDraw: function(chart) {
                let width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx;
                ctx.clearRect(0,0,canvas.width,canvas.height)
                ctx.restore();
                let fontSize = 3 ;
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";

                let text = completedTasksPer+"%",
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2;

                ctx.fillStyle = "#c3073f";
                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        });

        ctx = new Chart(ctx,{
            type: "doughnut",
            data: {
                datasets: [{
                    data: [completedTasksPer,100-completedTasksPer ],
                    backgroundColor: [
                        "#c3073f",
                        "gray"
                    ],
                    borderWidth: 1
                }],
                labels: [
                    'Completed',
                    'Still uncompleted'
                ]
            },
            options:{
                cutoutPercentage: 80,
                legend:{
                    display:false
                },
                elements: {
                    center: {
                        text: 'Red is 2/3 the total numbers',
                        color: '#FF6384', // Default is #000000
                        fontStyle: 'Arial', // Default is Arial
                        sidePadding: 20, // Default is 20 (as a percentage)
                        minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
                        lineHeight: 25 // Default is 25 (in px), used for when text wraps
                    }
                }
            }
        })


    }
    if(!activeTabs.generalInfo) return null;
    return(
        <Fragment>
            <div className="generalRow">
                <div className="projectGridSection">
                    <div className="">
                        <h1 className="projectGridHeader">{formData.title}
                        <span className="settingSpan">
                            <button type="button" className="editBtn" onClick={()=>editContent("title")}><i className="fas fa-cog"/></button>
                        </span></h1>
                    </div>
                    <hr/>
                    <div className="">
                        <div className="">
                            <h5>
                                Main purpose
                                <span className="settingSpan">
                                    <button type="button" className="editBtn" onClick={()=>editContent("purpose")}><i className="fas fa-cog"/></button>
                                </span>
                            </h5>
                        </div>
                        <div className="">
                            <div className="">
                                <p className="generalInfoText m-0">{formData.purpose}</p>
                            </div>
                            <hr/>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <h5>
                                Main goals
                                <span className="settingSpan">
                                    <button type="button" className="editBtn" onClick={()=>editContent("goals")}><i className="fas fa-cog"/></button>
                                </span>
                            </h5>
                        </div>
                        <div className="">
                            <div className="">
                                <ol>
                                    {goals.map((goal,i)=>{
                                        return(
                                            <li className="generalInfoText mb-3" key={uuidv4()}>{goal}</li>
                                        )
                                    })}
                                </ol>
                            </div>
                            <hr/>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <h5>Stack</h5>
                        </div>
                        <div className="">
                            <div className="">
                                <p className="m-0">Front-end {formData.frontend.archType === "react" ? <img alt="" width={40} height={40} src="https://res.cloudinary.com/antoxaalex/image/upload/v1615643764/fullstack-generator/react-2_wxmb9s.svg"/> : "front-end"}</p>
                            </div>
                            <div className="">
                                <p className="m-0">Back-end {formData.backend.archType === "node" ? <img alt="" width={40} height={40} src="https://res.cloudinary.com/antoxaalex/image/upload/v1615643551/fullstack-generator/nodejs-icon_ocbswf.svg"/> :" backend"}</p>
                            </div>
                            <hr/>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={()=>deleteProject(id)}>Delete project</button>
                    </div>
                </div>
                <div className="projectGridSection">
                    <h3 className="projectGridHeader">Users</h3>
                    <button type="button" className="btn btn-sm btn-outline-info" onClick={()=>openUserModal()}>Add user</button>
                    <ul>
                        {project.users.map((user,i)=>{
                            return(
                                <li key={uuidv4()}>{user.user.firstname + " " + user.user.secondname}</li>
                            )
                        })}
                    </ul>
                </div>
                <div id="checklistPart" className="projectGridSection">
                    <h3 className="projectGridHeader">Next task</h3>
                    <ol>
                        {project.checklist.filter(item=>!item.isItemCompleted).map((item,i)=>{
                            if(i === 0) return(
                                <Fragment key={uuidv4()}>
                                    <h5>{item.title}</h5>
                                    <ol>
                                        {item.paragraphs.map((paragraph,i)=>{
                                            if(!paragraph.isParCompleted) return(
                                                <li key={uuidv4()}>{paragraph.text}</li>
                                            )
                                        })}
                                    </ol>
                                </Fragment>
                        )
                        })}
                    </ol>
                </div>
                <div className="projectGridSection">
                    <h3 className="projectGridHeader">Progress</h3>
                    <div id="diagramsDiv" style={{width: "100%",height: "100%"}}>
                        <canvas id="chartCanvas" ref={canvasRef}/>
                    </div>
                </div>
                <div className="projectGridSection">
                    <h3 className="projectGridHeader">UI Schema</h3>
                    <div className="projectViewColumn">
                        {project.projectView.map((view,i)=>{
                            return(
                                <div key={uuidv4()} style={{borderRadius: "15px",border: "1px solid gray"}} className="projectViewColumnItem">
                                    <h5>{view.title}</h5>
                                    <div style={{width: "100%",height:"300px", backgroundImage:`url(${view.image})`}}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="projectGridSection">
                    <h3 className="projectGridHeader">Files</h3>
                    <div className="projectGridEndSection mb-3">
                        {project.frontend.files.map((file,i)=>{
                            return(
                                <div className="projectGridItem" key={uuidv4()}>
                                    <button type="button" onClick={()=>openFileModal(file,i)}>
                                        <img alt="" width={50} height={50} src={selectFileImg(file.type)}/>
                                        <p>{file.title}</p>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    <div className="projectGridEndSection">
                        {project.backend.files.map((file,i)=>{
                            return(
                                <div className="projectGridItem" key={uuidv4()}>
                                    <button type="button" onClick={()=>openFileModal(file,i)}>
                                        <img alt="" width={50} height={50} src={selectFileImg(file.type)}/>
                                        <p>{file.title}</p>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default GeneralInfo