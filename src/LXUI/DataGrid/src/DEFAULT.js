const COLUMN_WIDTH = 160
const MATRIX = {
    header: [
        {
            name: 'Name',
            type: 'Text',
            width: COLUMN_WIDTH,
        },
        {
            name: 'Age',
            type: 'Number',
            width: COLUMN_WIDTH,
        },
        {
            name: 'Region',
            type: 'Select',
            width: COLUMN_WIDTH,
            choice: [
                'Mondstadt',
                'Liyue',
                'Inazuma',
                'Sumeru'
            ]
        }
    ],
    data: [
        ['Zhongli', '5011', 'Liyue'],
        ['Raiden Ei', '3679', 'Inazuma'],
        ['Nahida', '521', 'Sumeru']
    ]
}

export default {
    COLUMN_WIDTH,
    MATRIX
}