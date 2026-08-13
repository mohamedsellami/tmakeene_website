/** Set to false (or COMING_SOON=false) to restore the live site. */
export const COMING_SOON_ENABLED =
  process.env.COMING_SOON !== undefined
    ? process.env.COMING_SOON === "true"
    : true;
