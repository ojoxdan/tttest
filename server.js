const path = require('path')
const fs = require('fs')
const http = require('http')
const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const server = http.createServer(app) 
const io = require('socket.io')(server)

const TkkSocket = require('./socket/tkkSocket')
const sellersExtraGetRoute = require('./sellersExtraGetRoute')
const buyersExtraGetRoute = require('./buyersExtraGetRoute')
let ioSocket = new TkkSocket(io)
module.exports = ioSocket
// new TkkSocket(io)
const connectDB =  require('./database/db') 
connectDB()

app.use(express.json({extended:false}))
app.use(express.urlencoded({extended:true}))
app.use(fileUpload())

// static files 
app.use(express.static(path.join(__dirname, 'assets')))



// public api  endpoints 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/register', require('./routes/page/public/register'));
app.use('/api/login', require('./routes/page/public/login'));
app.use('/api/forgotten-password', require('./routes/page/public/forgottenPassword'));
app.use('/api/change-password', require('./routes/page/public/changePassword'));
app.use('/api/comments', require('./routes/page/public/comments'));
app.use('/api/reply-comment', require('./routes/page/public/replyComment'));
app.use('/api/likes', require('./routes/page/public/likes'));
app.use('/api/notifications', require('./routes/page/public/notifications'));
app.use('/api/search', require('./routes/page/public/search'));
app.use('/api/posts', require('./routes/page/public/posts'));
app.use('/api/promoted-posts', require('./routes/page/public/promotedPosts'));
app.use('/api/advertisements', require('./routes/page/public/advertisements'));
app.use('/api/chats', require('./routes/page/public/chats'));
app.use('/api/pay', require('./routes/page/public/payment'));
app.use('/api/tinkoko-ads', require('./routes/page/public/ads'));
// sellers api endpoints 
app.use('/api/seller/register', require('./routes/page/seller/sellerRegistration'));
app.use('/api/seller/my-product/joblistings', require('./routes/page/seller/my-product/jobListing'));
app.use('/api/seller/my-product/buy-now', require('./routes/page/seller/my-product/buyNow'));
app.use('/api/seller/my-product/regular', require('./routes/page/seller/my-product/regular'));
app.use('/api/seller/settings/profile', require('./routes/page/seller/settings/profileSettings'));
app.use('/api/seller/settings/social-network', require('./routes/page/seller/settings/socialNetwork'));
app.use('/api/seller/settings/account-details', require('./routes/page/seller/settings/accountDetails'));
app.use('/api/seller/settings/manage-password', require('./routes/page/seller/settings/managePassword'));
app.use('/api/seller/settings/create-user', require('./routes/page/seller/settings/createUser'));
app.use('/api/seller/settings/receive-t-messages', require('./routes/page/seller/settings/receiveTMessages'));
app.use('/api/seller/settings/enable-2fa', require('./routes/page/seller/settings/enable2FA'));
// app.use('/api/seller/settings/notifications', require('./routes/page/seller/settings/notifications'));
app.use('/api/seller/promotion-types', require('./routes/page/admin/promotionPlans'));
app.use('/api/seller/campaign-durations', require('./routes/page/admin/campaignDuration'));
app.use('/api/seller/settings/manage-phone', require('./routes/page/seller/settings/managePhone'));
app.use('/api/seller/supports', require('./routes/page/seller/supports/supportTicket'));
app.use('/api/seller/my-promotions', require('./routes/page/seller/ads/promotion'));
app.use('/api/seller/my-adverts', require('./routes/page/seller/ads/advert'));
app.use('/api/seller/orders', require('./routes/page/buyer/orders'));
app.use('/api/seller/account', require('./routes/page/seller/account/account'));
app.use('/api/seller/posts', require('./routes/page/seller/my-product/posts'));
app.use('/api/seller/buynow', require('./routes/page/seller/my-product/buyNow'));
app.use('/api/seller/regular', require('./routes/page/seller/my-product/regular'));
app.use('/api/seller/jobs', require('./routes/page/seller/my-product/jobListing'));

// sellersExtraGetRoute(app)

app.use('/api/seller/amount-distribution', require('./routes/page/seller/extra-routes/amountDistribution'));
app.use('/api/seller/product-categories', require('./routes/page/seller/extra-routes/productCategories'));
app.use('/api/seller/product-countries', require('./routes/page/seller/extra-routes/productCountries'));
app.use('/api/seller/product-regions', require('./routes/page/seller/extra-routes/ProductRegions'));
app.use('/api/seller/dropoff-locations', require('./routes/page/seller/extra-routes/dropOffLocation'));

app.use('/api/admin/advance-job-listing', require('./routes/page/admin/advanceJobListing'));
app.use('/api/seller/business-functions', require('./routes/page/seller/extra-routes/businessFunctions'));
app.use('/api/seller/business-industries', require('./routes/page/seller/extra-routes/businessIndustry'));
app.use('/api/seller/years-of-experience', require('./routes/page/seller/extra-routes/yearsOfExperience'));
app.use('/api/seller/minimum-qualifications', require('./routes/page/seller/extra-routes/minimumQualification'));
app.use('/api/seller/job-types', require('./routes/page/seller/extra-routes/jobTypes'));

// admin routes 
app.use('/api/admin/register', require('./routes/page/admin/register'));
app.use('/api/admin/signin', require('./routes/page/admin/signin'));
app.use('/api/admin/job-types', require('./routes/page/admin/jobTypes'));
app.use('/api/admin/amount-distribution', require('./routes/page/admin/amountDistribution'));
app.use('/api/admin/product-types', require('./routes/page/admin/productType'));
app.use('/api/admin/product-countries', require('./routes/page/admin/productCountries'));
// app.use('/api/admin/product-regions', require('./routes/page/admin/productRegion'));
app.use('/api/admin/produt-dropoff-location', require('./routes/page/admin/dropOffLocations'));
app.use('/api/admin/campaign-type', require('./routes/page/admin/campaignType'));
app.use('/api/admin/advertisement-types', require('./routes/page/admin/advertismentTypes'));

// app.use('/api/admin/notifications', require('./routes/page/admin/notifications__'));
app.use('/api/admin/advance-job-listing', require('./routes/page/admin/advanceJobListing'));
app.use('/api/admin/business-functions', require('./routes/page/admin/businessFunctions'));
app.use('/api/admin/business-industries', require('./routes/page/admin/businessIndustry'));
app.use('/api/admin/years-of-experience', require('./routes/page/admin/yearsOfExperience'));
app.use('/api/admin/minimum-qualifications', require('./routes/page/admin/minimumQualification'));
app.use('/api/admin/posts/product-categories', require('./routes/page/admin/productCategories'));
app.use('/api/admin/campaign-durations', require('./routes/page/admin/campaignDuration'));
app.use('/api/admin/promotion-plans', require('./routes/page/admin/promotionPlans'));
app.use('/api/admin/posts', require('./routes/page/admin/posts'));

// buyer routes 
app.use('/api/buyer/orders', require('./routes/page/buyer/orders'));
app.use('/api/buyer/reviews', require('./routes/page/buyer/reviews'));
app.use('/api/buyer/job-application', require('./routes/page/buyer/jobApplication'));
// buyersExtraGetRoute(app)

app.use('/api/buyer/amount-distribution', require('./routes/page/seller/extra-routes/amountDistribution'));
app.use('/api/buyer/product-categories', require('./routes/page/buyer/extra-routes/productCategories'));
app.use('/api/buyer/product-countries', require('./routes/page/seller/extra-routes/productCountries'));
// app.use('/api/buyer/product-regions', require('./routes/page/buyer/extra-routes/productRegions'));
app.use('/api/buyer/dropoff-locations', require('./routes/page/seller/extra-routes/dropOffLocation'));
app.use('/api/buyer/buy-now-products', require('./routes/page/buyer/extra-routes/buyNow'));
app.use('/api/buyer/posts', require('./routes/page/public/posts'));

app.use('/api/admin/advance-job-listing', require('./routes/page/admin/advanceJobListing'));
app.use('/api/buyer/business-functions', require('./routes/page/seller/extra-routes/businessFunctions'));
app.use('/api/buyer/business-industries', require('./routes/page/seller/extra-routes/businessIndustry'));
app.use('/api/buyer/years-of-experience', require('./routes/page/seller/extra-routes/yearsOfExperience'));
app.use('/api/buyer/minimum-qualifications', require('./routes/page/seller/extra-routes/minimumQualification'));
app.use('/api/buyer/job-types', require('./routes/page/seller/extra-routes/jobTypes'));

// ends here 


app.use(express.static(path.join('./_buyer-client/build')))
app.use(express.static(path.join('./_seller-client/build')))
app.get("/seller", (req, res)=>res.sendFile(path.resolve(__dirname, "_seller-client", "build", "index.html")))
app.get("/seller/*", (req, res)=>res.sendFile(path.resolve(__dirname, "_seller-client", "build", "index.html")))
app.get("*", (req, res)=>res.sendFile(path.resolve(__dirname, "_buyer-client", "build", "index.html")))

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>{console.log(`Server running on port: ${PORT}`)})