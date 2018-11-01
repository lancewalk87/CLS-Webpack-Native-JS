// APPLICATION VIEW CONTROLLERS
function navigationService(router) {
  // Page Navigation Methods
  function loadPage(pageName, query) {  // load page
    router.load({url: pageName + '.html', query: query});

    console.log('navigationService('+router+').loadPage('+pageName+','+ query+')');
  }

  function back(pageName, query) {  // return to previous page
    if (pageName) {
      router.back({url: pageName + '.html', force: true, query: query});
    } else {
      router.back();
    }
    console.log('navigationService('+router+').back('+pageName+','+ query+')');
  }
  // End Page Navigation Methods

  return {
    loadPage: loadPage,
    back: back
  };
}
module.exports = navigationService;
// END APPLICATION VIEW CONTROLLERS
