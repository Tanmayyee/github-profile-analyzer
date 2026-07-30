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
const about = document.querySelector("#about");
const bio = document.querySelector("#bio");
const email = document.querySelector("#email");
const links = document.querySelector("#links");
const socialApp = document.querySelector("#socialApp");
const socialLink = document.querySelector("#socialLink");
const repoCount = document.querySelector("#repoCount");
const starEarn = document.querySelector("#starEarn");
const forkEarn = document.querySelector("#forkEarn");
const forkRepo = document.querySelector("#forkRepo");
const langPerF = document.querySelector("#langPerF")
const langPerS =document.querySelector("#langPerS")
const langPerT = document.querySelector("#langPerT")
const langF =document.querySelector("#langF")
const langS=document.querySelector("#langS")
const langT=document.querySelector("#langT")
const barF=document.querySelector("#barF")
const barS=document.querySelector("#barS")
const barT=document.querySelector("#barT")

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
  purl.target = "_blank";
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
  const oldSocials = document.querySelectorAll(".dynamic-social"); //querySelectorAll -/   not querySelector
  //  for(let e of oldSocials){
  //     e.remove();
  //  }
  oldSocials.forEach((element) => element.remove()); // or forEach(removeEle)   ,,  const removeEle=element=>element.remove();

  if (accounts.length === 0) {
    const p = document.createElement("p");
    const pText = document.createElement("p");
    p.className = "font-semibold text-slate-500 dynamic-social "; //dynamic social is a class that i created to select all elements that i want to remove using oldSocials.
    p.innerText = "Social";
    pText.className = "text-indigo-600 hover:underline dynamic-social";
    pText.innerText = "Not specified";
    about.append(p);
    about.append(pText);
  } else {
    for (let acc of accounts) {
      const p = document.createElement("p");
      const a = document.createElement("a");

      p.className = "font-semibold text-slate-500 dynamic-social ";
      p.innerText = "Social Profiles";
      a.className = "text-indigo-600 hover:underline dynamic-social ";
      a.href = acc.url;
      a.innerText = acc.provider;
      a.target = "_blank";

      about.append(p);
      about.append(a);
    }
  }
};

const counts = (count) => {
  repoCount.innerText = count.length;
  let totalStars = 0;
  let totalForks = 0;
  let forked = 0;

  let js = 0, ts = 0, html = 0, css = 0, ejs = 0, py = 0, java = 0, cSharp = 0, cpp = 0, go = 0, php = 0, cLang = 0, ruby = 0, shell = 0, rust = 0, kotlin = 0, swift = 0, other = 0;

  for (let c of count) {
    if (c.fork === true) {
      forked++;
    }
    totalForks += c.forks_count;
    totalStars += c.stargazers_count;
    
    switch (c.language) {
      case "JavaScript": js += 1; break;
      case "TypeScript": ts += 1; break;
      case "HTML": html += 1; break;
      case "CSS": css += 1; break;
      case "EJS": ejs += 1; break;
      case "Python": py += 1; break;
      case "Java": java += 1; break; 
      case "C#": cSharp += 1; break;
      case "C++": cpp += 1; break;
      case "Go": go += 1; break;
      case "PHP": php += 1; break;
      case "C": cLang += 1; break;
      case "Ruby": ruby += 1; break;
      case "Shell": shell += 1; break;
      case "Rust": rust += 1; break;
      case "Kotlin": kotlin += 1; break;
      case "Swift": swift += 1; break;
      
      default :
      if(c.language !==null){
          other +=1;
      }
    
    }
  }

  starEarn.innerText = totalStars;
  forkEarn.innerText = totalForks;
  forkRepo.innerText = forked;

  let totalLang=js+ts+html+css+ruby+go+cpp+cSharp+rust+kotlin+py+java+shell+php+ejs+cLang+swift+other

  let langArray= [
    {name:"JavaScript" , times:js},
    {name:"TypeScript" , times:ts},
    {name:"HTML" , times:html},
    {name:"CSS" , times:css},
    {name:"Ruby" , times:ruby},
    {name:"Go" , times:go},
    {name:"C++" , times:cpp},
    {name:"C#" , times:cSharp},
    {name:"Rust" , times:rust},
    {name:"Kotlin" , times:kotlin},
    {name:"Python" , times:py},
    {name:"Java" , times:java},
    {name:"Shell" , times:shell},
    {name:"PHP" , times:php},
    {name:"EJS" , times:ejs},
    {name:"C" , times:cLang},
    {name:"Swift" , times:swift},
    {name:"Others" , times:other},

  ]
  
  let langSorted=langArray.toSorted((a,b)=>b.times-a.times);

  let langFirst = totalLang > 0 ? ((langSorted[0].times/ totalLang) * 100).toFixed(1) : 0;
  let langSec = totalLang > 0 ? ((langSorted[1].times / totalLang) * 100).toFixed(1) : 0;
  let langThird = totalLang > 0 ? ((langSorted[2].times / totalLang) * 100).toFixed(1) : 0;
  
  langF.innerText=langSorted[0].name;
  langS.innerText=langSorted[1].name;
  
  
  langPerF.innerText=langFirst +"%";
  langPerS.innerText=langSec +"%";
  if(langThird>0){
    langPerT.innerText=langThird +"%";
    langT.innerText=langSorted[2].name;
  }else{
    langPerT.innerText="0%"
    langT.innerText="Others"
  }
  

  // for bar -  

  let top3Total = langSorted[0].times + langSorted[1].times + langSorted[2].times;

  
  let barWidthF = top3Total > 0 ? ((langSorted[0].times / top3Total) * 100).toFixed(1) : 0;
  let barWidthS = top3Total > 0 ? ((langSorted[1].times / top3Total) * 100).toFixed(1) : 0;
  let barWidthT = top3Total > 0 ? ((langSorted[2].times / top3Total) * 100).toFixed(1) : 0;
  // ---------------------------------------------------------

  
  langF.innerText = langSorted[0].name;
  langS.innerText = langSorted[1].name;
  
  langPerF.innerText = langFirst + "%";
  langPerS.innerText = langSec + "%";

  if (langThird > 0) {
    langPerT.innerText = langThird + "%";
    langT.innerText = langSorted[2].name;
  } else {
    langPerT.innerText = "0%";
    langT.innerText = "Others";
  }

 barF.style.width = barWidthF + "%";
  barF.title = langSorted[0].name;

  barS.style.width = barWidthS + "%";
  barS.title = langSorted[1].name;

  if (langThird > 0) {
    barT.style.width = barWidthT + "%";
    barT.title = langSorted[2].name;
  } else {
    barT.style.width = "0%";
    barT.title = "";
  }
  
};
