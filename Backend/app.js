'use strict'

import {Router} from 'https://deno.land/x/oak@v6.3.1/mod.ts';
import {v4} from 'https://deno.land/std@0.77.0/uuid/mod.ts';

let list = [
    {id: v4.generate(), text: "test 1", tag: "Feature", status: "todo", date: "Sep 14"},
    {id: v4.generate(), text: "test 2", tag: "Feature", status: "progress", date: "Dez 5"},
    {id: v4.generate(), text: "test 3", tag: "Feature", status: "finished", date: "Nov 21"},
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
});

export const apiRoutes = router.routes();