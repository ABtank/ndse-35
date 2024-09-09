console.log('delayed start');

const delay = ms => 
    new Promise(resolve =>
        setTimeout(resolve, ms)
    );


delay(500).then(()=>{
    console.log('delayed 500ms');
})


async function main() {
    await delay(1000);
    console.log('delayed 1000ms');
}
main();