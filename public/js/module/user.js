/**
 * user
 * Created by phachon@163.com
 */
var User = {

    set: function () {
        $('[name="set"]').each(function() {
            $(this).fancybox({
                minWidth: 300,
                minHeight: 580,
                width: '30%',
                height: '60%',
                autoSize: false,
                type: 'iframe',
                href: $(this).attr('data-link')
            });
        });

        $('[name="password"]').each(function() {
            $(this).fancybox({
                minWidth: 300,
                minHeight: 450,
                width: '30%',
                height: '60%',
                autoSize: false,
                type: 'iframe',
                href: $(this).attr('data-link')
            });
        });
    }
}
