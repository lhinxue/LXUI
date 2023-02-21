import { Button, Chip, ClickAwayListener, Divider, Input, InputAdornment, ListItem, ListItemIcon, ListItemText, MenuItem, Paper, Popover, Select, ToggleButton } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import IconButton from '../Button/IconButton'
import Remix from '../Icon/Remix'
import './main.css'
const EXAMPLE_MATRIX = {
    Header: [
        {
            name: 'Name',
            type: 'Text'
        },
        {
            name: 'Age',
            type: 'Number'
        },
        {
            name: 'Region',
            type: 'Select',
            choice: [
                'Mondstadt',
                'Liyue',
                'Inazuma',
                'Sumeru'
            ]
        }
    ],
    Data: [
        ['Zhongli', '5011', 'Liyue'],
        ['Raiden Ei', '3679', 'Inazuma'],
        ['Nahida', '521', 'Sumeru']
    ]
}

function THCell({ cell, columnId, util }) {

    const [menuOn, _menuOn] = useState(false)
    const [columnType, _columnType] = useState(false)
    const anchorRef = useRef(null);
    const columnTypeRef = useRef(null);

    const changeColumnType = (ct) => {
        console.log(ct)
        util.setColumnType(columnId, ct)
        _columnType(false)
        _menuOn(false)
    }
    const insertColumn = (anchor) => {
        console.log(anchor)
        util.insertColumn(columnId, anchor)
        _menuOn(false)
    }

    return (
        <div className='LXUI-DataGrid-Cell LXUI-DataGrid-TH' ref={anchorRef}>
            <ToggleButton
                variant='text'

                fullWidth
                value={cell.name}
                selected={menuOn}
                onClick={() => _menuOn(true)}
            >
                {cell.name}

            </ToggleButton>
            <Popover
                className='LXUI-DataGrid-Column-Property'
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
                PaperProps={{
                    sx: { marginTop: '2px' }
                }
                }
                onClose={() => _menuOn(false)}
                elevation={3}
            >

                <MenuItem disabled>Column Name</MenuItem>
                <MenuItem disableRipple disableTouchRipple sx={{ background: 'white !important' }}>
                    <Input defaultValue={cell.name} onChange={(e) => util.setColumnName(columnId, e.target.value)} />
                </MenuItem>
                <Divider />
                <MenuItem disabled>Column Type</MenuItem>
                <MenuItem disableRipple disableTouchRipple sx={{ background: 'white !important' }}>
                    <Select fullWidth
                        value={cell.type}
                        variant='standard'
                    >
                        <MenuItem value='Text' onClick={() => changeColumnType('Text')}> <Remix.add size={'small'} />
                            Text</MenuItem>


                        {/* <MenuItem value='Text' onClick={() => changeColumnType('Text')}>Text</MenuItem> */}
                        <MenuItem value='Number' onClick={() => changeColumnType('Number')}>Number</MenuItem>
                        <MenuItem value='Select' onClick={() => changeColumnType('Select')}>Select</MenuItem>
                        <MenuItem value='Yes/No' onClick={() => changeColumnType('Yes/No')}>Yes/No</MenuItem>
                        <MenuItem value='Date' onClick={() => changeColumnType('Date')}>Date</MenuItem>
                        <MenuItem value='Time' onClick={() => changeColumnType('Time')}>Time</MenuItem>

                    </Select>
                </MenuItem>

                <Divider />
                <MenuItem>Sort Asc</MenuItem>
                <MenuItem>Sort Desc</MenuItem>
                <MenuItem onClick={() => insertColumn('left')}>Insert Left</MenuItem>
                <MenuItem onClick={() => insertColumn('right')}>Insert Right</MenuItem>
                <MenuItem >Delete</MenuItem>
            </Popover>
        </div>
    )
}

function TDCell({ data, cellId, column, util, render }) {

    const [edit, _edit] = useState(false)
    const anchorRef = useRef(null)
    console.log(EXAMPLE_MATRIX.Data[cellId[0]][cellId[1]])
    return (
        <div className='LXUI-DataGrid-Cell LXUI-DataGrid-TD' ref={anchorRef}>
            <EditableCell
                onClickAway={() => _edit(false)}

                render={render}
                column={column}
                defaultValue={data}
                editable={edit}
                anchorRef={anchorRef}
                onEnable={() => _edit(true)}
                onDisable={() => _edit(false)}
                onSubmit={(value) => util.setCellValue(cellId, value)}
            />
        </div>
    )
}

function Cell({ editable, normalState, editableState }) {
    return editable ? editableState : normalState
}


function EditableCell({ children, column, defaultValue, editable, anchorRef, onEnable, onDisable, onSubmit, render }) {
    console.log(defaultValue)
    const [cellValue, _cellValue] = useState(defaultValue)
    const [edit, _edit] = useState(false)
    onEnable = () => _edit(true); console.log('click');
    onDisable = () => _edit(false)
    const onClickAway = () => {
        onDisable()
        onSubmit(cellValue)
    }
    useEffect(() => {
        _cellValue(defaultValue)
    }, [defaultValue])

    switch (column.type) {
        case 'Text':
            return (
                <Input
                    className='LXUI-DataGrid-Cell-Wrapper'
                    type='text'
                    value={cellValue}
                    disableUnderline
                    onChange={(e) => _cellValue(e.target.value)}
                />
            )
        case 'Number':
            return (
                <Input
                    className='LXUI-DataGrid-Cell-Wrapper'
                    type='number'
                    value={cellValue}
                    disableUnderline
                    onChange={(e) => _cellValue(e.target.value)}
                />
            )
        case 'Select':
            return (
                <>
                    <div className='LXUI-DataGrid-Cell-Wrapper' onClick={() => _edit(x => !x)}>
                        {
                            cellValue !== "" ? <Chip label={cellValue} size={'small'} color='primary' variant='outlined' /> : null
                        }
                    </div>
                    <Popover
                        open={edit}
                        elevation={1}
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
                        PaperProps={{
                            sx: { marginTop: '1px' }
                        }
                        }
                        onClose={onClickAway}
                    >
                        <Paper className='LXUI-DataGrid-Selector' elevation={3}>
                            <Input fullWidth endAdornment={
                                <InputAdornment>

                                    <IconButton icon={<Remix.add />} size={23} />
                                </InputAdornment>
                            } />
                            <Chip color='secondary' label={'Null'} size={'small'} variant='outlined'
                                onClick={() => { _cellValue(''); onClickAway(); }}

                            />
                            {column.choice.map((v) => <Chip color='primary' label={v} size={'small'} variant='outlined'
                                onClick={() => { _cellValue(v); onClickAway(); }}
                                onDelete={() => { }}

                            />)}
                        </Paper>
                    </Popover>
                </>
            )
        case "Date":
            break
        case "Time":
            break
        case "Checkbox":
            break
    }
}


function Header({ matrix, util, render }) {

    return (
        <div className='LXUI-DataGrid-Row LXUI-DataGrid-TH'>
            {matrix.Header.map((v, i) => <THCell cell={v} key={`th-${i}`} columnId={i} util={util} />)}
        </div>
    )
}

function Row({ matrix, rowId, util, render }) {
    return (
        <div className='LXUI-DataGrid-Row LXUI-DataGrid-TD'>
            {matrix.Data[rowId].map((v, i) => <TDCell data={v} cellId={[rowId, i]} key={`${rowId}-${i}`} column={matrix.Header[i]} util={util} />)}
        </div>
    )
}

export default function DataGrid({ data }) {

    const [matrix, _matrix] = useState(EXAMPLE_MATRIX)
    const [render, _render] = useState(false)
    const reRender = () => _render(x => !x)

    const util = {
        setColumnType: (columnId, columnType) => {
            _matrix((x) => {
                x.Header[columnId].type = columnType
                return x
            })
        },
        setColumnName: (columnId, columnName) => {
            _matrix((x) => {
                x.Header[columnId].name = columnName
                return x
            })
        },
        setCellValue: (cellId, value) => {
            _matrix((x) => {
                x.Data[cellId[0]][cellId[1]] = value
                return x
            })
        },
        insertColumn: (columnId, anchor) => {
            if (anchor === 'right') columnId++
            _matrix((x) => {
                x.Header.splice(columnId, 0, { name: 'Column', type: 'Text' })
                for (let i = 0; i < x.Data.length; i++) {
                    x.Data[i].splice(columnId, 0, '')
                }
                console.log(x)
                reRender()
                return x
            })
        },
        addNewRow: () => {
            _matrix((x) => {
                x.Data.push(Array(x.Header.length).fill(''))
                console.log(x)
                reRender()
                return x
            })
        },

    }


    return (
        <div className='LXUI-DataGrid'>
            <Header matrix={matrix} util={util} />
            {matrix.Data.map((v, i) => <Row matrix={matrix} key={i} rowId={i} util={util} />)}
            <div className='LXUI-DataGrid-Row' onClick={util.addNewRow}>
                <div className='LXUI-DataGrid-Cell'>
                    <div className='LXUI-DataGrid-Cell-Wrapper' >
                        <Button startIcon={<Remix.add />} fullWidth>New Row</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}