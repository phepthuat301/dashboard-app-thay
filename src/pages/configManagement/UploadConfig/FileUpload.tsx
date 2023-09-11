import React,{useState} from 'react'
import NotifyController from '../../../utilities/Toast';

type FileUploadProp={
    setDataJsonFiles:(e:any)=>void,
    dataJsonFiles?:string,
    setIsUpload:(e:boolean)=>void,

}
function FileUpload({setDataJsonFiles,setIsUpload,dataJsonFiles}:FileUploadProp) {
const onChangeUpload =(e:any)=>{
    const inputUpload = document.getElementById('input-upload-image') as HTMLInputElement;
    inputUpload.click();
}
 
const handleImageUpload = (e:any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.currentTarget.files[0], "UTF-8");
    
    fileReader.onload = (e:any) => {
        NotifyController.success("Upload Success")
        setDataJsonFiles(e.currentTarget.result);
        setIsUpload(false)
    };
    fileReader.onerror = (e:any) => {
        NotifyController.error("Upload Fail!");
        setIsUpload(true)
      };
  };
  return (
      <div className='container-upload flex flex-column align-items-center justify-content-center'>
        <span> Upload from your device</span>
        <div className='box-icon-upload flex align-items-center justify-content-center border-round-sm  w-8rem h-8rem surface-600 cursor-pointer' onClick={onChangeUpload} >
        <input id="input-upload-image" type="file" accept=".json" onChange={handleImageUpload}  className="hidden" />
            <li className='pi pi-upload'></li>
        </div>
    </div>
  )
}

export default FileUpload