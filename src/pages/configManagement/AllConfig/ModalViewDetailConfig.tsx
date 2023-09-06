import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React,{useState} from 'react'


type  ModalViewDetailConfigProps={
    visible:boolean,
    setVisible:(i:boolean)=>void,
    data:any
}
function ModelViewDetailConfig({visible,setVisible,data}:ModalViewDetailConfigProps) {
  const [value,setValue]= useState(JSON.stringify(data,undefined,4))
  const onChangeTextArea = (e:any)=>{
    console.log(e.target.value);
    setValue(e.target.value)  
  }
  const onSave = ()=>{

  }
  return (
    <div>
            <Dialog header="Header" visible={visible} onHide={() => setVisible(false)}
                style={{ width: '100%',height:'100%' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
               <textarea style={{width:'100%', height:'90%'}} value={JSON.stringify(data,undefined,4)} onChange={(e:any)=>{onChangeTextArea(e)}}>{
                JSON.stringify(data,undefined,4)
               }</textarea>
               <div className='flex gap-2 items-end'>
               <Button className='p-button-info' onClick={() => setVisible(false)}>Discard</Button>
               <Button className='p-button-success' onClick={onSave} >Save</Button>
               </div>
            </Dialog>
    </div>
  )
}

export default ModelViewDetailConfig