import React from "react";
import { useSearchParam, MediaViewer } from "../react-media-viewer";


const Demo = () => {
    const resourceUrl = useSearchParam("view", true)
    console.log(resourceUrl);

    return <MediaViewer resourceUrl={resourceUrl} />;
}
export default Demo;