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