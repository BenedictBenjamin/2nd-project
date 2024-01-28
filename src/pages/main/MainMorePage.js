import React, { useEffect, useState } from "react";
import { SideBar } from "../../components/SideBar";
import { MoreWrap } from "../../styles/main/mainMoreStyle";
import { Pagination } from "antd";
import Layout from "../../layouts/Layout";

const initData = [
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
];

const region = [
  {
    title: "서울특별시",
    list: [
      "종로구",
      "중구",
      "용산구",
      "성동구",
      "광진구",
      "동대문구",
      "중랑구",
      "성북구",
      "강북구",
      "도봉구",
      "노원구",
      "은평구",
      "서대문구",
      "마포구",
      "양천구",
      "강서구",
      "구로구",
      "금천구",
      "영등포구",
      "동작구",
      "관악구",
      "서초구",
      "강남구",
      "송파구",
      "강동구",
    ],
  },
  {
    title: "부산광역시",
    list: [
      "중구",
      "서구",
      "동구",
      "영도구",
      "부산진구",
      "동래구",
      "남구",
      "북구",
      "해운대구",
      "사하구",
      "금정구",
      "강서구",
      "연제구",
      "수영구",
      "사상구",
      "기장군",
    ],
  },
  {
    title: "대구광역시",
    list: [
      "중구",
      "동구",
      "서구",
      "남구",
      "북구",
      "수성구",
      "달서구",
      "달성군",
    ],
  },
  {
    title: "인천광역시",
    list: [
      "중구",
      "동구",
      "미추홀구",
      "연수구",
      "남동구",
      "부평구",
      "계양구",
      "서구",
    ],
  },
  {
    title: "광주광역시",
    list: ["동구", "서구", "남구", "북구", "광산구"],
  },
  {
    title: "대전광역시",
    list: ["동구", "중구", "서구", "유성구", "대덕구"],
  },
  {
    title: "울산광역시",
    list: ["중구", "남구", "동구", "북구"],
  },
];

const MainMorePage = () => {
  // 페이지넘버(페이지네이션)
  const [current, setCurrent] = useState(3);

  const [data, setData] = useState([]);

  const [regionNum, setRegionListNum] = useState(0);

  const onChange = page => {
    setCurrent(page);
    // page 값에 따라 데이터 요청
    // const res = await ...
    // 응답값 data 에 세팅해주기
    // setData(res)
  };

  //추후 초기 값 세팅 필요
  useEffect(() => {}, []);

  return (
    <Layout>
      <SideBar />
      <MoreWrap>
        <div className="header-wrap">
          <div className="header-cate-wrap">
            <div>스마트 워치</div>
            <div>몇개</div>
          </div>
          <div>
            <div className="bt-wrap">
              <div>
                <button>최신순</button>
                <img src="../images/main/line.svg" />
                <button>조회순</button>
              </div>
            </div>
            <div className="region-wrap">
              <select onChange={(e) => {
                console.log(e.target.value)
              }}>
                {region.map((item, index) => {
                  return (
                  <option
                  key={`regionTitle${index}`}>
                    {item.title}
                  </option>
                  )
                })}
              </select>
              <select>
                {region[regionNum].list.map((item, index) => {
                  return (
                    <option
                    key={`regionList${index}`}>
                    {item}
                    </option>
                  )
                })}
                <option>수성구</option>
              </select>
            </div>
          </div>
        </div>
        <div className="main-wrap">
          {initData.map((item, index) => {
            return (
              <div className="item-wrap" key={`MainMore-item-${index}`}>
                <img src={item.image} alt="" />
                <div className="like">
                  <button>
                    <img src="../images/main/like.svg" />
                  </button>
                </div>
                <div className="desc-wrap">
                  <span className="desc-title">{item.title}</span>
                  <hr></hr>
                  <div className="desc-price">{item.price}</div>
                  <div className="desc-ad">{item.address}</div>
                  <div className="view">조회수{item.view}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pagination">
          <Pagination current={current} onChange={onChange} total={100} />
        </div>
      </MoreWrap>
    </Layout>
  );
};

export default MainMorePage;
