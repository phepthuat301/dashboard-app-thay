import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'
import React,{useState} from 'react'
import ConfigService from '../../../service/ConfigManagement/configService';
import NotifyController from '../../../utilities/Toast';
import { InputText } from 'primereact/inputtext';



type ModelAddNewProps = {
  isOpen: boolean,
  setIsOpen: (i:boolean)=>void,
  onAdd:(value:string)=>void
}
function ModelAddNew({isOpen,setIsOpen,onAdd}:ModelAddNewProps) {
  const initalValue=`{
    "name": "nametest",
    "display_name": "nametest",
    "type": "Lora",
    "file": "Naruto.safetensors",
    "link_file": "https://huggingface.co/annh/general/resolve/main/Naruto.safetensors",
    "icon": "https://huggingface.co/annh/general/resolve/main/Naruto.jpeg",
    "civitaiLink": "https://civitai.com/models/43331"
  }`;
  const [valueStyle, setValueStyle] = useState(initalValue)
  const [showModalURL, setShowModalURL] = useState(false)
  const [valueURLTemp, setValueURLTemp] = useState('')
  const [isCopy, setIsCopy] = useState('Copy')
  const [isUpload, setIsUpload] = useState(false)
  const [urlS3, setURLS3] = useState({
    file: {},
    signedRequest: '',
    url: ''
  })
  const footerContent = (
    <div>
      <Button className='p-button-secondary' label="Cancel" icon="pi pi-times" onClick={() => setIsOpen(false)} />
      <Button className='p-button-success' label="Add" icon="pi pi-check" onClick={e => {onAdd(valueStyle);isUpload && finalSaveS3();}} autoFocus />
    </div>
  );
  const finalSaveS3 = ()=>{
    const save = ConfigService.getInstance().uploadFileS3(urlS3.file,urlS3.signedRequest,urlS3.url)
  }
  const handleImageUpload = async (e: any) => {
    const fileName = e.target.files[0]
    const upload = await ConfigService.getInstance().uploadImage(fileName);
    upload && setIsUpload(true)
    const ob = {
      file: fileName,
      signedRequest: upload.data.signedRequest,
      url: upload.data.url
    }
    if (upload.success) {
      setValueURLTemp(upload.data.url)
      setShowModalURL(true)
      setURLS3(ob as any)
    }

  }
  const onCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    NotifyController.success('Copy success');
    setIsCopy('Copied');
    setShowModalURL(false)
  }
  return (
    <div>
    <Dialog header={"Add new config"} visible={isOpen} onHide={()=>setIsOpen(false)}  style={{ width: '100%', height: 'auto' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} footer={footerContent}>
      <textarea style={{ width: '100%', height: '500px' }} onChange={e=>setValueStyle(e.target.value)} >
        {initalValue}
      </textarea>
      
      <Dialog  header={'URL image '} visible={showModalURL} onHide={() => setShowModalURL(false)}  style={{ width: '30%', height: '200px' }}  >
            <p>Copy url and past to field <b>icon</b> of json file</p>
          <div className='flex justify-content-center align-item-center gap-2'>
          <InputText value={valueURLTemp}  style={{
          width:'200px'
          }} disabled  />
          <Button onClick={e => onCopy(valueURLTemp)} className='pi pi-copy'>{isCopy}</Button>
          </div>
        </Dialog>
        <h5>Upload image</h5>
        <input id="input-image" type="file" accept="image/*" onChange={handleImageUpload} />
      </Dialog>  
    
    </div>
  )
}

export default ModelAddNew