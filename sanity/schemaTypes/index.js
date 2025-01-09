import { postType } from "./postType";
import { categoryType } from "./categoryType";
import { blockContentType } from "./blockContentType";
import { authorType } from "./authorType";
import { homeHeroType } from "./homeHeroType";
import { homeAboutType } from "./homeAboutUsType";
import { homeReadyToSecureType } from "./homeReadyToSecureType";
import { homeFAQsType } from "./homeFAQsType";

export const schema = {
  types: [
    blockContentType,
    authorType,
    categoryType,
    postType,

    homeHeroType,
    homeAboutType,
    homeReadyToSecureType,
    homeFAQsType,
  ],
};
