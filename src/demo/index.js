import React from "react";
import { useSearchParam, MediaViewer } from "../react-media-viewer";


const Demo = () => {
    const [resourceURL, contentType] = useSearchParam("view", true)
    console.log(resourceURL)
    console.log(contentType)
    return <MediaViewer resourceURL={resourceURL} contentType={contentType} />;
}
export default Demo;