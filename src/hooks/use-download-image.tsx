import { useEffect } from 'react';

export const useDownloadTrigger = (downloadImage: any) => {
  useEffect(() => {
    const handleStorageChange = (event: any) => {
      if (event.key === 'triggerDownload' && event.newValue === 'true') {
        downloadImage();
        localStorage.setItem('triggerDownload', 'false'); // Reset trigger
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [downloadImage]);
};
