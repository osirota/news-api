
class NewsService {
    constructor() {
        this._apiKey = 'cc62f6168b594fae8a8fb3f289983a16';
        this.api = 'https://newsapi.org/v2/top-headlines?q=trump&apiKey=cc62f6168b594fae8a8fb3f289983a16'
    }

    async getResourse(pageSize) {
        const res = await fetch(`https://newsapi.org/v2/top-headlines?country=ua&pageSize=${pageSize}&apiKey=${this._apiKey}`);

        if(!res.ok) {
            throw new Error('!!error')
        }

        return await res.json();
    }

    async getLastesNews(pageSize = 5) {
        const news = await this.getResourse(pageSize);
        return news
    }
}


export default NewsService