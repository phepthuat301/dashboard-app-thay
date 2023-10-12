import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import ConfigService from '../../../service/ConfigManagement/configService';
import ModelViewDetailConfig from './ModalViewDetailConfig';
import NotifyController from '../../../utilities/Toast';
import ButtonAdd from './ButtonAdd';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { InputSwitch } from 'primereact/inputswitch';

function ListAllConfig() {
    const [listData, setListData] = useState([])
    const [visibleModal, setVisibleModal] = useState(false)
    const [titleModal, setTitleModal] = useState('')
    const [dataModalDelete, setTitleModalDelete] = useState('')
    const [visibleModalDelete, setVisibleModalDelete] = useState(false)
    const [visibleModalClone, setVisibleModalClone] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [dataModal, setDataModal] = useState([]);
    const [dataModalDuplicate, setDataModalDuplicate] = useState([]);
    const getList = async () => {
        const data = await ConfigService.getInstance().getAllConfigs();
        setListData(data.data)
    }
    const onClickBtnEdit = (data: any) => {
        setVisibleModal(true);
        setDataModal(data)
    }

    const onDuplicate = async (data: any) => {
        delete data._id;
        data.name = data.name + " Copy";
        data.code = data.code + "_copy"
        const addNewClone = await ConfigService.getInstance().addNewConfigs(data);
        if (addNewClone.success) {
            NotifyController.success('Duplicate success')
            setVisibleModalClone(false)
            getList()
        }
    }
    const onDelete = async (id: any) => {
        const deleteConfig = await ConfigService.getInstance().deleteConfig([id]);
        if (deleteConfig.status === 200) {
            NotifyController.success('Delete success!')
            getList();
            setVisibleModalDelete(false)
        }
    }
    const onClickDelete = (data: any) => {
        setTitleModal(data.name)
        setTitleModalDelete(data._id);
        setVisibleModalDelete(true)
    }
    const onClickDuplicate = (data: any) => {
        setTitleModal(data.name)
        setDataModalDuplicate(data);
        setVisibleModalClone(true)
    }

    const actionTemplate = (data: any) => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button type="button" className="p-button-success" icon="pi pi-clone" onClick={e => onClickDuplicate(data)}></Button>
                <Button type="button" className="p-button-info" icon="pi pi-pencil" onClick={e => onClickBtnEdit(data)}></Button>
                <Button type="button" className='p-button-danger' icon="pi pi-trash" onClick={e => onClickDelete(data)}></Button>
            </div>
        );
    };
    const imgTemplate = (data: any) => {
        const image = data.image;
        return (
            <div className="flex align-items-center gap-2">
                <img src={image} width="100" />
            </div>
        );
    };
    const textPromptTemplate = (data: any) => {
        const prompt = data.negative_prompt;
        return (
            <div>
                <div className='text' style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: '200px',
                    cursor: 'pointer'
                }} data-pr-tooltip={prompt}>{prompt}</div>
            </div>
        );
    };
    const onEdit = async (value: string) => {
        const edited = await ConfigService.getInstance().putEditConfig(JSON.parse(value));
        if (edited.success) {
            getList();
            setVisibleModal(false)
        }
    }
    const statusTemplate = (data: any) => {
        const onChangeSwitch = async (checked: boolean) => {
            data.status = checked ? 'ACTIVE' : 'INACTIVE';
            const edited = await ConfigService.getInstance().putEditConfig(data);
            setIsChecked(checked)
            if (edited.success) {
                NotifyController.success('Change status success')
                getList()
            }
        }
        return (
            <div className="flex align-items-center gap-2">
                <InputSwitch checked={data.status === 'ACTIVE' ? true : false} onChange={(e) => onChangeSwitch(e.value)} />
            </div>
        );
    }
    useEffect(() => {
        getList();
    }, [])
    return (
        <div>
            <ModelViewDetailConfig visible={visibleModal} setVisible={setVisibleModal} data={dataModal} onEdit={onEdit} />
            <Dialog visible={visibleModalDelete} onHide={() => setVisibleModalDelete(false)} header={`Do you want delete ${titleModal}?`}>
                <div className='flex justify-content-center align-item-center gap-2'>
                    <Button className='p-button-secondary' label="Cancel" icon="pi pi-times" onClick={() => setVisibleModalDelete(false)} />
                    <Button className='p-button-danger' label="Delete" icon="pi pi-trash" onClick={() => onDelete(dataModalDelete)} autoFocus />
                </div>
            </Dialog>
            <Dialog visible={visibleModalClone} onHide={() => setVisibleModalClone(false)} header={`Do you want duplicate ${titleModal}?`}>
                <div className='flex justify-content-center align-item-center gap-2'>
                    <Button className='p-button-secondary' label="Cancel" icon="pi pi-times" onClick={() => setVisibleModalClone(false)} />
                    <Button className='p-button-danger' label="Ok" icon="pi pi-check" onClick={() => onDuplicate(dataModalDuplicate)} autoFocus />
                </div>
            </Dialog>
            <ButtonAdd getList={getList} />
            <DataTable width={'100%'} value={listData} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} selectOnEdit={true}>
                <Column body={(data, options) => options.rowIndex + 1} header="#"  ></Column>
                <Column field="type" header="type" sortable ></Column>
                <Column field="name" header="Name" sortable ></Column>
                <Column field="model" header="model" sortable ></Column>
                <Column field="status" header="status" body={statusTemplate} sortable ></Column>
                <Column field="platform" header="platform"></Column>
                <Column field="prompt" header="Prompt" ></Column>
                <Column field="promptWithCustom" header="Prompt Custom" ></Column>
                <Column field="negative_prompt" header="Negative" body={textPromptTemplate}></Column>
                <Column field="image" header="Image" body={imgTemplate}></Column>
                <Column body={actionTemplate} headerClassName="w-10rem" />
            </DataTable>
        </div>
    )
}

export default ListAllConfig