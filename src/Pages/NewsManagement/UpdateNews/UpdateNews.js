import React, { useState, useRef, useEffect } from "react";
import styles from "./UpdateNews.module.scss";
import './UpdateNews.css'
import Swal from "sweetalert2";
import { Box } from "@mui/system";
import { Button, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import api from '../../../Api/NewsApi'
import JoditEditor from 'jodit-react';
import { useMemo } from "react";
import Sidebar from "../../../Components/Bar/Sidebar/Sidebar";
import Navbar from "../../../Components/Bar/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";


function UpdateNews() {
  const navigate = useNavigate();
  const {slug} = useParams();

  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [dateSource, setDateSource] = useState();
  const [category, setCategory] = useState('');
  const [detail, setDetail] = useState('');

  useEffect(() => {
    api.getNewsById(slug).then(result => {
      setImage(result.image)
      setTitle(result.title)
      setCategory(result.category)
      setDetail(result.detail)
      setDescription(result.description)
      setDateSource(result.dateSource)
    })
  }, [slug])

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      uploader: { insertImageAsBase64URI: true },
      removeButtons: ["brush", "file"],
      showXPathInStatusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
    }),
    []
  );

  const inputId = [
    "image",
    "title",
    "dateSource",
  ];

  const useStateEvent = [
    setImage,
    setTitle,
    setDateSource,
  ];

  const placeHolder = [
    "Nhập link ảnh",
    "Nhập tiêu đề",
    "Nhập ngày đăng",
  ];

  const textValue = [
    "Link ảnh",
    "Tiêu đề",
    "Ngày đăng",
  ];

  const inputValue = [
    image,
    title,
    dateSource
  ]

  const inputType = ["text", "text", "text"]

  // object data
  const data = {
    image: image,
    title: title,
    description: description,
    dateSource: dateSource,
    category: category,
    detail: detail,
  };



  const handleBlur = (e) => {
    if (e.target.value === "") {
      e.target.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "#000";
    }
  };


  const handleUpdatePost = async (e) => {
    e.preventDefault();
    api.updateNews(slug, data)
      .then(async (res) => {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Cập nhật dữ liệu thành công!",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/news")
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.add_new}>
      <Sidebar />

      <div className={styles.new_page}>
        <Navbar type={'news'} />

        <div className={styles.new_page_main}>
          <div className={styles.bPopup}>
            <h3>Cập nhật tin tức</h3>
            <br />
            <Box sx={{ flexGrow: 1, overflow: "scroll" }}>
              <form onSubmit={handleUpdatePost}>
                  {inputId.map((item, index) => (
                    <div key={index}>
                      <label htmlFor={item[index]} className={styles.label}>
                        {textValue[index]}
                      </label>
                      <br />
                      <input
                        id={item[index]}
                        name={item[index]}
                        type={inputType[index]}
                        value={inputValue[index]}
                        required
                        placeholder={placeHolder[index]}
                        onChange={(e) =>
                          useStateEvent[index](
                            e.target.value
                          )
                        }
                        onBlur={handleBlur}
                      />
                    </div>
                  ))}
                  <label htmlFor={"description"} className={styles.label}>
                        Mô tả
                  </label>
                  <br />
                  <textarea
                        id={"description"}
                        name={"Mô tả"}
                        type={"text"}
                        value={description}
                        required
                        placeholder={"Nhập mô tả"}
                        onChange={(e) =>
                          setDescription(
                            e.target.value
                          )
                        }
                        onBlur={handleBlur}
                      />
                    <FormControl fullWidth size="small" >
                      <InputLabel id="demo-simple-select-label">Loại tin tức</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Phân loại"
                        onChange={handleChange}
                      >
                        <MenuItem value={"appleNews"}>Tin tức Apple</MenuItem>
                        <MenuItem value={"review"}>Bài viết Review</MenuItem>
                        <MenuItem value={"explore"}>Khám phá</MenuItem>
                        <MenuItem value={"trick"}>Thủ thuật</MenuItem>
                        <MenuItem value={"other"}>Tin khác</MenuItem>
                      </Select>
                    </FormControl>
                    <label className={styles.label}>Chi tiết</label>
                    <div className={styles.editor}>
                      <JoditEditor
                        ref={editor}
                        value={detail}
                        config={config}
                        tabIndex={999} // tabIndex of textarea
                        onChange={newContent => {
                          setDetail(newContent)
                        }}
                      />
                    </div>
                <div className={styles.btn}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    sx={{
                      fontSize: "14px",
                      width: "160px",
                      margin: "24px 0 0"
                    }}
                    type={"submit"}
                  onClick={handleUpdatePost}
                  >
                    Cập nhật dữ liệu
                  </Button>
                  <Button
                variant="contained"
                color="error"
                size="large"
                sx={{
                  fontSize: "14px",
                  width: "100px",
                  margin: "24px 36px 0 20px"
                }}
                onClick={() => navigate("/news")}
              >
                Hủy
              </Button>
                </div>
              </form>
            </Box>
          </div>

        </div>
      </div>
    </div>

  );
}

export default UpdateNews;