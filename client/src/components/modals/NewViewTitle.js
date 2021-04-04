import React from 'react';

const NewViewTitle = ({inputData}) => {
    const{
        viewTitle,
        fileIndex,
    }=inputData
    return (<div>
            <h2 className="text-center">Create new view</h2>
            <form onSubmit={(e)=>inputData.onSubmitForm(e)}>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Title" autoComplete="off" name="viewTitle" id="viewTitle" value={viewTitle} onChange={(e)=>inputData.onChangeValue(e,fileIndex)}/>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-outline-primary">Add new view</button>
                </div>
            </form>
    </div>
    );
};

export default NewViewTitle;
