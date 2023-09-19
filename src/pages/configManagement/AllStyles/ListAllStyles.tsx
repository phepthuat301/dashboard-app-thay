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

function ListAllStyles() {
    const [listData, setListData] = useState([])
    const [visibleModal, setVisibleModal] = useState(false)
    const [titleModal, setTitleModal] = useState('')
    const [dataModalDelete, setTitleModalDelete] = useState('')
    const [visibleModalDelete, setVisibleModalDelete] = useState(false)
    const [dataModal, setDataModal] = useState([]);
    const getList = async () => {
        const data = await ConfigService.getInstance().getAllStyles();
        setListData(data.result)
    }
    useEffect(() => {
        getList();
    },
        [])
    const onClickBtnEdit = (data: any) => {
        setVisibleModal(true);
        setDataModal(data)
    }
    const onDelete = async (id: any) => {
        const deleteStyles = await ConfigService.getInstance().deleteStyles(id);

        if (deleteStyles) {
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
    const actionTemplate = (data: any) => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button type="button" className="p-button-danger" icon="pi pi-pencil" onClick={e => onClickBtnEdit(data)}></Button>
                <Button type="button" className='p-button-info' icon="pi pi-trash" onClick={e => onClickDelete(data)}></Button>
            </div>
        );
    };
    const imgTemplate = (data: any) => {
        const image = data.icon;
        return (
            <div className="flex align-items-center gap-2">
                <img src={image} width="100" />
            </div>
        );
    };

    function containsWhitespace(str:string) {
        return /\s/.test(str);
      }
    const onEdit = async (value: string) => {
        const ob = JSON.parse(value);
        delete ob._id;
        delete ob.updatedAt;
        delete ob.createdAt;
        delete ob.__v;
        if(containsWhitespace(ob.name)){
            setVisibleModal(true)
            NotifyController.warning('Name không được chứa ký tự khoảng trắng (space), vui lòng nhập lại "name" ')
        } else {
            const edited = await ConfigService.getInstance().postEditStyles(ob);
            if(edited.status==="success"){
                getList();
                NotifyController.success('Sửa thành công')
                setVisibleModal(false)
            }
        }
    }
    return (
        <div>
            <ModelViewDetailConfig visible={visibleModal} setVisible={setVisibleModal} data={dataModal} onEdit={onEdit} />
            <Dialog visible={visibleModalDelete} onHide={() => setVisibleModalDelete(false)} header={`Do you want delete ${titleModal}?`}>
                <div className='flex justify-content-center align-item-center gap-2'>
                    <Button className='p-button-secondary' label="Cancel" icon="pi pi-times" onClick={() => setVisibleModalDelete(false)} />
                    <Button className='p-button-danger' label="Delete" icon="pi pi-trash" onClick={() => onDelete(dataModalDelete)} autoFocus />
                </div>
            </Dialog>
            <ButtonAdd getList={getList} />
            <DataTable width={'100%'} value={listData} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} selectOnEdit={true}>
                <Column  body={(data, options) => options.rowIndex + 1} header="#"  ></Column>
                <Column field="name" header="ID" filter filterPlaceholder="Search by id" sortable ></Column>
                <Column field="file" header="File" sortable filter filterPlaceholder="Search by file name" ></Column>
                <Column field="link_file" header="URL file"  filter filterPlaceholder="Search by url file" sortable></Column>
                <Column field="icon" header="icon" body={imgTemplate}></Column>
                <Column field="civitaiLink" header="Civitai Link"  filter filterPlaceholder="Search by civitai link" sortable ></Column>
                <Column field="display_name" header="Display Name"  sortable filter filterPlaceholder="Search by display name" ></Column>
                <Column field="type" header="Type" sortable filter filterPlaceholder="Search by type"></Column>
                <Column body={actionTemplate} headerClassName="w-10rem" />
            </DataTable>
        </div>
    )
}

export default ListAllStyles