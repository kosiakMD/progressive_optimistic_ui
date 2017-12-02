/**
 * Created by WebStorm.
 * Project: self_oui
 * User: Anton Kosiak MD
 * Date: 11/28/17
 * Time: 11:03 PM
 */

import React, { Component } from 'react';

const Item = ({item, retry}) => {

    const _onClick = () => {
        retry(item.id);
    };

    return (
        <div className={'todoItem'}>
            <span className={'id'}>({item.id})</span>
            <span className={'text'}>{item.text}</span>
            {item.date ? <span className={'date'}>{(new Date(item.date)).toLocaleTimeString()}</span> : null}
            {item.error ? <span className={'error'}>
                       {item.error}
                <button onClick={_onClick}>Re</button>
                   </span> : null}
        </div>
    );
};

const List = ({list, retry}) => {

    if (!list) return null;

    return list.map((todo, index) => {
       return (
           <Item key={index} item={todo} retry={retry}/>
       )
    });
};

export default List;