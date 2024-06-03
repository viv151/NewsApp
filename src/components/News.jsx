import {React, useState, useEffect} from 'react';
import { Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';
const {Text, Title} = Typography;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';


const apiKey = '97f65e73a864488e9d391a0d097ef6c9';

const News = () => {
  const [newsCategory, setNewsCategory] = useState('top-headlines');
  // const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory});
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchNews = async () => {
            //checking for response
            try {
                const response = await fetch(`https://newsapi.org/v2/${newsCategory}?country=us&apiKey=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch news');
                }
                const data = await response.json();
                setArticles(data.articles);
                // console.log(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchNews();
    }, []);
    //check for error
    if (error) {
        return <div className="error-message">Failed to fetch news. Please try again later.</div>;
    }
    return (
     <>
      <Title className='news-title' level={1}>Top Headlines</Title>
        <Row gutter={[24, 24]}>
        {articles?.map((news, i) =>(news.author && (
        <Col xs={24} sm={12} lg={8} key={i}>
            <Card className='news-card' hoverable >
              <a href={news?.url} target='_blank' rel='noreferrer'>
                <div className="news-image-container">
                  <Title className='news-title' level={4}>{news.title}</Title>
                  <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news.urlToImage || demoImage} alt='news'/>
                </div>
                <p>
                    {/* shortens the description of news */}
                  {news.content > 100 
                  ? `${news.content?.substring(0, 100)}...`
                  : news.content
                  }
                </p>
                <div className="provider-container">
                  <div>
                    <Text className='provider-name'>{news.author}</Text>
                  </div>
                  {/* Date when the article was published */}
                   <Text>{moment(news.publishedAt).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card> 
        </Col>
      ))).slice(0, 12)}
   </Row>
     </>
    );
};

export default News;
