import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

const form = document.querySelector("[data-form]")
const queryParamsContainer = document.querySelector('[data-query-params]');
const requestHeadersContainer = document.querySelector('[data-request-headers]');
const keyValueTemplate = document.querySelector('[data-key-value-template]');

document.querySelector('[data-add-query-param-btn]').addEventListener('click',()=>{
  queryParamsContainer.append(createKeyValuePair())
})

document.querySelector('[data-add-request-header-btn]').addEventListener('click',()=>{
  requestHeadersContainer.append(createKeyValuePair())
})

queryParamsContainer.append(createKeyValuePair())
requestHeadersContainer.append(createKeyValuePair())


form.addEventListener('submit',(e)=>{
  e.preventDefault()

  axios({
    url: document.querySelector('[data-url]').value,
    method: document.querySelector('[data-method]').value,
    params:keyValuePairsToObjects(queryParamsContainer),
    headers:keyValuePairsToObjects(requestHeadersContainer)
  }).then(res => console.log(res))
})

function createKeyValuePair(){
  const el = keyValueTemplate.content.cloneNode(true)
  el.querySelector('[data-remove-btn]').addEventListener('click',(e)=>{
    e.target.closest('[data-key-value-pair]').remove();
  })
  return el;
}

function keyValuePairsToObjects(container){
  const pairs = container.querySelectorAll('[data-key-value-pair]')
  return [...pairs].reduce((data,pair)=>{
    const key = pair.querySelector('[data-key]').value
    const value = pair.querySelector('[data-value]').value

    if(key === '') return data
    return {...data , [key]:value}
  },{})
}