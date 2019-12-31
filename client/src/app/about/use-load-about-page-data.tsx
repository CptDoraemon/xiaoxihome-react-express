import {Dispatch, SetStateAction, useEffect, useState} from "react";

const GRAPHQL_QUERY = `
        {
          allPageData {
            title,
            content,
            id,
            imageUrl
            }
        }
        `;
const GRAPHQL_API = `/aboutpagedata?query=${encodeURIComponent(GRAPHQL_QUERY)}`;
const MINIMUM_LOADING_TIME = 400; // show the animations

interface PageData {
    title: string,
    content: Array<string>,
    imageUrl: string
}
let data: Array<PageData> = [];

function processBlob(e: any, resolve: any) {
    const urlCreator = window.URL || window.webkitURL || window || {};
    const imageUrl = urlCreator.createObjectURL(e.target.response);
    resolve(imageUrl);
}

function loadImage(src: string) {
    return new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', src);
        xhr.responseType = 'blob';
        xhr.onload = (e) => processBlob(e, resolve);
        xhr.onerror = (err) => {
            console.log(err);
            reject(src);
        };
        xhr.send();
    })
}

function delayedFinishLoad(startedAt: number, stateSetter: Dispatch<SetStateAction<boolean>>) {
    const TIME_ELAPSE = Date.now() - startedAt;
    if (TIME_ELAPSE < MINIMUM_LOADING_TIME) {
        setTimeout(() => stateSetter(true), MINIMUM_LOADING_TIME - TIME_ELAPSE)
    } else {
        stateSetter(true)
    }
}

function loadImagesFromUrl(imageUrls: Array<string>, stateSetter: Dispatch<SetStateAction<boolean>>, errorStateSetter: Dispatch<SetStateAction<boolean>>) {
    const startedAt = Date.now();
    const promises = imageUrls.map(url => loadImage(url));
    Promise.all([...promises])
        .then(DOMStrings => {
        DOMStrings.map((DOMString, i) => {
            data[i].imageUrl = DOMString.toString()
        });
        delayedFinishLoad(startedAt, stateSetter);
    })
        .catch(err => {
            // stop loading blob, using url instead
            // android chrome relies on it
            console.log(err);
            errorStateSetter(true);
            delayedFinishLoad(startedAt, stateSetter);
        })
}

function loadDataFromGraphQL(stateSetter: Dispatch<SetStateAction<boolean>>, errorStateSetter: Dispatch<SetStateAction<boolean>>) {
    const startedAt = Date.now();
    fetch(GRAPHQL_API)
        .then(res => res.json())
        .then(json => {
            data = json.data.allPageData.slice();
            delayedFinishLoad(startedAt, stateSetter);
        })
        .catch(err => {
            console.log(err);
            errorStateSetter(false);
        });
}

function useLoadAboutPageData() {
    const [isGraphQLDataLoaded, setIsGraphQLDataLoaded] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const [isGraphQLDataError, setIsGraphQLDataError] = useState(false);
    const [isImageLoadingError, setIsImageLoadingError] = useState(false);

    useEffect(() => {
        loadDataFromGraphQL(setIsGraphQLDataLoaded, setIsGraphQLDataError);
    }, []);

    useEffect(() => {
        if (!isGraphQLDataLoaded) return;
        const imageUrls = data.map(page => page.imageUrl);
        loadImagesFromUrl(imageUrls, setIsImageLoaded, setIsImageLoadingError);
    }, [isGraphQLDataLoaded]);

    useEffect(() => {
        if (!isImageLoaded) return;
        delayedFinishLoad(Date.now(), setIsReady)
    }, [isImageLoaded]);


    return {isGraphQLDataLoaded, isImageLoaded, isReady, isGraphQLDataError, isImageLoadingError, data}
}

export default useLoadAboutPageData;