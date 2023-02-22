import {DataCell, HeaderCell} from "./Cell";
import {Button} from "@mui/material";

function HeaderRow({matrix, utility,disableProperty}) {
    return (
        <div className='LXUI-DataGrid-Row'>
            {
                matrix.header.map((value, index) => (
                    <HeaderCell
                        key={`th-${index}`}
                        cell={value}
                        columnId={index}
                        utility={utility}
                        disableProperty={disableProperty}
                    />
                ))
            }
        </div>
    )
}

function DataRow({matrix, rowId, utility}) {
    return (
        <div className='LXUI-DataGrid-Row'>
            {
                matrix.data[rowId].map((value, index) => (
                    <DataCell
                        key={`${rowId}-${index}`}
                        value={value}
                        column={matrix.header[index]}
                        cellId={[rowId, index]}
                        utility={utility}
                    />
                ))
            }
        </div>
    )
}

function FooterRow({utility}) {
    return (
            <div className='LXUI-DataGrid-Cell'>
                <div className='LXUI-DataGrid-Cell-Wrapper'>
                    <Button onClick={utility.addRow} fullWidth>New Row</Button>
                </div>
            </div>
    )
}

export {
    HeaderRow,
    DataRow,
    FooterRow
}
