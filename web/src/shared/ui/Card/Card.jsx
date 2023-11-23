import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Card.module.scss';

export const Card = (props) => {
    const {
        className,
        children
    } = props
    
    return (
        <div className={classNames(cls.Card, {}, [className])}>
            {children}
        </div>
    )
}
