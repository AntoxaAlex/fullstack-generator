import React, {Fragment} from 'react';

const SettingBar = ({settings,tool,values,onChangeSetting}) => {
    if(!values) return null
    return (
        <div id="settingBar">
            {settings.hasOwnProperty("lineWidth") &&
            <div className="settingBarItem">
                <label htmlFor="lineWidth" className="form-label">Line width</label>
                <input type="range" className="form-control"  min="0" max="20" id="lineWidth" name="lineWidth" value={values.lineWidth} onChange={(e)=>onChangeSetting(e,tool)}/>
                <input type="number" name="lineWidth" className="form-control" value={values.lineWidth} onChange={(e)=>onChangeSetting(e,tool)}/>
            </div>
            }
            {settings.hasOwnProperty("lineColor") &&
            <div className="settingBarItem">
                <label htmlFor="lineColor" className="form-label">Line color</label>
                <input type="color" className="form-control" id="lineColor" name="lineColor" value={values.lineColor} onChange={(e)=>onChangeSetting(e,tool)}/>
            </div>
            }
            {settings.hasOwnProperty("backgroundColor") &&
            <div className="settingBarItem">
                <label htmlFor="backgroundColor" className="form-label">Background colour</label>
                <input type="color" className="form-control" id="backgroundColor" name="backgroundColor" value={values.backgroundColor} onChange={(e)=>onChangeSetting(e,tool)}/>
            </div>
            }
            {settings.hasOwnProperty("text") &&
            <div className="settingBarItem">
                <label htmlFor="text" className="form-label">Text</label>
                <input type="text" className="form-control" id="text" name="text" value={values.text} onChange={(e)=>onChangeSetting(e,tool)}/>
            </div>
            }
            {settings.hasOwnProperty("fontSize") &&
            <div className="settingBarItem">
                <label htmlFor="fontSize" className="form-label">Font size</label>
                <input type="range" className="form-control" id="fontSize" name="fontSize" value={values.fontSize} onChange={(e)=>onChangeSetting(e,tool)}/>
                <input type="number" className="form-control" name="fontSize" value={values.fontSize} onChange={(e)=>onChangeSetting(e,tool)}/>
            </div>
            }
            {settings.hasOwnProperty("fontStyle") &&
            <div className="settingBarItem">
                <label htmlFor="fontStyle" className="form-label">Font style</label>
                <input type="text" className="form-control" id="fontStyle" name="fontStyle" value={values.fontStyle} onChange={(e)=>onChangeSetting(e,tool)}/>
            </div>
            }
            {settings.hasOwnProperty("fontColor") &&
            <div className="settingBarItem">
                <label htmlFor="fontColor" className="form-label">Font colour</label>
                <input type="color" className="form-control" id="fontColor" name="fontColor" value={values.fontColor} onChange={(e)=>onChangeSetting(e,tool)}/>
            </div>
            }
        </div>
    );
};

export default SettingBar;
