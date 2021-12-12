'use strict'

import {Router} from 'https://deno.land/x/oak@v6.3.1/mod.ts';
import {v4} from 'https://deno.land/std@0.77.0/uuid/mod.ts';

let list = [
    {id: v4.generate(), text: "test 1", tag: "Feature", bgstyle:'bg-indigo-100',textstyle: 'text-indigo-90', color: '#312e81', date: "Sep 14"},
    {id: v4.generate(), text: "test 2", tag: "Design", bgstyle:'bg-green-100',textstyle: 'text-green-900',color: '#14532d', date: "Dez 5"},
    {id: v4.generate(), text: "test 3", tag: "Style", bgstyle:'bg-yellow-100',textstyle: 'text-yellow-900',color: '#713f12',date: "Nov 21"},
];

const router = new Router();

router
.get("/api/list", context => context.response.body = list)
.get("/api/id", context => context.response.body = v4.generate())
.post("/api/list", async context => {
    const newItem = await context.request.body({type: "json"}).value;
    console.log("requestBody: ", newItem);
    list = [
        ...list,
        newItem
    ];
    context.response.status = 200;
})
.put("/api/list", async context => {
    const toUpdateItem = list.find((item) => item.id === context.id);

})

export const apiRoutes = router.routes();