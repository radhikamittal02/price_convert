import React, { useEffect, useLayoutEffect, useState } from 'react';
// import axios from 'axios';
import data from './data.json';
import rate from './currency.json';
import './products.css';

const currency_option=["INR","USD","SAR","NZD","EUR"];
const API_KEY="1e0e49c0da622ebc14268da2f51576bb";

export default function Products(){
    const [currency,setCurrency]=useState("EUR");
    const [currencyRate,setCurrencyrate]=useState(null);

    useEffect(()=>{
        localStorage.setItem("currency",currency);
        setCurrencyrate(rate.rates[currency]);
        // axios.get(`https://api.exchangeratesapi.io/latest?access_key=${API_KEY}&base=EUR`).then((res)=>{
        //     console.log(res);
        // }).catch((err)=>{
        //     console.log(err);
        // })

    },[currency]);

    useLayoutEffect(()=>{
        let getCurrencyFromLocal=localStorage.getItem("currency");
        if(getCurrencyFromLocal){
            setCurrency(getCurrencyFromLocal);
            setCurrencyrate(rate.rates[getCurrencyFromLocal]);
        }
    },[]);
    return(
        <div className="div-products">
            <div className="select-currency">
            <select onChange={(e)=>setCurrency(e.target.value)} defaultValue={localStorage.getItem("currency")}>
                {currency_option.map((amount)=><option>
                    {amount}
                </option>)}
            </select>
            </div>
            <div className="cards">
                {data.map((item)=>{
                    return(
                        <div className="each-card" key={item.id}>
                            <div className="product-image"><img loading="lazy" src={item.image} alt="unable to load"></img></div>
                            <div className="product-name">{item.product_name}</div>
                            <div className="product-price">{Math.round(item.price*currencyRate)} {currency}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}