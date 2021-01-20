const ENV = 'DEV'
function getApi(url) {
    let apiEndPoint = ENV=='DEV'?'http://jeucycle.loc':'http://http://5.196.21.64:8081';
    return `${apiEndPoint}${url}`
}