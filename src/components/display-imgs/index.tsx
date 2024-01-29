import { Image, Modal, ScrollView } from "react-native";
import { StyleCoverImgWrapper, StyleRegularImgWrapper, StyledCol, StyledCoverImg, StyledProfileImg, StyledProfileImgWrapper, StyledRow, StyledRowCoverAndProfileImgsWrapper, StyledWrapper, StyledProfileUploadImgWrapper, StyledText, StyledModalContent, StyledRegularUploadImgWrapper, StyledModalImg } from "./styled";
import { Props } from "./types";
import { useState } from "react";
import CustomModal from "../modal";
import { Asset } from "react-native-image-picker";

const DisplayImgs = ({ profileImg, coverImg, regularImgs }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImgSource, setModalImgSource] = useState<Asset | null>(null);

  const onToggleModal = () => setIsModalOpen((prevState) => !prevState);

  const onPressImg = (uri: Asset) => {
    setModalImgSource(uri);
    onToggleModal();
  };

  return (
    <StyledWrapper>
      {(coverImg || profileImg) && (
        <StyledRowCoverAndProfileImgsWrapper>
          {coverImg && (
            <StyleCoverImgWrapper onTouchStart={() => onPressImg(coverImg)}>
              <StyledCoverImg source={coverImg} />
            </StyleCoverImgWrapper>
          )}
          {profileImg && (
            <StyledProfileImgWrapper onTouchStart={() => onPressImg(profileImg)}>
              <StyledProfileImg source={profileImg} />
            </StyledProfileImgWrapper>
          )}
        </StyledRowCoverAndProfileImgsWrapper>
      )}
      {regularImgs && (
        <StyledRow margin={coverImg || profileImg ? true : false}>
          <ScrollView horizontal>
            <StyledCol>
              <StyledRow margin={coverImg || profileImg ? true : false}>
                {regularImgs.map((source, index) => (
                  <StyleRegularImgWrapper key={index} onTouchStart={() => onPressImg(source)}>
                    <StyledCoverImg source={source} />
                  </StyleRegularImgWrapper>
                ))}
              </StyledRow>
            </StyledCol>
          </ScrollView>
        </StyledRow>
      )}
      {isModalOpen && modalImgSource ? (
        <CustomModal isOpen={isModalOpen} onClose={onToggleModal}>
          <StyledModalContent>
            <StyledModalImg source={modalImgSource} />
          </StyledModalContent>
        </CustomModal>
      ) : null}
    </StyledWrapper>
  );
};
export default DisplayImgs;
