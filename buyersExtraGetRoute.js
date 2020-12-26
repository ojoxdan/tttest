const buyersExtraGetRoute = (app) =>{
    app.use('/api/buyer/amount-distribution', require('./routes/page/seller/extra-routes/amountDistribution'));
    app.use('/api/buyer/product-categories', require('./routes/page/buyer/extra-routes/productCategories'));
    app.use('/api/buyer/product-countries', require('./routes/page/seller/extra-routes/productCountries'));
    app.use('/api/buyer/product-regions', require('./routes/page/buyer/extra-routes/productRegions'));
    app.use('/api/buyer/dropoff-locations', require('./routes/page/seller/extra-routes/dropOffLocation'));
    app.use('/api/buyer/buy-now-products', require('./routes/page/buyer/extra-routes/buyNow'));
    app.use('/api/buyer/posts', require('./routes/page/public/posts'));

    app.use('/api/admin/advance-job-listing', require('./routes/page/admin/advanceJobListing'));
    app.use('/api/buyer/business-functions', require('./routes/page/seller/extra-routes/businessFunctions'));
    app.use('/api/buyer/business-industries', require('./routes/page/seller/extra-routes/businessIndustry'));
    app.use('/api/buyer/years-of-experience', require('./routes/page/seller/extra-routes/yearsOfExperience'));
    app.use('/api/buyer/minimum-qualifications', require('./routes/page/seller/extra-routes/minimumQualification'));
    app.use('/api/buyer/job-types', require('./routes/page/seller/extra-routes/jobTypes'));
    

}

module.exports =  buyersExtraGetRoute