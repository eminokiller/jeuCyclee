const ENV = 'DEV'
function getApi(url) {
    let apiEndPoint = ENV=='DEV'?'http://127.0.0.1:8000':'https://www.transformers.pixelshealth.com';
    return `${apiEndPoint}${url}`
}