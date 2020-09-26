import {useEffect, useState, RefObject} from "react";

function getIsReturningViewer() {
  const isReturningViewer = window.localStorage.getItem('isReturningViewer') === 'true';
  if (!isReturningViewer) {
    window.localStorage.setItem('isReturningViewer', 'true');
  }

  return isReturningViewer;
}

const useLoadCoverImage = (loaderDelayOut: number, fullWidth: number, fullHeight: number) => {
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isLoaderShown, setIsLoaderShown] = useState(true);

  useEffect(() => {
    if (image || isRequestSent) return;

    const isReturningViewer = getIsReturningViewer();
    const baseUrl = '/api/xiaoxihome/get-cover-image';
    const url = process.env.REACT_APP_DEBUG === 'true' ?
      `http://${window.location.hostname}:5000${baseUrl}` :
      baseUrl;

    setIsRequestSent(true);
    fetch(`${url}?isReturningViewer=${isReturningViewer}&width=${fullWidth}&height=${fullHeight}`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 'ok') {
          const src = json.data;
          const image = new Image();
          image.src = src;
          image.onload = () => {
            setImage(image);
          };
          setTimeout(() => setIsLoaderShown(false), loaderDelayOut);
        }
      })
      .catch(e => console.log(e))

  }, [image]);

  return {
    image,
    isLoaderShown,
  }
};

export default useLoadCoverImage
