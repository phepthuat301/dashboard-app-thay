import ReactPaginate from 'react-paginate';
import { DataTable, DataTableFilterMeta } from "primereact/datatable"
import { useEffect, useState } from "react";
import NotifyController from '../utilities/Toast';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

interface customDataTableProps {
    dt?: any;
    rowPerPage?: number;
    children: React.ReactNode;
    refresh?: boolean;
    onOptionChange: (options: customTableOptions) => Promise<{
        total: number;
        data: Array<any>
    }>;
}

let updateDataTimeout: any;


export interface customTableOptions {
    filter: string | undefined;
    filters: DataTableFilterMeta | undefined;
    rowPerPage: number;
    page: number;
    order: string | undefined;
    orderType: 1 | 0 | -1 | undefined | null
}

export const CustomDataTable: React.FC<customDataTableProps> = ({ dt, refresh, rowPerPage, onOptionChange, children }) => {
    const [value, setValue] = useState<{
        total: number;
        data: Array<any>
    }>({
        total: 0,
        data: []
    })
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState<customTableOptions>(
        {
            filter: "",
            rowPerPage: rowPerPage ?? 10,
            filters: undefined,
            page: 1,
            order: undefined,
            orderType: undefined
        }
    )

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
    }, [options, onOptionChange, refresh])


    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <Dropdown className='m-0' options={[
                5, 10, 25, 100
            ]} value={options.rowPerPage} onChange={(e: any) => setOptions({ ...options, rowPerPage: e.value })} />
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setOptions({ ...options, filter: e.currentTarget.value })} placeholder="Search..." />
            </span>
        </div>
    );

    return (
        <>
            <DataTable
                ref={dt}
                value={value.data}
                paginator={false}
                className="datatable-responsive"
                emptyMessage="No ethnicitys found."
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
            >
                {children}
            </DataTable>
            <br />
            {Math.ceil(value.total / options.rowPerPage) > 1 && <ReactPaginate
                onPageChange={(e) => { setOptions({ ...options, page: e.selected }) }}
                pageCount={Math.ceil(value.total / options.rowPerPage)}
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

//filterElement={dateFilterTemplate}
export const dateFilterTemplate = (options: any) => {
    return <Calendar value={options.value} onChange={(e: any) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
};

//filterElement={balanceFilterTemplate}
export const balanceFilterTemplate = (options: any) => {
    return <InputNumber value={options.value} onChange={(e: any) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
};

//filterElement={()=> return representativeFilterTemplate(representatives)}
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

//filterElement={()=> return rangeFilterTemplate(from, to)}
export const rangeFilterTemplate = (from: number, to: number) => {
    const result = (options: any) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e: any) => options.filterCallback(e.value)} range className="m-3"></Slider>
                <div className="flex align-items-center justify-content-between px-2">
                    <span>{options.value ? options.value[0] : from}</span>
                    <span>{options.value ? options.value[1] : to}</span>
                </div>
            </React.Fragment>
        );
    }
    return result
};