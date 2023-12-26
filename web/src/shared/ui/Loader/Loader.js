import { classNames } from 'shared/lib/classNames/classNames'
import './Loader.scss'

export const Loader = ({ className }) => (
    <div className={'loader-container'}>
        <div className={classNames('lds-ellipsis', {}, [className])}>
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
)
