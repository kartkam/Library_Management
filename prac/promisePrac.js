//eg 1 : promise with then, catch and then
/*new Promise((resolve,reject) => {
    console.log("Initial");
    resolve();
})
.then(() => {
    throw new Error("something failed")
    console.log("do 1st then");
})
.catch(() => {
    console.error("Catch error");
})
.then(() => {
    console.log("Finally clause")
})
*/

//eg 2 : promise for setTimeout()
/*const wait = ms => new Promise(resolve => setTimeout(resolve,ms));

wait(4 * 1000).then( () => saySomething("4 seconds passed")).catch( error => console.log(error));


function saySomething(sentence) {
    throw new Error("cant hear you")
}
*/

//eg 3: Check timing
/*Promise.resolve().then( () => console.log(2));
console.log(1);
*/

//eg 4: Task queue vs microtask
const promise = new Promise((resolve,reject) => {
    console.log("Promise callback");
    resolve();
}).then( (result) => {
    console.log("Promise callback (.then)");
})

setTimeout(function() {
    console.log("event loop cycle: Promise (fulfilled)", promise)
},0);

console.log("Promise (pending)", promise);
