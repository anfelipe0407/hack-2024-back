import express from "express";

export function validateEmail(email) {
  if (email.length === 0) return false;

  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

