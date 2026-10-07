export const compressImage=(file,maxW=150,quality=0.5)=>
    new Promise((resolve, reject)=>{
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload=()=>{
        const scale = Math.min(1,maxW/img.width);
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);

        let dataUrl=canvas.toDataURL('image/jpeg',quality);

        if(dataUrl.length > 30000){
          dataUrl = canvas.toDataURL('image/jpeg',0.3);
        }

        resolve(dataUrl);
      }
    img.onerror=(e)=>{
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src=url;
})