
function newPostView(controller) {

  function load(page) {
    if(!controller.canBroadcast()) {
      page.find('#is-broadcast-container').hide();
    }
    page.find('#new-post-btn').click(function(e){
      e.preventDefault();
      controller.createPost(page.find('#is-broadcast').prop('checked'), page.find('#new-post-content').val());
    });
  }

  return { load: load };
}

module.exports = newPostView;
