import { useAppSelector } from "../../../redux/store";
import { theme } from "../../../theme";
import Tag from "../tags";
import { StyledCategoriesWrapper, StyledIconAndTitleWrapper, StyledKeyValueWrapper, StyledSectionTitle, StyledText, StyledWrapper } from "./styled";
import { type Props } from "./types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SelectedDaysAndHoursDisplay from "../selected-days-and-hour-display";
import DisplayImgs from "../display-imgs";
import { ScrollView } from "react-native";
import { useMemo, useState } from "react";
import Table from "../table";
import Hr from "../elements/hr";
import EditPen from "../edit-pen";

const BusinessProfile = ({ allowEdit }: Props) => {
  const business = useAppSelector((state) => state.business);
  const subCategoriesHeaders = useMemo(() => {
    return [
      { icon: <MaterialCommunityIcons name="hand-extended-outline" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />, value: "שירות" },
      { icon: <MaterialCommunityIcons name="clock-edit-outline" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />, value: "זמן" },
      { icon: <MaterialIcons name="currency-exchange" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />, value: "מחיר" },
    ];
  }, []);

  const subCategoriesData = useMemo(() => {
    return business.data.subCategories.map(({ name, price, time }) => ({
      service: name,
      time: time ? (
        <>
          {time?.hours ? `${time.hours} ש׳, ` : ""}
          {time?.minutes} דק
        </>
      ) : (
        ""
      ),
      price: price ? `₪ ${price} ` : "",
    }));
  }, []);

  const onEdit = () => {};

  return (
    <ScrollView>
      <StyledWrapper>
        {allowEdit && <EditPen onPress={onEdit} />}
        <StyledKeyValueWrapper>
          <DisplayImgs regularImgs={business.photos.regular} coverImg={business.photos.cover} profileImg={business.photos.profile} />
        </StyledKeyValueWrapper>
        <StyledKeyValueWrapper>
          <StyledIconAndTitleWrapper>
            <MaterialCommunityIcons size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="subtitles-outline" />
            <StyledSectionTitle>תיאור העסק</StyledSectionTitle>
          </StyledIconAndTitleWrapper>
          <StyledText>{business.data.description}</StyledText>
        </StyledKeyValueWrapper>
        <Hr />
        {allowEdit && <EditPen onPress={onEdit} />}
        <StyledKeyValueWrapper>
          <StyledIconAndTitleWrapper>
            <MaterialIcons name="category" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />
            <StyledSectionTitle>קטגוריות</StyledSectionTitle>
          </StyledIconAndTitleWrapper>
          <StyledCategoriesWrapper>
            {business.metaData.categories.map((category) => (
              <Tag text={category} onPress={() => {}} />
            ))}
          </StyledCategoriesWrapper>
        </StyledKeyValueWrapper>

        <StyledKeyValueWrapper>
          <StyledIconAndTitleWrapper>
            <MaterialCommunityIcons size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="note-text-outline" />
            <StyledSectionTitle>שם העסק</StyledSectionTitle>
          </StyledIconAndTitleWrapper>
          <StyledText>{business.metaData.name}</StyledText>
        </StyledKeyValueWrapper>
        <StyledKeyValueWrapper>
          <StyledIconAndTitleWrapper>
            <MaterialCommunityIcons size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="home-outline" />
            <StyledSectionTitle>כתובת העסק</StyledSectionTitle>
          </StyledIconAndTitleWrapper>
          <StyledText>{business.metaData.address}</StyledText>
        </StyledKeyValueWrapper>
        <StyledKeyValueWrapper>
          <StyledIconAndTitleWrapper>
            <MaterialCommunityIcons size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="home-outline" />
            <StyledSectionTitle>טלפון</StyledSectionTitle>
          </StyledIconAndTitleWrapper>
          <StyledText>{business.metaData.phone}</StyledText>
        </StyledKeyValueWrapper>
        <StyledKeyValueWrapper>
          <StyledIconAndTitleWrapper>
            <MaterialCommunityIcons size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="clock-edit-outline" />
            <StyledSectionTitle>ימים ושעות</StyledSectionTitle>
          </StyledIconAndTitleWrapper>
          <SelectedDaysAndHoursDisplay selectedDaysAndHours={business.metaData.workingDaysAndHours} />
        </StyledKeyValueWrapper>

        <Hr />
        {allowEdit && <EditPen onPress={onEdit} />}

        <StyledKeyValueWrapper>
          <Table data={subCategoriesData} customHeaders={subCategoriesHeaders} columnSizes={[2, 2, 1]} />
        </StyledKeyValueWrapper>
      </StyledWrapper>
    </ScrollView>
  );
};
export default BusinessProfile;
