import React, {Fragment} from 'react';

const NewViewTitle = ({inputData}) => {
    const{
        viewTitle,
        fileIndex,
        backgroundColor,
    }=inputData
    return (<div>
            <h2 className="text-center">Create new view</h2>
            <form onSubmit={(e)=>inputData.onSubmitForm(e)}>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Title" autoComplete="off" name="viewTitle" id="viewTitle" value={viewTitle} onChange={(e)=>inputData.onChangeValue(e,fileIndex)}/>
                </div>
                <div className="mb-3">
                    <input type="color" className="form-control" id="fontColor" name="backgroundColor" value={backgroundColor} onChange={(e)=>inputData.onChangeColor(e.target.value)}/>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-outline-primary">Add new view</button>
                </div>
            </form>
    </div>
    );
};

export default NewViewTitle;
