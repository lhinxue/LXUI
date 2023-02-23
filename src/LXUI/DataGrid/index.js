import {Box} from '@mui/material'
import {Component, createRef} from 'react'
import './main.css'
import DEFAULT from "./src/DEFAULT";
import {DataRow, FooterRow, HeaderRow} from "./src/Row";

export default class DataGrid extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            matrix: this.props.matrix ?? DEFAULT.MATRIX,
            staticFooter: false,
            _: false
        }
        this.ref = createRef()
        this.matrix = this.matrix.bind(this)
        this._matrix = this._matrix.bind(this)
        this.forceReRender = this.forceReRender.bind(this)
        this.setCellValue = this.setCellValue.bind(this)
        this.setSelectorChoice = this.setSelectorChoice.bind(this)
        this.setColumnProperty = this.setColumnProperty.bind(this)
        this.insertColumn = this.insertColumn.bind(this)
        this.addRow = this.addRow.bind(this)
        this.utility = {
            setCellValue: this.setCellValue,
            setSelectorChoice: this.setSelectorChoice,
            setColumnProperty: this.setColumnProperty,
            insertColumn: this.insertColumn,
            addRow: this.addRow,
        }
        this.handleSizeChange = this.handleSizeChange.bind(this)
    }

    matrix() {
        return this.state.matrix
    }

    _matrix(setState, callback) {
        this.setState(
            {matrix: setState(this.state.matrix)},
            callback
        )
    }

    forceReRender() {
        this.setState((prevState) => ({_: !prevState._}))
    }

    generateStyle() {
        let sx = {}
        for (let i = 0; i < this.state.matrix.header.length; i++) {
            let width = this.state.matrix.header[i].width
            sx[`& .LXUI-DataGrid-Row>div:nth-of-type(${i + 1})`] = {
                width: `${width}px`,
                minWidth: `${width}px`,
                maxWidth: `${width}px`
            }
        }
        return sx
    }

    setColumnProperty(columnId, propertyId, propertyValue) {
        this._matrix((x) => {
            x.header[columnId][propertyId] = propertyValue
            if (propertyId === 'type' && propertyValue === 'Select' && x.header[columnId].choice === undefined) {
                let a = []
                for (let i = 0; i < x.data.length; i++) {
                    let v = x.data[i][columnId]
                    if (v !== '' && (!a.includes(v))) a.push(v)
                }
                x.header[columnId].choice = a
            }
            return x
        }, this.forceReRender)
    }

    setSelectorChoice(command, columnId, name, newName) {
        switch (command) {
            case "Delete":
                this._matrix((x) => {
                    for (let i = 0; i < x.header[columnId].choice.length; i++) {
                        if (x.header[columnId].choice[i] === name)
                            x.header[columnId].choice.splice(i, 1)
                    }
                    return x
                }, this.forceReRender)
            case "Add":
                this._matrix((x) => {
                    x.header[columnId].choice.push(name)
                    return x
                }, this.forceReRender)
            case "Modify":
                this._matrix((x) => {
                    for (let i = 0; i < x.header[columnId].choice.length; i++) {
                        if (x.header[columnId].choice[i] === name)
                            x.header[columnId].choice[i] = newName
                    }
                    return x
                }, this.forceReRender)
        }
    }

    setCellValue(cellId, value) {
        this._matrix((x) => {
            x.data[cellId[0]][cellId[1]] = value
            return x
        }, this.forceReRender())
    }

    insertColumn(columnId, anchor) {
        if (anchor === 'right') columnId++
        this._matrix((x) => {
            x.header.splice(columnId, 0, {name: 'Column', type: 'Text', width: 160})
            for (let i = 0; i < x.data.length; i++) {
                x.data[i].splice(columnId, 0, '')
            }
            return x
        }, this.forceReRender)
    }

    addRow() {
        this._matrix((x) => {
            x.data.push(Array(x.header.length).fill(''))
            return x
        }, () => {
            this.handleSizeChange()
            this.forceReRender()
        })
    }

    handleSizeChange() {
        const event = {
            scrollHeight: this.ref.current.scrollHeight,
            scrollWidth: this.ref.current.scrollWidth,
            scrollTop: this.ref.current.scrollTop,
            scrollLeft: this.ref.current.scrollLeft,
            clientHeight: this.ref.current.clientHeight,
            clientWidth: this.ref.current.clientWidth,
        }
        if (event.clientHeight < event.scrollHeight) {
            this.setState({staticFooter: true})
        } else {
            this.setState({staticFooter: false})
        }
    }

    render() {
        return (
            <Box
                className={'LXUI-DataGrid'}
                sx={this.generateStyle()}
                ref={this.ref}
                onScroll={this.handleSizeChange}
            >
                <HeaderRow
                    matrix={this.state.matrix}
                    utility={this.utility}
                    disableProperty={this.props.disableProperty}
                />
                {
                    this.state.matrix.data.map((value, index) => (
                        <DataRow
                            key={`tr-${index}`}
                            matrix={this.state.matrix}
                            rowId={index}
                            utility={this.utility}
                        />
                    ))
                }

                <FooterRow utility={this.utility}/>
            </Box>
        )
    }
}


// return (
//     <Box width={'100%'} overflow='scroll'>
//         <LocalizationProvider dateAdapter={AdapterMoment}>
//             <Box className='LXUI-DataGrid'
//                  sx={ger()}
//             >
//                 <Header matrix={matrix} util={util}/>
//                 {matrix.Data.map((v, i) => <Row matrix={matrix} key={i} rowId={i} util={util}/>)}
//                 <div className='LXUI-DataGrid-Row' onClick={util.addNewRow}>
//                     <div className='LXUI-DataGrid-Cell'>
//                         <div className='LXUI-DataGrid-Cell-Wrapper'>
//                             <Button startIcon={<Remix.add/>} fullWidth>New Row</Button>
//                         </div>
//                     </div>
//                 </div>
//             </Box>
//         </LocalizationProvider>
//     </Box>
//
// )
// }
//
// export default forwardRef(DataGrid)
