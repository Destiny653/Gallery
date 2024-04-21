import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from './css/Main.module.css';

export default function Category() {

    const [products, setProduct] = useState([]);
    const [count, setCount] = useState(1);
    const { ctg } = useParams()


    useEffect(() => {
        const getProduct = async () => {
            await axios.get(`https://pixabay.com/api/?key=43296772-7f7bc3909372636d0ba9a5d78&category=${ctg}&page=${count}&per_page=20`).then(result => {
                setProduct(result.data || [])
            }).catch(err => console.log(err));
        };
        getProduct()
    }, [count,products]);

    return (
        <>

            <header className={style.ctgHeader}>
                <div className={style.description}>
                    <h1 className={style.title}>API Store</h1>
                    <h2 className={style.subtitle}>A simple API store</h2>
                </div>
                <div className={style.ctgTitle}>
                    <h1 className={style.loopHeader}>{ctg.toUpperCase()}</h1>
                </div>
                <Link to='/'>
                    <button className={style.homeBtn}>Back</button>
                </Link>
            </header>
            <div>
                <div className={style.iterate}>
                    <button className={style.btnIterate} onClick={() => count <= 1 ? setCount(1) : setCount(count - 1)}>prev</button> page {count}/25 <button className={style.btnIterate} onClick={() => setCount(count + 1)}>next</button>
                </div>
                <div className={style.product}>
                    {
                        products.hits?.map(product => (
                            <div className={style.productCard} key={product.id}>
                                <Link to={`/products/${product.id}`}>
                                    <img className={style.productImg} src={product.webformatURL} alt={product.tags} width="100%" height="100%" />
                                </Link>
                                <div className={style.userDetail}>
                                    <img className={style.userImg} src={product.userImageURL} alt="***" />
                                    <h3 className={style.tags}>{product.tags}</h3>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </>
    )
}
