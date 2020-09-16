import {useEffect, useState, RefObject} from "react";

function getIsReturningViewer() {
  const isReturningViewer = window.localStorage.getItem('isReturningViewer') === 'true';
  if (!isReturningViewer) {
    window.localStorage.setItem('isReturningViewer', 'true');
  }

  return isReturningViewer;
}

const useLoadCoverImage = (animationDuration: number, imageContainerRef: RefObject<HTMLDivElement>) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [src, setSrc] = useState('');
  const [isLoaderShown, setIsLoaderShown] = useState(true);

  useEffect(() => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    setWidth(rect.width);
    setHeight(rect.height);
  }, []);

  useEffect(() => {
    if (!width || !height) return;
    if (src !== '') return;

    const isReturningViewer = getIsReturningViewer();
    const baseUrl = '/api/xiaoxihome/get-cover-image';
    const url = process.env.REACT_APP_DEBUG === 'true' ?
      `http://localhost:5000${baseUrl}` :
      baseUrl;

    fetch(`${url}?isReturningViewer=${isReturningViewer}&width=${width}&height=${height}`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 'ok') {
          setSrc(json.data);
          setTimeout(() => setIsLoaderShown(false), animationDuration * 1.5);
        }
      })
      .catch(e => console.log(e))

  }, [width, height, src]);

  return {
    src,
    isLoaderShown,
  }
};

export default useLoadCoverImage
