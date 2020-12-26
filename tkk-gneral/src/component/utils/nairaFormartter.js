
const nairaFormartter = (amount) => {
    if (parseInt(amount)) {
        let num = new Intl.NumberFormat('de-DE', {style:"currency" ,currency: 'NGN' }).format(amount)
        // let num = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'NGN' }).format(amount)
        return num
    }
    return 0 
}
export default nairaFormartter
