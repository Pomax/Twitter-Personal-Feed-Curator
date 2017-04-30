let tweetCount = 0;
let tweetCap = 3200;
var max_id = false;
var deletelist = [];

let howmany = document.getElementById('howmany');
let deletespace = document.getElementById('delete-them');
let deletebtn = deletespace.querySelector('button');

deletebtn.addEventListener("click", e => {
  deleteEverything();
});

let container = document.getElementById('tweets');
container.innerHTML = "";

const deleteEverything = () => {
  if (confirm("Are you sure you want to delete these tweets?")) {
    const url = `./delete?ids=${ deletelist.join(',') }`;
    console.log('calling', url);
    fetch(url)
    .then(response => response.json())
    .then(json =>  {
      console.log("if this was implemented, these tweets would now be gone.");
    });
  }
};

const checkDeleteButton = () => {
  if (deletelist.length === 0) {
    deletespace.classList.add('hidden');
  } else {
    deletespace.classList.remove('hidden');
  }
};

const toggleDelete = p => {
  p.classList.toggle("delete");
  var id = parseInt(p.id.replace('tweet-',''))
  var pos = deletelist.indexOf(id);
  if (pos === -1) { deletelist.push(id) } else { deletelist.splice(pos,1); }
  checkDeleteButton();
}

const makeTweet = e => {
  let p = document.createElement('p');
  let s = document.createElement('span');
  s.textContent = e.text;
  p.appendChild(s);
  let id = parseInt(e.id);
  if (!max_id || (max_id && id < max_id)) { max_id = id; } 
  p.id = `tweet-${id}`;
  p.className = "tweet";
  p.addEventListener("click", evt => toggleDelete(p));
  return p;
};

const getSomeTweets = () => {
  var url = './tweets' + (max_id ? `?max_id=${max_id}` : '');
  console.log("fetching", url);
  fetch(url)
  .then(response => response.json())
  .then(json =>  {
    const list = json;
    const elements = list.map(makeTweet);
    elements.forEach(e => container.appendChild(e));
    tweetCount += elements.length;
    howmany.textContent = tweetCount;
  });
};

(function runagain() {
  if (tweetCount >= tweetCap) return;
  getSomeTweets();
  setTimeout(runagain, 3000);
}());