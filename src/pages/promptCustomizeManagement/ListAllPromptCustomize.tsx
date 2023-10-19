import { useEffect, useState } from 'react'
import ConfigService from '../../service/ConfigManagement/configService';
import { TabMenu } from 'primereact/tabmenu';
import ItemPrompt from './ItemPrompt';

function ListAllPromptCustomize() {
  const [listData, setListData] = useState<any[]>([])
  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState('dress');

  const getList = async () => {
    const data = await ConfigService.getInstance().getAllPromptCustomize();
    setListData(data.data)
  }

  const itemsType = listData.map((item) => ({
    label: item.name || ''
  }));

  useEffect(() => {
    getList();
  }, [])
  
  return (
    <div>
      {/* <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}  /> */}
      <TabMenu model={itemsType} activeIndex={activeIndex} onTabChange={(e) => { setActiveIndex(e.index); setActive(e.value.label as string) }} />
      {listData?.map((data: any) => {
        return <>
          <div className={`${active === data.type ? null : 'hidden'}`}>
            <ItemPrompt data={data} />
          </div>
        </>
      })}
    </div>
  )
}

export default ListAllPromptCustomize