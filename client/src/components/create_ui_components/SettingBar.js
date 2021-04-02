import React, {Fragment} from 'react';

const SettingBar = ({index,canvasContent,onChangeSetting}) => {
    if(!index && !canvasContent) return null
    return (
        <Fragment>
            {canvasContent.hasOwnProperty("width") &&
            <div className="settingBarItem">
                <label htmlFor="width" className="form-label mr-2">Width</label>
                <input type="number" id="width" name="width" className="form-control" value={canvasContent.width} onChange={(e)=>onChangeSetting(e.target.name,parseInt(e.target.value),index)}/>
            </div>
            }
            {canvasContent.hasOwnProperty("height") &&
            <div className="settingBarItem">
                <label htmlFor="height" className="form-label mr-2">Height</label>
                <input type="number" id="height" name="height" className="form-control" value={canvasContent.height} onChange={(e)=>onChangeSetting(e.target.name,parseInt(e.target.value),index)}/>
            </div>
            }
            {canvasContent.hasOwnProperty("borderRadius") &&
            <div className="settingBarItem">
                <label htmlFor="borderRadius" className="form-label mr-2">Border radius</label>
                <input type="number" id="borderRadius" name="borderRadius" className="form-control" value={canvasContent.borderRadius} onChange={(e)=>onChangeSetting(e.target.name,parseInt(e.target.value),index)}/>
            </div>
            }
            {canvasContent.hasOwnProperty("borderWidth") &&
            <div className="settingBarItem">
                <label htmlFor="borderWidth" className="form-label mr-2">Border width</label>
                <input type="number" id="borderWidth" name="borderWidth" className="form-control" value={canvasContent.borderWidth} onChange={(e)=>onChangeSetting(e.target.name,parseInt(e.target.value),index)}/>
            </div>
            }
            {canvasContent.hasOwnProperty("borderColor") &&
            <div className="settingBarItem">
                <label htmlFor="borderColor" className="form-label mr-2">Border color</label>
                <input type="color" className="form-control" id="borderColor" name="borderColor" value={canvasContent.borderColor} onChange={(e)=>onChangeSetting(e.target.name,e.target.value,index)}/>
            </div>
            }
            {canvasContent.hasOwnProperty("background") &&
            <div className="settingBarItem">
                <label htmlFor="background" className="form-label mr-2">Background color</label>
                <input type="color" className="form-control" id="background" name="background" value={canvasContent.background} onChange={(e)=>onChangeSetting(e.target.name,e.target.value,index)}/>
            </div>
            }
            {canvasContent.hasOwnProperty("text") &&
            <div className="settingBarItem">
                <label htmlFor="text" className="form-label mr-2">Text</label>
                <input type="text" className="form-control" id="text" name="text" value={canvasContent.text} onChange={(e)=>onChangeSetting(e.target.name,e.target.value,index)}/>
            </div>
            }
            {canvasContent.hasOwnProperty("fontSize") &&
            <div className="settingBarItem">
                <label htmlFor="fontSize" className="form-label mr-2">Size</label>
                <input type="number" className="form-control" name="fontSize" value={canvasContent.fontSize} onChange={(e)=>onChangeSetting(e.target.name,parseInt(e.target.value),index)}/>
            </div>
            }
            {canvasContent.hasOwnProperty("color") &&
            <div className="settingBarItem">
                <label htmlFor="fontColor" className="form-label mr-2">Line colour</label>
                <input type="color" className="form-control" id="color" name="color" value={canvasContent.color} onChange={(e)=>onChangeSetting(e.target.name,e.target.value,index)}/>
            </div>
            }
        </Fragment>
    );
};

export default SettingBar;
