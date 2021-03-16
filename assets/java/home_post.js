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
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    

    // method to create post in dom
    let newPostDom = function(post){
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
                type: "GET",
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    createPost();
}