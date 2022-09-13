const url = window.location.href;
const obj = new URL(url);

const param = new URLSearchParams(obj.search);
console.log(param);
if(!param.has('q')){
    window.location.href = "index.html";
}
const video_query = param.get('q');

fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q='+video_query+'&type=video&key= AIzaSyBQ-4mVtUew7SUTwJNGCBMIHi9t_8UAMYk')
.then((res) => {
 return res.json();
})
.then((data) => {
    console.log(data);
    const video_list= data.items;
    for(let i=0; i<video_list.length; i++){

        const single_video = video_list[i];
        const title = single_video.snippet.title;
        const channel_name = single_video.snippet.channelTitle;
        const video_description = single_video.snippet.description;
        const thumbnail = single_video.snippet.thumbnails.high.url;
        const upload_date =single_video.snippet.publishedAt;
        const video_id = single_video.id.videoId; 

        const title_elem = document.createElement('h5');
        title_elem.classList.add('card-title');
        title_elem.innerText = title;

        const anchor_elem = document.createElement('a');
        anchor_elem.href = "detail.html?id=" + video_id;
        anchor_elem.appendChild(title_elem);

        const channel_name_elem = document.createElement('h6');
        channel_name_elem.innerText = channel_name;
        

        const description_elem = document.createElement('p');
        description_elem.classList.add('card-text');
        description_elem.innerText = video_description;

        const upload_date_elem = document.createElement('p');
        upload_date_elem.classList.add('card-text');
        upload_date_elem.innerText = upload_date;

        const card_body_div = document.createElement('div');
        card_body_div.classList.add('card-body','text-bg-dark');
        card_body_div.style.maxWidth = "50 px";
        card_body_div.appendChild(anchor_elem);
        card_body_div.appendChild(channel_name_elem);
        card_body_div.appendChild(description_elem);
        card_body_div.appendChild(upload_date_elem);

        const video_detail_div = document.createElement('div');
        video_detail_div.classList.add('col-md-9', 'col-sm-7');
        // to check--------
        video_detail_div.appendChild(card_body_div);

        const image_elem = document.createElement('img');
        image_elem.src = thumbnail;
        image_elem.classList.add('img-fluid', 'rounded-start');
        
        const video_div = document.createElement('div');
        video_div.classList.add('col-md-3','col-sm-5');
        video_div.style.display ="flex";
        video_div.style.alignItems ="centre";
        // video_div.style.background ="#000000"
        video_div.appendChild(image_elem);

        const inner_card = document.createElement('div');
        inner_card.classList.add('row','g-0','bg-light');
        inner_card.appendChild(video_div);
        inner_card.appendChild(video_detail_div);

        const outer_card = document.createElement('div');
        outer_card.classList.add('card');
        outer_card.appendChild(inner_card);

        const row = document.createElement('div');
        row.classList.add('bg-light');
        row.appendChild(outer_card);

        const card_stack = document.getElementById('stack_container');
        card_stack.appendChild(row);


    }

})

{/* <div class="bg-light border">
                <div class="card ">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="..." class="img-fluid rounded-start" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                      </div>
                    </div>
                  </div>
            </div> */}