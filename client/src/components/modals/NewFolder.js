import React, {Fragment} from 'react';
import { v4 as uuidv4 } from 'uuid';

const NewFolder = ({inputData}) => {
    const{
        files,
        folderIndex,
        folderSection,
        folderTitle,
        folderFiles
    } = inputData

    return (<Fragment>
        <h2 className="text-center">Create new folder</h2>
        <form onSubmit={(e)=>inputData.onSubmitForm(e)}>
            <div className="mb-3">
                <input type="text" className="form-control"placeholder="Title" autoComplete="off" name="title" id="folderTitle" value={folderTitle} onChange={(e)=>inputData.onChangeValue(e,folderIndex)}/>
            </div>
            <div className="mb-3">
                <select className="form-control" id="folderSection" name="section" value={folderSection} onChange={(e)=>inputData.onChangeValue(e,folderIndex)} aria-label="Default select example">
                    <option value="">Choose section</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                </select>
            </div>
            <div className="mb-3">
                <select className="form-control" id="type" placeholder="Type" autoComplete="off" name="fileType" value={folderFiles[folderIndex]} onChange={(e)=>inputData.onChangeFolderFiles(e.target.value,folderIndex)} aria-label="Default select example">
                    <option value="">Choose file</option>
                    {folderSection === "frontend" && folderSection && folderSection !== "" && files.filter(file=>file.section === "frontend").map((file,i)=>{
                        return(
                            <option key={uuidv4()} value={file._id}>{file.title}</option>
                        )
                    })}
                    {folderSection === "backend" && folderSection && folderSection !== "" && files.filter(file=>file.section === "backend").map((file,i)=>{
                        return(
                            <option key={uuidv4()} value={file._id}>{file.title}</option>
                        )
                    })}
                </select>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    </Fragment>);
};

export default NewFolder;