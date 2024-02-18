import UploadImags from "./upload-images";
import NextStageButton from "../../../../components/inputs/buttons/next-stage-button";

import { StyledStage2Wrapper, StyledTextareaWrapper } from "./styled";
import Textarea from "../../../../components/inputs/textarea";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../../../../theme";
import { ScrollView } from "react-native";
import { useCallback, useRef, useState } from "react";
import { Asset } from "react-native-image-picker";
import { InputState } from "../../../../components/inputs/types";
import { profileImgErrorMessage } from "./errors/messages";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";

import {
  setBusinessData,
  setBusinessPhotos,
} from "../../../../../redux/featuers/business/businessSlice";
import Progressbar from "../../../../components/progress-bar";
import { StyledStage2ImgsTitle } from "./upload-images/styled";
import { useAppRouteParams } from "../../../../hooks/use-app-route-params";
import { useAppNavigation } from "../../../../hooks/use-app-navigation";
import { RootStackParamList } from "../../../../../types";

const Stage2 = () => {
  const businessMetaData = useAppSelector((state) => state.business.metaData);
  const businessData = useAppSelector((state) => state.business.data);
  const businessPhotos = useAppSelector((state) => state.business.photos);

  const [profileImg, setProfileImg] = useState<InputState<Asset | undefined>>({
    error: profileImgErrorMessage,
    value: businessPhotos.profile ? businessPhotos.profile : undefined,
    isValid: false,
    showErrorMessage: false,
  });
  const [coverImg, setCoverImg] = useState<InputState<Asset | undefined>>({
    error: "",
    value: businessPhotos.cover ? businessPhotos.cover : undefined,
    isValid: true,
  });
  const [businessImgs, setBusinessImgs] = useState<InputState<Asset[]>>({
    error: "",
    value: businessPhotos.regular,
    isValid: true,
  });
  const [description, setDescription] = useState<InputState<string>>({
    value: businessData.description,
    isEditMode: true,
  });

  const scrollableRef = useRef<ScrollView>(null);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const stage2Params = useAppRouteParams({ screen: "stage-2" }) as RootStackParamList["stage-2"];
  const onProfileImgUpload = useCallback(
    (asset: Asset) => setProfileImg({ ...profileImg, value: asset, isValid: true }),
    [profileImg]
  );

  const onCoverImgUpload = useCallback(
    (asset: Asset) => setCoverImg({ ...coverImg, value: asset }),
    [coverImg]
  );

  const onUploadBusinessPhoto = useCallback(
    (asset: Asset) =>
      setBusinessImgs((prevBusinessImgs) => ({
        ...prevBusinessImgs,
        value: [...businessImgs.value, asset],
      })),
    [businessImgs]
  );

  const onDeleteCoverImg = useCallback(
    () => setCoverImg({ ...coverImg, value: undefined }),
    [coverImg]
  );

  const onDeleteRegularImg = useCallback(
    (index: number) => {
      const updatedBusinessImgs = [...businessImgs.value].filter((_, inx) => inx !== index);
      setBusinessImgs({ ...businessImgs, value: updatedBusinessImgs });
    },
    [businessImgs]
  );

  const onTextAreaInputChange = (text: string) =>
    setDescription({
      ...description,
      value: text,
    });

  const onNextStage = async () => {
    if (!profileImg.value) {
      setProfileImg({ ...profileImg, showErrorMessage: true, isValid: false });
      return;
    }

    const dispatchPromise = new Promise<void>((resolve) => {
      dispatch(
        setBusinessPhotos({
          cover: coverImg.value!,
          profile: profileImg.value!,
          regular: businessImgs.value,
        })
      );
      dispatch(setBusinessData({ ...businessData, description: description.value }));
      resolve();
    });

    // Wait for the dispatchPromise to resolve before navigating to "stage-2"
    await dispatchPromise;
    stage2Params?.isEditMode
      ? navigation.navigateTo("business-profile")
      : navigation.navigateTo("stage-3");
  };

  const onCancelProfileImg = () => {
    setProfileImg({ ...profileImg, isValid: false, showErrorMessage: true });
  };

  return (
    <StyledStage2Wrapper>
      <Progressbar currentStage={2} stages={4} />
      <ScrollView ref={scrollableRef}>
        <StyledStage2Wrapper>
          <StyledStage2ImgsTitle> {businessMetaData.name}</StyledStage2ImgsTitle>
          <UploadImags
            onCancelProfileImg={onCancelProfileImg}
            profileImgErrorMessage={
              profileImg.showErrorMessage && !profileImg.isValid ? profileImg.error : ""
            }
            onDeleteCoverImg={onDeleteCoverImg}
            onDeleteRegularImg={onDeleteRegularImg}
            coverImg={coverImg?.value}
            profileImg={profileImg?.value}
            regularImgs={businessImgs.value}
            onUploadCoverImg={onCoverImgUpload}
            onUploadProfileImg={onProfileImgUpload}
            onUploadRegularImg={onUploadBusinessPhoto}
          />
          <StyledTextareaWrapper>
            <Textarea
              onFocus={() => {
                scrollableRef.current?.scrollToEnd();
              }}
              error={description.error}
              label="תיאור של העסק"
              icon={
                <Icon
                  size={theme.icons.sizes.m}
                  color={theme.icons.colors.aqua}
                  name="subtitles-outline"
                />
              }
              onChange={(event) => {
                onTextAreaInputChange(event.nativeEvent.text);
              }}
              placeholder="זה המקום לפרט על העסק ושרותיו כדי שהלקוחות ידעו כמה שיותר"
            />
          </StyledTextareaWrapper>
        </StyledStage2Wrapper>
      </ScrollView>
      <NextStageButton onNextStage={onNextStage} disabled={false}>
        {!stage2Params?.isEditMode ? "לשלב הבא" : "שמור"}
      </NextStageButton>
    </StyledStage2Wrapper>
  );
};
export default Stage2;
