import { Button } from 'primereact/button';
import React,{useEffect,useState} from 'react'
import { Tooltip } from 'primereact/tooltip';
import ConfigService from '../../service/ConfigManagement/configService';
import NotifyController from '../../utilities/Toast';
import { TabMenu } from 'primereact/tabmenu';
import ItemPrompt from './ItemPrompt';

function ListAllPromptCustomize() {
    const [listData,setListData]= useState<any[]>([])
    const [visibleModal, setVisibleModal]= useState(false)
    const [dataModal, setDataModal]= useState([]);    
    const [activeIndex, setActiveIndex] = useState(0);
    const [active, setActive] = useState('Váy nữ');
    const getList = async ()=>{
        const data = await ConfigService.getInstance().getAllPromptCustomize(); 
        
        setListData(data.data)
        console.log((listData));
        
    }
    useEffect(()=>{
        getList();
    },
    [])
    const onClickBtnEdit=(data:any)=>{
        setVisibleModal(true);
        setDataModal(data)
    }
    const onDelete= async(id:any)=>{
       const deleteConfig  = await ConfigService.getInstance().deleteConfig([id]);
       if(deleteConfig.status===200){

        NotifyController.success('Delete success!')
        getList();
       }
    }


    const actionTemplate = (data:any) => {    
        return (
            <div className="flex flex-wrap gap-2">
                <Button type="button"   className="p-button-danger" icon="pi pi-pencil" onClick={e=>onClickBtnEdit(data)}></Button>
                <Button type="button"  className='p-button-info' icon="pi pi-trash" onClick={e=>onDelete(data._id)}></Button>
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
    const textPromptTemplate = (data:any) => {
        const prompt= data.negative;
        return (
            <div>
                <Tooltip target=".text" position="left"  />
                <div className='text' style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width:'200px',
                    cursor:'pointer'
                }} data-pr-tooltip={prompt}>{prompt}</div>
            </div>
        );
    };
    const onEdit =  async (value:string)=>{     
        const edited = await ConfigService.getInstance().putEditConfig(JSON.parse(value));
        if(edited.success){
            getList();
            setVisibleModal(false)
        }
      }
      const items = [
        {label: 'Place', icon: 'pi pi-fw pi-home'},
        {label: 'Age', icon: 'pi pi-fw pi-calendar'},
        {label: 'Hair', icon: 'pi pi-fw pi-pencil'},
        {label: 'SkinTone', icon: 'pi pi-fw pi-file'},
        {label: 'Accessory', icon: 'pi pi-fw pi-cog'},
        {label: 'Light', icon: 'pi pi-fw pi-cog'},
        {label: 'Emotion', icon: 'pi pi-fw pi-cog'}
    ];
    const itemsType = listData.map((item) => ({
        label: item.name || ''
      }));
  return (
    <div>
         {/* <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}  /> */}
         <TabMenu model={itemsType} activeIndex={activeIndex}  onTabChange={(e) => {setActiveIndex(e.index);setActive(e.value.label as string)}}  />
         {listData?.map(data=>(<>
           <div className={`${active===data.name?null:'hidden'}`}>
            <ItemPrompt  data={data} listItem={data.data}/>
           </div>
         </>
         ))}
    </div>
  )
}

export default ListAllPromptCustomize