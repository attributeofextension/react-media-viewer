import React, {useEffect, useRef, useState} from "react";



export default function MediaViewer({ resourceUrl: resourceURL, contentType }) {
    if(resourceURL !== null && contentType !== null) {
        if(contentType.startsWith("audio") || !contentType.endsWith("webm")) {
            return (
                <audio
                    src={resourceURL}
                    preload={"metadata"}
                    type={contentType}
                    autoPlay={false}
                    controls={true}
                />
            )
        } else {
            console.log(resourceURL);
            console.log(contentType);
            return (<video
                src={resourceURL}
                preload={"metadata"}
                autoPlay={false}
                controls={true}
                crossOrigin={"use-credentials"}
            />)
        }
    }

    return <React.Fragment/>
}