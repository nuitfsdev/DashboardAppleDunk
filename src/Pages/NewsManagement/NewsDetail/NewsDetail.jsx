/* eslint-disable react/no-array-index-key */
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React, { useEffect, useState } from 'react';
import classes from './NewsDetail.module.scss';
import { useParams } from 'react-router-dom'
import api from '../../../Api/NewsApi'
import parse from "html-react-parser"
import Sidebar from '../../../Components/Bar/Sidebar/Sidebar';
import Navbar from '../../../Components/Bar/Navbar/Navbar';


function NewsDetail() {
    const [news, setNews] = useState();
    const { slug } = useParams();

    useEffect(() => {
        api.getNewsById(slug).then(result => setNews(result))
    }, [slug])



    return (
        <div className={classes.blog_details}>
            <Sidebar />

            <div className={classes.detail_page_main}>
                <Navbar type={'news'} />

                <div className={classes.blog_detailss}>
                    <h1>{news?.title}</h1>

                    <img src={news?.image} alt="Travel blogs" className={classes.blog_detail_img} />

                    <div className={classes.blog_detail_tv}>
                        <p>
                            <CalendarMonthIcon style={{ marginRight: '3px' }} />
                            {news?.dateSource}
                        </p>
                    </div>

                    {news && <div className={classes.detail}>{parse(news.detail)}</div>}

                    <div className={classes.tags}>
                        <h3>Category:</h3>
                        <span className={classes.blog_detail_tag}>
                            {news?.category}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsDetail;
