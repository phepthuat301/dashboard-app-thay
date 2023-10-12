import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'
import React,{useState} from 'react'
import ConfigService from '../../../service/ConfigManagement/configService';
import NotifyController from '../../../utilities/Toast';
import { InputText } from 'primereact/inputtext';



type ModelAddNewProps = {
  isOpen: boolean,
  setIsOpen: (i:boolean)=>void,
  onAdd:(value:string)=>void
}
function ModelAddNew({isOpen,setIsOpen,onAdd}:ModelAddNewProps) {
  const initalValue=`[{
    "code": "shirt-vn",
    "promptWithCustom": "8k wallpaper,best quality,CG unity,extremely detailed,film grain,intricate,masterpiece,realistic,ultra realistic,BREAK (man),(Masterpiece:1.1),nude,natural hands,natural arms,BREAK (vietnamese),(handsome man:1.2),BREAK$$$,\n <lora:add_detail:0.8>,<lora:epi_noiseoffset2:0.6>,",
    "platform": "FASHION_WEB",
    "type": "shirt",
    "name": "Tshirt - Vietnam",
    "prompt": "8k wallpaper,best quality,CG unity,extremely detailed,film grain,intricate,masterpiece,realistic,ultra realistic,BREAK (1 man:1.2),(Masterpiece:1.1),natural hands,natural arms,BREAK (vietnamese),(handsome man:1.2),<lora:add_detail:0.8>,<lora:epi_noiseoffset2:0.6>,",
    "cfg_scale": 7,
    "clip_skip": "2",
    "image": "https://media.vision2art.ai/1695725895437-image-mPosJONI2zY-1695721795083.jpg",
    "restore_faces": true,
    "model": "Photon",
    "negative_prompt": "(woman:1.2),(worst quality, low quality:1.4), (EasyNegative:0.8), multiple views, multiple panels, blurry, watermark, letterbox, text, easynegative, (low quality, worst quality:1.4), poorly drawn hands, bad anatomy, monochrome, long body , bad anatomy, liquid body, malformed, mutated, anatomical nonsense, bad proportions, uncoordinated body, unnatural body, disfigured, ugly, gross proportions, mutation, disfigured, deformed, mutation, poorlydrawn, bad hand, mutated hand, bad fingers, mutated fingers, liquid tongue, long neck, fused ears, bad ears, poorly drawn ears, extra ears, liquid ears, heavy ears, missing ears, fused animal ears, bad animal ears, poorly drawn animal ears, extra animal ears, liquid animal ears, heavy animal ears, missing animal ears, bad hairs, poorly drawn hairs, fused hairs, bad face, fused face, poorly drawn face, cloned face, big face, long face, bad eyes, fused eyes poorly drawn eyes, extra eyes, bad mouth, fused mouth, poorly drawn mouth, bad tongue, big mouth, bad perspective, bad objects placement, mole, logo, verybadimagenegative_v1.3, plants, negative_hand-neg, logo, digits, mole, plants,",
    "sampler_name": "DPM++ SDE Karras",
    "size": "768x1011",
    "steps": 30,
    "denoising_strength": 1,
    "mask_blur": 1,
    "width": 768,
    "height": 1011,
    "inpaint_full_res_padding": 32,
    "controlnet": {
        "args": [
            {
                "module": "canny",
                "model": "control_v11p_sd15_canny [d14c016b]",
                "weight": 0.85,
                "guidance_start": 0.1,
                "guidance_end": 0.85,
                "control_mode": 0,
                "pixel_perfect": false,
                "resize_mode": 1,
                "threshold_a": 100,
                "threshold_b": 200,
                "processor_res": 512
            }
        ]
    },
    "adetailer": {
        "args": [
            {
                "ad_model": "face_yolov8n.pt",
                "ad_confidence": 0.3,
                "ad_dilate_erode": 4,
                "ad_mask_blur": 4,
                "ad_denoising_strength": 0.4,
                "ad_inpaint_only_masked": true,
                "ad_inpaint_only_masked_padding": 32
            }
        ]
    },
    "resize_mode": 0,
    "image_cfg_scale": 0,
    "mask_blur_x": 4,
    "mask_blur_y": 4,
    "inpainting_fill": 0,
    "inpaint_full_res": 0,
    "inpainting_mask_invert": 1,
    "n_iter": 1,
    "tiling": false,
    "send_images": false,
    "save_images": true,
    "override_settings_restore_afterwards": false,
    "seed": -1,
    "subseed": -1,
    "subseed_strength": 0,
    "seed_resize_from_h": 0,
    "seed_resize_from_w": 0,
    "status": "ACTIVE",
    "updated_ts": "2023-10-10T10:08:01.388Z",
    "created_ts": "2023-10-10T10:08:01.388Z",
    "__v": 0
}]`;
  const [value, setValue] = useState(initalValue)
  const [showModalURL, setShowModalURL] = useState(false)
  const [valueURLTemp, setValueURLTemp] = useState('')
  const [isCopy, setIsCopy] = useState('Copy')
  const [isUpload, setIsUpload] = useState(false)
  const [urlS3, setURLS3] = useState({
    file: {},
    signedRequest: '',
    url: ''
  })
  const footerContent = (
    <div>
      <Button className='p-button-secondary' label="Cancel" icon="pi pi-times" onClick={() => setIsOpen(false)} />
      <Button className='p-button-success' label="Add" icon="pi pi-check" onClick={e => {onAdd(value);isUpload && finalSaveS3();}} autoFocus />
    </div>
  );
  const finalSaveS3 = ()=>{
    const save = ConfigService.getInstance().uploadFileS3(urlS3.file,urlS3.signedRequest,urlS3.url)
  }
  const handleImageUpload = async (e: any) => {
    const fileName = e.target.files[0]
    const upload = await ConfigService.getInstance().uploadImage(fileName);
    upload && setIsUpload(true)
    const ob = {
      file: fileName,
      signedRequest: upload.data.signedRequest,
      url: upload.data.url
    }
    if (upload.success) {
      setValueURLTemp(upload.data.url)
      setShowModalURL(true)
      setURLS3(ob as any)
    }

  }
  const onCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    NotifyController.success('Copy success');
    setIsCopy('Copied');
    setShowModalURL(false)
  }
  return (
    <div>
    <Dialog header={"Add new config"} visible={isOpen} onHide={()=>setIsOpen(false)}  style={{ width: '100%', height: 'auto' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} footer={footerContent}>
      <textarea style={{ width: '100%', height: '500px' }} onChange={e=>setValue(e.target.value)} >
        {initalValue}
      </textarea>
      
      <Dialog  header={'URL image '} visible={showModalURL} onHide={() => setShowModalURL(false)}  style={{ width: '30%', height: '200px' }}  >
            <p>Copy url and past to field <b>image</b> of json file</p>
          <div className='flex justify-content-center align-item-center gap-2'>
          <InputText value={valueURLTemp}  style={{
          width:'200px'
          }} disabled  />
          <Button onClick={e => onCopy(valueURLTemp)} className='pi pi-copy'>{isCopy}</Button>
          </div>
        </Dialog>
        <h5>Upload image</h5>
        <input id="input-image" type="file" accept="image/*" onChange={handleImageUpload} />
      </Dialog>  
    
    </div>
  )
}

export default ModelAddNew