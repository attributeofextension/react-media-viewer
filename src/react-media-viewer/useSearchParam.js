import { useState, useEffect } from 'react';

export default function useSearchParam(resourceParamName="resource", resourceTypeParamName = "type", crossOriginParamName = "cross-origin") {
    const resourceParamRegex = new RegExp(`(?:${resourceParamName}\=)(?<paramValue>[^&]*)`);
    const resourceTypeParamRegex = new RegExp(`(?:${resourceTypeParamName}\=)(?<paramValue>[^&]*)`);
    const crossOriginParamRegex = new RegExp(`(?:${crossOriginParamName}\=)(?<paramValue>[^&]*)`);

    const [resourceURL, setResourceURL] = useState(null);
    const [resourceType, setResourceType] = useState(null);
    const [isCrossOrigin, setIsCrossOrigin] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        function getParamValueFromRegexExecResults(results, paramName) {
            if( results?.groups?.paramValue === undefined || results.groups.paramValue.length === 0) {
                throw Error(`Resource param is missing a value from URL query params`)
            }
            return results.groups.paramValue;
        }

        function parseResourceURL(url) {
            try {
                decodeURIComponent(url)
            } catch (e) {
                throw Error(`Resource param value must be properly URL encoded`)
            }
            if(!URL.canParse(url, window.location.origin)) {
                throw Error(`Decoded resource param value must be a valid URL`)
            }

            const urlObject = new URL(decodeURIComponent(url),window.location.origin)
            return urlObject.href;
        }

        function parseResourceType(resourceType) {
            try {
                decodeURIComponent(resourceType)
            } catch (e) {
                throw Error(`ResourceType param value must be properly URL encoded`)
            }
            const resourceTypeDecoded = decodeURIComponent(resourceType);
            if (!resourceType.startsWith("audio") && !resourceType.startsWith("video")) {
                throw Error(`ResourceType param value must either start with audio or video`)
            }
            const splitResourceTypeDecoded = resourceTypeDecoded.split("/")
            if(splitResourceTypeDecoded.length !== 2 && splitResourceTypeDecoded.length === 0) {
                throw Error(`ResourceType param value must contain a single / and be followed by a format type (ie audio/mp3 or video/mp4)`)
            }
            return resourceTypeDecoded;
        }

        function parseIsCrossOriginValue(text) {
            if (text.toLowerCase() === "true" || text === "1") {
                return true
            } else if (text.toLowerCase() === "false" || text === "0") {
                return false
            }
            throw Error(`CrossOrigin param value must be either (case-insensitive) [true,false] or [1,0]`)
        }

        function handleLocationChange() {
            try {
                const results = resourceParamRegex.exec(window.location.search)
                const resourceParamValue = getParamValueFromRegexExecResults(results)
                const newResourceURL = parseResourceURL(resourceParamValue)
                if(newResourceURL !== resourceURL) {
                    setResourceURL(newResourceURL)
                }
            } catch (e) {
                console.error(e)
                setErrors(errors.concat([e]))
            }

            try {
                const results = resourceTypeParamRegex.exec(window.location.search)
                const resourceTypeParamValue = getParamValueFromRegexExecResults(results, resourceTypeParamName)
                const newResourceType = parseResourceType(resourceTypeParamValue);
                if(newResourceType !== resourceType) {
                    setResourceType(newResourceType)
                }
            } catch (e) {
                console.error(e)
                setErrors(errors.concat([e]))
            }

            try {
                const results = crossOriginParamRegex.exec(window.location.search)
                const crossOriginParamValue = getParamValueFromRegexExecResults(results, crossOriginParamName)
                const newIsCrossOrigin = parseIsCrossOriginValue(crossOriginParamValue)
                if(newIsCrossOrigin !== isCrossOrigin) {
                    setIsCrossOrigin(newIsCrossOrigin)
                }
            } catch (e) {
                console.error(e)
                setErrors(errors.concat([e]))
            }
        }

        handleLocationChange()
        return () => {}
    }, [])
    return [resourceURL, resourceType, isCrossOrigin, errors ]
}
