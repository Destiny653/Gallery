import React, { useContext, useEffect, useState } from 'react'
import style from './css/Main.module.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import {AuthContext} from '../auth/AuthProvider'



export default function Home() {

    const {ctg} = useParams

    const [products, setProduct] = useState([]);
    const [count, setCount] = useState(1);
    // const [carousel, setCarousel] = useState();
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState(`/${ctg}`)
    const load = document.querySelector(".load")
   
    const {setSearchv} = useContext(AuthContext)

    //Carousel

    const Loads = ()=>{
        return (
            <div className={style.loading}></div>
        )
    }



    useEffect(() => {
        setSearchv(search)
        setLoading(true)
        const getProduct = async () => {
            await axios.get(`https://pixabay.com/api/?key=43296772-7f7bc3909372636d0ba9a5d78&page=${count}&per_page=20`).then(result => {
                setProduct(result.data || [])
            }).then(() => setLoading(false)).catch(err => console.log(err));
        };
        // const getBackground = async () => {
        //     await axios.get(`https://pixabay.com/api/?key=43296772-7f7bc3909372636d0ba9a5d78&category=fashion&page=${count}&per_page=20`).then(result => {
        //         setCarousel(result.data || [])
        //     }).catch(err => console.log(err));
        // };
        getProduct()

        if(loading){
            load.classList.add('loading')
        } 
       
    }, [count]);
    console.table(products);

    const category = ["backgrounds", "fashion", "nature", "science", "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music"];

    return (
        <>

            <header className={style.header}>
                <div className={style.description}>
                    <h1 className={style.title}>API Store</h1>
                    <h2 className={style.subtitle}>A simple API store</h2>
                </div>
                <div className={style.inputHead}>
                    <input className={style.input} id='searchBar' onChange={e=>{setSearch(e.target.value)}} type="text" />
                    <button className={style.button} type='submit'>Search</button>
                </div>
            </header>
            <div className={style.btnLoop}>
                {
                    category.map((cat) => {
                        return (
                            <div className={style.btnLoopChild} key={cat}>
                                <Link to={`/category/${cat}`}>
                                    <button className={style.btnOpt} >{cat}</button>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <div className={style.iterate}>
                    <button className={style.btnIterate} onClick={() => count <= 1 ? setCount(1) : setCount(count - 1)}>prev</button> page {count}/25 <button className={style.btnIterate} onClick={() => setCount(count + 1)}>next</button>
                    {/* <button onClick={() => count2 <= 0 ? setCount2(0) : setCount2(count2 - 1)}>Prev</button> {list} arrey: {count2} <button onClick={() => setCount2(count2 + 1)}>Next</button> */}
                </div>
                <div className={style.product}>
                    {
                        products.hits?.map(product => (
                            <div className={style.productCard} key={product.id}>
                                <Link to={`/products/${product.id}`}>
                                    <div className="load"></div>
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
// `https://pixabay.com/api/?key=43296772-7f7bc3909372636d0ba9a5d78&q=${list}&page=${count}&per_page=20&image_type=photo`
// https://pixabay.com/api/?key=43296772-7f7bc3909372636d0ba9a5d78&category=fashion&page=${count}
// https://pixabay.com/api/?key=43296772-7f7bc3909372636d0ba9a5d78&q=${item.tags}&page=${count}&per_page=20