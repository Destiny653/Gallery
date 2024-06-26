import React, { Suspense, useContext, useEffect, useState } from 'react'
import style from './css/Main.module.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import '../App.css'
import Loading from '../Loading';



export default function Home() {

    const [products, setProduct] = useState([]);
    const [count, setCount] = useState(1);
    const [searchInput, setSearchInput] = useState(" ")
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        setLoading(true)
        const getProduct = async () => {
            await axios.get(`https://pixabay.com/api/?key=43296772-7f7bc3909372636d0ba9a5d78&q=${searchInput}&page=${count}&per_page=20`).then(result => {
                setProduct(result.data || [])
            }).then(() => setLoading(false)).catch(err => console.log(err));
        };
        getProduct()

    }, [count, searchInput, loading]);
    console.table(products);

    let qty = products.hits?.length
    console.log(qty);
    

 
    const category = ["backgrounds", "fashion", "nature", "science", "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music"];

    return (
        <>

            <header className={style.header}>
                <div className={style.description}>
                    <h1 className={style.title}>API Store</h1>
                    <h2 className={style.subtitle}>A simple API store</h2>
                </div>
                <div className={style.inputHead}>
                    <input value={searchInput} className={`${style.input}`} id='searchBar' type="text" autoComplete='true' placeholder='Input search...' onChange={(e)=> setSearchInput(e.target.value)} />
                    <button className={style.button} type='submit' onClick={()=>searchInput}>Search</button>
                </div>
            </header>
            <div className={style.btnLoop}>
                {
                    category.map((cat, index) => {
                        return (
                            <div className={style.btnLoopChild} key={index}>
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
                    <button className={style.btnIterate} onClick={() => count <= 1 ? setCount(1) : setCount(count - 1)}>prev</button> page {count}/{qty} <button className={style.btnIterate} onClick={() => setCount(count == 20 ? 20 : count + 1)}>next</button>
                    {/* <button onClick={() => count2 <= 0 ? setCount2(0) : setCount2(count2 - 1)}>Prev</button> {list} arrey: {count2} <button onClick={() => setCount2(count2 + 1)}>Next</button> */}
                </div>
                <div className={style.product}>
                    {
                        products.hits?.map(product => (
                            <Suspense fallback={<Loading />}>
                                <>
                                    <div className={style.productCard} key={product.id}>
                                        <Link to={`/products/${product.id}`}>
                                            <img className={style.productImg} src={product.webformatURL} alt={product.tags} width="100%" height="100%" />
                                        </Link>
                                    </div>
                                    <div className={style.userDetail}>
                                        <img className={style.userImg} src={product.userImageURL} alt="***" />
                                        <h3 className={style.tags}>{product.tags}</h3>
                                    </div>
                                </>
                            </Suspense>
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