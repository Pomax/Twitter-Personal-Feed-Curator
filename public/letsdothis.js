let tweetCount = 0;
let tweetCap = 3200;
let pollInterval = 300;
var max_id = false;
var deletelist = [];
var curTimeMarker = false;


let howmany = document.getElementById('howmany');
let deletespace = document.getElementById('delete-them');
let deletebtn = deletespace.querySelector('button');

deletebtn.addEventListener("click", e => {
  deleteEverything();
});

let container = document.getElementById('tweets');
container.innerHTML = "";

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const getDateMarker = (data) => {
  var date = new Date(data.created_at);
  var m = monthNames[date.getMonth()];
  var y = date.getFullYear();
  return  `${m} - ${y}`;
}

const deleteEverything = () => {
  if (confirm("Are you sure you want to delete these tweets?")) {
    const url = `./delete?ids=${ deletelist.join(',') }`;
    // console.log('calling', url);
    fetch(url, { method: 'DELETE' })
    .then(response => response.json())
    .then(json =>  {
      console.log("Yeah these are gone.");
    });

    while(deletelist.length) {
      let id = deletelist.pop();
      let p = document.getElementById(`tweet-${id}`);
      if (p) p.parentNode.removeChild(p);
    };

    checkDeleteButton();
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
  var id = p.id.replace('tweet-','');
  var pos = deletelist.indexOf(id);
  if (pos === -1) { deletelist.push(id) } else { deletelist.splice(pos,1); }
  checkDeleteButton();
}

const makeTweet = data => {
  var marker = getDateMarker(data);
  if (curTimeMarker !== marker) {
    curTimeMarker = marker;
    let h = document.createElement("h2");
    h.textContent = marker;
    container.appendChild(h);
  }

  let p = document.createElement('p');
  let id = data.id_str;
  let pid = `tweet-${id}`;

  // prevent doubles caused by getting "the next set".
  if (document.querySelector(`#${pid}`)) {
    return false;
  }

  // link to the tweet, just in case.
  let a = document.createElement('a');
  a.href = `https://twitter.com/TheRealPomax/status/${id}`;
  a.textContent = 'link ';
  p.appendChild(a);

  // tweet text, because that should be enough to know whether to delete it or not.
  let s = document.createElement('span');
  s.textContent = data.text;
  p.appendChild(s);

  if (!max_id || (max_id && id < max_id)) { max_id = id; }

  p.id = pid;
  p.className = "tweet";
  p.addEventListener("click", evt => toggleDelete(p));
  return p;
};

const getSomeTweets = (andThenDoThis) => {
  var url = './tweets' + (max_id ? `?max_id=${max_id}` : '');
  // console.log("fetching", url);
  fetch(url)
  .then(response => response.json())
  .then(json =>  {
    const list = json;
    if (list.length === 0) return;
    const elements = list.map(makeTweet).filter(v => v);
    elements.forEach(e => container.appendChild(e));
    tweetCount += elements.length;
    howmany.textContent = tweetCount;
    andThenDoThis();
  });
};

(function runagain() {
  if (tweetCount >= tweetCap) return;
  getSomeTweets( () => {
    setTimeout(runagain, pollInterval);
  })
}());
