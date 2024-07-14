import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { toggleLikes } from "@shared/components/FetchList/FetchList";
import { RoomSpan } from "./RoomSpan";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Post } from "@type/Type";
import { Dispatch, SetStateAction } from "react";
import { NormalImage } from "@shared/components/Image/Image";

export const RoomProfile = ({
  room,
  likes,
  setLikes,
  userId,
}: {
  room: Post;
  likes: { [key: number]: number };
  setLikes: Dispatch<SetStateAction<{ [key: number]: number }>>;
  userId?: string;
}) => {
  const imageLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${room.image_id[0]}.jpg`;

  const router = useRouter();
  const moveToRoomInfo = ({ room }: { room: Post }) => {
    // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
    router.push(`/roominfo/${room.key}`);
  };

  if (!room) return <div></div>;
  return (
    <div className="w-full md:w-1/2 xl:w-2/6 p-6 flex flex-col">
      <img
        src={imageLink}
        className="hover:grow hover:shadow-lg"
        alt="Room image"
        onClick={() => moveToRoomInfo({ room })}
      />
      <div className="pt-3 flex items-center justify-between">
        <RoomSpan room={room} />
        <IconButton onClick={toggleLikes(room, likes, setLikes)}>
          {likes[room.key] !== undefined ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </div>
    </div>
  );
};
