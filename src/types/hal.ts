/**
 * This type represents the _links object in HAL
 */
export interface HalLinkList {

  [s: string]: HalLink;

}

/**
 * This type represents a single propery in a _links object.
 *
 * It's value can still be a single link, or an array of links.
 */
export type HalLink = OneHalLink | OneHalLink[];

/**
 * This is a single HAL link
 */
export type OneHalLink = {

  templated: boolean;
  href: string;
  type: string;
  title: string;

};

export interface HalEmbeddedList {

  [s: string]: HalEmbedded;

}

export type HalEmbedded = OneHalEmbedded | OneHalEmbedded[];

export type OneHalEmbedded = {

  _links: HalLinkList;

};
