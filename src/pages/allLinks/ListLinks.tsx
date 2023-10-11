import { Button } from 'primereact/button'
import React from 'react'

function ListLinks() {
    const onClickLink =() =>{
        window.open(
            '',
            '_blank' // <- This is what makes it open in a new window.
          );
    }
    return (
        <div>
            <Button className='p-button-link' onClick={e=>onClickLink()} tooltip="https://docs.google.com/spreadsheets/d/1GiQi5T-qAg8FEl3-S36ksdgmbNcSx2Vb/edit#gid=306732625" >
            V2A_SD Parameter description
            </Button>

        </div>
    )
}

export default ListLinks