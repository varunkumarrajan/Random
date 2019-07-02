  
   export const handleResize = (callback) => {
        const windowSize = window.innerWidth;
        const thumbWidth = (windowSize >= 480 && 100) || 75;
        const noOfCarouselImage = (windowSize < 768 && 1) || (windowSize >= 768 && windowSize < 1024 && 2) || (windowSize >= 1024 && windowSize < 1366 && 3) || (windowSize >= 1366 && 5);

        callback({
            thumbWidth: thumbWidth,
            noOfCarouselImage: noOfCarouselImage
        }) ;        
    };
  
    
