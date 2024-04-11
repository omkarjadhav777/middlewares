const express=require("express");
const app=express();

// app.use((req,res,next)=>{
//     let {query}=req.query;
//     console.log(query);
//     console.log("hi, i am middleware");
//     //res.send("middleware finished")
//     next();
// ///return next(); //write developer to emitt afetr next anything

//     console.log("this is after next()")//this not good way to write after next
// });
// //not go forward for any request even we use different route so we have to use special paramater name is next

// app.use((req,res,next)=>{
//     console.log("hi, i am 2nd middleware");
//     next();
// })

//middleware always run either you select correct path or wrong path 

//utility middleware
//logger-morgan
// app.use((req,res,next)=>{
//     req.time=new Date(Date.now()).toString();
//     console.log(req.method,req.hostname,req.path,req.time);
//     next();
// });

//exploring app.use go 
// path	The path for which the middleware function is invoked; can be any of:
// A string representing a path.
// A path pattern.
// A regular expression pattern to match paths.
// An array of combinations of any of the above.
// For examples, see Path examples.	'/' (root path)
// callback	Callback functions; can be:
// A middleware function.
// A series of middleware functions (separated by commas).
// An array of middleware functions.
// A combination of all of the above.

// app.use("/random",(req,res,next)=>{
//     console.log("i am only for random");
//     next();
// });

// app.use("/api",(req,res,next)=>{
//     let {token}=req.query;
//     if(token==="giveaccess"){
//         next();
//     }
//     res.send("access denieed!");
// });
//passing multiple middlware
// const checkToken=(req,res,next)=>{
//     let {token}=req.query;
//     if(token==="giveaccess"){
//         next();
//     }
//     res.send("access denieed!");
// };
const checkToken=(req,res,next)=>{
    let {token}=req.query;
    if(token==="giveaccess"){
        next();
    }
    throw new Error("access denieed!");//our own error
};

//api token as query
// app.get("/api",(req,res)=>{
//     res.send("data");
// });

app.get("/api",checkToken,(req,res)=>{
    res.send("data");
});

//default error handler handle this error 
// The default error handler
// Express comes with a built-in error handler that takes care of any errors that might be encountered in the app. This default error-handling middleware function is added at the end of the middleware function stack.

// If you pass an error to next() and you do not handle it in a custom error handler, it will be handled by the built-in error handler; the error will be written to the client with the stack trace. The stack trace is not included in the production environment.

// Set the environment variable NODE_ENV to production, to run the app in production mode.

// When an error is written, the following information is added to the response:

// The res.statusCode is set from err.status (or err.statusCode). If this value is outside the 4xx or 5xx range, it will be set to 500.
// The res.statusMessage is set according to the status code.
// The body will be the HTML of the status code message when in production environment, otherwise will be err.stack.
// Any headers specified in an err.headers object.

// app.get("/wrong",(req,res)=>{
//     abcd=abcd;
// })

app.get("/",(req,res)=>{
    res.send("hi i am root");
});

app.get("/random",(req,res)=>{
    res.send("this is a random page");
});





//if we write middleware in last then it not work because route matchech in upper cases
//that why we write middle ware in top
// app.use((req,res,next)=>{
//     req.time=new Date(Date.now()).toString();
//     console.log(req.method,req.hostname,req.path,req.time);
//     next();
// });

//404
app.use((req,res)=>{
    res.status(404).send("page not found");
})

app.listen(8080,()=>{
    console.log("server listening to port 8080");
});