import { ChevronRight } from "../../assets/svg";
import * as S from "./style";
import TimeModal from "./Components/Modal/TimeModal";
import { SetStateAction, useState } from "react";

function CreateBottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("일반 승용 택시");
  const [totalPeople, setTotalPeople] = useState(0);
  const [isSameGenderRide, setIsSameGenderRide] = useState(false);

  const handleTimeModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleVehicleSelection = (vehicle: SetStateAction<string>) => {
    setSelectedVehicle(vehicle);
  };

  const handleTotalPeopleChange = (count: SetStateAction<number>) => {
    setTotalPeople(count);
  };

  const handleSameGenderRideToggle = () => {
    setIsSameGenderRide(!isSameGenderRide);
  };

  const isSelectionComplete =
    selectedVehicle !== "일반 승용 택시" || totalPeople > 0;

  return (
    <S.Bottom>
      <S.Wrapper
        style={{
          paddingBottom: "40px",
        }}
      >
        <S.TextWrapper>
          <S.BottomTitle>출발시간</S.BottomTitle>
          <S.Description>탑승일시를 선택해주세요</S.Description>
        </S.TextWrapper>
        <ChevronRight width="24" height="24" />
      </S.Wrapper>
      <S.Wrapper style={{ paddingBottom: "10px" }} onClick={handleTimeModal}>
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
      {isModalOpen && (
        <TimeModal
          closeModal={closeModal}
          selectedVehicle={selectedVehicle}
          totalPeople={totalPeople}
          isSameGenderRide={isSameGenderRide}
          onVehicleSelection={handleVehicleSelection}
          onTotalPeopleChange={handleTotalPeopleChange}
          onSameGenderRideToggle={handleSameGenderRideToggle}
        />
      )}
    </S.Bottom>
  );
}

export default CreateBottom;
