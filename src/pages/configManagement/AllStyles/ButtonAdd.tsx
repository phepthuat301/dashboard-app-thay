import { Button } from 'primereact/button'
import React,{useState} from 'react'
import ModelAddNew from './ModelAddNew'
import ConfigService from '../../../service/ConfigManagement/configService'
import NotifyController from '../../../utilities/Toast'

function ButtonAdd({getList}:any) {
  const [isOpen,setIsOpen]= useState(false)
  function containsWhitespace(str:string) {
    return /\s/.test(str);
  }
  const onAdd = async (value:string)=>{
    if(containsWhitespace(JSON.parse(value).name)){
      setIsOpen(true)
      NotifyController.warning('Name không được chứa ký tự khoảng trắng (space), vui lòng nhập lại "name" ')
    } else {
      const addNew = await ConfigService.getInstance().postAddStyles(JSON.parse(value));
      if(addNew && addNew.status ==='success'){
        getList()
        setIsOpen(false);
         NotifyController.success('Add success')
      }
    }
  }
  return (
    <div>
        <Button className='p-button-success' onClick={()=>{setIsOpen(true)}} >+ New </Button>
        <ModelAddNew isOpen={isOpen} setIsOpen={setIsOpen}  onAdd={onAdd}/>
    </div>
  )
}

export default ButtonAdd