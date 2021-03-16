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
                    $('#post-list-container>ul').prepend(newPost);
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    createPost();

    // method to create post in dom
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                        <p>
                            <h3>${ post.content}</h3>
                            <small>
                                ${post.user.name}
                            </small>
                        </p>
                        <!-- The anchor tag to delete the post -->
                        
                            <small>
                                <a class="delete-psot-button" href="/posts/destroy/${ post.id }">X</a>
                            </small>
                        
                    
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
}