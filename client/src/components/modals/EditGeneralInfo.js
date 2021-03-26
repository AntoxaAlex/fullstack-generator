import React, {Fragment} from 'react';
import { v4 as uuidv4 } from 'uuid';

const EditGeneralInfo = ({inputData}) => {
    const {
        inputValue,
        inputName
    } = inputData
    return (
        <div>
            <h2 className="text-center">Edit {inputName}</h2>
            <form onSubmit={(e)=>inputData.onSubmitForm(e)}>
                {inputName !== "goals" ?
                    <input type="text" className="form-control mb-3"  name={inputName} value={inputValue} onChange={(e)=>inputData.onChangeValue(e)}/> :
                    <Fragment>
                        {inputValue.map((goal,i)=>{
                            return(
                                <input key={uuidv4()} className="form-control mb-3" name={inputName} value={inputValue[i]} onChange={(e)=>inputData.onChangeGoals(e,i)}/>
                            )
                        })}
                    </Fragment>
                }
                <div className="text-center">
                    <button type="submit" className="btn btn-outline-primary">Edit data</button>
                </div>

            </form>
        </div>
    );
};

export default EditGeneralInfo;
