import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import style from './css/Main.module.css';
import Header from './Header';

export default function Detail() {

    const [count, setCount] = useState(1);
    // const [count2, setCount2] = useState(0);

    const [product, setProduct] = useState([]);
    const [details, setDetail] = useState([]);
    const [item, getItem] = useState("");
    console.log(item.tags);

    const { id } = useParams();

    const getProduct = async () => {
        await axios.get(`https://pixabay.com/api/?key=43296772-7f7bc3909372636d0ba9a5d78&id=${id}`).then((result) => {
            setProduct(result.data.hits[0])
            getItem(result.data.hits[0])
        }).catch((err) => {
            console.log(err);
        })
    }
    // console.log(product);

    const getDetail = async () => {
        await axios.get(`https://pixabay.com/api/?key=43296772-7f7bc3909372636d0ba9a5d78&q=${item.tags}&page=${count}&per_page=20`).then((result) => {
            setDetail(result.data)
        }).catch((err) => {
            console.log(err);
        })
        console.log(details);
    }

    useEffect(() => {
        getProduct();
        getDetail();
    }, [details, count])

    return (
        <>
            <header className={style.bgDetail}>
                <div className={style.description}>
                    <h1 className={style.title}>API Store</h1>
                    <h2 className={style.subtitle}>A simple API store</h2>
                </div>
                <Link to='/'>
                <button className={style.homeBtn}>Back</button>
                </Link>
             
            </header>

            <div className={style.iterate}>
                <button className={style.btnIterate} onClick={() => count <= 1 ? setCount(1) : setCount(count - 1)}>prev</button> page {count}/25 <button className={style.btnIterate} onClick={() => setCount(count == 20 ? 20 : count + 1)}>next</button>
            </div>

            <div className={style.product}>
                {
                    details.hits?.map(product => (
                        <div className={style.productCard} key={product.id}>
                            <Link to={`/products/${product.id}`}>
                                <img className={style.productImg} src={product.webformatURL} alt={product.tags} width="100%" />
                            </Link>
                            <div className={style.userDetail}>
                                <img className={style.userImg} src={product.userImageURL} alt='***' />
                                <h3 className={style.tags}>{product.tags}</h3>
                            </div>
                        </div>
                    ))
                }
            </div>

        </>
    )
}
