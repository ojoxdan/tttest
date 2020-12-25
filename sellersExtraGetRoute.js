const sellersExtraGetRoute = (app) =>{
    app.use('/api/seller/amount-distribution', require('./routes/page/seller/extra-routes/amountDistribution'));
    app.use('/api/seller/product-categories', require('./routes/page/seller/extra-routes/productCategories'));
    app.use('/api/seller/product-countries', require('./routes/page/seller/extra-routes/productCountries'));
    // app.use('/api/seller/product-regions', require('./routes/page/seller/extra-routes/ProductRegions'));
    app.use('/api/seller/dropoff-locations', require('./routes/page/seller/extra-routes/dropOffLocation'));

    // app.use('/api/admin/advance-job-listing', require('./routes/page/admin/advanceJobListing'));
app.use('/api/seller/business-functions', require('./routes/page/seller/extra-routes/businessFunctions'));
app.use('/api/seller/business-industries', require('./routes/page/seller/extra-routes/businessIndustry'));
app.use('/api/seller/years-of-experience', require('./routes/page/seller/extra-routes/yearsOfExperience'));
app.use('/api/seller/minimum-qualifications', require('./routes/page/seller/extra-routes/minimumQualification'));
app.use('/api/seller/job-types', require('./routes/page/seller/extra-routes/jobTypes'));
    

}

module.exports =  sellersExtraGetRoute