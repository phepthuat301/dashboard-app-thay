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
    const getList = async (type:string)=>{
        const data = await ConfigService.getInstance().getAllPose(type); 
        setListData(data.data)
        console.log('data api',data.data);
        
        
    }
    const itemsType = [{
        label: "Dress",
        dataIndex:"dress",
    },
    {
        label: "T-shirt",
        dataIndex:"shirt",
    }]
    const data = [
        {
        id: "650bf409195c07414380ef79",
        image_url: "https://res.cloudinary.com/shoestoreproject/image/upload/v1695263134/mannequin.9d3395052b80eec55e07_ru3wkc.png",
        name: "Ma-nơ-canh full dáng",
        type: "shirt",
        is_pose: true,
        sample: [
            {
                "image_url": "https://res.cloudinary.com/shoestoreproject/image/upload/v1695263134/mannequin.9d3395052b80eec55e07_ru3wkc.png",
                "name": "Tên là shirt abc11"
            },
            {
                "image_url": "https://res.cloudinary.com/shoestoreproject/image/upload/v1695263134/mannequin.9d3395052b80eec55e07_ru3wkc.png",
                "name": "Tên là shirt abc12"
            },
            {
                "image_url": "https://res.cloudinary.com/shoestoreproject/image/upload/v1695263134/mannequin.9d3395052b80eec55e07_ru3wkc.png",
                "name": "Tên là  shirt abc13"
            },
            {
                "image_url": "https://res.cloudinary.com/shoestoreproject/image/upload/v1695263134/mannequin.9d3395052b80eec55e07_ru3wkc.png",
                "name": "Tên là  shirt abc14"
            }
        ],
        guideline: [
            "1. 1Kích thước hình sau khi crop phải lớn hơn 768x1024",
            "2. Kích thước hình sau khi crop phải lớn hơn 768x1024 và Kích thước hình sau khi crop phải lớn hơn 768x1024 Kích thước hình sau khi crop phải lớn hơn 768x1024",
            "3. Kích thước hình sau khi crop phải lớn hơn 768x1024",
            "4. Kích thước hình sau khi crop phải lớn hơn 768x1024",
            "5. Kích thước hình sau khi crop phải lớn hơn 768x1024 và Kích thước hình sau khi crop phải lớn hơn 768x1024 Kích thước hình sau khi crop phải lớn hơn 768x1024",
            "6. Kích thước hình sau khi crop phải lớn hơn 768x1024"
        ]
    }
    ]
    const onChangeType =(pose:any)=>{
        setType(pose.value.dataIndex);
        setActiveIndex(pose.index)
        // getList(type)
        
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
    const editPose = (data: any) => {

        return (
            <div className="flex align-items-center gap-2">
                <Button onClick={e => { setIsOpenModalEdit(true); setDataModal(data) }}>Edit</Button>
                <Button>Remove</Button>
            </div>
        );
    }
    useEffect(()=>{
        getList(type)
    },[type])
    return (
        <div>
            <TabMenu model={itemsType} activeIndex={activeIndex} onTabChange={e=>onChangeType(e)} />
            <DataTable value={listData} stripedRows tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="#"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="image_url" header="Image" body={ImageTemplate}></Column>
                <Column field="sample" header="List Sample" body={SampleTemplate}></Column>
                <Column field="guideline" header="Guide" body={GuideTemplate}></Column>
                <Column field="is_pose" header="show"></Column>
                <Column header="Edit" body={editPose}></Column>
            </DataTable>
            <ModalEdit setIsOpenModalEdit={setIsOpenModalEdit} isOpenModalEdit={isOpenModalEdit} data={dataModal} />
        </div>
    )
}

export default ListAllPose