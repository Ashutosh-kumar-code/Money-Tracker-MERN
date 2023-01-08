import  _ from 'lodash';

export function getSum(transaction, type){
    let sum = _(transaction)
                      .groupBy("type")
                      .map((objs, key) => {
                        if(!type) return _.sumBy(objs, 'amount'); 
                        return {
                            'type' : key,
                            'color' : objs[0].color,
                            'total' : _.sumBy(objs, 'amount')
                        }
                      })
                     
                      .value()
                    
    return sum;
}
// export function addSum(transaction, type){
//     let sum = _(transaction)
//                       .groupBy("type")
//                       .map((objs, key) => {
//                         if(type) return console.log(type); 
//                         return {
//                             // if(type == "Expense"){
//                                 // console.log(type)
//                             // }
//                         }
//                       })
                     
//                       .value()
                    
//     return sum;
// }
// addSum();
export function getLabels(transaction){
    let amountSum = getSum(transaction, 'type');
    let Total = _.sum(getSum(transaction));

    let  percent = _(amountSum)
                            .map(objs => _.assign(objs, { percent : (100 * objs.total)  / Total}))
                            .value()

    return percent;
}

export function chart_Data(transaction, custom){

    let bg = _.map(transaction, a => a.color)
    bg = _.uniq(bg)
    let dataValue = getSum(transaction)

    const config = {
        data : {
          datasets: [{
              data: dataValue,
              backgroundColor: bg,
              hoverOffset: 5,
              borderRadius : 10,
              spacing: 10
            }]
        },
        options : {
            cutout: 105
        }
    }

    return custom ?? config;

}

export function getTotal(transaction){
    return _.sum(getSum(transaction));
}