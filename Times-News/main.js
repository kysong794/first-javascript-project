const API_KEY=`c41201efd9bd470f867b38d7dd4e53b3`;

const getLatestNews = async() => {
    //const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
    const response = await fetch(url);
    const data = await response.json();
    let news = data.articles;
    console.log("response", news)
}

getLatestNews();