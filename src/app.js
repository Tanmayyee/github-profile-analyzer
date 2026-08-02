//https://api.github.com/users/${username}`

import axios from "axios";

const initialMsg=document.querySelector("#initialMsg")
const dashboardContent=document.querySelector("#dashboardContent")
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
const langPerF = document.querySelector("#langPerF");
const langPerS = document.querySelector("#langPerS");
const langPerT = document.querySelector("#langPerT");
const langF = document.querySelector("#langF");
const langS = document.querySelector("#langS");
const langT = document.querySelector("#langT");
const barF = document.querySelector("#barF");
const barS = document.querySelector("#barS");
const barT = document.querySelector("#barT");
const recentContainer = document.querySelector("#recent");
const topRepoContainer = document.querySelector("#topRepo");
const repoContainer=document.querySelector("#repoContainer")
const loadMoreBtn=document.querySelector("#loadMoreBtn")

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = input.value.trim();
  try {
    const res = await axios.get(`https://api.github.com/users/${username}`);

    initialMsg.classList.add("hidden")
    dashboardContent.classList.remove("hidden")

    console.log(res.data);
    profile(res.data);

    const socialData = await social(username);
    socialAcc(socialData);

    const repoData = await fetchAllRepos(username); //wait for data that comes from fetchAllRepos func.
    counts(repoData);
    activeStar(repoData);
    allRepo(repoData);

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
  // console.log(allRepo);
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
  company.innerText = details.company ? details.company : "Not specified";
  bio.innerText = details.bio ? details.bio : "Not specified";
  // email.innerText = details.email ? details.email : "Not specified";
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
    pText.className = "text-indigo-600 font-semibold hover:text-indigo-800 transition-colors dynamic-social";
    pText.innerText = "Not specified";
    about.append(p);
    about.append(pText);
  } else {
    for (let acc of accounts) {
      const p = document.createElement("p");
      const a = document.createElement("a");

      p.className = "font-semibold text-slate-500 dynamic-social ";
      p.innerText = "Social Profiles";
      a.className = "text-indigo-600 font-semibold hover:text-indigo-800 transition-colors dynamic-social ";
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

      default:
        if (c.language !== null) {
          other += 1;
        }
    }
  }

  starEarn.innerText = totalStars;
  forkEarn.innerText = totalForks;
  forkRepo.innerText = forked;

  let totalLang = js + ts + html + css + ruby + go + cpp + cSharp + rust + kotlin + py + java + shell + php + ejs + cLang + swift + other;

  let langArray = [
    { name: "JavaScript", times: js },
    { name: "TypeScript", times: ts },
    { name: "HTML", times: html },
    { name: "CSS", times: css },
    { name: "Ruby", times: ruby },
    { name: "Go", times: go },
    { name: "C++", times: cpp },
    { name: "C#", times: cSharp },
    { name: "Rust", times: rust },
    { name: "Kotlin", times: kotlin },
    { name: "Python", times: py },
    { name: "Java", times: java },
    { name: "Shell", times: shell },
    { name: "PHP", times: php },
    { name: "EJS", times: ejs },
    { name: "C", times: cLang },
    { name: "Swift", times: swift },
    { name: "Others", times: other },
  ];

  let langSorted = langArray.toSorted((a, b) => b.times - a.times);

  let langFirst =
    totalLang > 0 ? ((langSorted[0].times / totalLang) * 100).toFixed(1) : 0;
  let langSec =
    totalLang > 0 ? ((langSorted[1].times / totalLang) * 100).toFixed(1) : 0;
  let langThird =
    totalLang > 0 ? ((langSorted[2].times / totalLang) * 100).toFixed(1) : 0;

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

  // for bar ------------------------------------

  let top3Total =
    langSorted[0].times + langSorted[1].times + langSorted[2].times;

  let barWidthF =
    top3Total > 0 ? ((langSorted[0].times / top3Total) * 100).toFixed(1) : 0;
  let barWidthS =
    top3Total > 0 ? ((langSorted[1].times / top3Total) * 100).toFixed(1) : 0;
  let barWidthT =
    top3Total > 0 ? ((langSorted[2].times / top3Total) * 100).toFixed(1) : 0;

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

//function for latest activity  and top repos

const activeStar = (data) => {

  const originalRepos = data.filter(repo => repo.fork === false);

  //'updated_at' is a string from the API (e.g., "2023-10-24T..."). 
  // We must wrap it in new Date() to convert it into a Date object before subtracting for sorting.
  let activeSort = data.toSorted((a, b) => new Date (b.updated_at) - new Date (a.updated_at));

  let starSort = originalRepos.toSorted((a, b) => b.stargazers_count - a.stargazers_count, );

  //  console.log(activeSort.slice(0,4))
  //  console.log("to check ")
  //  console.log(starSort.slice(0,2))
  
  let top3Active = activeSort.slice(0, 3);
  let top3Star = starSort.slice(0, 3);

  // Use .map() to convert each repository object into an HTML string,
  // then .join("") merges all HTML strings into one so it can be inserted into the DOM.
  //I use map() to convert each repository object into an HTML template string. Since map() returns an array of strings,
  //  I use join("") to merge them into a single HTML string before setting innerHTML

  //latest activity
  const recentCard = top3Active.map((repo) => {
      const dateFormatted = new Date(repo.updated_at).toLocaleString(undefined,{dateStyle:"medium",timeStyle:"short"}); // Convert the API date and time into a readable format

      return `<li>
           
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer"
              class="group flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-all cursor-pointer">

              
              <div class="flex flex-col gap-1">
                <span
                  class="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">${repo.name}</span>
                <span class="text-xs text-gray-500 font-medium">${dateFormatted}</span>
              </div>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>

            </a>
          </li> `;
    }).join("");   //.map() converts each item into an HTML string , but becasue that creates an array of separate pieces , we use .join("") to merge them all into one single string so it can be easily inserted into the page.

  recentContainer.innerHTML = recentCard;
   
  let topRepoCard = "";       //declare before if else loops to avoid scope error

  if(top3Star.length === 0 ||top3Star[0].stargazers_count===0){
    topRepoCard=`<li class="flex flex-col items-center justify-center p-5 border border-dashed border-gray-300 rounded-lg bg-gray-50/50">
        <span class="text-xl mb-1">🌟</span>
        <span class="font-medium text-slate-600 text-sm">No starred repositories yet</span>
        <span class="text-xs text-gray-400 mt-1">Keep building and sharing your work!</span>
      </li>`
    
  }else{ topRepoCard = top3Star.map(repo => {
    
    return`<li>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer"
              class="group flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-all cursor-pointer">

              <div class="flex flex-col gap-1">
                <span
                  class="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">${repo.name}</span>
                <span class="text-xs text-gray-500 font-medium">⭐ ${repo.stargazers_count} stars</span>
              </div>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>

            </a>
          </li>`
  }).join("");

 }
  
  topRepoContainer.innerHTML=topRepoCard

};


//################################################################################################################

const allRepo = (data) => {
  
  const printRepo = data.map((repo, index) => {
    
    const displayClass = index >= 8 ? "hidden hidden-repo" : "";

    return `<a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="block group ${displayClass}">
      <div class="bg-white border-2 shadow-gray-800 rounded-2xl shadow-md p-5 transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgb(79,70,229,0.15)] group-hover:border-indigo-300">
        
        <div class="flex justify-between items-start gap-4">
          <div class="flex flex-wrap items-center gap-3">
            <h3 class="font-bold text-xl text-[#116ace] group-hover:text-indigo-700 group-hover:underline decoration-2 underline-offset-4 transition-all">${repo.name}</h3>
            <span class="inline-flex shrink-0 items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 text-gray-600 bg-gray-50">
              Public
            </span>
          </div>
          
          <svg class="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-indigo-600 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </div>

        <p class="mt-3 text-slate-600 font-medium leading-relaxed line-clamp-2">
          ${repo.description ? repo.description : 'No description provided.'}
        </p>
        
        <div class="mt-4 flex items-center">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200">
            <span class="w-2 h-2 rounded-full bg-slate-500"></span>
            ${repo.language ? repo.language : 'Markdown'}
          </span>
        </div>

      </div>
    </a>`;
  }).join("");

  // Safety check ke baad hi HTML insert karo
  if (repoContainer) {
    repoContainer.innerHTML = printRepo;
  }

  if (loadMoreBtn) {
    if (data.length > 8) {
      loadMoreBtn.classList.remove("hidden");
    } else {
      loadMoreBtn.classList.add("hidden");
    }
  }
};

//loadmorebtn event listener
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    
    const hiddenRepos = document.querySelectorAll(".hidden-repo");
    
    for (let i = 0; i < 8 && i < hiddenRepos.length; i++) {
      hiddenRepos[i].classList.remove("hidden", "hidden-repo");
    }

    if (document.querySelectorAll(".hidden-repo").length === 0) {
      loadMoreBtn.classList.add("hidden");
    }
  });
}
