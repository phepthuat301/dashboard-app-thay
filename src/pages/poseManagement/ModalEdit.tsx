import { Checkbox } from 'primereact/checkbox'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import ConfigService from '../../service/ConfigManagement/configService'
import NotifyController from '../../utilities/Toast'
import { Button } from 'primereact/button'
type ModelEditProps = {
    setIsOpenModalEdit: Function,
    isOpenModalEdit: boolean,
    data: any
}
function ModalEdit({ setIsOpenModalEdit, isOpenModalEdit, data }: ModelEditProps) {
    const [isUpload, setIsUpload] = useState(false)
    const [showModalURL, setShowModalURL] = useState(false)
    const [valueURLTemp, setValueURLTemp] = useState('')
    const [isCopy, setIsCopy] = useState('Copy')
    const [urlS3, setURLS3] = useState({
        file: {},
        signedRequest: '',
        url: ''
    })

    const finalSaveS3 = () => {
        const save = ConfigService.getInstance().uploadFileS3(urlS3.file, urlS3.signedRequest, urlS3.url)
    }

    const onEdit = () => {

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
            <Dialog onHide={() => setIsOpenModalEdit(false)} visible={isOpenModalEdit} header={'Edit pose'}>
                <div className='flex flex-column gap-4'>
                    <div className='flex gap-2 '>
                        Name: <InputText className='w-full' value={data.name} />
                    </div>
                    <div className='flex gap-2 w-full'>
                        Image: <InputText className='w-full' placeholder='URL image' value={data.image_url} width={100} />
                    </div>
                    <div className='flex flex-column gap-2'>
                        List Sample:
                        <textarea cols={80} rows={20}>
                            {JSON.stringify(data.sample, undefined, 4)}
                        </textarea>
                    </div>
                    <div className='flex flex-column'>
                        Guide
                        <textarea cols={80} rows={10} >
                            {JSON.stringify(data.guideline, undefined, 4)}
                        </textarea>
                    </div>
                    <div className='flex flex-column'>
                        Override Config
                        <textarea cols={80} rows={10} >
                            {JSON.stringify(data.override_config, undefined, 4)}
                        </textarea>
                    </div>
                    <div>
                        Get url image
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                    </div>
                </div>
                <Dialog header={'URL image '} visible={showModalURL} onHide={() => setShowModalURL(false)} style={{ width: '30%', height: '200px' }}  >
                    <p>Copy url and past to field <b>image</b> of json file</p>
                    <div className='flex justify-content-center align-item-center gap-2'>
                        <InputText value={valueURLTemp} style={{
                            width: '200px'
                        }} disabled />
                        <Button onClick={e => onCopy(valueURLTemp)} className='pi pi-copy'>{isCopy}</Button>
                    </div>
                </Dialog>
                <Button className='mt-3' onClick={() => onEdit()}>Edit</Button>
            </Dialog>
        </div>
    )
}

export default ModalEdit