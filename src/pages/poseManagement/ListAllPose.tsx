import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { TabMenu } from 'primereact/tabmenu';
import React, { useEffect, useState } from 'react'
import { Checkbox } from 'primereact/checkbox';
import ModalEdit from './ModalEdit';
import ConfigService from '../../service/ConfigManagement/configService';
function ListAllPose() {
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)
    const [dataModal, setDataModal] = useState([])
    const [listData, setListData] = useState([])
    const [type, setType] = useState('dress')
    const [activeIndex, setActiveIndex] = useState(0)
    const [editSuccess, setEditSuccess] = useState(false)
    const getList = async (type: string) => {
        const data = await ConfigService.getInstance().getAllPose(type);
        setListData(data.data)
    }

    const itemsType = [{
        label: "Dress",
        dataIndex: "dress",
    },
    {
        label: "T-shirt",
        dataIndex: "shirt",
    }]

    const onChangeType = (pose: any) => {
        setType(pose.value.dataIndex);
        setActiveIndex(pose.index)
    }

    const GuideTemplate = (data: any) => {
        const image = data.guideline;
        return (
            <div className="flex align-items-center gap-2">
                <p >{image[0]}...</p>
            </div>
        );
    };

    const ImageTemplate = (data: any) => {
        const image = data.image_url;
        return (
            <div className="flex align-items-center gap-2">
                <img src={image} alt="" width={50} />
            </div>
        );
    };

    const SampleTemplate = (data: any) => {
        const image = data.sample;
        return (
            <div className="flex flex-column align-items-center gap-2">
                <img src={image[0].image_url} alt="" width={50} />
                and more
            </div>
        );
    };
    const openModalEdit = (data: any) => {
        setIsOpenModalEdit(true);
        setDataModal(data);

    }
    const editPose = (data: any) => {

        return (
            <div className="flex align-items-center gap-2">
                <Button onClick={e => { openModalEdit(data) }}>Edit</Button>
            </div>
        );
    }

    useEffect(() => {
        getList(type)
    }, [type, editSuccess])

    return (
        <div>
            <TabMenu model={itemsType} activeIndex={activeIndex} onTabChange={e => onChangeType(e)} />
            <DataTable value={listData} stripedRows tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="#"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="image_url" header="Image" body={ImageTemplate}></Column>
                <Column field="sample" header="List Sample" body={SampleTemplate}></Column>
                <Column field="guideline" header="Guide" body={GuideTemplate}></Column>
                <Column field="is_pose" header="show"></Column>
                <Column header="Edit" body={editPose}></Column>
            </DataTable>
            <ModalEdit setIsOpenModalEdit={setIsOpenModalEdit} isOpenModalEdit={isOpenModalEdit} data={dataModal} setEditSuccess={setEditSuccess} />
        </div>
    )
}

export default ListAllPose