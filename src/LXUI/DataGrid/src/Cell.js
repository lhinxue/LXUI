import {useRef, useState} from "react";
import {
    Checkbox,
    Chip,
    Divider,
    Input,
    InputAdornment,
    ListSubheader,
    MenuItem,
    Paper,
    Popover,
    Rating,
    Select,
    TextField,
    ToggleButton,
    Typography
} from "@mui/material";
import moment from "moment/moment";
import IconButton from "../../Button/IconButton";
import Remix from "../../Icon/Remix";
import {DateTimePicker, DesktopDatePicker, TimePicker} from "@mui/x-date-pickers";

function Cell({value, column, cellId, utility, anchorRef}) {

    const [active, _active] = useState(false)
    const reActive = () => _active(i => !i)
    const onInactive = () => _active(false)

    const updateCellValue = (value) => {
        utility.setCellValue(cellId, value)
        onInactive()
    }

    switch (column.type) {
        case 'Text':
            return (
                <Input
                    className='LXUI-DataGrid-Cell-Wrapper'
                    type='text'
                    value={value}
                    disableUnderline
                    onChange={(event) => updateCellValue(event.target.value)}
                />
            )
        case 'Number':
            return (
                <Input
                    className='LXUI-DataGrid-Cell-Wrapper'
                    type='number'
                    value={value}
                    disableUnderline
                    onChange={(event) => updateCellValue(event.target.value)}
                />
            )
        case 'Select':
            return (
                <>
                    <div
                        className='LXUI-DataGrid-Cell-Wrapper'
                        onClick={reActive}
                    >
                        {
                            value !== "" ?
                                <Chip
                                    label={value}
                                    size={'small'}
                                    color={'primary'}
                                    variant={'outlined'}
                                /> : null
                        }
                    </div>
                    <Popover
                        open={active}
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
                        PaperProps={{sx: {marginTop: '1px'}}}
                        onClose={onInactive}
                    >
                        <Paper className='LXUI-DataGrid-Selector'>
                            <Input
                                fullWidth
                                endAdornment={
                                    <InputAdornment>
                                        <IconButton icon={<Remix.add/>} size={23}/>
                                    </InputAdornment>
                                }
                            />
                            <Chip
                                label={'Null'}
                                size={'small'}
                                color={'secondary'}
                                variant={'outlined'}
                                onClick={() => updateCellValue('')}
                            />
                            {
                                (column.choice ?? []).map((value, index) =>
                                    <Chip
                                        label={value}
                                        size={'small'}
                                        color={'primary'}
                                        variant={'outlined'}
                                        onClick={() => updateCellValue(value)}
                                        onDelete={() => utility.setSelectorChoice('Delete', index, value)}
                                    />
                                )
                            }
                        </Paper>
                    </Popover>
                </>
            )
        case "Date":
            return (
                <DesktopDatePicker
                    inputFormat="YYYY-MM-DD"
                    value={value}
                    onChange={(newValue) => updateCellValue(newValue.format("YYYY-MM-DD"))}
                    InputProps={{disableUnderline: true}}
                    InputAdornmentProps={{sx: {'& button': {padding: '0 15px 0 0'}}}}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            fullWidth
                            variant='standard'
                            className='LXUI-DataGrid-Cell-Wrapper'
                        />
                    }
                />
            )
        case "Time":
            return (
                <TimePicker
                    value={moment(value, "HH:mm")}
                    onChange={(newValue) => updateCellValue(newValue.format("HH:mm"))}
                    InputProps={{disableUnderline: true}}
                    InputAdornmentProps={{sx: {'& button': {padding: '0 15px 0 0'}}}}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            fullWidth
                            variant='standard'
                            className='LXUI-DataGrid-Cell-Wrapper'
                        />
                    }
                />
            )
        case "DateTime":
            return (
                <DateTimePicker
                    ampm={false}
                    value={moment(value, "YYYY-MM-DD HH:mm")}
                    onChange={(newValue) => updateCellValue(newValue.format("YYYY-MM-DD HH:mm"))}
                    InputProps={{disableUnderline: true}}
                    InputAdornmentProps={{sx: {'& button': {padding: '0 15px 0 0'}}}}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            fullWidth
                            variant='standard'
                            className='LXUI-DataGrid-Cell-Wrapper'
                        />
                    }
                />
            )
        case "Rating":
            return (
                <div className='LXUI-DataGrid-Cell-Wrapper'>
                    <Rating
                        value={parseFloat(value)}
                        precision={0.1}
                        onChange={(event, value) => updateCellValue(value.toString())}
                    />
                </div>
            )
        case "Yes/No":
            return (
                <div className='LXUI-DataGrid-Cell-Wrapper'>
                    <Checkbox
                        checked={value === '1'}
                        onChange={(event) => event.target.checked ? updateCellValue('1') : updateCellValue('0')}
                    />
                </div>
            )
        default:
            return (
                <div className='LXUI-DataGrid-Cell-Wrapper'/>
            )
    }
}

function HeaderCell({cell, columnId, utility, disableProperty}) {

    const [menuOn, _menuOn] = useState(false)
    const [columnType, _columnType] = useState(false)
    const anchorRef = useRef(null);
    const columnTypeRef = useRef(null);
    const menuontrue = () => _menuOn(true)
    const menuonchange = () => _menuOn(i => !i)
    const menuOff = () => _menuOn(false)
    const changeColumnType = (ct) => {
        utility.setColumnProperty(columnId, 'type', ct)
        _columnType(false)
        _menuOn(false)
    }
    const insertColumn = (anchor) => {
        utility.insertColumn(columnId, anchor)
        _menuOn(false)
    }

    return (
        <div
            className='LXUI-DataGrid-Cell LXUI-DataGrid-TH'
            ref={anchorRef}
        >
            <ToggleButton
                variant='text'
                fullWidth
                value={cell.name}
                selected={menuOn}
                onClick={menuonchange}
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
                PaperProps={{sx: {marginTop: '2px'}}}
                onClose={menuOff}
                elevation={3}
            >
                {
                    disableProperty ?
                        <>
                            <MenuItem>Sort Asc</MenuItem>
                            <MenuItem>Sort Desc</MenuItem>
                        </>
                        :
                        <>
                            <ListSubheader>Properties</ListSubheader>
                            <MenuItem
                                disableRipple
                                disableTouchRipple
                                className={'LXUI-DataGrid-Column-Property-Form'}
                                sx={{
                                    background: 'white !important', display: 'flex',
                                    flexDirection: 'column', alignItems: 'flex-start'
                                }}
                            >
                                <Typography component={'h6'}>Column Name</Typography>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    defaultValue={cell.name}
                                    onChange={(e) => utility.setColumnProperty(columnId, 'name', e.target.value)}
                                />
                                <Typography component={'h6'}>Column Type</Typography>
                                <Select
                                    fullWidth
                                    value={cell.type}
                                    variant='standard'
                                    onChange={(event) => console.log(event.target.value)}
                                >
                                    <MenuItem value='Text' onClick={() => changeColumnType('Text')}> Text</MenuItem>
                                    <MenuItem value='Number'
                                              onClick={() => changeColumnType('Number')}>Number</MenuItem>
                                    <MenuItem value='Select'
                                              onClick={() => changeColumnType('Select')}>Select</MenuItem>
                                    <MenuItem value='Yes/No'
                                              onClick={() => changeColumnType('Yes/No')}>Yes/No</MenuItem>
                                    <MenuItem value='DateTime'
                                              onClick={() => changeColumnType('DateTime')}>DateTime</MenuItem>
                                    <MenuItem value='Date' onClick={() => changeColumnType('Date')}>Date</MenuItem>
                                    <MenuItem value='Time' onClick={() => changeColumnType('Time')}>Time</MenuItem>
                                    <MenuItem value='Rating'
                                              onClick={() => changeColumnType('Rating')}>Rating</MenuItem>
                                </Select>
                                <Typography component={'h6'}>Column Width</Typography>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    type='number'
                                    defaultValue={cell.width}
                                    onChange={(e) => utility.setColumnProperty(columnId, 'width', e.target.value)}
                                />
                            </MenuItem>
                            <Divider/>
                            <MenuItem>Sort Asc</MenuItem>
                            <MenuItem>Sort Desc</MenuItem>
                            <MenuItem onClick={() => insertColumn('left')}>Insert Left</MenuItem>
                            <MenuItem onClick={() => insertColumn('right')}>Insert Right</MenuItem>
                            <MenuItem>Delete</MenuItem>
                        </>
                }
            </Popover>
        </div>
    )
}

function DataCell({value, column, cellId, utility}) {

    const anchorRef = useRef(null)

    return (
        <div
            className='LXUI-DataGrid-Cell LXUI-DataGrid-TD'
            ref={anchorRef}
        >
            <Cell
                value={value}
                column={column}
                cellId={cellId}
                utility={utility}
                anchorRef={anchorRef}
            />
        </div>
    )
}


export {
    HeaderCell,
    DataCell
}