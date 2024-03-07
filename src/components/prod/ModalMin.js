import React, { useState } from "react";
import { BT, Detail, MidalCovers } from "../../styles/prod/mdalStylecss";

export const ModalMin = ({ title, deletes, registration, onCloseClick }) => {
  return (
    <MidalCovers>
      <div className="maincover">
        <div>
          <img src="/images/logo.svg" />
        </div>
        {/* <button className="btn-open-modal" onClick={closeMsdal}>
          닫기
        </button> */}
        <div className="modala">
          <div>
            <Detail>
              <h1>{title}</h1>
            </Detail>
            <BT>
              {/* 모달 열림 상태에 따라 모달을 렌더링 */}
              {/* <button className="BtRight" onClick={onCloseClick}>
                {deletes}
              </button> */}
              <button className="BtLeft" onClick={onCloseClick}>
                {registration}
              </button>
            </BT>
          </div>
        </div>
      </div>
    </MidalCovers>
  );
};

export default ModalMin;
