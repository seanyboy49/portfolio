import museumImgSrc from "../../images/museum_v1.png";
import islandImgSrc from "../../images/island_v1.png";

export enum Names {
  ISLAND = "island",
  MUSEUM = "museum",
  HOME = "home",
}
export type MapsConfig = {
  [key in Names]: {
    imageSrc: string;
    offset: {
      x: number;
      y: number;
    };
    dimensions: {
      width: number;
      height: number;
    };
    doors: DoorConfig[];
  };
};

export type DoorConfig = {
  map: Names;
  position: {
    x: number;
    y: number;
  };
};
export const MAPS: MapsConfig = {
  [Names.ISLAND]: {
    imageSrc: islandImgSrc,
    offset: {
      x: -1555,
      y: -700,
    },
    dimensions: {
      width: 70,
      height: 40,
    },
    doors: [
      {
        map: Names.MUSEUM,
        position: {
          x: 1197,
          y: -124,
        },
      },
      {
        map: Names.HOME,
        position: {
          x: 749,
          y: 324,
        },
      },
    ],
  },
  [Names.MUSEUM]: {
    imageSrc: museumImgSrc,
    offset: {
      x: -1555,
      y: -700,
    },
    dimensions: {
      width: 70,
      height: 40,
    },
    doors: [
      {
        map: Names.MUSEUM,
        position: {
          x: 1197,
          y: -124,
        },
      },
    ],
  },
  [Names.HOME]: {
    imageSrc: museumImgSrc,
    offset: {
      x: -1555,
      y: -700,
    },
    dimensions: {
      width: 70,
      height: 40,
    },
    doors: [
      {
        map: Names.MUSEUM,
        position: {
          x: 1197,
          y: -124,
        },
      },
    ],
  },
};
