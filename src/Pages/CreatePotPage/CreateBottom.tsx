import { ChevronRight } from "../../assets/svg";
import * as S from "./style";
import TimeModal from "./Components/Modal/TimeModal";
// import DateModal from "./Components/Modal/DateModal";
import { SetStateAction, useEffect, useState } from "react";

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
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

  const [selectedTime, setSelectedTime] = useState<string>("");

  const openTimeModal = () => {
    setSelectedModal("time");
  };

  const closeModal = () => {
    setSelectedModal(null);
  };

  const handleVehicleSelection = (vehicle: SetStateAction<string>) => {
    setSelectedVehicle(vehicle);
  };

  const handleSameGenderRideToggle = () => {
    setIsSameGenderRide(!isSameGenderRide);
  };

  const isSelectionComplete = totalPeople > 0;

  const listener = ({ data }: { data: MessageEvent["data"] }) => {
    const message = JSON.parse(data);
    setSelectedTime(message);
  };

  useEffect(() => {
    // document.addEventListener("message", listener);
    window.addEventListener("message", listener);
    return () => {
      // document.removeEventListener("message", listener);
      window.removeEventListener("message", listener);
    };
  }, []);

  const messageToRN = () => {
    // console.log("hello");
    window.ReactNativeWebView.postMessage("helloworld");
  };

  return (
    <S.Bottom>
      <S.Wrapper
        onClick={messageToRN}
        style={{
          paddingBottom: "40px",
        }}
      >
        <S.TextWrapper>
          <S.BottomTitle>출발시간</S.BottomTitle>
          <div>{selectedTime}</div>
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
