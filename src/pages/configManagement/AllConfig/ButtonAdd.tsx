import { Button } from 'primereact/button'
import React,{useState} from 'react'
import ModelAddNew from './ModelAddNew'
import ConfigService from '../../../service/ConfigManagement/configService'
import NotifyController from '../../../utilities/Toast'

function ButtonAdd({getList}:any) {
  const [isOpen,setIsOpen]= useState(false)
  const onAdd = async (value:string)=>{
    const addNew = await ConfigService.getInstance().addNewConfigs(JSON.parse(value));
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