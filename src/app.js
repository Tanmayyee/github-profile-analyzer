//https://api.github.com/users/${username}`

import axios from "axios";

const btn=document.querySelector("#searchbtn")
const input=document.querySelector("#input")
const pimg=document.querySelector("#pimg")
const form=document.querySelector("#searchForm")
const profileSidebar=document.querySelector("#profile-sidebar")
const pname=document.querySelector("#pname")
const uname=document.querySelector("#uname")
const followers=document.querySelector("#followers-count")
const following=document.querySelector("#following-count")


form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const username=input.value.trim();
    try{
       const res=await axios.get(`https://api.github.com/users/${username}`)
       console.log(res.data)
      profile(res.data)
    }catch(e){
          console.log("user not found")
    }
})

const profile=async(details)=>{
    pimg.src=details.avatar_url;
   pname.innerText=details.name;
   uname.innerText=details.login;
   followers.innerText=details.followers;
   following.innerText=details.following

};