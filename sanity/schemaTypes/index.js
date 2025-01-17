import { postType } from "./postType";
import { categoryType } from "./categoryType";
import { blockContentType } from "./blockContentType";
import { authorType } from "./authorType";
import { homeHeroType } from "./homeHeroType";
import { homeAboutType } from "./homeAboutUsType";
import { homeOurServicesType } from "./homeOurServicesType";
import { homeWhyChooesUsType } from "./homeWhyChooesUsType";
import { homeProblemsAndSolutionsType } from "./homeProblemsAndSolutionsType";
// import { homeHowWeDeliverValueType } from "./homeHowWeDeliverValueType";
import { homeGrowingNeedType } from "./homeGrowingNeedType";
import { homeReadyToSecureType } from "./homeReadyToSecureType";
import { homeFAQsType } from "./homeFAQsType";
import { homeContactUsType } from "./homeContactUsType";

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
  ],
};
