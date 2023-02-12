$(document).ready(function()
{
    $('.carousel').carousel(
        {
            interval:6000
        });

        // show color option when clicking the gear

        $(".gear-check").click(function()
        {
$(".color-option").fadeToggle()
        });
    });