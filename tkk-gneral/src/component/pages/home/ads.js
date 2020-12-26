const ads = (endpoint, ad) =>{
    console.log("this should actuall send ")
    let dataform = new FormData()
    dataform.append("ad", ad)
    let xhr = new XMLHttpRequest()
    xhr.open("POST", `/api/tinkoko-ads/${endpoint}`, true)
    xhr.send(dataform)
}

export default  ads