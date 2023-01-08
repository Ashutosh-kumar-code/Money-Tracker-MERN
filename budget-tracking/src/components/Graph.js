import React, { useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
import Labels from './Labels';
import { chart_Data, getTotal } from '../helper/helper'
import {default as api} from '../store/apiSlice';

import { getLabels } from '../helper/helper';
import { add, subtract } from 'lodash';

Chart.register(ArcElement);

export default function Graph() {

  const { data, isFetching , isSuccess, isError } = api.useGetLabelsQuery()
  let graphData;
  let Transactions;
  Transactions = getLabels(data,'type').map((v, i) => <DataComponent key={i} data={v}></DataComponent>);
var two = Transactions[2];
// const one = two

  if(isFetching){
    graphData = <div>Fetching</div>;
  }else if(isSuccess){
    graphData = <Doughnut {...chart_Data(data)}></Doughnut>;
    chart_Data(data);
  }else if(isError){
    graphData = <div>Error</div>
  }


  return (
    <div className="flex justify-content max-w-xs mx-auto">
        <div className="item">
            <div className="chart relative">
              {/* <Doughnut {...config}></Doughnut> */}
                {graphData}
                <h3 className='mb-4 font-bold title'>Total
                    <span className='block text-3xl text-emerald-400'>${getTotal(data) ?? 0}</span>
                    <span className='block text-3xl total1'>${Transactions}</span>
                </h3>
                <h3 className='block text-3xl total2'>At last You Have Total Saving : {two}%</h3>
            </div>   

            <div className="flex flex-col py-10 gap-4">
                {/* Labels */}
                <Labels></Labels>
               
            </div> 
        </div>
    </div>
  )
}
var a = 0 ;
var b = 0 ;
var c = 0 ;

function DataComponent({data}){
  // console.log(" data yha h = "+ data.type)

  // var d = c - a-b ;
  if(data.type === 'Expense'){
   a = parseInt( data.percent); 
   
  }
  if(data.type === 'Investment'){
    b = parseInt( data.percent);
  }
  if(data.type === 'Savings'){
    c = parseInt( data.percent);
  }
  console.log("total = " )
  if(!data) return 0;
  return (
    subtract(c-b-a)  
  )
}

