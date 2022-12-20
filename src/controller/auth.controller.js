const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/user.model')
const { check, validationResult } = require('express-validator')
const asyncHandler = require("express-async-handler");
const { response } = require('express')
const {v4 : uuidv4} = require('uuid')

const register = asyncHandler(async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()})
    }
    else {
        const userId = uuidv4()
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const user = new UserModel({
            userId: userId,
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
            phoneNumber:req.body.phoenNumber
          })
          user
            .save()
            .then((response) => {
              res.status(201).json({
                message: 'User successfully created!',
                result: response,
              })
            })
            .catch((error) => {
              res.status(500).json({
                error: error,
              })
            })
        })
      }
})


const login = asyncHandler(async(req,res)=>{
  let getUser
  UserModel.findOne({
    email:req.body.email
  }).then((user)=>{
    if(!user){
      return res.status(401).json({
        message: "Authentication Failed",
      })

    }
    getUser = user
    return bcrypt.compare(req.body.password, user.password)
  })
  .then((response)=>{
    if(!response){
      return res.status(401).json({
        message:"Authentication Failed"
      })
    } else {
      let jwtToken = jwt.sign(
        {
          email: getUser.email,
          userId:getUser.userId
        },
        process.env.JWT_SECRET,
        {
          expiresIn:"1h"
        }
      )
      res.status(200).json({
        accessToken: jwtToken,
        expiresIn: 3600,
        userId: getUser.userId,
      })
    
    }
    
  })
  .catch((err)=>{
    return res.status(401).json({
      messgae:"Authentication Failed"
    })
  })
})

const authcheck = asyncHandler(async(req,res,next)=>{
 
      return res.status(200).send("Authorized Crediential")
})

const userProfile = asyncHandler(async(req,res,next)=>{
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
})
})
module.exports = {
    register,
    login,
    userProfile,
    authcheck
}