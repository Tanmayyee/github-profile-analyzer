//https://api.github.com/users/${username}`

import axios from "axios";

const btn=document.querySelector("#searchbtn")
const input=document.querySelector("#input")
const pimg=document.querySelector("#pimg")
const form=document.querySelector("#searchForm")
const profileSidebar=document.querySelector("#profile-sidebar")
const pname=document.querySelector("#pname")
const uname=document.querySelector("#uname")
const purl=document.querySelector("#purl")
const followers=document.querySelector("#followers-count")
const following=document.querySelector("#following-count")
const location=document.querySelector("#location")
const svg=document.querySelector("#svg")
const company=document.querySelector("#company")
const bio=document.querySelector("#bio")
const email=document.querySelector("#email")
const links=document.querySelector("#links")
const repoCount=document.querySelector("#repoCount")

form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const username=input.value.trim();
    try{
       const res=await axios.get(`https://api.github.com/users/${username}`)
       console.log(res.data)
      profile(res.data)

      fetchAllRepos(username)
               
    }catch(e){
          console.log("user not found")
          if (e.response && e.response.status === 404) {
           alert("User not found! Please check the spelling."); // Or update errorDisplay.innerText
       } else {
           alert("Something went wrong. You might be rate limited!");
       }
    }
})

const fetchAllRepos= async(user)=>{
     let allRepo=[];
     let page=1;
    
     const repo=await axios.get(`https://api.github.com/users/${user}/repos?per_page=100&page=${page}`)
        while(true){
            allRepo=repo.data;

            if(allRepo.length<100){
                break;
            }else{
                page++;
            }
        }
        console.log(allRepo)
        return allRepo;
    } 
          

const profile=async(details)=>{
    pimg.src=details.avatar_url;
   pname.innerText=details.name;
   uname.innerText=details.login;
   purl.href=details.html_url;
   followers.innerText=details.followers;
   following.innerText=details.following;
//    if(details.location){
//     location.innerText=details.location;
//    }else{
//     location.innerText="Not Specified"
//    }
   location.innerText=details.location?details.location:"Not specified";
   bio.innerText=details.bio?details.bio:"Not specified";
   email.innerText=details.email? details.email:"Not specified";
   links.href=details.blog?details.blog:"Not specified";
   links.innerText=details.blog?details.blog:"Not specified";

   repoCount.innerText=details.public_repos;
   
};