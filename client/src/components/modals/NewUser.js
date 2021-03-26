import React, {Fragment} from 'react';

const NewUser = ({inputData}) => {
    const{
        users,
        index
    }=inputData
    return (
        <Fragment>
            <form onSubmit={(e)=>inputData.onSubmitForm(e)}>
                <h2 className="text-center">Add new user</h2>
                <div className="my-3">
                    <input type="text" className="form-control" placeholder="User id" autoComplete="off" name="_id" id="id" value={users[index].user} onChange={(e)=>inputData.onChangeValue(e,index)}/>
                </div>
                <div className="text-center">
                    <button className="btn btn-sm btn-outline-primary" type="submit">Add user</button>
                </div>
            </form>
        </Fragment>
    )
};

export default NewUser;
