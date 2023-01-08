import React from 'react'
import 'boxicons';
import {default as api} from '../store/apiSlice';

// const obj = [
//     {
//         name:"Savings",
//         color:'#f9c74f',     
//     },
//     {
//         name:"Investment",
//         color:'rgb(255, 99, 132)',      
//     },
//     {
//         name:"Expense",
//         color:'rgb(54, 162, 235)',       
//     }
// ]

export default function List() {
    const { data, isFetching , isSuccess, isError } = api.useGetLabelsQuery()
    const [deleteTransaction] = api.useDeleteTransactionMutation()
    let Transactions;

    
    const handlerClick = (e) => {
        e.preventDefault();
        if(!e.target.dataset.id) return 0;
        deleteTransaction({ _id : e.target.dataset.id })
    }

    if(isFetching){
        Transactions = <div>Fetching</div>;
    }else if(isSuccess){
        Transactions = data.map((v, i) => <Transaction key={i} category={v} handler={handlerClick} ></Transaction>);
    }else if(isError){
        Transactions = <div>Error</div>
    }


  return (
    <div className="flex flex-col py-6 gap-3">
        <h1 className='py-4 font-bold text-xl'>History</h1>
        
        {Transactions}
        
    </div>
  )
}

function Transaction({ category, handler }){
    
    var fetchdate = category.date;
    var disdate = "";
    for(var i=0;i<10;i++){
        disdate = disdate + fetchdate[i];    
    }
    
    if(!category) return null;
    return (
        <div className="item flex justify-center bg-gray-50 py-2 rounded-r" style={{ borderRight : `8px solid ${category.color ??  "#e5e5e5"}`}}>
            
            <span className='twtwo' style={{ color : ` ${category.color ??  "#e5e5e5"}`}}>#</span>
            <span className='block w-full '>{category.type ?? ''}</span>
           
            <span className='block w-full'>{category.name ?? ''}</span>
            <span className='block w-full'>{category.amount ?? ''}</span>
            <span className='block w-full'>{disdate ?? ''}</span>
            <button className='px-3' onClick={handler}><box-icon data-id={category._id ?? ''}  color={category.color ??  "#e5e5e5"} size="16px" name="trash" ></box-icon></button>            
            
        </div>
    )
}