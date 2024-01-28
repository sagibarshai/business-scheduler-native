import UploadImags from "./upload-images";
import NextStageButton from "../../../../components/inputs/buttons/next-stage-button";

import { StyledStage2Wrapper, StyledTextareaWrapper } from "./styled";
import Textarea from "../../../../components/inputs/textarea";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../../../../theme";
import { ScrollView, TextInput } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Asset } from "react-native-image-picker";
import { InputState } from "../../../../components/inputs/types";
import { coverImgErrorMessage, descriptionErrorMessage, profileImgErrorMessage, regularImgsErrorMessage } from "./errors/messages";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { setBusinessMetaData, setBusinessPhotos } from "../../../../../redux/featuers/business/businessSlice";
import Progressbar from "../../../../components/progress-bar";
import { StyledStage2ImgsTitle } from "./upload-images/styled";

const Stage2 = () => {
  const businessMetaData = useAppSelector((state) => state.business.metaData);

  const [profileImg, setProfileImg] = useState<InputState<Asset | undefined>>({ error: "", value: undefined, isEditMode: false });
  const [coverImg, setCoverImg] = useState<InputState<Asset | undefined>>({ error: "", value: undefined, isEditMode: false });
  const [businessImgs, setBusinessImgs] = useState<InputState<Asset[]>>({ error: "", value: [], isEditMode: false });
  const [description, setDescription] = useState<InputState<string>>({ error: "", value: "", isEditMode: false });

  const scrollableRef = useRef<ScrollView>(null);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const onProfileImgUpload = useCallback((asset: Asset) => setProfileImg({ ...profileImg, value: asset }), [profileImg]);

  const onCoverImgUpload = useCallback((asset: Asset) => setCoverImg({ ...coverImg, value: asset }), [coverImg]);

  const onUploadBusinessPhoto = useCallback((asset: Asset) => setBusinessImgs((prevBusinessImgs) => ({ ...prevBusinessImgs, value: [...businessImgs.value, asset] })), [businessImgs]);

  const onDeleteCoverImg = useCallback(() => setCoverImg({ ...coverImg, value: undefined }), [coverImg]);

  const onDeleteRegularImg = useCallback(
    (index: number) => {
      const updatedBusinessImgs = [...businessImgs.value].filter((_, inx) => inx !== index);
      setBusinessImgs({ ...businessImgs, value: updatedBusinessImgs });
    },
    [businessImgs]
  );

  const onTextAreaInputChange = (text: string) => setDescription({ ...description, value: text, error: text.length >= 12 ? "" : descriptionErrorMessage });

  const checkFormValidity = () => {
    let errs = [];
    if (description.value.length < 12) {
      errs.push(descriptionErrorMessage);
      setDescription({ ...description, error: descriptionErrorMessage });
    } else {
      setDescription({ ...description, error: "" });
    }

    if (!profileImg.value) {
      errs.push(profileImgErrorMessage);
      setProfileImg({ ...profileImg, error: profileImgErrorMessage });
    } else {
      setProfileImg({ ...profileImg, error: "" });
    }

    if (errs.length > 0) return errs;
    return null;
  };

  const onNextStage = () => {
    const errs = checkFormValidity();
    if (errs) {
      errorsNavigation(errs);
      return;
    }

    handleNavigation();
  };

  const handleNavigation = async () => {
    const dispatchPromise = new Promise<void>((resolve) => {
      dispatch(setBusinessPhotos({ cover: coverImg.value, profile: profileImg.value, regular: businessImgs.value }));
      dispatch(setBusinessMetaData({ ...businessMetaData, description: description.value }));
      resolve();
    });

    // Wait for the dispatchPromise to resolve before navigating to "stage-2"
    await dispatchPromise;

    navigation.navigate("stage-3");
  };

  const errorsNavigation = (errs: string[]) => {
    if (scrollableRef.current) {
      if (errs?.length) {
        if (profileImg.error) scrollableRef.current.scrollTo(0);
        else scrollableRef.current.scrollToEnd({ animated: true });
      }
    }
  };

  return (
    <StyledStage2Wrapper>
      <Progressbar currentStage={2} stages={4} />
      <ScrollView ref={scrollableRef}>
        <StyledStage2Wrapper>
          <StyledStage2ImgsTitle> {businessMetaData.name}</StyledStage2ImgsTitle>
          <UploadImags profileImgErrorMessage={profileImg.error} onDeleteCoverImg={onDeleteCoverImg} onDeleteRegularImg={onDeleteRegularImg} coverImg={coverImg?.value} profileImg={profileImg?.value} regularImgs={businessImgs.value} onUploadCoverImg={onCoverImgUpload} onUploadProfileImg={onProfileImgUpload} onUploadRegularImg={onUploadBusinessPhoto} />
          <StyledTextareaWrapper>
            <Textarea
              onFocus={() => {
                scrollableRef.current?.scrollToEnd();
              }}
              error={description.error}
              label="תיאור של העסק"
              icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="subtitles-outline" />}
              onChange={(event) => {
                onTextAreaInputChange(event.nativeEvent.text);
              }}
              placeholder="זה המקום לפרט על העסק ושרותיו כדי שהלקוחות ידעו כמה שיותר"
            />
          </StyledTextareaWrapper>
        </StyledStage2Wrapper>
      </ScrollView>
      <NextStageButton onNextStage={onNextStage} disabled={false}>
        לשלב הבא
      </NextStageButton>
    </StyledStage2Wrapper>
  );
};
export default Stage2;
