const API_KEY = `c41201efd9bd470f867b38d7dd4e53b3`;
let newsList = [];
let currentCategory = "";   // 현재 선택된 카테고리 저장 카테1
const newsBoard = document.getElementById("news-board");
const searchInput = document.getElementById("search-input");
const menus = document.querySelectorAll(".menus button");

// 공통 URL 생성 함수
const createNewsURL = (params = {}) => {
    const baseUrl = "https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr";
    const queryString = new URLSearchParams(params).toString();
    return `${baseUrl}&${queryString}`;
};

// 공통 API 호출 함수
const fetchNews = async (params = {}) => {
    try {
        const url = createNewsURL(params);
        const response = await fetch(url);

        // 응답 코드가 200이 !아닐 경우 에러 처리
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // API 데이터가 없을 경우 메시지 표시
        if (!data.articles || data.articles.length === 0) {
            newsList = [];
            renderNoResults();
            return;
        }

        newsList = data.articles;
        render();
    } catch (error) {
        console.error("뉴스 데이터를 불러오는 중 오류 발생:", error);
        renderError(error.message);
    }
};

// 검색 결과가 없을 때 메시지 표시, style 가운데정렬 추가
const renderNoResults = () => {
    newsBoard.innerHTML = `<div class="alert alert-danger" role="alert" style="text-align:center;">No matches for your search</div>`;
};

// 에러 발생 시 메시지 표시 (HTTP 응답 코드 포함)
const renderError = (message) => {
    newsBoard.innerHTML = `<div class="alert alert-danger" role="alert" style="text-align:center;">${message}</div>`;
};

// 최신 뉴스 불러오기
const getLatestNews = () => {
    currentCategory = ""; // 카테고리 초기화 카테2
    fetchNews();
};

// 카테고리별 뉴스 불러오기
const getNewsByCategory = (event) => {
    currentCategory = event.target.textContent.toLowerCase(); // 현재 선택된 카테고리 저장 카테3
    fetchNews({ category: currentCategory });
};

// 검색 기능 (엔터 키 지원 + 검색어 없을 때 알람)
const searchNews = () => {
    const keyword = searchInput.value.trim();
    
    if (!keyword) {
        alert("검색어를 입력하세요!");
        return;
    }
    
    // 현재 선택된 카테고리가 있으면 해당 카테고리에서 검색, 없으면 전체 검색 카테4
    const params = { q: keyword };
    if (currentCategory) {
        params.category = currentCategory;
    }

    fetchNews(params);
};

// 검색 버튼 클릭 이벤트 추가
document.querySelector(".search-button").addEventListener("click", searchNews);

// 엔터 기능 추가
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchNews();
    }
});

// UI 렌더링 함수
const render = () => {
    newsBoard.innerHTML = newsList.map(news => {
        // 200자 이상이면 잘라서 "..." 추가
        const summary = news.description
            ? (news.description.length > 200 ? news.description.substring(0, 200) + "..." : news.description)
            : "내용 없음";

        // 이미지 없을 경우 기본 이미지 설정
        const imageUrl = news.urlToImage ? news.urlToImage : "/image/default-image.avif";

        // 출처 없을 경우 기본값 설정
        const sourceName = news.source && news.source.name ? news.source.name : "No source";

        // 시간 정보 없을 경우 기본값 설정
        const timeAgo = news.publishedAt ? moment(news.publishedAt).fromNow() : "시간 정보 없음";

        return `
            <div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src="${imageUrl}" 
                    onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';"/>
                </div>
                <div class="col-lg-8">
                    <h2>${news.title}</h2>
                    <p>${summary}</p>
                    <div>${sourceName} * ${timeAgo}</div>
                </div>
            </div>`;
    }).join('');
};

// 이벤트 리스너 등록
menus.forEach(menu => menu.addEventListener("click", getNewsByCategory));

// 초기 뉴스 로드
getLatestNews();

// 햄버거 메뉴 열기 / 닫기
const openNav = () => (document.getElementById("mySidenav").style.width = "250px");
const closeNav = () => (document.getElementById("mySidenav").style.width = "0");

//검색창 토글
const openSearchBox = () => {
    searchInput.parentElement.style.display = searchInput.parentElement.style.display === "inline" ? "none" : "inline";
};