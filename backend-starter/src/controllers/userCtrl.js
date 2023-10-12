const User = require("../models/userModel");
const express = require("express");
const mongoose = require("mongoose");
const catchAsyncError = require("../errorHandling/catchAsyncError");
const errorHandler = require("../errorHandling/customErrorHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUp = catchAsyncError(async function (req, res) {
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password,
  });
  await user.save();
  user.password = null;
  res.status(201).json({
    success: true,
    data: user,
  });
});
const logIn = catchAsyncError(async function (req, res) {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(404).send({
      message: "Invalid details. Plz try again!",
    });
  }
  const matchPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchPassword) {
    return res.status(403).send({
      message: "Invalid details",
    }); 
  }
  const token = jwt.sign(
    {
      id: existingUser._id,
    },
    process.env.ACCESS_SECRET_KEY
  );

  res.status(201).json({
    message: "success",
    token: token,
    user: existingUser,
  });
});



const logOut = catchAsyncError(async function (req, res, next) {
  console.log("proceed to logout");
  localStorage.clear("token");
});

module.exports = { signUp, logIn, logOut };
