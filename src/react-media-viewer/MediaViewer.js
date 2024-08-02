import React from "react";



export default function MediaViewer({ resourceURL, resourceType, isCrossOrigin }) {
    if(!resourceURL || !resourceType) {
        return <React.Fragment></React.Fragment>
    }
    if (resourceType.startsWith("audio")) {
        return (
            <audio
                preload={"auto"}
                autoPlay={false}
                controls={true}
                crossOrigin={isCrossOrigin ? "use-credentials" : "anonymous"}
            >
                <source src={resourceURL} type={resourceType} />
            </audio>
        )
    }
    if (resourceType.startsWith("video")) {
        console.log("video")
        return (
            <video
                preload={"auto"}
                autoPlay={false}
                controls={true}
                crossOrigin={isCrossOrigin ? "use-credentials" : "anonymous"}
            >
                <source src={resourceURL} type={resourceType} />
            </video>
        )
    }
    return <React.Fragment/>
}