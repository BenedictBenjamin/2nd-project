import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { SideBar } from "../../components/SideBar";
import Mytitle from "../../components/my/Mytitle";
import Layout from "../../layouts/Layout";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ArrowRightOutlined, CalendarOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import koKR from "antd/lib/date-picker/locale/ko_KR";
import DaumPostcode from "react-daum-postcode";
import { postprod } from "../../api/prod/prod_api";
import { Modal } from "../../components/address/Address";
import { BtSection, CancelBt, SaveBt } from "../../styles/join/JoinPageStyle";
import {
  AllWidth,
  BtWrap,
  BtnColor,
  BtnColorSub,
  HashDiv,
  ListDiv,
  PriceDiv,
  ProductImgBt,
  ProductImgMap,
  Resets,
} from "../../styles/prod/productsStyle";
// 오늘 이전날 선택불가
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ModalMin from "../../components/prod/ModalMin";

const btlist = [
  ["스마트워치", "태블릿", "갤럭시", "아이폰"],
  ["노트북", "PC", "마우스", "키보드"],
  ["빔프로젝터", "셋톱박스", "카메라", "캠코더", "DSLR"],
  ["스피커", "이어폰", "헤드폰", "마이크"],
  ["플레이스테이션", "닌텐도", "Wii", "XBOX", "기타"],
];

// 버튼 스타일
const kmStyle = {
  width: "150px",
  height: "50px",
  borderRadius: "10px",
  background: "#2c39b5",
  // border: "none",
  cursor: "pointer",
  color: "#fff",
  fontSize: "22px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  border: "1px solid #2c39b5",
};

// 초기값
const initState = {
  mainPic: "",
  pics: [],
  title: "", //재목(50자 한정)
  contents: "", // 내용 (1500자 제한)

  rentalPrice: "", //임대 가격

  rentalStartDate: "", //임대시작
  rentalEndDate: "", // 임대 종료
  icategory: {
    //카테고리숫자
    mainCategory: "1", //메인카테고리
    subCategory: "1", //하위 카테고리
  },
};

// 검증 코드 yup
const validationSchema = yup.object({
  title: yup
    .string("내용을 입력하세요.")
    .min(2, "2자 이상 입력하세요")
    .max(50, "50자까지만 입력하세요 ")
    .required("제목은 필수 입력 사항입니다."),
  contents: yup
    .string("내용을 입력하세요.")
    .min(2, "2자 이상 입력하세요")
    .max(1500, "1500자까지만 입력하세요 ")
    .required("내용은 필수 입력 사항입니다."),

  rentalPrice: yup
    .string("내용을 입력하세요.")
    .min(3, "100원 이상 입력하세요")

    .required("하루대여 가격은 필수 입력 사항입니다."),

  rentalStartDate: yup
    .string("내용을 입력하세요.")
    .required("거래 시작 날짜는 필수 입력 사항입니다."),
  rentalEndDate: yup
    .string("내용을 입력하세요.")
    .required(" / 거래 종료 날짜는 필수 입력 사항입니다."),

  addr: yup
    .string("내용 입력하세요.")
    .min(2, "주소를 입력하세요")
    .required(" 거래 주소는 필수 입력 사항입니다."),
  restAddr: yup
    .string("내용을 입력하세요.")
    .max(50, "50자까지만 입력하세요 ")
    .required(" 상세 주소는 필수 입력 사항입니다."),

  mainPic: yup
    .string("제품사진을 선택해주세요.")
    .required("제품사진은 최소 1개이상 필수 입력 사항입니다."),
});

const Write = () => {
  const inputStyle = {
    width: "200px",
    height: "50px",
    borderRadius: "10px",
    border: "1px solid #2C39B5",
    flexShrink: 0,
  };
  const inputStyleCalendar = {
    width: "480px",
    height: "53.715px",
    borderRadius: "10px",
    border: "1px solid #2C39B5",
    flexShrink: 0,
    marginBottom: "0px",
  };

  const calendarPopupStyle = {
    marginLeft: "-150px",
  };

  const { register, handleSubmit, formState, setValue } = useForm({
    defaultValues: initState,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const [address, setAddress] = useState("");
  const [restAddress, setRestAddress] = useState("");
  const handleChangeAddress = e => {
    // Yup 관리 (아래의 구문은 yup 으로 관리하려고 하는 것이다.)
    setValue("addr", e.target.value);
  };
  const handleChangeRestAddress = e => {
    setRestAddress("address", e.target.value);
  };

  const navigate = useNavigate();
  // 이미지 모음
  const [fileCount, setFileCount] = useState(0);
  const [imageBefore, setImageBefore] = useState([]);
  const [uploadImgBeforeFile, setUploadImgBeforeFile] = useState(null);
  // 이미지 선택하라는 아이콘 이미지 나오기
  const [uploadImgBefore, setUploadImgBefore] = useState(
    `${process.env.PUBLIC_URL}/images/join/join_img.svg`,
  );
  const [selectCate, setSelectCate] = useState(0);
  const [changebtn, setChangeBtn] = useState(0);
  const [textareaValue, setTextareaValue] = useState("");
  const [textareaValues, setTextareaValues] = useState("");
  const [btData, setBtData] = useState([]);

  // 카테고리
  const [btListPk, setBtListPk] = useState(btlist);

  // 글자수제한
  const [inputValue, setInputValue] = useState("");

  // 주소 검색 모달창
  const [addrModal, setAddrModal] = useState(false);

  // 오늘 이전날 선택불가
  const [selectedDateRangeAll, setSelectedDateRangeAll] = useState(null);

  const handleSelectAddress = data => {
    const selectedAddress = data.address;
    setAddress(selectedAddress);
    setAddrModal(false);
    console.log(address);
  };
  const handleClickButton = () => {
    setAddrModal(true);
  };
  const handleCloseModal = () => {
    setAddrModal(false);
  };

  const handleInputChangs = event => {
    // 최대 50글자까지만 입력을 허용
    const newValue = event.target.value.slice(0, 50);
    setTextareaValues(newValue);
  };

  const handleChangeFileOne = e => {
    const file = e.target.files[0];
    // console.log(file);
    if (file && imageBefore.length < 10) {
      // 미리보기
      const tempUrl = URL.createObjectURL(file);
      // console.log(tempUrl);
      setUploadImgBefore(tempUrl);
      // FB 파일을 보관
      setUploadImgBeforeFile(file); // 파일 1개 추가 끝
      setImageBefore(prevImages => [...prevImages, tempUrl]);
      setFileCount(prev => prev + 1); // 파일 추가 되었어요.
    }
  };

  const [modalImgDelete, setModalImgDelete] = useState(false);

  const removeImgList = _index => {
    // console.log(_index);
    // console.log(fileCount);

    if (fileCount === 1) {
      // alert("상품 대표 이미지는 최소 1개 이상 등록 하셔야 합니다.");
      setModalImgDelete(true);
      return false;
    }

    // // 이지미 파일 1장 삭제 금지 모달창
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [fileCount, setFileCount] = useState(0); // 파일 카운트 상태 추가

    // const removeImgList = _index => {
    //   // console.log(_index);
    //   // console.log(fileCount);
    //   if (fileCount === 1) {
    //     // 파일 카운트가 1이면 모달 열기
    //     setIsModalOpen(true);
    //     return false;
    //   }
    // };

    // const closeModal = () => {
    //   // 모달 닫기 함수
    //   setIsModalOpen(false);
    // };

    const arr = imageBefore.filter((item, index) => index !== _index);
    setImageBefore(arr);
    setFileCount(prev => prev - 1); // 파일 제거 되었어요.
    // 가장 마지막 이미지를 미리보기로 설정
    setUploadImgBefore(arr[arr.length - 1]);
  };
  //버튼 감시자
  useEffect(() => {
    // console.log(imageBefore);
    setValue("mainPic", imageBefore[0]);
    setValue("pics", imageBefore);
  }, [imageBefore]);

  //버튼 클릭시 함수 호출
  const handleChangeBtn = item => {
    // console.log(item);
    setValue("icategory.subCategory", item + 1);
    setChangeBtn(item);
  };
  //주메뉴 서브메뉴 연결설정
  const handleButtonClick = num => {
    setValue("icategory.mainCategory", num + 1);
    setValue("icategory.subCategory", 1);
    // 상태 업데이트
    setSelectCate(num);
    // 주메뉴가 눌려지면 항상 서브메뉴들은 초기화 한다.
    setChangeBtn(0);
  };

  const handleTextareaChange = event => {
    const value = event.target.value;
    setTextareaValue(value);
  };

  const handleInputAction = event => {
    // 최대 1500글자까지만 입력을 허용
    const newValue = event.target.value.slice(0, 1500);
    setInputValue(newValue);
  };

  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const calendarContainerRef = useRef(null);

  const handleDateRangeChange = (dates, dateStrings) => {
    setSelectedDateRange(dates);

    setValue("rentalStartDate", dateStrings[0]);
    setValue("rentalEndDate", dateStrings[1]);
  };
  //카테고리 변화 감시자
  useEffect(() => {
    setBtData(btListPk[selectCate]);
  }, [selectCate]);

  useEffect(() => {
    // setValue("buyDate", "");
  }, []);
  useEffect(() => {
    setBtData(btListPk[selectCate]);
  }, [selectCate]);

  // 확인 버튼 선택시 실행
  const handleSubmitMy = async data => {
    console.log("================== 확인 : ", data);
    console.log("================", restAddress);

    const hashArr = [];

    for (let i = 1; i <= 10; i++) {
      const temp = data["hashTags" + i];
      if (temp !== "") {
        hashArr.push("#" + temp);
      }
    }
    // console.log(hashArr);

    const formData = new FormData();
    const dto = new Blob(
      [
        JSON.stringify({
          title: data.title, //재목(50자 한정)
          contents: data.contents, // 내용 (1500자 제한)
          addr: address, //주소
          restAddr: data.restAddr, // 나머지 주소

          rentalPrice: data.rentalPrice, //임대 가격

          rentalStartDate: data.rentalStartDate, //임대시작
          rentalEndDate: data.rentalEndDate, // 임대 종료
          icategory: {
            //카테고리숫자
            mainCategory: data.icategory.mainCategory, //메인카테고리
            subCategory: data.icategory.subCategory, //하위 카테고리
          },

          hashTags: hashArr,
        }),
      ],
      // JSON 형식으로 설정
      { type: "application/json" },
    );

    formData.append("dto", dto);

    const imagePromises = data.pics.map(async (image, index) => {
      const response = await fetch(image);
      const blob = await response.blob();
      const currentDate = new Date();
      const seconds = Math.floor(currentDate.getTime() / 1000);
      const file = new File([blob], `image${seconds}.jpg`, {
        type: "image/jpeg",
      });
      if (index === 0) {
        formData.append("mainPic", file);
      }
      formData.append("pics", file);
    });
    await Promise.all(imagePromises);
    postprod({ product: formData, successFn, failFn, errorFn });
  };

  const successFn = result => {
    // 성공했을 때 처리
    console.log("success", result);
    navigate("/");
    // navigator(`/details/${result}`);
    // failPostDatas("/");
  };
  const failFn = result => {
    // 실해했을 때 처리 필요
    console.log("failFn", result);
  };
  const errorFn = result => {
    // 오류 발생시 처리 필요
    console.log("errorFn", result);
    // failPostDatas("/");
  };
  const handleReset = () => {
    setSelectedDateRange([]);
    setValue("rentalStartDate", "");
    setValue("rentalEndDate", "");
    setValue("mainPic", "");
    setValue("pics", []);

    setValue("icategory.mainCategory", 0);
    setValue("icategory.subCategory", 0);
    setSelectCate(0);
    setChangeBtn(0);
    setAddress("");
    setRestAddress("");
    setUploadImgBefore(`${process.env.PUBLIC_URL}/images/join/join_img.svg`);
    setImageBefore([]);
  };
  //취소 버튼시 메인으로
  const quest = useNavigate();
  const handleCancel = () => {
    quest(`/`);
  };

  const [catchErr, setCatchErr] = useState(false);
  const handleNotValid = e => {
    setCatchErr(true);
  };
  // 오늘 이전날 선택불가
  const today = moment();
  // 오늘 이전 날짜를 비활성화하는 함수
  const disabledDate = current => {
    return current && current < moment().startOf("day");
  };

  return (
    <Layout>
      {/***** 모달창 */}
      {modalImgDelete ? (
        <ModalMin
          title={"상품 대표 이미지는 최소 1개 이상 등록 하셔야 합니다."}
          deletes={"삭제"}
          registration={"닫기"}
          onCloseClick={() => setModalImgDelete(false)}
        />
      ) : null}
      {/***** 모달창 */}

      <SideBar />
      <AllWidth>
        <div>
          <Mytitle title={"기본 정보"} />
        </div>
        <div>
          <form onSubmit={handleSubmit(handleSubmitMy)}>
            <Resets type="reset" onClick={handleReset}>
              초기화
            </Resets>
            <ListDiv>
              <label htmlFor="img">
                <p>사진</p>
                <p>*</p>
                <span>({imageBefore.length}/10)</span>
              </label>

              <div>
                <div>
                  <ProductImgBt
                    type="button"
                    onClick={() => {
                      document.getElementById("img").click();
                    }}
                  >
                    <img src={uploadImgBefore} alt="" />
                  </ProductImgBt>

                  <div style={{ color: "red" }}>
                    {formState.errors.mainPic?.message}
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onClick={() => {
                    document.getElementById("img").click();
                  }}
                  onChange={event => {
                    handleChangeFileOne(event, "before");
                  }}
                  id="img"
                  style={{ display: "none" }}
                />
              </div>
              <ProductImgMap>
                {imageBefore.map((item, index) => (
                  <div key={index} onClick={() => removeImgList(index)}>
                    <img src={item} alt="" />
                  </div>
                ))}
              </ProductImgMap>
            </ListDiv>

            <ListDiv>
              <div>
                <label htmlFor="product">
                  <p>상품명</p> <p>*</p>
                </label>
              </div>
              <div>
                <div>
                  <input
                    type="text"
                    id="product"
                    maxLength={50}
                    placeholder="상품을 입력해주세요"
                    {...register("title")}
                  />
                  <div style={{ color: "red" }}>
                    {formState.errors.title?.message}
                  </div>
                </div>

                <h2>최대 50자입니다.</h2>
              </div>
            </ListDiv>
            <ListDiv>
              <label>
                <p>카테고리</p> <p>*</p>
              </label>
              <div>
                <BtWrap>
                  <ul>
                    <li>
                      <BtnColor
                        type="button"
                        clickbtn={selectCate === 0}
                        onClick={() => {
                          handleButtonClick(0);
                        }}
                      >
                        스마트기기
                      </BtnColor>
                    </li>
                    <li>
                      <BtnColor
                        type="button"
                        clickbtn={selectCate === 1}
                        onClick={() => {
                          handleButtonClick(1);
                        }}
                      >
                        pc/노트북
                      </BtnColor>
                    </li>
                    <li>
                      <BtnColor
                        type="button"
                        clickbtn={selectCate === 2}
                        onClick={() => {
                          handleButtonClick(2);
                        }}
                      >
                        영상카메라
                      </BtnColor>
                    </li>
                    <li>
                      <BtnColor
                        type="button"
                        clickbtn={selectCate === 3}
                        onClick={() => {
                          handleButtonClick(3);
                        }}
                      >
                        음향
                      </BtnColor>
                    </li>
                    <li>
                      <BtnColor
                        type="button"
                        clickbtn={selectCate === 4}
                        onClick={() => {
                          handleButtonClick(4);
                        }}
                      >
                        게임 기기
                      </BtnColor>
                    </li>
                  </ul>
                </BtWrap>
                <BtWrap>
                  <ul>
                    {btData.map((item, index) => (
                      <li key={index}>
                        <BtnColorSub
                          type="button"
                          clickbtn={changebtn === index}
                          onClick={() => {
                            handleChangeBtn(index);
                          }}
                        >
                          {item}
                        </BtnColorSub>
                      </li>
                    ))}
                  </ul>
                </BtWrap>
              </div>
            </ListDiv>

            <ListDiv direction={"column"}>
              <label htmlFor="detail">
                <p>상품내용</p> <p>*</p>
              </label>
              <div>
                <div>
                  <textarea
                    id="detail"
                    maxLength={1500}
                    {...register("contents")}
                    placeholder="구매시기, 브랜드/모델명, 제품의 상태 (사용감,하자 유무) 등을 입력해 주세요."
                  />

                  <div style={{ color: "red" }}>
                    {formState.errors.contents?.message}
                  </div>
                </div>

                {/* <h2>({textareaValue.length}/1500)</h2> */}
                <h2>최대 1500자입니다.</h2>
              </div>
            </ListDiv>
            <ListDiv>
              <label>
                <p>해시태그</p>
              </label>
              <HashDiv>
                <input
                  type="text"
                  placeholder="태그를작성해주세요"
                  {...register("hashTags1")}
                />

                <input
                  type="text"
                  // onChange={e => handleChangeS(e)}
                  placeholder="태그를작성해주세요"
                  {...register("hashTags2")}
                />

                <input
                  type="text"
                  placeholder="태그를작성해주세요"
                  {...register("hashTags3")}
                />

                <input
                  type="text"
                  placeholder="태그를작성해주세요"
                  {...register("hashTags4")}
                />

                <input
                  type="text"
                  placeholder="태그를작성해주세요"
                  {...register("hashTags5")}
                />

                <input
                  type="text"
                  placeholder="태그를작성해주세요"
                  {...register("hashTags6")}
                />

                <input
                  type="text"
                  placeholder="태그를작성해주세요"
                  {...register("hashTags7")}
                />

                <input
                  type="text"
                  placeholder="#태그를작성해주세요"
                  {...register("hashTags8")}
                />

                <input
                  type="text"
                  placeholder="#태그를작성해주세요"
                  {...register("hashTags9")}
                />

                <input
                  type="text"
                  placeholder="#태그를작성해주세요"
                  {...register("hashTags10")}
                />
              </HashDiv>
            </ListDiv>
            <ListDiv>
              <label>
                <p>가격</p> <p>*</p>
              </label>
              <PriceDiv>
                <div>
                  <div>
                    <input
                      type="number"
                      placeholder="숫자만 입력 가능합니다"
                      {...register("rentalPrice")}
                    />
                    <span>원</span>
                  </div>
                  <div style={{ color: "red" }}>
                    {formState.errors.rentalPrice?.message}
                  </div>
                  <p>1일 대여가격</p>
                </div>
              </PriceDiv>
            </ListDiv>

            <ListDiv>
              <label htmlFor="rentalday">
                <p>거래 가능 날짜</p> <p>*</p>
              </label>
              <div>
                <div
                  ref={calendarContainerRef}
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <DatePicker.RangePicker
                    onChange={handleDateRangeChange}
                    value={selectedDateRange}
                    format="YYYY-MM-DD"
                    style={inputStyleCalendar}
                    placeholder={["시작일", "종료일"]}
                    suffixIcon={
                      <CalendarOutlined style={{ color: "#2C39B5" }} />
                    }
                    popupStyle={calendarPopupStyle}
                    getCalendarContainer={() => calendarContainerRef.current}
                    locale={koKR}
                    separator={
                      <span style={{ color: "#2C39B5", marginLeft: "5px" }}>
                        <ArrowRightOutlined style={{ fontSize: "18px" }} />
                      </span>
                    }
                    defaultValue={today} // 시작일을 오늘 날짜로 설정
                    disabledDate={disabledDate} // 오늘 이전 날짜를 비활성화
                  />

                  <div style={{ color: "red" }}>
                    {formState.errors.rentalStartDate?.message}
                    {formState.errors.rentalEndDate?.message}
                  </div>
                </div>
              </div>
            </ListDiv>
            <ListDiv direction={"column"}>
              <label htmlFor="adress">
                <p>거래 주소</p> <p>*</p>
              </label>
              <div>
                <input
                  type="text"
                  {...register("addr")}
                  value={address}
                  placeholder="주소 검색을 해주세요."
                  onClick={handleClickButton}
                  id="adress"
                  readOnly
                  onChange={handleChangeAddress}
                />

                {catchErr && address === "" && (
                  <div style={{ color: "red" }}>주소를 검색해주세요.</div>
                )}
                {/* 기본 코드  */}
                {/* <div style={{ color: "red" }}>
                  {formState.errors.addr?.message}
                </div> */}

                <input
                  type="text"
                  placeholder="상세 주소를 입력해주세요."
                  {...register("restAddr")}
                  onChange={handleChangeRestAddress}
                />
                {/* <div style={{ color: "red" }}>
                  {formState.errors.restAddr?.message}
                </div> */}

                {addrModal && (
                  <Modal handleClose={handleCloseModal}>
                    <DaumPostcode
                      onComplete={handleSelectAddress}
                      autoClose={false}
                    />
                  </Modal>
                )}
              </div>
            </ListDiv>
            <BtSection>
              <CancelBt onClick={handleCancel}>취소</CancelBt>
              {/* <SaveBt type="submit">저장</SaveBt> */}

              <button type="submit" style={kmStyle}>
                저장
              </button>
              {/* {address && restAddress ? (
                <SaveBt type="submit">저장</SaveBt>
              ) : (
                <SaveBt onClick={handleNotValid}>저장</SaveBt>
              )} */}
            </BtSection>
          </form>
        </div>
      </AllWidth>
    </Layout>
  );
};

export default Write;
