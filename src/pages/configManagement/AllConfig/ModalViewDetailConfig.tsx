import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React, { useState } from 'react'
import ConfigService from '../../../service/ConfigManagement/configService'
import { InputText } from 'primereact/inputtext'
import NotifyController from '../../../utilities/Toast'


type ModalViewDetailConfigProps = {
  visible: boolean,
  setVisible: (i: boolean) => void,
  data: any,
  onEdit: (value: string) => void
}
function ModelViewDetailConfig({ visible, setVisible, data, onEdit }: ModalViewDetailConfigProps) {
  const [value, setValue] = useState(JSON.stringify(data, undefined, 4))
  const [valueURLTemp, setValueURLTemp] = useState('')
  const [showModalURL, setShowModalURL] = useState(false)
  const [isCopy, setIsCopy] = useState('Copy')
  const [isUpload, setIsUpload] = useState(false)
  const [urlS3, setURLS3] = useState({
    file: {},
    signedRequest: '',
    url: ''
  })
  const onChangeTextArea = (e: any) => {

    setValue(e.target.value)
  }

  const footerContent = (
    <div>
      <Button className='p-button-secondary' label="Discard" icon="pi pi-times" onClick={() => setVisible(false)} />
      <Button className='p-button-success' label="Save" icon="pi pi-check" onClick={e => {onEdit(value); isUpload &&finalSaveS3()}} autoFocus />
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
    <div className='flex justify-content-center'>
      <Dialog header="Edit config" visible={visible} onHide={() => setVisible(false)}
        style={{ width: '100%', height: 'auto' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        footer={footerContent}>
        <textarea style={{ width: '100%', height: '500px' }} onChange={(e: any) => { onChangeTextArea(e) }}>{
          JSON.stringify(data, undefined, 4)
        }</textarea>

        <Dialog  header={'URL image '}visible={showModalURL} onHide={() => setShowModalURL(false)}  style={{ width: '30%', height: '200px' }}  >
            <p>Copy url and past to field <b>image</b> of json file</p>
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

export default ModelViewDetailConfig