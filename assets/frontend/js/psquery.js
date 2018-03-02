$(document).ready(function() {

     // Focus the subject box.
     $('input[id="subject"]').focus();

    /**
     * Fetch related articles
     **/
    // Setup before functions
    var typingTimer;
    var doneTypingInterval = 20;

    // On keyup, start the countdown
    $('input[id="subject"]').keyup(function() {
        // Only if self-service module is enabled and setting is on
        if (relatedArticlesEnabled) {
            // Clear any existing timer
            clearTimeout(typingTimer);
            // If there is a subject and it is 3 characters or longer
            if ($(this).val().length > 2) {
                var subject = $(this).val();
                typingTimer = setTimeout(function() {
                    fetchArticles(subject);
                }, doneTypingInterval);
            }
        }
    });

    // User has finished typing, fetch related articles
    function fetchArticles(subject) {
        $.get(
            laroute.route('ticket.frontend.ticket.relatedArticles'),
            {
                "subject": subject
            },
            function(response) {
                if (response.status == 'success') {
                    // Show box with view
                    $('.suggested-articles .articles-list').html(response.data.view);
                    $('.suggested-articles').show();
                } else {
                    // Hide box
                    $('.suggested-articles').hide();
                }
            },
            'json'
        ).fail(function() {
            // Hide box
            $('.suggested-articles').hide();
        });
    }

});