import { Button } from 'primereact/button'
import React,{useState} from 'react'
import ModelAddNew from './ModelAddNew'
import ConfigService from '../../../service/ConfigManagement/configService'
import NotifyController from '../../../utilities/Toast'

function ButtonAdd({getList}:any) {
  const [isOpen,setIsOpen]= useState(false)
  const onAdd = async (value:string)=>{
    console.log('JSON.parse(value)',JSON.parse(value));
    
    const addNew = await ConfigService.getInstance().addNewConfigs(JSON.parse(value));
    console.log('addNew',addNew);
    NotifyController.success('Add success')
    setIsOpen(false)
    getList()
  }
  return (
    <div>
        <Button className='p-button-success' onClick={()=>{setIsOpen(true)}} >+ New </Button>
        <ModelAddNew isOpen={isOpen} setIsOpen={setIsOpen}  onAdd={onAdd}/>
    </div>
  )
}

export default ButtonAdd