import React, { useState } from 'react'
import FileUpload from './FileUpload'
import { Button } from 'primereact/button';
import ConfigService from '../../../service/ConfigManagement/configService';
import NotifyController from '../../../utilities/Toast';
import { useNavigate } from 'react-router-dom';

function UploadConfig() {
    const [dataJsonFiles, setDataJsonFiles] = useState("");
    const [isUpload, setIsUpload] = useState(true);
    const navigate= useNavigate()
    const onSubmit = async()=>{
        const parseJson=  JSON.parse(dataJsonFiles);
        // const arrayData = Object.keys(parseJson).map(key => parseJson[key]);
 
        const upload = await ConfigService.getInstance().postUploadConfig(parseJson);
        console.log('upload', upload);
        if(upload.success){
            NotifyController.success("Submit success!");
            navigate('/config/list-config');
        } else NotifyController.error("Submit fail!")
        onReset()
    }
    const onReset =()=>{
        setDataJsonFiles("");
        const inputUpload = document.getElementById('input-upload-image') as HTMLInputElement;
        inputUpload.value='';
        setIsUpload(true)
    }
    const onChangeDataUpload =(e:any)=>{
        setDataJsonFiles(e.target.value);
    }
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Upload config</h5>
                    <div className={`${isUpload ? 'flex flex-column' : 'hidden'}`}>
                        <FileUpload setIsUpload={setIsUpload} setDataJsonFiles={setDataJsonFiles} dataJsonFiles={dataJsonFiles}  />
                    </div>
                    <div className={`${dataJsonFiles === "" ? 'hidden' : ''}`}>
                        <textarea style={{
                            width:'100%',
                        }}  rows={40}  onChange={onChangeDataUpload} value={dataJsonFiles} >{dataJsonFiles}</textarea>
                        <Button type='reset' onClick={onReset}>Reset</Button>
                        <Button type='submit' onClick={onSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadConfig