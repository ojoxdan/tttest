const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')

const authUser = async(req, res, next) =>{
    let token = await req.header('x-auth-user')
    if (token) {
        jwt.verify(token, config.get('TKK_USER_SECRET'), (err, user)=>{
            if (err) {
                return res.status(400).json({error:{msg: 'Bad Authentication'}})
            }
            req.user = {...user}
            next()
        })
    }else{
        return res.status(400).json({error:{msg: 'Bad Authentication'}})
    }
}

module.exports = authUser