import {useEffect, useState, RefObject, useRef} from "react";

function getIsReturningViewer() {
  const isReturningViewer = window.localStorage.getItem('isReturningViewer') === 'true';
  if (!isReturningViewer) {
    window.localStorage.setItem('isReturningViewer', 'true');
  }

  return isReturningViewer;
}

const useLoadCoverImage = (loaderDelayOut: number, fullWidth: number, fullHeight: number) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const isRequestSentRef = useRef(false);
  const isUnmountedRef = useRef(false);

  useEffect(() => {
    return () => {
      isUnmountedRef.current = true
    }
  }, []);

  useEffect(() => {
    if (isRequestSentRef.current) {
      return
    }
    isRequestSentRef.current = true;

    const isReturningViewer = getIsReturningViewer();
    const baseUrl = '/api/xiaoxihome/get-cover-image';
    const url = process.env.REACT_APP_DEBUG === 'true' ?
      `http://${window.location.hostname}:5000${baseUrl}` :
      baseUrl;

    fetch(`${url}?isReturningViewer=${isReturningViewer}&width=${fullWidth}&height=${fullHeight}`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 'ok') {
          const src = json.data;
          const image = new Image();
          image.src = src;
          image.onload = () => {
            if (!isUnmountedRef.current) {
              setImage(image);
            }
          };
        }
      })
      .catch(e => console.log(e))

  });

  return image
};

export default useLoadCoverImage
