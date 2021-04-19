{
    // method to create post 
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'POST',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    // from the method to crete post in dom
                    $('#post-list-container>ul').prepend(newPost);
                    // from the method to delete post from dom
                    $deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));
                    
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500  

                    }).show();

                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    

    // method to create post in dom
    let newPostDom = function(post){
        // change :: show the count of 0 likes in this post
        return $(`<li id="post-${post._id}">
                        <p>
                            <!-- The anchor tag to delete the post -->
                            <small>
                                <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
                            </small>
                        
                            <h3>${ post.content}</h3>
                            <small>
                                ${post.user.name}
                            </small>
                            
                            <br>
                            <small>
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 Likes
                                </a>
                            </small>

                        </p>

                        <!-- adding form for the comment -->
                        <div id="post-comments">
                            
                            <!-- Showing comment before the form -->
                            <div class="post-comments-list">
                                <ul id="post-comments- ${post._id}">
                                    
                                </ul>
                            </div>
                    
                            <!-- form for only signed in users -->
                            
                                <form action="/comments/create" method="post">
                                    <input type="text" name="content" placeholder="Type here to add comment.....">
                                    <!-- pre initializing post id -->
                                    <input type="hidden" name="post" value=" ${post._id}"> 
                                    <input type="submit" value="Add Comment">
                                </form>
                                
                        </div>
                        
                        
                    </li>`)
    }

    // method to delete the posts from dom
    let deletePost = function(deleteLink) {
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }
    createPost();
    convertPostsToAjax();
}