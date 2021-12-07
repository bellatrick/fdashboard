
export const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = expirationTime * 1000 - 6000;
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
  };

 export const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem("food_token");
    const storedExpirationDate = localStorage.getItem(
      "food_expirationTime"
    );
    const remainingTime = calculateRemainingTime(storedExpirationDate);
   
    if (remainingTime <= 3600) {
      localStorage.removeItem("food_token");
      localStorage.removeItem("food_expirationTime");
      return null;
    }
  
    return {
      token: storedToken,
      duration: remainingTime,
    };
  };