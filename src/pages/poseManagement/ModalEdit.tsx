import { Checkbox } from 'primereact/checkbox'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import ConfigService from '../../service/ConfigManagement/configService'
import NotifyController from '../../utilities/Toast'
import { Button } from 'primereact/button'
type ModelEditProps = {
    setIsOpenModalEdit: Function,
    isOpenModalEdit: boolean,
    data: any,
    setEditSuccess: Function
}
function ModalEdit({ setIsOpenModalEdit, isOpenModalEdit, data, setEditSuccess }: ModelEditProps) {
    const [isUpload, setIsUpload] = useState(false)
    const [showModalURL, setShowModalURL] = useState(false)
    const [valueURLTemp, setValueURLTemp] = useState('')
    const [isCopy, setIsCopy] = useState('Copy')
    const [isCopyDisable, setIsCopyDisable] = useState(true)
    const [dataPose, setDataPose] = useState('')
    const [urlS3, setURLS3] = useState({
        file: {},
        signedRequest: '',
        url: ''
    })

    const finalSaveS3 = (ob: any) => {
        const save = ConfigService.getInstance().uploadFileS3(ob.file, ob.signedRequest, ob.url)
    }

    const onEdit = async () => {
        const dataEdit = JSON.parse(dataPose);
        const resEdit = await ConfigService.getInstance().editPose(data.type, dataEdit);
        if (resEdit.success) {
            NotifyController.success('Edit success!');
            setEditSuccess(true)
            setIsOpenModalEdit(false)
        } else {
            NotifyController.error('Edit error!');
        }
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
    const onChangeDataPose = (e: any) => {
        setDataPose(e.target.value);
    }
    const footerContent = (
        <div>
            <Button className='p-button-secondary' label="Discard" icon="pi pi-times" onClick={() => setIsOpenModalEdit(false) } />
            <Button className='p-button-success' label="Save" icon="pi pi-check" onClick={() => onEdit()} autoFocus />
        </div>
    );
    useEffect(() => {
        setDataPose(data);
        setEditSuccess(false)
    }, [data])
    return (
        <div>
            <Dialog onHide={() => setIsOpenModalEdit(false)} visible={isOpenModalEdit} header={'Edit pose'} footer={footerContent} style={{
                width: '80%'
            }}>
                <div className='flex flex-column gap-4'>
                    <div className='flex flex-column gap-2'>
                        <textarea cols={200} rows={40} onChange={e => onChangeDataPose(e)}>
                            {JSON.stringify(dataPose, undefined, 4)}
                        </textarea>
                    </div>
                    <div>
                        Get url image
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                    </div>
                </div>
                <Dialog header={'URL image '} visible={showModalURL} onHide={() => setShowModalURL(false)} style={{ width: '30%', height: '200px' }}  >
                    <p>Click button Confirm to upload to cloud!</p>
                    <div className='flex justify-content-center align-item-center gap-2'>
                        <InputText value={valueURLTemp} style={{
                            width: '200px'
                        }} disabled />
                        <div className='flex flex-column gap-3'>
                            <Button onClick={e => { finalSaveS3(urlS3); setIsCopyDisable(false) }} disabled={!isCopyDisable}>Confirm Upload</Button>
                            <Button onClick={e => onCopy(valueURLTemp)} disabled={isCopyDisable} className='pi pi-copy'>{isCopy}</Button>
                        </div>
                    </div>
                </Dialog>

            </Dialog>
        </div>
    )
}

export default ModalEdit