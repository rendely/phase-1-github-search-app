window.addEventListener('DOMContentLoaded',()=>{
  console.log('DOM ready');
  searchForm = document.querySelector('form');
  searchQuery = searchForm.search;
  userList = document.querySelector('#user-list');
  reposList = document.querySelector('#repos-list');
  setupSearch();
})

function searchNames(name='octocat'){
  fetch(`https://api.github.com/search/users?q=${name}`)
  .then(r => r.json()
  .then(d => {
    userList.innerHTML = '';
    d.items.forEach(showNameResult);
  }))
}

function setupSearch(){
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchNames(searchQuery.value);
  })
}

function showNameResult(item){
  console.log(item);
  const result = document.createElement('li');
  result.innerText = item.login;
  userList.appendChild(result);
  result.addEventListener('click',clickName(item.login));

}
function clickName(login){
  return function(){
    console.log('You clicked', login);
    searchRepos(login);
  }
}

function searchRepos(login){
  fetch(`https://api.github.com/users/${login}/repos`)
  .then(r => r.json()
  .then(d => {
    reposList.innerHTML = '';
    console.log(d);
    d.forEach(showRepoResult)
  }))
}

function showRepoResult(repo){
  console.log(repo.name);
  const result = document.createElement('li');
  result.innerText = repo.name;
  reposList.appendChild(result);
}