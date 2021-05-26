const MY_FUNCTIONS = {
  compareName: (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  },

  compareYear: (a, b) => {
    if (a.year > b.year) {
      return -1;
    }
    if (a.year < b.year) {
      return 1;
    }
    return 0;
  },
};

export default MY_FUNCTIONS;
