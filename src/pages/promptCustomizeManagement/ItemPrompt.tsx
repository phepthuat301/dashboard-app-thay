import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { TabMenu } from 'primereact/tabmenu';
import React, { useState, useEffect } from 'react'
import ConfigService from '../../service/ConfigManagement/configService';
import { InputText } from 'primereact/inputtext';
import NotifyController from '../../utilities/Toast';
import { InputSwitch } from 'primereact/inputswitch';
type ItemPromptProps = {
    data: any,
    listItem: any
}
function ItemPrompt({ data, listItem }: ItemPromptProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [visibleModal, setVisibleModal] = useState(false);
    const [dataModal, setDataModal] = useState('');
    const [active, setActive] = useState('place');
    const [showModalURL, setShowModalURL] = useState(false)
    const [valueURLTemp, setValueURLTemp] = useState('')
    const [isCopy, setIsCopy] = useState('Copy')
    const [isUpload, setIsUpload] = useState(false)
    const [checked, setChecked] = useState(false)
    const [urlS3, setURLS3] = useState({
        file: {},
        signedRequest: '',
        url: ''
    })
    const listData = data.data;
    const toArray = Object.entries(listData)
    const itemsType = toArray.map((item: any) => ({
        label: item[0] || '',
    }));
    const imgTemplate = (data: any) => {
        const image = data.imageUrl;
        return (
            <div className="flex align-items-center gap-2">
                <img src={image} width="100" />
            </div>
        );
    };
    const closeModel = () => {
        setVisibleModal(false);
        NotifyController.success("Edit Success")
    }
    const onClickBtnEdit = async (res: any) => {
        setVisibleModal(true);
        setDataModal(res);
    }
    const onClickBtnConfirm = async (res: any) => {
        setVisibleModal(true);
        setDataModal(res);
        isUpload && finalSaveS3()
        switch (active) {
            case 'place':
                data.data.place = res;
                const isUpdatePlace = await ConfigService.getInstance().putEditPromptCustomize(data);
                if (isUpdatePlace.success) {
                    closeModel()
                }
                break;
            case 'age':
                data.data.age = res
                const isUpdateAge = await ConfigService.getInstance().putEditPromptCustomize(data);
                if (isUpdateAge.success) {
                    closeModel()
                }
                break;
            case 'hair':
                data.data.hair = res
                const isUpdateHair = await ConfigService.getInstance().putEditPromptCustomize(data);
                if (isUpdateHair.success) {
                    closeModel()
                }
                break;
            case 'skinTone':
                data.data.skinTone = res
                const isUpdateSkinTone = await ConfigService.getInstance().putEditPromptCustomize(data);
                if (isUpdateSkinTone.success) {
                    closeModel()
                }
                break;
            case 'accessory':
                data.data.accessory = res
                const isUpdateAccessory = await ConfigService.getInstance().putEditPromptCustomize(data);
                if (isUpdateAccessory.success) {
                    closeModel()
                }
                break;
            case 'light':
                data.data.light = res
                const isUpdateLight = await ConfigService.getInstance().putEditPromptCustomize(data);
                if (isUpdateLight.success) {
                    closeModel()
                }
                break;
            case 'emotion':
                data.data.emotion = res
                const isUpdateEmotion = await ConfigService.getInstance().putEditPromptCustomize(data);
                if (isUpdateEmotion.success) {
                    closeModel()
                }
                break;

            default:
                break;
        }
    }
    const footerContent = (
        <div>
            <Button className='p-button-secondary' label="Discard" icon="pi pi-times" onClick={() => setVisibleModal(false)} />
            <Button className='p-button-success' label="Save" icon="pi pi-check" onClick={e => onClickBtnConfirm(dataModal)} autoFocus />
        </div>
    );
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
    const finalSaveS3 = () => {
        ConfigService.getInstance().uploadFileS3(urlS3.file, urlS3.signedRequest, urlS3.url);

    }
    const onCopy = (link: string) => {
        navigator.clipboard.writeText(link);
        NotifyController.success('Copy success');
        setIsCopy('Copied');
        setShowModalURL(false)
    }
    const headerTable = (data: any) => {

        return <Button onClick={(e) => { onClickBtnEdit(data.props.value) }} className='pi pi-pencil w-1'>Edit</Button>
    }
    const statusTemplate = (dataInput: any, options: any) => {
        const isActive = dataInput.is_active;

        const onChangeStatus = async (checked: boolean) => {
            switch (active) {
                case 'place':
                    data.data.place[options.rowIndex].is_active = checked;
                    const isUpdatePlace = await ConfigService.getInstance().putEditPromptCustomize(data);
                    if (isUpdatePlace.success) {
                        setChecked(false)
                        NotifyController.success('Change status success')
                    }
                    break;
                case 'age':
                    data.data.age[options.rowIndex].is_active = checked;
                    const isUpdateAge = await ConfigService.getInstance().putEditPromptCustomize(data);
                    if (isUpdateAge.success) {
                        setChecked(false)
                        NotifyController.success('Change status success')
                    }
                    break;
                case 'hair':
                    data.data.hair[options.rowIndex].is_active = checked;
                    const isUpdateHair = await ConfigService.getInstance().putEditPromptCustomize(data);
                    if (isUpdateHair.success) {
                        setChecked(false)
                        NotifyController.success('Change status success')
                    }
                    break;
                case 'skinTone':
                    data.data.skinTone[options.rowIndex].is_active = checked;
                    const isUpdateSkinTone = await ConfigService.getInstance().putEditPromptCustomize(data);
                    if (isUpdateSkinTone.success) {
                        setChecked(false)
                        NotifyController.success('Change status success')
                    }
                    break;
                case 'accessory':
                    data.data.accessory[options.rowIndex].is_active = checked;
                    const isUpdateAccessory = await ConfigService.getInstance().putEditPromptCustomize(data);
                    if (isUpdateAccessory.success) {
                        setChecked(false)
                        NotifyController.success('Change status success')
                    }
                    break;
                case 'light':
                    data.data.light[options.rowIndex].is_active = checked;
                    const isUpdateLight = await ConfigService.getInstance().putEditPromptCustomize(data);
                    if (isUpdateLight.success) {
                        setChecked(false)
                        NotifyController.success('Change status success')
                    }
                    break;
                case 'emotion':
                    data.data.emotion[options.rowIndex].is_active = checked;
                    const isUpdateEmotion = await ConfigService.getInstance().putEditPromptCustomize(data);
                    if (isUpdateEmotion.success) {
                        setChecked(false)
                        NotifyController.success('Change status success')
                    }
                    break;
                default:
                    break;
            }
        }
        return (
            <div className="flex align-items-center gap-2">
                <InputSwitch checked={isActive} onChange={e => onChangeStatus(e.value)} />
            </div>
        );
    }
    useEffect(() => {
        setChecked(true)
    }, [checked])
    return (
        <div>
            <TabMenu model={itemsType} activeIndex={activeIndex} onTabChange={(e) => { setActiveIndex(e.index); setActive(e.value.label as string) }} />
            {toArray.map((item: any) => (
                <>
                    <DataTable hidden={item[0] !== active} style={{
                        textTransform: 'capitalize'
                    }} width={'100%'} value={item[1]}
                        paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} selectOnEdit={true} header={headerTable}>
                        <Column body={(data, options) => options.rowIndex + 1} header="#"  ></Column>
                        <Column field="name" header="Name" ></Column>
                        <Column field="weight" header="weight"></Column>
                        <Column field="prompt" header="Prompt" ></Column>
                        <Column field="imageUrl" header="Image" body={imgTemplate}></Column>
                        <Column field="is_active" header="Active" body={statusTemplate} ></Column>
                    </DataTable>
                </>
            ))}
            <Dialog header={`Edit ${active}`} visible={visibleModal} onHide={() => setVisibleModal(false)} footer={footerContent}>
                <textarea rows={30} cols={70} onChange={(e) => setDataModal(JSON.parse(e.target.value))} >{JSON.stringify(dataModal, undefined, 4)}</textarea>
                <Dialog header={'URL image '} visible={showModalURL} onHide={() => setShowModalURL(false)} style={{ width: '30%', height: '200px' }}  >
                    <p>Copy url and past to field <b>image</b> of json file</p>
                    <div className='flex justify-content-center align-item-center gap-2'>
                        <InputText value={valueURLTemp} style={{
                            width: '200px'
                        }} disabled />
                        <Button onClick={e => onCopy(valueURLTemp)} className='pi pi-copy'>{isCopy}</Button>
                    </div>
                </Dialog>
                <h5>Upload image</h5>
                <input id="input-image" type="file" accept="image/*" onChange={handleImageUpload} />
            </Dialog>
        </div>
    )
}

export default ItemPrompt