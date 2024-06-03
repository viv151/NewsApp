import {React, useState, useEffect} from 'react';
import { Select, Typography, Row, Col, Avatar, Card} from 'antd';
// import Loader from './components/Loader';
import moment from 'moment';
import './App.css';

const {Text, Title} = Typography;
const {Option} = Select;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';


const apiKey = '97f65e73a864488e9d391a0d097ef6c9';

const News = () => {
  const [newsCategory, setNewsCategory] = useState('top-headlines');
  // const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory});
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`https://newsapi.org/v2/${newsCategory}?country=us&apiKey=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch news');
                }
                const data = await response.json();
                setArticles(data.articles);
                console.log(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchNews();
    }, []);

    if (error) {
        return <div className="error-message">Failed to fetch news. Please try again later.</div>;
    }

    return (
     <>
      <Title className='news-title' level={1}>News</Title>
        <Row gutter={[24, 24]}>
          
         {/* <Col span={24}>
           <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {articles?.map((currency, i) => <Option value={currency.name} key={i}>{currency.name}</Option>)}
          </Select>
        </Col> */}
{articles?.map((news, i) =>(news.author && (
        <Col xs={24} sm={12} lg={8} key={i}>
            <Card className='news-card' hoverable >
              <a href={news?.url} target='_blank' rel='noreferrer'>
                <div className="news-image-container">
                  <Title className='news-title' level={4}>{news.title}</Title>
                  <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news.urlToImage || demoImage} alt='news'/>
                </div>
                <p>
                  {news.content > 100 
                  ? `${news.content?.substring(0, 100)}...`
                  : news.content
                  }
                </p>
                <div className="provider-container">
                  <div>
                    <Text className='provider-name'>{news.author}</Text>
                  </div>
                   <Text>{moment(news.publishedAt).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card> 
        </Col>
      ))).slice(0, 10)}
   </Row>
     </>
    );
};

export default News;
