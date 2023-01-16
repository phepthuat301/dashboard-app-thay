import ReactPaginate from 'react-paginate';
import { DataTable, DataTableFilterMeta } from "primereact/datatable"
import { useEffect, useRef, useState } from "react";
import NotifyController from '../utilities/Toast';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';

interface customDataTableProps {
    rowPerPage?: number;
    children: React.ReactNode;
    refresh?: boolean;
    defaultFilter?: string;
    onOptionChange: (options: tableOptions) => Promise<{
        total: number;
        data: Array<any>
    }>;
    leftToolbarBtn?: Array<leftToolbarBtnProps>
}

interface leftToolbarBtnProps {
    icon: string;
    name: string;
    type?: "Primary" | "Secondary" | "Success" | "Info" | "Warning" | "Help" | "Danger";
    onClick: (options: tableOptions) => void
}

let updateDataTimeout: any;


interface tableOptions {
    filter: string | undefined;
    filters: DataTableFilterMeta | undefined;
    rowPerPage: number;
    page: number;
    order: string | undefined;
    orderType: 1 | 0 | -1 | undefined | null;
    selected: Array<any> | null;
    selectAll: boolean;
}

export interface outputTableOptions {
    filter: string | undefined;
    filters: DataTableFilterMeta | undefined;
    rowPerPage: number;
    page: number;
    order: string | undefined;
    orderType: 1 | 0 | -1 | undefined | null;
    selected: Array<any> | null;
    selectAll: boolean;
}


export const CustomDataTable: React.FC<customDataTableProps> = ({ leftToolbarBtn, refresh, rowPerPage, onOptionChange, children, defaultFilter }) => {
    const [value, setValue] = useState<{
        total: number;
        data: Array<any>
    }>({
        total: 0,
        data: []
    })
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState<tableOptions>(
        {
            filter: defaultFilter ?? "",
            rowPerPage: rowPerPage ?? 10,
            filters: undefined,
            page: 1,
            order: undefined,
            orderType: undefined,
            selected: null,
            selectAll: false
        }
    )
    const dt = useRef<any>(null);
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                if (updateDataTimeout)
                    clearTimeout(updateDataTimeout);
                updateDataTimeout = setTimeout(() => {
                    console.log(options);

                    onOptionChange(options)
                        .then(data => {
                            setValue(data)
                        })
                        .catch(error => {
                            console.log(error);
                            NotifyController.error("Get data table error")
                        })
                        .finally(() => setLoading(false))
                    if (updateDataTimeout)
                        clearTimeout(updateDataTimeout);
                }, 200);

            } catch (error: any) {
                console.log(error);
                NotifyController.error(error?.message ?? "Get data table error")
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options.filter, options.filters, options.order, options.orderType, options.page, options.rowPerPage, refresh])


    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <div>
                <span>Show </span>
                <Dropdown className='m-0' options={[
                    5, 10, 25, 100
                ]} value={options.rowPerPage} onChange={(e: any) => setOptions({ ...options, rowPerPage: e.value })} />
                <span className='m-0'> of {value?.total ?? 0} records</span>
            </div>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={options.filter} onInput={(e) => setOptions({ ...options, filter: e.currentTarget.value })} placeholder="Search..." />
            </span>
        </div>
    );

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                {leftToolbarBtn?.map(btn =>
                    <Button label={btn.name} icon={`pi ${btn.icon}`} className={`p-button-${btn.type?.toLowerCase() ?? 'secondary'} mr-2`}
                        onClick={() => {
                            btn.onClick(options)
                        }} />)}
            </React.Fragment>
        );
    };

    return (
        <>
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <DataTable
                selection={options.selected}
                onSelectionChange={(e) => setOptions({ ...options, selected: e.value, selectAll: e.value.length === value.data.length })}
                ref={dt}
                value={value?.data}
                paginator={false}
                className="datatable-responsive"
                emptyMessage="No record found."
                header={header}
                responsiveLayout="scroll"
                sortField={options.order}
                onSort={(e) => { setOptions({ ...options, order: e.sortField, orderType: e.sortOrder }) }}
                sortOrder={options.orderType}
                loading={loading}
                totalRecords={2}
                onFilter={(filters) => {
                    setOptions({ ...options, filters: filters.filters })
                }}
                filters={options.filters}
                onSelectAllChange={(e) => {
                    setOptions({ ...options, selectAll: e.checked, selected: e.checked ? value?.data : null })
                }}
                selectAll={options.selectAll}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                {children}
            </DataTable>
            <br />
            {Math.ceil(value?.total / options.rowPerPage) > 1 && <ReactPaginate
                onPageChange={(e) => { setOptions({ ...options, page: e.selected }) }}
                pageCount={Math.ceil(value?.total / options.rowPerPage)}
                previousLabel="Prev"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName='pagination'
            />}

        </>
    );
};

//filterClear={filterClearTemplate}
export const filterClearTemplate = (options: any) => {
    return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} className="p-button-secondary"></Button>;
};

// filterClear={filterApplyTemplate}
export const filterApplyTemplate = (options: any) => {
    return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} className="p-button-success"></Button>;
};

//filterElement={dateFilterTemplate}  dataType="date"
export const dateFilterTemplate = (options: any) => {
    return <Calendar value={options.value} onChange={(e: any) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
};

//filterElement={balanceFilterTemplate}
export const balanceFilterTemplate = (options: any) => {
    return <InputNumber value={options.value} onChange={(e: any) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
};

//filterElement={representativeFilterTemplate(representatives)}
export const representativeFilterTemplate = (representatives: { name: string, image: string }[]) => {
    const representativesItemTemplate = (option: any) => {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={option.image} width={32} style={{ verticalAlign: 'middle' }} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }} className="image-text">
                    {option.name}
                </span>
            </div>
        );
    };
    const result = (options: any) => {
        return (
            <>
                <div className="mb-3 text-bold">Agent Picker</div>
                <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e: any) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />
            </>
        );
    }
    return result
};

//filterElement={selectFilterTemplate(selectOptions)}
export const selectFilterTemplate = (selectOptions: string[]) => {
    const statusItemTemplate = (option: any) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    };
    const result = (options: any) => {
        return <Dropdown value={options.value} options={selectOptions} onChange={(e: any) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />
    }
    return result
};
