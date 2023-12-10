// Ahead the website
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext, useEffect, useState } from 'react';
import { ColorContext } from '../../../ColorContext/darkContext';
import images from '../../../Assets/Images';
import { Configuration, OpenAIApi } from 'openai';

import classes from './navbar.module.scss';


function Navbar({type}) {
    console.log(type);
    const { darkMode, dispatch } = useContext(ColorContext);
    const [title, setTitles] = useState('');

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const apiKey = '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';

    const handleChange = (e) => {
        setInput(e.target.value);
    };
    const configuration = new Configuration({
        apiKey: apiKey,
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
    });
    const openai = new OpenAIApi(configuration);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const completion = await openai.createCompletion({
                model: 'gpt-3.5-turbo',
                prompt: input,
                max_tokens: 100,
            }
            );
            const newMessage = completion.data.choices[0].text.trim();
            console.log(newMessage);
            setMessages([...messages, newMessage]);
            setInput('');
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        switch (type.toLowerCase()) {
            case 'customer':
               setTitles('Quản lý khách hàng');
               break;
            case 'product':
                setTitles('Quản lý sản phẩm');
                break;
            case 'promotion':
                setTitles('Quản lý khuyến mãi');
                break;
            case 'order':
                setTitles('Quản lý đơn hàng');
                break;
            case 'employee':
                setTitles('Quản lý nhân viên');
                break;
            case 'store':
                setTitles("Quản lý cửa hàng");
                break;
            case 'invoice':
                setTitles('Quản lý hóa đơn');
                break;
            case 'guarantee':
                setTitles('Quản lý bảo hành');
                break;
            default:
                setTitles('Quản lý tin tức');
                break;
        }
    }, [type]);

    console.log(title);
    return (
        <div className={classes.navbar}>
            {/* <div className={classes.search}>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Assistant" onChange={handleChange} />
                    <button>Help</button>
                </form>
            </div> */}
            <h1 className={classes.title} >{title}</h1>
            {/* <div>
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div> */}
            <div className={classes.item_lists}>
                {/* <div className={classes.item}>
                    {!darkMode ? (
                        <DarkModeIcon
                            className={classes.item_icon}
                            onClick={() => dispatch({ type: 'TOGGLE' })}
                        />
                    ) : (
                        <LightModeIcon
                            className={classes.item_icon_white}
                            onClick={() => dispatch({ type: 'TOGGLE' })}
                        />
                    )}
                </div> */}
                {/* <div className={classes.item}>
                    <img className={classes.admin_pic} src={images.portrait} alt="admin" />
                </div> */}
            </div>
        </div>
    );
}

export default Navbar;
