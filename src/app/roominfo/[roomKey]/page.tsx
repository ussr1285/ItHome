"use client";
import { Post } from "@/@type/Type";
import { DialogContent } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { FetchReportPost } from "@shared/components/FetchList/FetchList";
import DropBoxSelect from "@shared/components/Input/DropBoxSelect";
import { KakaoMap } from "@shared/components/Map/Map";
import { DialogForm, ShareDialog } from "@shared/components/Popup/Popup";
import { RoomDetail, RoomHost, RoomPrice } from "@shared/components/RoomInfo";
import { SubletPostStore } from "@store/SubletPostStore";
import { useUserInfoStore } from "@store/UserInfoStore";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
export default function RoomInfo() {
  // 새 창에서 열릴 때 props를 못 받아와서, zustand의 전역 저장소를 사용한다.
  const { roomKey } = useParams<{ roomKey: string }>();
  const nowRoomNum = Number(roomKey);

  const [nowRoomPost, setNowRoomPost] = useState<Post | undefined>(undefined);
  const [sharePopUpState, setSharePopUpState] = useState(false);
  const [reportPopUpState, setReportPopUpState] = useState(false);
  const [reportType, setReportType] = useState("");
  const { postExist, postAll } = SubletPostStore();
  const { asyncGetPostAll } = SubletPostStore();

  useEffect(() => {
    if (!postExist) {
      asyncGetPostAll();
    }
    setNowRoomPost(postAll.find((post) => post.key === nowRoomNum));
  }, [postExist, postAll, nowRoomNum, asyncGetPostAll]);

  const { userInfo } = useUserInfoStore();

  const handleReportTypeState = (event: SelectChangeEvent<string>) => {
    setReportType(event.target.value);
  };

  const handleReportPopUpState = () => {
    setReportPopUpState(false);
  };

  const handleSharePopUpState = () => {
    setSharePopUpState(false);
  };
  return (
    <div
      style={{
        fontFamily: "Pretendard",
      }}
    >
      <div className="max-w-xl mx-auto">
        {postExist && (
          <Carousel className="w-full" style={{ height: "420px" }}>
            {postAll
              .find((post) => post.key == nowRoomNum)
              ?.image_id.map((image_id, index) => (
                <Carousel.Item
                  key={index}
                  className="w-full"
                  style={{ height: "420px" }}
                >
                  <div className="relative w-full" style={{ height: "420px" }}>
                    <Image
                      loader={() =>
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${image_id}.jpg`
                      }
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${image_id}.jpg`}
                      alt={`image ${index}`}
                      layout="fill"
                      objectFit="cover"
                      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="block"
                      style={{ maxWidth: "560px", maxHeight: "420px" }}
                    />
                  </div>
                </Carousel.Item>
              ))}
          </Carousel>
        )}
      </div>
      <div className="">
        {postExist && nowRoomPost && (
          <>
            <div>
              <DialogForm
                openState={sharePopUpState}
                handleClose={handleSharePopUpState}
                render={() => (
                  <label
                    htmlFor="report_type"
                    className=" font-medium text-gray-900 float-left"
                  ></label>
                )}
              >
                <DialogContent>
                  <ShareDialog
                    description={nowRoomPost.description}
                    title={nowRoomPost.title}
                    image_id={nowRoomPost.image_id}
                  />
                </DialogContent>
              </DialogForm>

              <DialogForm
                openState={reportPopUpState}
                handleClose={handleReportPopUpState}
                render={() => (
                  <label
                    htmlFor="report_type"
                    className="block mb-2  font-medium text-gray-900 float-left"
                  ></label>
                )}
              >
                <DialogContent className="w-full max-w-2xl min-w-[28rem] p-10 text-center font-black">
                  <div className="mt-1.5">
                    <DropBoxSelect
                      name="report_type"
                      state={reportType}
                      onChange={handleReportTypeState}
                      labelName="신고 사유"
                      labelId="report_type"
                      id="report_type"
                      menuItems={[
                        "불법 콘텐츠",
                        "차별적 행위",
                        "부정확하거나 틀린 정보",
                        "실제 숙소가 아님",
                        "사기",
                        "불쾌함",
                        "기타",
                      ]}
                    />
                  </div>
                  <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 font-light rounded"
                    onClick={() => {
                      if (reportType === "") {
                        alert("신고 사유를 선택해주세요.");
                        return;
                      }
                      if (userInfo.id === "") {
                        alert("로그인이 필요합니다.");
                        return;
                      }
                      FetchReportPost(userInfo.id, nowRoomNum, reportType).then(
                        () => {
                          alert("신고가 접수되었습니다.");
                        }
                      );
                      setReportPopUpState(false);
                      setReportType("");
                    }}
                  >
                    신고 접수하기
                  </button>
                </DialogContent>
              </DialogForm>
            </div>
            <RoomPrice nowRoomPost={nowRoomPost} />
            <div className="flex justify-end">
              <div className="flex justify-end">
                <button
                  className="flex hover:bg-gray-100 mr-4"
                  onClick={() => {
                    setSharePopUpState(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    className="w-6 h-6 mt-3"
                  >
                    <path d="M30.3 13.7L25 8.4l-5.3 5.3-1.4-1.4L25 5.6l6.7 6.7z" />
                    <path d="M24 7h2v21h-2z" />
                    <path d="M35 40H15c-1.7 0-3-1.3-3-3V19c0-1.7 1.3-3 3-3h7v2h-7c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V19c0-.6-.4-1-1-1h-7v-2h7c1.7 0 3 1.3 3 3v18c0 1.7-1.3 3-3 3z" />
                  </svg>
                  <p className="mt-3  md:text-xs text-black">
                    공유하기
                    <hr />
                  </p>
                </button>
                <button
                  className="flex justify-between hover:bg-gray-100"
                  onClick={() => {
                    setReportPopUpState(true);
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mt-3"
                  >
                    <path
                      d="M5 21V3.90002C5 3.90002 5.875 3 8.5 3C11.125 3 12.875 4.8 15.5 4.8C18.125 4.8 19 3.9 19 3.9V14.7C19 14.7 18.125 15.6 15.5 15.6C12.875 15.6 11.125 13.8 8.5 13.8C5.875 13.8 5 14.7 5 14.7"
                      stroke="#76767f"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-3  md:text-xs text-black">
                    신고하기
                    <hr />
                  </p>
                </button>
              </div>
            </div>
            <div>
              <p className="ml-2 mt-2 text-lg">
                {nowRoomPost.basic_info
                  .split(/\r\n|\r|\n/)
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}{" "}
              </p>
            </div>
            <hr className="my-4" />

            <RoomDetail nowRoomPost={nowRoomPost} />

            <div className="my-4" />

            <div>
              <div className="flex justify-between">
                <div className="w-full flex flex-col items-center">
                  <p className="text-xl mb-2 md:text-lg">
                    {nowRoomPost.street}
                  </p>
                  {postExist && (
                    <KakaoMap
                      x={nowRoomPost.x_coordinate}
                      y={nowRoomPost.y_coordinate}
                    />
                  )}
                </div>
              </div>
            </div>

            <RoomHost user={nowRoomPost.postuser} title={nowRoomPost.title} />
          </>
        )}
        <div className="mb-4"></div>
      </div>
    </div>
  );
}
