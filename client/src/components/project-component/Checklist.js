import React, {useEffect,useState} from "react";
import {useProjectContext} from "../../context/ProjectContext";

const Checklist = ({checklist,changeCheckbox}) => {

    const projectCtx = useProjectContext();
    const{
        activeTabs,
    } = projectCtx


    const[colors,setColors] = useState([])

    useEffect(()=>{
        const colorsList = []
        if(checklist){
            checklist.map(()=>{
                colorsList.push(`rgba(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256},0.3)`)
            })
            setColors(colorsList)
        }
    },[])

    if(!activeTabs.checklist) return null;
    return(
        <section id="checklist">
            <div id="checklist-div">
                <div className="row">
                    {checklist.map((item,listIndex)=>{
                        return(
                            <div key={listIndex} className="col-12 col-lg-4 mb-3">
                                <div className="checklistItem p-3" style={{backgroundColor: colors[listIndex]}}>
                                    <h5 className={checklist[listIndex].isItemCompleted ? "taskDone" : "projectGridHeader "}>{listIndex+1}.{item.title}</h5>
                                    <ul>
                                        {item.paragraphs.map((paragraph,liIndex)=>{
                                            return(
                                                <li key={liIndex} className={checklist[listIndex].paragraphs[liIndex].isParCompleted ? "taskDone" : ""}>
                                                    <input
                                                        type="checkbox"
                                                        checked={checklist[listIndex].paragraphs[liIndex].isParCompleted}
                                                        onChange={()=>changeCheckbox(listIndex,liIndex)}
                                                    />
                                                    {paragraph.text}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Checklist