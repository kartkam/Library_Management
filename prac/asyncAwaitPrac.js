/*async function foo(){
    try {
        const result = 23;

    }
}*/

//eg 1: async funcn returning promise
/*
function resolveAfter2Secs() {
    return new Promise( (resolve,reject) => {
        setTimeout( () => {
            resolve('resolved this');
        },2000)
    })
}

async function asyncCall() {
    console.log("calling");
    const result = await resolveAfter2Secs();
    console.log(result);
}

asyncCall();
*/

//eg 2: async error handling with catch fails during multiple awaits

async function foo(){
    const p1 = new Promise((resolve) => setTimeout( () => resolve(11) , 1000 ));
    const p2 = new Promise((_,reject) => setTimeout( () => reject(12), 500));
    const results = Promise.all([p1,p2]);
    return results;
    //const results = [await p1, await p2];
}


foo().catch( (error) => {
    console.log("Error caught",error)
})  //Attempt to swallow all errors