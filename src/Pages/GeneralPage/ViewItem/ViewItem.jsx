import React, { useEffect, useState } from 'react';
import Input from '../../../Components/Input/Input';
import macbook from '../../../Assets/Images/macbook_pro.png';
import Promotion from "../../../Api/Promotion"
import classes from './ViewItem.module.scss';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const ViewNew = ({ inputs, titlee, type }) => {
	const navigate = useNavigate();

	const params = useParams();
	// console.log(params.productId);
	let dynamicInpVal;
	switch (type) {
		case 'CUSTOMER':
			dynamicInpVal = {
				tensanpham: '',
				loaisanpham: '',
				masp: '',
				hinh: '',
				gia: '',
				rom: '',
				mausac: '',
				ram: '',
				chip: '',
				baomat: '',
				chongnuoc: '',
				sac: '',
				dophangiai: '',
				kichthuoc: '',
				camera: '',
				khoiluong: '',
				hedieuhanh: '',
				nguongoc: '',
				chatlieu: '',
				kichthuocmanhinh: '',
				loaiphukien: '',
				congnghe: '',
				congsuat: '',
				baohanh: ''
			};
			break;
		case 'PRODUCT':
			dynamicInpVal = {
				tensanpham: '',
				loaisanpham: '',
				masp: '',
				hinh: '',
				gia: '',
				rom: '',
				mausac: '',
				ram: '',
				chip: '',
				baomat: '',
				chongnuoc: '',
				sac: '',
				dophangiai: '',
				kichthuoc: '',
				camera: '',
				khoiluong: '',
				hedieuhanh: '',
				nguongoc: '',
				chatlieu: '',
				kichthuocmanhinh: '',
				loaiphukien: '',
				congnghe: '',
				congsuat: '',
				baohanh: ''
			};
			break;
		case 'BLOG':
			dynamicInpVal = {
				title: '',
				description: '',
				tags: '',
			};
			break;
		case "PROMOTION":
			dynamicInpVal = {
				makm: '',
				apdung: '',
				phantramkm: '',
				batdau: '',
				ketthuc: '',
				title: '',
				image: '',
				description: '',
				dateSource: '',
				detail: '',
				category: ''
			};
			break;
		case "STORE":
			dynamicInpVal = {
				name: '',
				provinceCode: '',
				districtCode: '',
			};
			break;
		case "INVOICE":
			dynamicInpVal = {
				mahd: '',
				makh: '',
				manv: '',
				ngayxuathd: '',
				tinhtrang: '',
				trigia: '',
				diachigiaohang: '',
				phuongthucthanhtoan: ''
			};
			break;
		default:
			break;
	}
	const [formInp, setFormInp] = useState(dynamicInpVal);
	const GetItemById = (id) => {
		axios.get(`http://localhost:3001/api/product/${id}`)
			.then(response => {
				setFormInp(response.data);
			}
			)
			.catch(error => {
				console.error(error);
			});
	}
	const goBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };

	//PROMOTION
	const batdauFormat = (value) =>{
        const datebd = new Date(value);
        return `${datebd.getDate()}/${datebd.getMonth() + 1}/${datebd.getFullYear()}`;
    }

    const ketthucFormat = (value)=>{
        const datekt = new Date(value);
        return `${datekt.getDate()}/${datekt.getMonth() + 1}/${datekt.getFullYear()}`;
    }
	const GetKMById = (id) => {
		Promotion.getKMByID(id)
		.then((response) => {
			console.log(response)
			response.batdau = batdauFormat(response.batdau);
			response.ketthuc = ketthucFormat(response.ketthuc);
			setFormInp(response);
		})
		.catch((error) => {
			console.error(error);
		});
	};

	// INVOICE
	const GetHoaDonById = (id) => {
		axios
			.get(`http://localhost:3001/api/hoa-don/${id}`)
			.then((response) => {
				setFormInp(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		//console.log(params.productId);
		if (type === "PROMOTION") {
			GetKMById(params.promotionId);
		} else if (type === "INVOICE") {
			GetHoaDonById(params.invoiceId)
		}
		else {
			GetItemById(params.productId);
		}
	}, []);




	return (
		<div className={classes.new_page_main}>
			<div className={classes.add_new_item}>
				<h1>{titlee}</h1>
			</div>
			<div className={classes.new_page_form}>
				{/*<div className={classes.containerImg}>
				<img src={macbook}></img>
				<img src={macbook}></img>
				<img src={macbook}></img>
				<img src={macbook}></img>
</div>*/}
				<form>
					{inputs.map((detail) => (
						<Input
							key={detail.id}
							{...detail}
							value={formInp[detail.name]}

						/>
					))}
					<div className={classes.wrap}>

						<button onClick={(e) => goBack(e)} className={classes.button} >
							Quay lại
						</button>
					</div>
				</form>
			</div>
		</div>


	);
};

export default ViewNew;