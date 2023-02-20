import { Accordion, AccordionDetails, AccordionSummary, Button, ClickAwayListener, Menu, MenuItem, MenuList, Popover, Popper, TextField, ToggleButton, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import './main.css'
const EXAMPLE_MATRIX = {
    Header: [
        {
            name: 'Name',
            type: 0 // text
        },
        {
            name: 'Age',
            type: 1 // number
        },
        {
            name: 'Region',
            type: 2 // select
        }
    ],
    Select: [
        'Liyue',
        'Inazuma',
        'Sumeru'
    ],
    Data: [
        ['Zhongli', '5011', 'Liyue'],
        ['Raiden Ei', '3679', 'Inazuma'],
        ['Nahida', '521', 'Sumeru']
    ]
}

function THCell({ name, type }) {

    const [menuOn, _menuOn] = useState(false)
    const [columnType, _columnType] = useState(false)
    const anchorRef = useRef(null);
    const columnTypeRef = useRef(null);
    return (
        <div className='LXUI-DataGrid-Cell LXUI-DataGrid-TH'>
            <ToggleButton
                variant='text'
                ref={anchorRef}
                fullWidth
                value={name}
                selected={menuOn}
                onClick={() => _menuOn(true)}
            >
                {name}

            </ToggleButton>
            <Popover
                open={menuOn}
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                placement="bottom-start"
                transition
                disablePortal
            >
                <ClickAwayListener onClickAway={() => _menuOn(false)}>
                    <MenuList>
                        <TextField defaultValue={name} />
                        <Typography>Column Type</Typography>
                        <Accordion expanded={columnType}>
                            <AccordionSummary onClick={() => _columnType(true)}>
                                6
                            </AccordionSummary>
                            <AccordionDetails>
                                <MenuItem onClick={() => _columnType(false)}>{name}</MenuItem>
                                <MenuItem >{name}</MenuItem>
                                <MenuItem >{name}</MenuItem>
                            </AccordionDetails>

                        </Accordion>
                        <MenuItem >Sort Asc</MenuItem>
                        <MenuItem >Sort Desc</MenuItem>
                        <MenuItem >Insert Left</MenuItem>
                        <MenuItem >Insert Right</MenuItem>
                        <MenuItem >Delete</MenuItem>
                    </MenuList>
                </ClickAwayListener>
            </Popover>
        </div>
    )
}

function TDCell({ data, type }) {

    const [edit, _edit] = useState(false)
    return (
        <div className='LXUI-DataGrid-Cell LXUI-DataGrid-TD'>
            {
                edit ?
                    EditableCell(0, data, () => _edit(false), undefined)
                    :
                    <div onDoubleClick={() => _edit(true)}>
                        {data}
                    </div>
            }
        </div>
    )
}

function EditableCell(columnType, defaultValue, onClickAway, onSubmit) {



    switch (columnType) {
        case 0:
            return (
                <ClickAwayListener onClickAway={onClickAway}>
                    <TextField defaultValue={defaultValue} />
                </ClickAwayListener>
            )
        case 1:
            return (
                <ClickAwayListener onClickAway={onClickAway}>
                    <TextField defaultValue={defaultValue} />
                </ClickAwayListener>
            )
        case 2:
            return (
                <ClickAwayListener onClickAway={onClickAway}>
                    <TextField defaultValue={defaultValue} />
                </ClickAwayListener>
            )
    }
}


function Header({ arrList }) {
    arrList = EXAMPLE_MATRIX.Header
    return (
        <div className='LXUI-DataGrid-Row LXUI-DataGrid-TH'>
            {arrList.map((v, i) => <THCell name={v.name} />)}
        </div>
    )
}

function Row({ arrList }) {
    return (
        <div className='LXUI-DataGrid-Row LXUI-DataGrid-TD'>
            {arrList.map((v, i) => <TDCell data={v} />)}
        </div>
    )
}

export default function DataGrid({ matrix }) {
    matrix = EXAMPLE_MATRIX
    return (
        <div className='LXUI-DataGrid'>
            <Header />
            {matrix.Data.map((v, i) => <Row arrList={v} />)}
        </div>
    )
}