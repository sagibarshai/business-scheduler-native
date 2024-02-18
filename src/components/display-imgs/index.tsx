import { Image, Modal, ScrollView } from "react-native";
import {
  StyleCoverImgWrapper,
  StyleRegularImgWrapper,
  StyledCol,
  StyledCoverImg,
  StyledProfileImg,
  StyledProfileImgWrapper,
  StyledRow,
  StyledRowCoverAndProfileImgsWrapper,
  StyledWrapper,
  StyledProfileUploadImgWrapper,
  StyledText,
  StyledModalContent,
  StyledRegularUploadImgWrapper,
  StyledModalImg,
} from "./styled";
import { Props } from "./types";
import { useState } from "react";
import CustomModal from "../modal";
import { Asset } from "react-native-image-picker";

const DisplayImgs = ({ profileImg, coverImg, regularImgs }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImgSource, setModalImgSource] = useState<Asset | null | any>(null);

  const onToggleModal = () => setIsModalOpen((prevState) => !prevState);

  const onPressImg = (asset: Asset | any) => {
    setModalImgSource({ uri: `data:${asset?.type};base64,${asset?.base64}` });
    onToggleModal();
  };

  return (
    <StyledWrapper>
      {(coverImg || profileImg) && (
        <StyledRowCoverAndProfileImgsWrapper>
          {coverImg && (
            <StyleCoverImgWrapper onTouchStart={() => onPressImg(coverImg)}>
              <StyledCoverImg
                source={{ uri: `data:${coverImg?.type};base64,${coverImg?.base64}` }}
              />
            </StyleCoverImgWrapper>
          )}
          {profileImg && (
            <StyledProfileImgWrapper onTouchStart={() => onPressImg(profileImg)}>
              <StyledProfileImg
                source={{ uri: `data:${profileImg?.type};base64,${profileImg?.base64}` }}
              />
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
                    <StyledCoverImg
                      source={{ uri: `data:${source?.type};base64,${source?.base64}` }}
                    />
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
