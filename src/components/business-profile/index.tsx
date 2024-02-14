import { useAppSelector } from "../../../redux/store";
import { theme } from "../../../theme";
import Tag from "../tags";
import {
  StyledCategoriesWrapper,
  StyledIconAndTitleWrapper,
  StyledKeyValueWrapper,
  StyledSectionTitle,
  StyledText,
  StyledWrapper,
  StyledBusinessProfileWrapper,
} from "./styled";
import { type Props } from "./types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SelectedDaysAndHoursDisplay from "../selected-days-and-hour-display";
import DisplayImgs from "../display-imgs";
import { ScrollView } from "react-native";
import { useEffect, useMemo, useState } from "react";
import Table from "../table";
import Hr from "../elements/hr";
import EditPen from "../edit-pen";
import { useAppNavigation } from "../../hooks/use-app-navigation";
import { SelectedHoursAndDays } from "../../screens/business/add-business/stage-1/select-days-and-hours/types";
import { SubCatogory } from "../../screens/business/add-business/stage-3/sub-categories/types";
import { appAxios } from "../../../axios";
import NextStageButton from "../inputs/buttons/next-stage-button";
import Progressbar from "../progress-bar";

const BusinessProfile = ({ allowEdit }: Props) => {
  const navigation = useAppNavigation();

  const [dataL, setDataL] = useState<any>(null);

  const user = useAppSelector((state) => state.user);
  const business = useAppSelector((state) => state.business);
  const subCategoriesHeaders = useMemo(() => {
    return [
      {
        icon: (
          <MaterialCommunityIcons
            name="hand-extended-outline"
            color={theme.icons.colors.aqua}
            size={theme.icons.sizes.m}
          />
        ),
        value: "שירות",
      },
      {
        icon: (
          <MaterialCommunityIcons
            name="clock-edit-outline"
            color={theme.icons.colors.aqua}
            size={theme.icons.sizes.m}
          />
        ),
        value: "זמן",
      },
      {
        icon: (
          <MaterialIcons
            name="currency-exchange"
            color={theme.icons.colors.aqua}
            size={theme.icons.sizes.m}
          />
        ),
        value: "מחיר",
      },
    ];
  }, []);

  const subCategoriesData = useMemo(() => {
    if (dataL) {
      //@ts-ignore
      return dataL?.businessData?.sub_categories?.map(({ name, price, defaultTime }) => ({
        service: name,
        time: defaultTime ? (
          <>
            {defaultTime?.hours ? `${defaultTime.hours} ש׳, ` : ""}
            {defaultTime?.minutes} דק
          </>
        ) : (
          ""
        ),
        price: price ? `₪ ${price} ` : "",
      }));
    }

    return business.data.subCategories.map(({ name, price, defaultTime }) => ({
      service: name,
      time: defaultTime ? (
        <>
          {defaultTime?.hours ? `${defaultTime.hours} ש׳, ` : ""}
          {defaultTime?.minutes} דק
        </>
      ) : (
        ""
      ),
      price: price ? `₪ ${price} ` : "",
    }));
  }, [dataL]);

  const onEdit = (screen: "stage-1" | "stage-2" | "stage-3") => {
    navigation.navigateTo("add-business", {
      screen,
      params: {
        isEditMode: true,
      },
    });
  };

  const postBusiness = async () => {
    try {
      const body: {
        address: string;
        category: string;
        name: string;
        workingDayAndHours: SelectedHoursAndDays;
        phone: string;
        subCategories: SubCatogory[];
        description?: string;
        profileImg: {
          file_type: string;
          base64: string;
          size: string;
          img_type: "profile" | "cover" | "regular";
        };
        coverImg?: {
          file_type: string;
          base64: string;
          size: string;
          img_type: "profile" | "cover" | "regular";
        };
        regularImgs?: {
          file_type: string;
          base64: string;
          size: string;
          img_type: "profile" | "cover" | "regular";
        }[];
      } = {
        address: business.metaData.address,
        category: business.metaData.category,
        name: business.metaData.name,
        phone: business.metaData.phone,
        workingDayAndHours: business.metaData.workingDaysAndHours,
        description: business.data.description,
        subCategories: business.data.subCategories,
        profileImg: {
          base64: business.photos.profile.base64!,
          file_type: business.photos.profile.type!,
          img_type: "profile",
          size: business.photos.profile.fileSize!.toString(),
        },
        coverImg: business.photos.cover && {
          base64: business.photos.cover.base64!,
          file_type: business.photos.cover.type!,
          img_type: "cover",
          size: business.photos.cover.fileSize!.toString(),
        },
        regularImgs: business.photos.regular.map((data) => ({
          base64: data.base64!,
          file_type: data.type!,
          img_type: "regular",
          size: data.fileSize!.toString(),
        })),
      };
      if (business.photos.cover?.uri) {
        body["coverImg"] = {
          base64: business.photos.cover.base64!,
          file_type: business.photos.cover.type!,
          img_type: "cover",
          size: business.photos.cover.fileSize!.toString(),
        };
      }
      if (business.photos.regular.length) {
        for (let photo of business.photos.regular) {
          body["regularImgs"]?.push({
            base64: photo.base64!,
            file_type: photo.type!,
            img_type: "regular",
            size: photo.fileSize!.toString(),
          });
        }
      }
      await appAxios.post(
        "/business/register",
        { ...body },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (err) {
      console.log("err ", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await appAxios.get("/business", {
          headers: { authorization: `Bearer ${user.token}` },
        });
        const data = res.data;
        setDataL(data);
      } catch (err) {
        console.log("err ", err);
      }
    };
    fetchData();
  }, []);

  if (dataL) {
    return (
      <StyledBusinessProfileWrapper>
        <ScrollView style={{ display: "flex", flex: 1 }}>
          <Progressbar currentStage={4} stages={4} />

          <StyledWrapper>
            {allowEdit && <EditPen onPress={() => onEdit("stage-2")} />}
            <StyledKeyValueWrapper>
              <DisplayImgs
                regularImgs={dataL.businessImgs.filter((img: any) => img.img_type === "regular")}
                coverImg={dataL.businessImgs.find((img: any) => img.img_type === "cover")}
                profileImg={dataL.businessImgs.find((img: any) => img.img_type === "profile")}
              />
            </StyledKeyValueWrapper>
            <StyledKeyValueWrapper>
              <StyledIconAndTitleWrapper>
                <MaterialCommunityIcons
                  size={theme.icons.sizes.m}
                  color={theme.icons.colors.aqua}
                  name="subtitles-outline"
                />
                <StyledSectionTitle>תיאור העסק</StyledSectionTitle>
              </StyledIconAndTitleWrapper>
              <StyledText>{dataL.businessData.business_description}</StyledText>
            </StyledKeyValueWrapper>
            <Hr />
            {allowEdit && <EditPen onPress={() => onEdit("stage-1")} />}
            <StyledKeyValueWrapper>
              <StyledIconAndTitleWrapper>
                <MaterialIcons
                  name="category"
                  color={theme.icons.colors.aqua}
                  size={theme.icons.sizes.m}
                />
                <StyledSectionTitle>קטגוריות</StyledSectionTitle>
              </StyledIconAndTitleWrapper>
              <StyledCategoriesWrapper>
                <Tag text={dataL.businessData.category} onPress={() => {}} />
              </StyledCategoriesWrapper>
            </StyledKeyValueWrapper>

            <StyledKeyValueWrapper>
              <StyledIconAndTitleWrapper>
                <MaterialCommunityIcons
                  size={theme.icons.sizes.m}
                  color={theme.icons.colors.aqua}
                  name="note-text-outline"
                />
                <StyledSectionTitle>שם העסק</StyledSectionTitle>
              </StyledIconAndTitleWrapper>
              <StyledText>{dataL.businessData.business_name}</StyledText>
            </StyledKeyValueWrapper>
            <StyledKeyValueWrapper>
              <StyledIconAndTitleWrapper>
                <MaterialCommunityIcons
                  size={theme.icons.sizes.m}
                  color={theme.icons.colors.aqua}
                  name="home-outline"
                />
                <StyledSectionTitle>כתובת העסק</StyledSectionTitle>
              </StyledIconAndTitleWrapper>
              <StyledText>{dataL.businessData.address}</StyledText>
            </StyledKeyValueWrapper>
            <StyledKeyValueWrapper>
              <StyledIconAndTitleWrapper>
                <MaterialCommunityIcons
                  size={theme.icons.sizes.m}
                  color={theme.icons.colors.aqua}
                  name="home-outline"
                />
                <StyledSectionTitle>טלפון</StyledSectionTitle>
              </StyledIconAndTitleWrapper>
              <StyledText>{dataL.businessData.phone}</StyledText>
            </StyledKeyValueWrapper>
            <StyledKeyValueWrapper>
              <StyledIconAndTitleWrapper>
                <MaterialCommunityIcons
                  size={theme.icons.sizes.m}
                  color={theme.icons.colors.aqua}
                  name="clock-edit-outline"
                />
                <StyledSectionTitle>ימים ושעות</StyledSectionTitle>
              </StyledIconAndTitleWrapper>
              <SelectedDaysAndHoursDisplay
                selectedDaysAndHours={dataL.businessData.working_days_and_hours}
              />
            </StyledKeyValueWrapper>

            <Hr />
            {allowEdit && <EditPen onPress={() => onEdit("stage-3")} />}

            <StyledKeyValueWrapper>
              <Table
                data={subCategoriesData}
                customHeaders={subCategoriesHeaders}
                columnSizes={[2, 2, 1]}
              />
            </StyledKeyValueWrapper>
          </StyledWrapper>
        </ScrollView>
        <NextStageButton onNextStage={postBusiness} disabled={false}>
          סיום
        </NextStageButton>
      </StyledBusinessProfileWrapper>
    );
  }

  return (
    <StyledBusinessProfileWrapper>
      <ScrollView style={{ display: "flex", flex: 1 }}>
        <Progressbar currentStage={4} stages={4} />

        <StyledWrapper>
          {allowEdit && <EditPen onPress={() => onEdit("stage-2")} />}
          <StyledKeyValueWrapper>
            <DisplayImgs
              regularImgs={business.photos.regular}
              coverImg={business.photos.cover}
              profileImg={business.photos.profile}
            />
          </StyledKeyValueWrapper>
          <StyledKeyValueWrapper>
            <StyledIconAndTitleWrapper>
              <MaterialCommunityIcons
                size={theme.icons.sizes.m}
                color={theme.icons.colors.aqua}
                name="subtitles-outline"
              />
              <StyledSectionTitle>תיאור העסק</StyledSectionTitle>
            </StyledIconAndTitleWrapper>
            <StyledText>{business.data.description}</StyledText>
          </StyledKeyValueWrapper>
          <Hr />
          {allowEdit && <EditPen onPress={() => onEdit("stage-1")} />}
          <StyledKeyValueWrapper>
            <StyledIconAndTitleWrapper>
              <MaterialIcons
                name="category"
                color={theme.icons.colors.aqua}
                size={theme.icons.sizes.m}
              />
              <StyledSectionTitle>קטגוריות</StyledSectionTitle>
            </StyledIconAndTitleWrapper>
            <StyledCategoriesWrapper>
              <Tag text={business.metaData.category} onPress={() => {}} />
            </StyledCategoriesWrapper>
          </StyledKeyValueWrapper>

          <StyledKeyValueWrapper>
            <StyledIconAndTitleWrapper>
              <MaterialCommunityIcons
                size={theme.icons.sizes.m}
                color={theme.icons.colors.aqua}
                name="note-text-outline"
              />
              <StyledSectionTitle>שם העסק</StyledSectionTitle>
            </StyledIconAndTitleWrapper>
            <StyledText>{business.metaData.name}</StyledText>
          </StyledKeyValueWrapper>
          <StyledKeyValueWrapper>
            <StyledIconAndTitleWrapper>
              <MaterialCommunityIcons
                size={theme.icons.sizes.m}
                color={theme.icons.colors.aqua}
                name="home-outline"
              />
              <StyledSectionTitle>כתובת העסק</StyledSectionTitle>
            </StyledIconAndTitleWrapper>
            <StyledText>{business.metaData.address}</StyledText>
          </StyledKeyValueWrapper>
          <StyledKeyValueWrapper>
            <StyledIconAndTitleWrapper>
              <MaterialCommunityIcons
                size={theme.icons.sizes.m}
                color={theme.icons.colors.aqua}
                name="home-outline"
              />
              <StyledSectionTitle>טלפון</StyledSectionTitle>
            </StyledIconAndTitleWrapper>
            <StyledText>{business.metaData.phone}</StyledText>
          </StyledKeyValueWrapper>
          <StyledKeyValueWrapper>
            <StyledIconAndTitleWrapper>
              <MaterialCommunityIcons
                size={theme.icons.sizes.m}
                color={theme.icons.colors.aqua}
                name="clock-edit-outline"
              />
              <StyledSectionTitle>ימים ושעות</StyledSectionTitle>
            </StyledIconAndTitleWrapper>
            <SelectedDaysAndHoursDisplay
              selectedDaysAndHours={business.metaData.workingDaysAndHours}
            />
          </StyledKeyValueWrapper>

          <Hr />
          {allowEdit && <EditPen onPress={() => onEdit("stage-3")} />}

          <StyledKeyValueWrapper>
            <Table
              data={subCategoriesData}
              customHeaders={subCategoriesHeaders}
              columnSizes={[2, 2, 1]}
            />
          </StyledKeyValueWrapper>
        </StyledWrapper>
      </ScrollView>
      <NextStageButton onNextStage={postBusiness} disabled={false}>
        סיום
      </NextStageButton>
    </StyledBusinessProfileWrapper>
  );
};
export default BusinessProfile;
