import React, { useState } from "react";
import * as styles from './App.module.scss'; // todo: fix default import
import { Link, Outlet } from "react-router-dom";
import kekPngSrc from '@/assets/kek.png';
import kekJpgSrc from '@/assets/kek.jpg';
import Icon from '@/assets/icon.svg';

function smthFunction(value: string) {
    console.log(value)
}

export const App = () => {
    const [count, setCount] = useState<number>(0)
    // smthFunction('aaa')
    return (
        <div>
            <h1 data-testid='datatestid'>Header</h1>
            <div>platform: {ENV__PLATFORM}</div>
            <div>
                <img src={kekPngSrc} width={100} height={100}/>
                <img src={kekJpgSrc} width={100} height={100}/>
            </div>
            <div>
                <Icon width={80} height={80} style={{color: 'red'}}/>
            </div>
            <Link to={'/'}>home</Link>
            <br/>
            <Link to={'/about'}>about</Link>
            <br/>
            <Link to={'/shop'}>shop</Link>
            <h1>Here we go again</h1>
            <div>{count}</div>
            <button className={styles.button} onClick={() => setCount(prev => prev + 1)}>
                <span>+</span>
            </button>
            {/* Outlet показывает роут элементу где и когда отрисовать дочерние роуты на странице */}
            <Outlet/>
        </div>
    )
}
