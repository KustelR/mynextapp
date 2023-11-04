import React, {useRef} from 'react'
import TextButton from '@/components/ui/TextButton';

export default function DetailedData(props) {
    let {toDisplay} = props;
    const {className} = props;

    let length = useRef(0)
    if (!toDisplay) toDisplay = {};
    return (
    <div className={'p-2 bg-white dark:bg-neutral-800 min-w-30ch h-fit min-h-[200px] ' + className}>
        <h3 className='font-bold'>Detailed data</h3>
        <ul>
            {Object.entries(toDisplay).map((item) => {
            const title = item[0];
            const value = item[1];
            length = length + 1;
            if (!value.type) {
            return (
                <li className='max-w-30ch overflow-hidden text-overflow-ellips whitespace-nowrap' key={length}>
                    <strong className='font-semibold'>{title + ': '}</strong>{value}
                </li>)
            }
            switch (value.type) {
                case 'button':
                    return (<li key={length}><TextButton>{title}</TextButton></li>);
                case 'ReactComponent':
                    return (<li key={length}>{value.component(value.props)}</li>);
            }
            })}
        </ul>
    </div>
  )
}
