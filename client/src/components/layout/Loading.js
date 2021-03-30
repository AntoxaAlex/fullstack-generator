import React from 'react';

const Loading = () => {
    return (
        <div id="loadingDiv">
            <img src={
                document.querySelector("#root").classList.contains("darkTheme") ? "https://res.cloudinary.com/antoxaalex/image/upload/v1617060401/fullstack-generator/OCKr_nolzi9.gif"
                    : "https://res.cloudinary.com/antoxaalex/image/upload/v1617060751/fullstack-generator/3h9Z_kta8xj.gif"
            } alt="Loading..." width={250} height={250}/>
        </div>
    );
};

export default Loading;
