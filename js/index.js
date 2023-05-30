$(document).ready(function () {
    function home() {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            success: function (posts) {
                displaypost(posts);
            }
        });
    }
    $('body').on('click', 'a.post-link', function () {
        var postId = $(this).data('id');
        console.log(postId);
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts/' + postId,
            method: 'GET',
            success: function (post) {
                $('#blog').html('<h3>' + post.title + '</h3><p>' + post.body + '</p>');
                $.ajax({
                    url: 'https://jsonplaceholder.typicode.com/comments?postId=' + postId,
                    method: 'GET',
                    success: function (comments) {
                        $('#blog').append('<h2>Commentaires</h2>');
                        $.each(comments, function (index, comment) {
                            $('#blog').append('<p><strong>' + comment.name + '</strong> - ' + comment.body + '</p>');
                        });
                    }
                });
            }
        });
    });
    $('body').on('click', 'a.user-link', function () {
        $('#blog').html('')
        var userId = $(this).data('id');
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users/' + userId,
            method: 'GET',
            success: function (user) {
                var appendData = '<h3>' + user.name + '</h3><p><br>' +
                    '<span>Username : ' + user.username + '</span><br>' +
                    '<span>email : ' + user.email + '</span><br>' +
                    '<span>address : ' + user.address.street + '</span>';
                console.log(appendData);
                $('#blog').html(appendData);

            }
        }).then(function (user) {
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/posts?userId=' + userId,
                method: 'GET',
                dataType: 'json',
                success: function (authorPosts) {
                    authorPosts.forEach(function (post) {
                        $('#blog').append('<div class="m-3 p-3 post d-flex justify-content-between"><a class="post-link" data-id="' + post.id + '">' + post.title + '</a>' + ' <a class="user-link" data-id="' + post.userId + '"></a></div>');


                    })
                    console.log(authorPosts);
                },
                error: function () {
                    alert('Erreur lors de la récupération des articles de l\'auteur.');
                }
            });
        })
    });
    $(".page-home").on('click', function () {
        home()
    })
    home();
});


function displaypost(post) {
    $('#blog').html('');
    post.forEach(function (post) {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users/' + post.userId,
            method: 'GET',
            dataType: 'json',
            success: function (user) {
                $('#blog').append('<div class="m-3 p-3 post d-flex justify-content-between"><a class="post-link" data-id="' + post.id + '">' + post.title + '</a>' + ' <a class="user-link" data-id="' + post.userId + '"><b> ' + user.name + '</b ></a></div>');
            },
            error: function () {
                alert('Erreur lors de la récupération des informations de l\'auteur.');
            }
        });
    });
}





