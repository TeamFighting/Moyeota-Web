import { ChevronRight } from "../../assets/svg";
import * as S from "./style";
import TimeModal from "./Components/Modal/TimeModal";
// import DateModal from "./Components/Modal/DateModal";
import { SetStateAction, useEffect, useState } from "react";
import PotCreateStore from "../../zustand/store/PotCreateStore";
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReactNativeWebView: any;
  }
}
interface CreateBottomProps {
  totalPeople: number;
  onTotalPeopleChange: (count: SetStateAction<number>) => void;
}

function CreateBottom({ totalPeople, onTotalPeopleChange }: CreateBottomProps) {
  const [selectedVehicle, setSelectedVehicle] = useState("일반 승용 택시");
  const [isSameGenderRide, setIsSameGenderRide] = useState(false);
  const [selectedModal, setSelectedModal] = useState<string | null>(null);
  const [data, setData] = useState("");
  const openTimeModal = () => {
    setSelectedModal("time");
  };

  // const openDateModal = () => {
  //   setSelectedModal("date");
  // };

  const closeModal = () => {
    setSelectedModal(null);
  };

  const setVehicleType = PotCreateStore((state) => state.setVehicleType);
  const handleVehicleSelection = (vehicle: SetStateAction<string>) => {
    setSelectedVehicle(vehicle);
    if (vehicle === "일반 승용 택시") {
      setVehicleType("일반");
    } else if (vehicle === "밴 택시") {
      setVehicleType("밴");
    }
  };
  const setSameGenderRide = PotCreateStore((state) => state.setSameGenderRide);

  const handleSameGenderRideToggle = () => {
    setIsSameGenderRide(!isSameGenderRide);
    setSameGenderRide(isSameGenderRide ? "YES" : "NO");
  };

  const isSelectionComplete = totalPeople > 0;
  console.log(data);
  const onMessageEvent = (e: MessageEvent) => {
    e.stopPropagation();
    setData(String(e.data));
  };

  useEffect(() => {
    window.addEventListener("message", onMessageEvent, { capture: true });
    return () => window.removeEventListener("message", onMessageEvent);
  }, []);

  const messageToRN = () => {
    window.ReactNativeWebView.postMessage("hello");
  };

  return (
    <S.Bottom>
      <S.Wrapper
        style={{
          paddingBottom: "40px",
        }}
        onClick={postMessage}
      >
        <S.TextWrapper onClick={messageToRN}>
          <S.BottomTitle>출발시간</S.BottomTitle>
          <S.Description>탑승일시를 선택해주세요</S.Description>
        </S.TextWrapper>
        <ChevronRight width="24" height="24" />
      </S.Wrapper>
      <S.Wrapper style={{ paddingBottom: "10px" }} onClick={openTimeModal}>
        <S.TextWrapper>
          <S.BottomTitle>이동수단 및 인원</S.BottomTitle>
          <S.Description>
            {isSelectionComplete ? (
              <S.SelectedInfo>
                {selectedVehicle} / 총 {totalPeople}명 /{" "}
                {isSameGenderRide ? "동성끼리 탑승" : "혼성탑승"}
              </S.SelectedInfo>
            ) : (
              "이동수단 및 인원을 선택해주세요"
            )}
          </S.Description>
        </S.TextWrapper>
        <ChevronRight width="24" height="24" style={{ marginTop: "13px" }} />
      </S.Wrapper>
      {selectedModal === "time" && (
        <TimeModal
          closeModal={closeModal}
          selectedVehicle={selectedVehicle}
          totalPeople={totalPeople}
          isSameGenderRide={isSameGenderRide}
          onVehicleSelection={handleVehicleSelection}
          onTotalPeopleChange={onTotalPeopleChange}
          onSameGenderRideToggle={handleSameGenderRideToggle}
        />
      )}
      {/* {selectedModal === "date" && <DateModal closeModal={closeModal} />} */}
    </S.Bottom>
  );
}
export default CreateBottom;
