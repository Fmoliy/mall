import {request} from "./request";

export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}


export class Goods {
  //构造函数
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  }
}
