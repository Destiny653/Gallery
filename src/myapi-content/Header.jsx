import React from 'react'
import style from './css/Main.module.css'

export default function Header({background}) {
  return (
    <>
       <header className={` ${background}`}>
                <div className={style.description}>
                    <h1 className={style.title}>API Store</h1>
                    <h2 className={style.subtitle}>A simple API store</h2>
                </div>
            </header>
    </>
  )
}
