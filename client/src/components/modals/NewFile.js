import React, {Fragment, useState} from "react";

const NewFile = ({inputData}) => {
    const[modalFormData,setData] = useState({
        folderIndex:"",
        fileSection: "",
        fileType: "",
        fileTitle: ""
    })

    const[fileFeatures,setFeatures] = useState([
        "",
        "",
        ""
    ])

    const{
        folders
    } = inputData

    const{
        folderIndex,
        fileType,
        fileTitle,
        fileSection
    } =modalFormData

    const addFeature = () => {
        setFeatures([...fileFeatures,""])
    }

    const onChangeValue = (e) => {
        const{name,value} = e.target;
        setData({...modalFormData,[name]:value});
    }

    const onChangeFeatures = (e,i)=>{
        const{value} = e.target
        const newFeatures = [...fileFeatures]
        newFeatures[i] = value
        setFeatures(newFeatures)
    }

    return(
        <Fragment>
            <h2 className="text-center">Create new file</h2>
            <form onSubmit={(e)=>inputData.onSubmitForm(e,modalFormData,fileFeatures)}>
                <div className="mb-3">
                    <select className="form-control" id="section" name="fileSection" value={fileSection} onChange={(e)=>onChangeValue(e)} aria-label="Default select example">
                        <option value="">Choose section</option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                    </select>
                </div>
                <div className="mb-3">
                    {folders.length>0 &&
                    <select className="form-control" id="folder" name="folderIndex" value={folderIndex} onChange={(e)=>onChangeValue(e)} aria-label="Default select example">
                        <option value="">Choose folder</option>
                        {fileSection === "frontend" && fileSection && fileSection !== "" && folders.filter((folder)=>folder.section === "frontend").map((folder,i)=>{
                            return(
                                <option key={i} value={folders.indexOf(folder)}>{folder.title}</option>
                            )
                        })}
                        {fileSection === "backend" && fileSection && fileSection !== "" && folders.filter(folder=>folder.section === "backend").map((folder,i)=>{
                            return(
                                <option key={i} value={folders.indexOf(folder)}>{folder.title}</option>
                            )
                        })}
                    </select>
                    }
                </div>
                <div className="mb-3">
                    <select className="form-control" id="type" name="fileType" value={fileType} onChange={(e)=>onChangeValue(e)} aria-label="Default select example">
                        <option value="">Choose file type</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="js">JS</option>
                    </select>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" autoComplete="off" placeholder="Title" name="fileTitle" id="type" value={fileTitle} onChange={(e)=>onChangeValue(e)}/>
                </div>
                <h5>Features</h5>
                <button type="button" className="btn btn-sm btn-outline-warning mb-3" onClick={()=>addFeature()}>Add feature</button>
                {fileFeatures.map((feature,i)=>{
                    return(
                        <div key={i} className="mb-3">
                            <input type="text" className="form-control" placeholder="Feature" autoComplete="off" name="fileFeature" id={"fileFeature"+i} value={feature} onChange={(e)=>onChangeFeatures(e,i)}/>
                        </div>
                    )
                })}
                <div className="text-center">
                    <button type="submit" className="btn btn-outline-primary">Submit</button>
                </div>
            </form>
        </Fragment>
    )
}

export default NewFile