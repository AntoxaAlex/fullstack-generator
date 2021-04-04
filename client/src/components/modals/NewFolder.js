import React, {Fragment} from 'react';

const NewFolder = ({inputData}) => {
    const{
        folderIndex,
        folderSection,
        folderTitle,
    } = inputData

    return (<Fragment>
        <h2 className="text-center">Create new folder</h2>
        <form onSubmit={(e)=>inputData.onSubmitForm(e)}>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Title" autoComplete="off" name="title" id="folderTitle" value={folderTitle} onChange={(e)=>inputData.onChangeValue(e,folderIndex)}/>
            </div>
            <div className="mb-3">
                <select className="form-control" id="folderSection" name="section" value={folderSection} onChange={(e)=>inputData.onChangeValue(e,folderIndex)} aria-label="Default select example">
                    <option value="">Choose section</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                </select>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    </Fragment>);
};

export default NewFolder;