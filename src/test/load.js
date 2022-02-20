window.onload = function() {
    let start = performance.timing.navigationStart;
    let end = new Date().getTime();
    console.log(end - start);
}