function landingView(controller) {
  function load(page) {
    controller.indexSession(); 
  }
  return { load: load };
}

module.exports = landingView;
