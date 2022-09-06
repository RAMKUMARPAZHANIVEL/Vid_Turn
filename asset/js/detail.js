const url = window.location.href;
const new_obj = new URL(url);
const params = new URLSearchParams(new_obj.search);

console.log(new_obj.search)

if(!params.has('id')){
   window.location.href="index.html";
}
const video_id = params.get('id')

console.log(video_id)

fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&id='+video_id+'&key=AIzaSyBQ-4mVtUew7SUTwJNGCBMIHi9t_8UAMYk')
.then((res) => {
  return res.json()
}).then((data) => {
    console.log(data)
    const video_detail = data.items[0];
    console.log(video_detail.statistics.viewCount)

    const title = video_detail.snippet.title;
    const channel_name = video_detail.snippet.channelTitle;
    const description = video_detail.snippet.description;
    const video_likes = video_detail.statistics.likeCount;
    const video_count = video_detail.statistics.viewCount;
    const iframe_html = video_detail.player.embedHtml;

    document.getElementById('video_title').innerText=title;
    document.getElementById('video_ch').innerText=channel_name;
    document.getElementById('video_description').innerText=description;
    document.getElementById('video_likes').innerText=video_likes;
    document.getElementById('video_views').innerText=video_count;
    document.getElementById('video_iframe').src="https://www.youtube.com/embed/"+video_id;


    add_suggestion();

});

function add_suggestion(){
  fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&key=AIzaSyBQ-4mVtUew7SUTwJNGCBMIHi9t_8UAMYk')
  .then( (res) => {
    return res.json();
  }).then( (data) => {
    
     const suggestion_list = data.items;
     const suggestion_video_container = document.querySelector('#suggestion_container')
     console.log(suggestion_list);
     for (let i = 0; i < suggestion_list.length; i++) {
       const element = suggestion_list[i];
       
       const suggestion_id = element.id.videoId;
       if(element.snippet == undefined){
         continue;
       }
      const suggestion_title = element.snippet.title;
      
      const suggestion_thumbnail = element.snippet.thumbnails.high.url;
      
      const title_elem = document.createElement('h5');
      title_elem.innerText = suggestion_title;
      title_elem.classList.add('card-body')

      const anchor_elem = document.createElement('a');
      anchor_elem.appendChild(title_elem);
      anchor_elem.href = `detail.html?id=${suggestion_id}`;
      
      const div_elem = document.createElement('div')
      div_elem.appendChild(anchor_elem);

      const thumbnail_elem = document.createElement('img');
      thumbnail_elem.classList.add('card-img-top')
      thumbnail_elem.src =suggestion_thumbnail;
        

      const div_elem_1 = document.createElement('div');
      div_elem_1.classList.add('card');
      div_elem_1.appendChild(thumbnail_elem);
      div_elem_1.appendChild(div_elem);
       div_elem_1.style.minWidth = '18rem';
       div_elem_1.style.maxWidth = '18rem';
       div_elem_1.style.display = 'flex';
       div_elem_1.style.alignItems = 'flex-start'
     

      suggestion_video_container.appendChild(div_elem_1)

      console.log(suggestion_list)
     }
     
  })
}

{/* <div class="card" style="min-width: 18rem;">
                
                
 </div> */}