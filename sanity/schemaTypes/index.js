import { postType } from "./blogTypes/postType";
import { categoryType } from "./blogTypes/categoryType";
import { blockContentType } from "./blockContentType";
import { authorType } from "./blogTypes/authorType";
import { homeHeroType } from "./homePageTypes/homeHeroType";
import { homeAboutType } from "./homePageTypes/homeAboutUsType";
import { homeOurServicesType } from "./homePageTypes/homeOurServicesType";
import { homeWhyChooesUsType } from "./homePageTypes/homeWhyChooesUsType";
import { homeProblemsAndSolutionsType } from "./homePageTypes/homeProblemsAndSolutionsType";
// import { homeHowWeDeliverValueType } from "./homeHowWeDeliverValueType";
import { homeGrowingNeedType } from "./homePageTypes/homeGrowingNeedType";
import { homeReadyToSecureType } from "./homePageTypes/homeReadyToSecureType";
import { homeFAQsType } from "./homePageTypes/homeFAQsType";
import { homeContactUsType } from "./homePageTypes/homeContactUsType";
import { dynamicPageType } from "./pagesTypes/dynamicPageType";

export const schema = {
  types: [
    blockContentType,
    authorType,
    categoryType,
    postType,

    homeHeroType,
    homeAboutType,
    homeOurServicesType,
    homeWhyChooesUsType,
    homeProblemsAndSolutionsType,
    // homeHowWeDeliverValueType,
    homeGrowingNeedType,
    homeReadyToSecureType,
    homeFAQsType,
    homeContactUsType,

    dynamicPageType,
  ],
};
