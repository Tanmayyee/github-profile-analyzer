//https://api.github.com/users/${username}`

import axios from "axios";

const btn = document.querySelector("#searchbtn");
const input = document.querySelector("#input");
const pimg = document.querySelector("#pimg");
const form = document.querySelector("#searchForm");
const profileSidebar = document.querySelector("#profile-sidebar");
const pname = document.querySelector("#pname");
const uname = document.querySelector("#uname");
const purl = document.querySelector("#purl");
const followers = document.querySelector("#followers-count");
const following = document.querySelector("#following-count");
const location = document.querySelector("#location");
const svg = document.querySelector("#svg");
const company = document.querySelector("#company");
const about=document.querySelector("#about")
const bio = document.querySelector("#bio");
const email = document.querySelector("#email");
const links = document.querySelector("#links");
const socialApp = document.querySelector("#socialApp");
const socialLink = document.querySelector("#socialLink");
const repoCount = document.querySelector("#repoCount");
const starEarn = document.querySelector("#starEarn");
const forkEarn = document.querySelector("#forkEarn");
const forkRepo = document.querySelector("#forkRepo");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = input.value.trim();
  try {
    const res = await axios.get(`https://api.github.com/users/${username}`);
    console.log(res.data);
    profile(res.data);
    const socialData = await social(username);
    socialAcc(socialData);
    const repoData = await fetchAllRepos(username); //wait for data that comes from fetchAllRepos func.
    counts(repoData);
  } catch (e) {
    console.log("user not found");
    if (e.response && e.response.status === 404) {
      alert("User not found! Please check the spelling."); // Or update errorDisplay.innerText
    } else {
      alert("Something went wrong. You might be rate limited!");
    }
  }
});

const fetchAllRepos = async (user) => {
  let allRepo = [];
  let page = 1;

  while (true) {
    const repoRes = await axios.get(
      `https://api.github.com/users/${user}/repos?per_page=100&page=${page}`,
    );
    const repo = repoRes.data;

    allRepo = allRepo.concat(repo);

    if (repo.length < 100) {
      break;
    } else {
      page++;
    }
  }
  console.log(allRepo);
  return allRepo;
};

const social = async (u) => {
  const socialRes = await axios.get(
    `https://api.github.com/users/${u}/social_accounts`,
  );
//   console.log("helloooo socialsss");
//   console.log(socialRes.data);
  return socialRes.data;
};

const profile = (details) => {
  pimg.src = details.avatar_url;
  pname.innerText = details.name;
  uname.innerText = details.login;
  purl.href = details.html_url;
  purl.target="_blank"
  followers.innerText = details.followers;
  following.innerText = details.following;
  //    if(details.location){
  //     location.innerText=details.location;
  //    }else{
  //     location.innerText="Not Specified"
  //    }
  location.innerText = details.location ? details.location : "Not specified";
  bio.innerText = details.bio ? details.bio : "Not specified";
  email.innerText = details.email ? details.email : "Not specified";
  links.href = details.blog ? details.blog : "Not specified";
  links.innerText = details.blog ? details.blog : "Not specified";
};

const socialAcc = (accounts) => {
    const oldSocials=document.querySelectorAll(".dynamic-social")     //querySelectorAll -/   not querySelector
    //  for(let e of oldSocials){
    //     e.remove();
    //  }
    oldSocials.forEach(element => element.remove());   // or forEach(removeEle)   ,,  const removeEle=element=>element.remove();
    
    if(accounts.length===0){
     const p=document.createElement('p')
     const pText=document.createElement('p')
     p.className="font-semibold text-slate-500 dynamic-social "   //dynamic social is a class that i created to select all elements that i want to remove using oldSocials.
     p.innerText="Social"
     pText.className="text-indigo-600 hover:underline dynamic-social"
     pText.innerText="Not specified";
     about.append(p)
     about.append(pText)
    }else{
        for (let acc of accounts) {
      const p=document.createElement('p')
      const a=document.createElement('a')
      
      p.className="font-semibold text-slate-500 dynamic-social "
      p.innerText="Social Profiles"
      a.className="text-indigo-600 hover:underline dynamic-social "
      a.href=acc.url;
      a.innerText=acc.provider;
      a.target="_blank"

      about.append(p)
      about.append(a)

  }
    }
};

const counts = (count) => {
  repoCount.innerText = count.length;
  let totalStars = 0;
  let totalForks = 0;
  let forked = 0;

  for (let c of count) {
    if (c.fork === true) {
      forked++;
    }
    totalForks += c.forks_count;
    totalStars += c.stargazers_count;
  }

  starEarn.innerText = totalStars;
  forkEarn.innerText = totalForks;
  forkRepo.innerText = forked;
};
