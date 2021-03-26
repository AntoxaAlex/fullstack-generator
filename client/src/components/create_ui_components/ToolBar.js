import React, {Fragment} from 'react';

const ToolBar = ({setTool,setSetting,setShapes,isShapedDivActive,undo,redo,clearCanvas,save}) => {
    return (
        <Fragment>
            <div className="toolBar">
                <div className="d-flex">
                    <button type="button" className="transparentBtn" onClick={()=> {
                        setTool("brush")
                        setSetting({
                            lineWidth:"",
                            lineColor:""
                        })
                    }}><i className="fas fa-paint-brush"/></button>
                    <button type="button" className="transparentBtn" data-bs-toggle="dropdown" aria-expanded="false" onClick={()=> {
                        setShapes()
                    }}><i className="fas fa-shapes"/></button>
                    {isShapedDivActive && <Fragment>
                        <button type="button" className="transparentBtn" data-bs-toggle="dropdown" aria-expanded="false" onClick={()=> {
                            setTool("rectangular")
                            setSetting({
                                lineWidth:"",
                                lineColor:"",
                                backgroundColor:""
                            })
                        }}><i className="fas fa-square"/></button>
                        <button type="button" className="transparentBtn" data-bs-toggle="dropdown" aria-expanded="false" onClick={()=> {
                            setTool("circle")
                            setSetting({
                                lineWidth:"",
                                lineColor:"",
                                backgroundColor:""
                            })
                        }}><i className="far fa-circle"/></button>
                        <button type="button" className="transparentBtn" data-bs-toggle="dropdown" aria-expanded="false" onClick={()=> {
                            setTool("line")
                            setSetting({
                                lineWidth:"",
                                lineColor:""
                            })
                        }}><i className="fas fa-grip-lines-vertical"/></button>
                    </Fragment>}
                    <button type="button" className="transparentBtn" onClick={()=> {
                        setTool("text")
                        setSetting({
                            text:"",
                            fontSize:"",
                            fontStyle: "",
                            fontColor: ""
                        })
                    }}><i className="fas fa-font"/></button>
                    <button type="button" className="transparentBtn" onClick={()=> {
                        setTool("eraser")
                        setSetting({
                            lineWidth:""
                        })
                    }}><i className="fas fa-eraser"/></button>
                    <button type="button" className="transparentBtn" onClick={()=>clearCanvas()}>Clear</button>
                </div>
                <div className="d-flex">
                    <button type="button" className="transparentBtn" onClick={()=>undo()}><i className="fas fa-undo"/></button>
                    <button type="button" className="transparentBtn" onClick={()=>redo()}><i className="fas fa-redo"/></button>
                    <button type="button" className="transparentBtn" onClick={(e)=>save(e)}><i className="far fa-save"/></button>
                </div>
            </div>
        </Fragment>
    );
};

export default ToolBar;
