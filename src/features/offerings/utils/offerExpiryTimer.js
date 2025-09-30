import React from "react";

export const offerExpiryTimer = (lastUpdatedAt) => {
  const date = new Date();
  const expiryDate = new Date(lastUpdatedAt);
  const timeDiff = expiryDate - date;
  console.log(`${new Date(timeDiff).getHours()} hrs : ${new Date(
    timeDiff
  ).getMinutes()} mins : ${new Date(timeDiff).getSeconds()} secs Left`);

  return `${new Date(timeDiff).getHours()} hrs : ${new Date(
    timeDiff
  ).getMinutes()} mins : ${new Date(timeDiff).getSeconds()} secs Left`;
};
