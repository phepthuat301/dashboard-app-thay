import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ConfigService from '../../service/ConfigManagement/configService';
import NotifyController from '../../utilities/Toast';
import FileUpload from '../configManagement/UploadConfig/FileUpload';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

function ImportTemplate() {
    const [dataJsonFiles, setDataJsonFiles] = useState("");
    const [isUpload, setIsUpload] = useState(true);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        selectedOption1: null,
        inputValue1: '',
        inputValue2: '',
        inputValue3: '',
        selectedOption2: null,
    });
    const [checkpoints, setCheckpoints] = useState<any>([]);

    const onReset = () => {
        setDataJsonFiles("");
        const inputUpload = document.getElementById('input-upload-image') as HTMLInputElement;
        inputUpload.value = '';
        setIsUpload(true)
    }

    const onChangeDataUpload = (e: any) => {
        setDataJsonFiles(e.target.value);
    }

    // Dropdown options for select fields
    const selectOptions1 = [
        { label: 'Váy nữ', value: 'dress' },
        { label: 'Áo thun nam', value: 'shirt' },
    ];


    // Handle form submission
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!dataJsonFiles) {
            NotifyController.warning('Please import file before submit');
            return;
        }
        if (!formData.inputValue1) {
            NotifyController.warning('Please input prompt with custom');
            return;
        }
        if (!formData.inputValue2) {
            NotifyController.warning('Please input name of template');
            return;
        }
        if (!formData.inputValue3) {
            NotifyController.warning('Please input image url');
            return;
        }
        if (!formData.selectedOption1) {
            NotifyController.warning('Please select type');
            return;
        }
        if (!formData.selectedOption2) {
            NotifyController.warning('Please select model');
            return;
        }

        const parseJson = JSON.parse(dataJsonFiles);
        const upload = await ConfigService.getInstance().importTemplate({
            ...parseJson,
            type: formData.selectedOption1,
            name: formData.inputValue2,
            promptWithCustom: formData.inputValue1,
            model: formData.selectedOption2,
            image: formData.inputValue3,
        });
        if (upload.success) {
            NotifyController.success("Submit success!");
            navigate('/config/list-config');
        } else NotifyController.error("Submit fail!")
        onReset()

    };

    // Handle input changes
    const handleInputChange = (e: any, fieldName: string) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const getList = async () => {
        const data = await ConfigService.getInstance().getCheckpoints();

        setCheckpoints(data.data.map((item: any) => {
            return {
                label: item.name,
                value: item.name,
            }
        }))
    }

    useEffect(() => {
        getList();
    }, [])

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Import Template</h5>
                    <div className={`${isUpload ? 'flex flex-column' : 'hidden'}`}>
                        <FileUpload setIsUpload={setIsUpload} setDataJsonFiles={setDataJsonFiles} dataJsonFiles={dataJsonFiles} />
                    </div>

                    <div className={`${dataJsonFiles === "" ? 'hidden' : ''}`}>
                        <textarea className='mb-3' disabled style={{ width: '100%', }} rows={40} onChange={onChangeDataUpload} value={dataJsonFiles} >{dataJsonFiles}</textarea>
                        <div className='flex gap-2'>
                            <Button className='p-button-info' onClick={onReset}>Reset</Button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 mt-3" >
                            <Dropdown
                                id="selectField1"
                                style={{ width: '100%' }}
                                value={formData.selectedOption1}
                                options={selectOptions1}
                                onChange={(e: any) => handleInputChange(e, 'selectedOption1')}
                                placeholder="Select type"
                            />
                        </div>

                        <div className="mb-3">
                            <Dropdown
                                id="selectField2"
                                style={{ width: '100%' }}
                                value={formData.selectedOption2}
                                options={checkpoints}
                                onChange={(e: any) => handleInputChange(e, 'selectedOption2')}
                                placeholder="Select model"
                            />
                        </div>

                        <div className="mb-3">
                            <InputText
                                id="textInput1"
                                style={{ width: '100%' }}
                                value={formData.inputValue1}
                                onChange={(e: any) => handleInputChange(e, 'inputValue1')}
                                placeholder='Please input prompt with custom'
                            />
                        </div>

                        <div className="mb-3">
                            <InputText
                                id="textInput2"
                                style={{ width: '100%' }}
                                value={formData.inputValue2}
                                onChange={(e: any) => handleInputChange(e, 'inputValue2')}
                                placeholder='Please input name of template'
                            />
                        </div>

                        <div className="mb-3">
                            <InputText
                                id="textInput3"
                                style={{ width: '100%' }}
                                value={formData.inputValue3}
                                onChange={(e: any) => handleInputChange(e, 'inputValue3')}
                                placeholder='Please input image url'
                            />
                        </div>
                        <button type="submit" className="p-button p-component">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ImportTemplate