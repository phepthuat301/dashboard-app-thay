import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import AppCodeHighlight from '../AppCodeHighlight';

const IconsDemo = () => {
    const [icons, setIcons] = useState([]);
    const [filteredIcons, setFilteredIcons] = useState([]);

    useEffect(() => {
        axios.get('assets/demo/data/icons.json').then((res) => {
            let icons = res.data.icons;
            icons.sort((icon1: any, icon2: any) => {
                if (icon1.properties.name < icon2.properties.name) return -1;
                else if (icon1.properties.name < icon2.properties.name) return 1;
                else return 0;
            });

            setIcons(icons);
            setFilteredIcons(icons);
        });
    }, []);

    const onFilter = (event: any) => {
        if (!event.target.value) {
            setFilteredIcons(icons);
        } else {
            setFilteredIcons(
                icons.filter((it: any) => {
                    return it.icon.tags[0].includes(event.target.value);
                })
            );
        }
    };

    return (
        <div className="card docs">
            <h4>Icons</h4>
            <p>
                PrimeReact components internally use{' '}
                <a href="https://github.com/primefaces/primeicons" className="font-medium">
                    PrimeIcons
                </a>{' '}
                library, the official icons suite from{' '}
                <a href="https://www.primetek.com.tr" className="font-medium">
                    PrimeTek
                </a>
                .
            </p>

            <h5>Download</h5>
            <p>PrimeIcons is available at npm, run the following command to download it to your project.</p>
            <AppCodeHighlight>
                {`
npm install primeicons --save
`}
            </AppCodeHighlight>

            <h5>Getting Started</h5>
            <p>
                PrimeIcons use the <strong>pi pi-&#123;icon&#125;</strong> syntax such as <strong>pi pi-check</strong>. A standalone icon can be displayed using an element like <i>i</i> or <i>span</i>
            </p>

            <AppCodeHighlight>
                {`
<i className="pi pi-check" style={{ marginRight: '.5rem' }}></i>
<i className="pi pi-times"></i>
`}
            </AppCodeHighlight>

            <h5>Size</h5>
            <p>Size of the icons can easily be changed using font-size property.</p>

            <AppCodeHighlight>
                {`
<i className="pi pi-check"></i>
`}
            </AppCodeHighlight>

            <i className="pi pi-check"></i>

            <AppCodeHighlight>
                {`
<i className="pi pi-check" style={{ fontSize: '2rem' }}></i>
`}
            </AppCodeHighlight>

            <i className="pi pi-check" style={{ fontSize: '2rem' }}></i>

            <h5>Spinning Animation</h5>
            <p>Special pi-spin class applies continuous rotation to an icon.</p>
            <AppCodeHighlight>
                {`
<i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
`}
            </AppCodeHighlight>

            <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>

            <h5>Constants</h5>
            <p>PrimeIcons constants API is provided to easily choose an icon with typescript e.g. when defining a menu model.</p>
            <AppCodeHighlight>
                {`
<Menu model={items} />
`}
            </AppCodeHighlight>
            <AppCodeHighlight lang="js">
                {`
import {PrimeIcons} from 'primereact/api';

const items = [
    {
        label: 'Update',
        icon: PrimeIcons.REFRESH,
        to: '/update'
    },
    {
        label: 'Delete',
        icon: PrimeIcons.TIMES,
        to: '/delete'
    }
]
`}
            </AppCodeHighlight>
            <h5>List of Icons</h5>
            <p>
                Here is the current list of PrimeIcons, more icons are added periodically. You may also{' '}
                <a href="https://github.com/primefaces/primeicons/issues" className="font-medium">
                    request new icons
                </a>{' '}
                at the issue tracker.
            </p>

            <div>
                <InputText type="text" className="w-full p-3 mt-3 mb-5" onInput={onFilter} placeholder="Search an icon" />
            </div>
            <div className="grid icons-list text-center">
                {filteredIcons &&
                    filteredIcons.map((iconMeta) => {
                        const { icon, properties }: any = iconMeta;

                        return (
                            icon.tags.indexOf('deprecate') === -1 && (
                                <div className="col-6 sm:col-4 lg:col-3 xl:col-2 pb-5" key={properties.name}>
                                    <i className={'text-2xl mb-2 pi pi-' + properties.name}></i>
                                    <div>pi-{properties.name}</div>
                                </div>
                            )
                        );
                    })}
            </div>
        </div>
    );
};

export default IconsDemo;
