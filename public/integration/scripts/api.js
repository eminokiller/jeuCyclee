const ENV = 'DEV'
function getApi(url) {
    let apiEndPoint = ENV=='DEV'?'http://127.0.0.1:8002':'http://http://5.196.21.64:8081';
    return `${apiEndPoint}${url}`
}