export const compressImage=(file,maxW=200,quality=0.7)=>
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
        resolve(canvas.toDataURL('image/jpeg',quality));
      }
    img.onerror=reject;
    img.src=url;
})