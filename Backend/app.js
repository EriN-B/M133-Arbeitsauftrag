'use strict'

import {Router} from 'https://deno.land/x/oak@v6.3.1/mod.ts';
import {v4} from 'https://deno.land/std@0.77.0/uuid/mod.ts';

let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let d = new Date();
let month = months[d.getMonth()];   

let list = [
    {id: 1, text: "test 1", tag: "Feature", bgstyle:'bg-indigo-100',textstyle: 'text-indigo-90', color: '#312e81', date: month + " " + d.getDate(), state : 'todo'},
    {id: 2, text: "test 2", tag: "Design", bgstyle:'bg-green-100',textstyle: 'text-green-900',color: '#14532d', date: month + " " + d.getDate(), state: 'progress'},
    {id: 3, text: "test 3", tag: "Style", bgstyle:'bg-yellow-100',textstyle: 'text-yellow-900',color: '#713f12',date: month + " " + d.getDate(), state :'done'},
];

const router = new Router();

router
.get("/api/list", context => context.response.body = list)
.get("/api/id", context => context.response.body = {id: v4.generate()})
.post("/api/list", async context => {
    const newItem = await context.request.body({type: "json"}).value;
    list = [
        ...list,
        newItem
    ];
    context.response.status = 200;
})
.put("/api/list", async context => {
    const task = await context.request.body({type: "json"}).value;
    const toUpdateItem = list.find((item) => item.id === task.id);
    if(toUpdateItem) {
        toUpdateItem.state = task.state;
        context.response.status = 200; 
    } else {
        context.response.status = 404;
    }
    
})
.delete("/api/list", async context => {
    const itemId = await context.request.body({type: "json"}).value;
    const itemIndex = list.findIndex((item) => item.id == itemId.id);
    if(itemIndex > -1) {
     list.splice(itemIndex, 1);
     context.response.status = 200;   
    } else {
        context.response.status = 404;
    }
})

export const apiRoutes = router.routes();