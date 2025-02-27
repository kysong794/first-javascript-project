const API_KEY=`c41201efd9bd470f867b38d7dd4e53b3`;
let newsList = [];
const getLatestNews = async() => {
    //const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("response", newsList)
}

const render = () => {
    const newsHTML = newsList.map((news) => {
        const summary = news.description
            ? news.description.length > 200                     //200자 이상인가? 참,거짓?
                ? news.description.substring(0, 200) + "..."    //참인경우 서브스트링으로 200자까지만 자르고 그뒤를 ...을 붙임
                : news.description                              //거짓인경우 200자 이하임으로 원본내용 다보여줌
            : "내용없음";                                         //내용이(description) 없을때 

        // 이미지 처리 (없을 경우 기본 이미지)
        const imageUrl = news.urlToImage ? news.urlToImage : "/image/default-image.avif";

        // 출처 처리 (없을 경우 'Unknown source')
        const sourceName = news.source && news.source.name ? news.source.name : "no source";

        const timeAgo = news.publishedAt ? moment(news.publishedAt).fromNow() : "시간 정보 없음";

        return `<div class="row news">
            <div class="col-lg-4">
                <img class="news-img-size" src="${imageUrl}"
                onerror="this.onerror=null; this.src='/image/default-image.avif';"/>
            </div>
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                <p>
                    ${summary}
                </p>
                <div>
                    ${sourceName} * ${timeAgo}
                </div>
            </div>
        </div>`
    }).join('');

    document.getElementById("news-board").innerHTML=newsHTML
}

getLatestNews();

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};
  
const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};
  
