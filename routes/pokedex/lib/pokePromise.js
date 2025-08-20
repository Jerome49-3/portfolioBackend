const pokePromise = async (pokeUrlsForMap) => {
  try {
    const pokeValues = Promise.allSettled(pokeUrlsForMap).then((results) => {
      return results;
    });
    // console.log("pokeValues:", pokeValues);
    return pokeValues;
  } catch (error) {
    console.error(error);
  }
};
module.exports = pokePromise;
