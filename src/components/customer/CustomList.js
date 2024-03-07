import React, { useState } from "react";
import { MYListDivs, MyListDiv } from "../../styles/my/MyList";
import styled from "@emotion/styled";
import { Common } from "../../styles/CommonStyles";
import MyMoreButton from "../my/MyMoreButton";

const CustomTxt = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  height: 6rem;
  border-bottom: 1px solid ${Common.color.primary};
  span {
    font-size: 1.4rem;
  }
  p {
    font-size: 1.4rem;
  }
  cursor: pointer;
`;
export const CustomSlide = styled.div`
  overflow: hidden;
  max-height: ${props => (props.isopen ? "500px" : "0")};
  transition: max-height 0.5s ease-in-out;
  box-sizing: border-box;
  border-bottom: ${props =>
    props.isopen ? `1px solid ${Common.color.primary}` : "0"};
  dt {
    font-size: 1.4rem;
    padding: 1rem;
    white-space: pre-wrap;
  }
`;
const CustomBottom = styled.div`
  margin-top: 2rem;
`;

const contentData = [
  {
    id: 1,
    title: <h1 style={{ color: "#2C39B5" }}>거래</h1>,
    content: <h3>대여방법 어떻게 되나요</h3>,
    description: (
      <p style={{ fontFamily: "Nanum+Myeongjo" }}>
        - 대여 방법: 희망하는 거래 날짜를 선택하고 결제한 후, 판매자와 채팅으로
        약속 시간을 정한 뒤 거래장소에서 만나서 식별코드를 찍으면 물건을 대여할
        수 있습니다.
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        - 반납 방법: 판매자와 채팅으로 시간을 정한 뒤 거래장소에서 만나서
        식별코드를 찍고 물건을 반납하면 됩니다.
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />- 상품 등록:
        상품을 등록하려면 로그인한 후에 상품 등록 버튼을 클릭하고, 상품 정보를
        입력한 후에 등록하시면 됩니다.
        <span style={{ display: `block`, margin: `0 9px 0 0` }} />
      </p>
    ),
  },
  {
    id: 2,
    title: <h1 style={{ color: "#2C39B5" }}>결제</h1>,
    content: <h3> 취소, 환불 어떻게 하나요</h3>,
    description: (
      <p>
        - 결제 방법: 원하는 거래 날짜를 선택한 후 &quot;결제하기&quot; 버튼을
        클릭하고,결제 수단을 선택하여 결제하면 됩니다.
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />- 결제 취소
        및 환불: 마이 페이지의 &#39;예약 내역&#39;에서 대여가 시작되지 않은
        상품들은 결제 취소가 가능합니다. 결제 취소를 원하는 경우, 해당 예약
        내역을 찾아 취소 옵션을 선택하면 간단한 절차를 통해 예약을 취소하고 환불
        처리를 진행할 수 있습니다.
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <span style={{ color: "#2C39B5" }}>
          ※ 환불 상세 내용은 아래와 같습니다 ※
        </span>
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <span style={{ color: "#2C39B5" }}>- 당일 ~ 3일 남을 때: </span>전체
        대여금은 환불되지 않습니다.
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <span style={{ color: "#2C39B5" }}>- 4일 ~ 7일 남을 때:</span> 대여금의
        50%가 환불됩니다.
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <span style={{ color: "#2C39B5" }}>- 7일 이상 남을 경우:</span> 무료로
        예약을 취소할 수 있습니다.
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <p style={{ color: "#E11F1F" }}>
          ※ 대여가 이미 시작된 경우에는 정책에 따라 결제 취소가 제한될 수
          있습니다. ※
        </p>
        <span style={{ display: `block`, margin: `0 9px 0 0` }} />
      </p>
    ),
  },
  {
    id: 3,
    title: <h1 style={{ color: "#2C39B5" }}>예약</h1>,
    content: <h3> 취소방법 어떻게 하나요</h3>,
    description: (
      <p>
        - 예약 방법: 상품 상세 페이지에서 구매자는 편리하게 희망하는 거래 날짜를
        선택하고 원하는 옵션을 결제 페이지에서 확인한 후 결제를 진행합니다.
        예약이 완료되면, 구매자는 마이 페이지의 &#39;예약 내역&#39;에서 손쉽게
        예약 정보를 확인할 수 있습니다. 이를 통해 언제든지 거래 일정을 확인하고
        관리할 수 있습니다.
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />- 예약 취소:
        마이 페이지의 &#39;예약 내역&#39;에서 대여가 시작되지 않은 상품들은 예약
        취소가 가능합니다. 예약 취소를 원하는 경우, 해당 예약 내역을 찾아 취소
        옵션을 선택하면 간단한 절차를 통해 예약을 취소할 수 있습니다.
        <p style={{ color: "#E11F1F" }}>
          ※ 대여가 이미 시작된 경우에는 정책에 따라 예약 취소가 제한될 수
          있습니다. ※
        </p>
        <span style={{ display: `block`, margin: `0 9px 0 0` }} />
      </p>
    ),
  },
  {
    id: 4,
    title: <h1 style={{ color: "#2C39B5" }}>신고</h1>,
    content: <h3>신고는 어떻게 해야 되나요?</h3>,
    description: (
      <p>
        <span style={{ display: `block`, margin: `10px 15px 0 0` }}></span>-
        예약 방법: 상품 상세 페이지에서 구매자는 편리하게 희망하는 거래 날짜를
        선택하고 원하는 옵션을 결제 페이지에서 확인한 후 결제를 진행합니다.
        예약이 완료되면, 구매자는 마이 페이지의 &#39;예약 내역&#39;에서 손쉽게
        예약 정보를 확인할 수 있습니다. 이를 통해 언제든지 거래 일정을 확인하고
        관리할 수 있습니다.
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        예약 취소: 마이 페이지의 &#39;예약 내역&#39;에서 대여가 시작되지 않은
        상품들은 예약 취소가 가능합니다. 예약 취소를 원하는 경우, 해당 예약
        내역을 찾아 취소 옵션을 선택하면 간단한 절차를 통해 예약을 취소할 수
        있습니다.
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <span style={{ color: "#E11F1F" }}>
          ※ 대여가 이미 시작된 경우에는 정책에 따라 예약 취소가 제한될 수
          있습니다. ※
        </span>
        <span style={{ display: `block`, margin: `0 9px 0 0` }} />
      </p>
    ),
  },
  {
    id: 5,
    title: <h1 style={{ color: "#2C39B5" }}>기타</h1>,
    content: <h3>알려주세요 </h3>,
    description: (
      <p>
        <span style={{ display: `block`, margin: `8px px 0 0` }} />- ID 찾기:
        회원 아이디를 잊어버리셨다면, 메인 페이지 -&gt; 로그인 -&gt; 아이디 찾기
        페이지에서 회원 가입 시 등록한 정보(예: 이메일 주소, 휴대전화 번호)를
        입력하시면, 등록된 정보와 일치하는 회원 아이디를 확인하실 수 있습니다.
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        - 회원 가입: 회원 가입 시에는 사용자의 개인 정보를 안전하게 관리하기
        위해 모든 필수 항목을 정확하게 기입하셔야 합니다. 또한, 회원의 안전한
        이용을 위해 본인인증을 꼭 완료해주셔야 합니다. 회원 가입이 성공적으로
        완료되면, 등록된 아이디와 비밀번호를 입력하여 로그인이 가능해집니다.
        로그인 후에는 마이 페이지의 회원정보 수정을 통해 추가 정보를 입력하거나
        프로필을 수정할 수 있습니다.
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />- 회원 탈퇴:
        탈퇴 시에는 로그인 후 마이 페이지에서 회원탈퇴를 선택하여 간단하게
        탈퇴를 진행할 수 있습니다.
        <span style={{ display: `block`, margin: `8px 8px 0 0` }} />
        <span style={{ color: "#E11F1F" }}>
          ※ 주의사항: 만약 아직 처리되지 않은 거래가 남아있는 경우에는 탈퇴를
          진행할 수 없습니다. 탈퇴 전에 이러한 사항을 확인하시기 바랍니다. ※
        </span>
        <span style={{ display: `block`, margin: `0 9px 0 0` }} />
      </p>
    ),
  },
  {
    id: 6,
    title: <h1 style={{ color: "#2C39B5" }}>고객센터</h1>,
    content: <h3>고객센터 전화번호와 운영시간을 알려주세요</h3>,
    description: (
      <p>
        <span style={{ display: `block`, margin: `7px px 0 0` }} />
        <h1 style={{ color: "#2C39B5" }}>
          빌리 고객센터 전화번호 1803-3124 입니다.
          <span style={{ display: `block`, margin: `7px 7px 0 0` }} />
        </h1>

        <h2>
          <span style={{ display: `block`, margin: `7px 7px 0 0` }} />
          <h3 style={{ color: "#AEAEB3" }}>[운영시간]</h3>
        </h2>
        <h3 style={{ color: "#AEAEB3" }}>
          월 ~ 금요일 09:00 ~ 18:00 주말, 공휴일 휴무
          <span style={{ display: `block`, margin: `0 9px 0 0` }} />
        </h3>
      </p>
    ),
  },
];

const CustomList = () => {
  const [slideDownUp, setSlidDownUp] = useState(contentData.map(() => false));

  const handleSlideDownToggle = index => {
    const newSlideDownUp = [...slideDownUp];
    newSlideDownUp[index] = !newSlideDownUp[index];
    setSlidDownUp(newSlideDownUp);
  };

  return (
    <MYListDivs>
      {contentData.map((item, index) => (
        <div key={item.id}>
          <CustomTxt onClick={() => handleSlideDownToggle(index)}>
            <span>{item.title}</span>
            <p>{item.content}</p>
          </CustomTxt>
          <CustomSlide isopen={slideDownUp[index]}>
            <dt>{item.description}</dt>
          </CustomSlide>
        </div>
      ))}
    </MYListDivs>
  );
};

export default CustomList;
