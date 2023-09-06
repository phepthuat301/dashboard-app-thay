import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import React,{useEffect,useState} from 'react'
import ConfigService from '../../../service/ConfigManagement/configService';
import ModelViewDetailConfig from './ModalViewDetailConfig';
import { ToastContainer } from 'react-toastify';
import NotifyController from '../../../utilities/Toast';

function ListAllConfig() {
    const [listData,setListData]= useState([])
    const [visibleModal, setVisibleModal]= useState(false)
    const [dataModal, setDataModal]= useState([])
    useEffect(()=>{
        getList()
    },
    [listData])
    
    const onClickBtnEdit=(data:any)=>{
        setVisibleModal(true);
        setDataModal(data)
    }
    const onDelete= async(e:any)=>{
        const id =e.target.id;
       const deleteConfig  = await ConfigService.getInstance().deleteConfig([id]);
       if(deleteConfig.status===200){
        NotifyController.success('Delete success!')
       }
       
    }
    const getList = async ()=>{
        const data = await ConfigService.getInstance().getAllConfigs();
        setListData(data.data)
    }

    const actionTemplate = (data:any) => {
            
        return (
            <div className="flex flex-wrap gap-2">
                <Button type="button"   className="p-button-danger" icon="pi pi-pencil" onClick={e=>onClickBtnEdit(data)}></Button>
                <Button type="button" id={data._id}  className='p-button-info' icon="pi pi-trash" onClick={e=>onDelete(e)}></Button>
            </div>
        );
    };
    const imgTemplate = (data:any) => {
        const image= data.image;
        return (
            <div className="flex align-items-center gap-2">
                <img  src={image} width="100" />
            </div>
        );
    };
  return (
    <div>
        <ModelViewDetailConfig visible={visibleModal} setVisible={setVisibleModal} data={dataModal}/>
        <DataTable  width={'100%'} value={listData} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} selectOnEdit={true}>
            <Column field="type" header="type"></Column>
            <Column field="name" header="Name" ></Column>
            <Column field="model" header="model"></Column>
            <Column field="platform" header="platform"></Column>
            <Column field="prompt" header="Prompt"></Column>
            <Column field="promptWithCustom" header="Prompt Custom"></Column>
            <Column field="negative" header="Negative"></Column>
            <Column field="image" header="Image" body={imgTemplate}></Column>
            <Column body={actionTemplate}  headerClassName="w-10rem"   />
        </DataTable>
    </div>
  )
}

export default ListAllConfig