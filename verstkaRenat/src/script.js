$(function () {
    const animationSpeed      = 300
    const navDropdown         = $('.nav__dropdown')
    const navLink             = $('.nav__link')
    const navItem             = $('.nav__item')
    const headerUserName      = $('.header__user--name')
    const headerUserAlert     = $('.header__user--alert')
    const headerUserMail      = $('.header__user--mail')
    const userDropdown        = $('.user__dropdown')
    const messageDropdown     = $('.message__dropdown')
    const alertsDropdown      = $('.alerts__dropdown')
    const componentsChildren  = $('.components').children('.nav__dropdown')
    const components          = $('.components')
    const tables              = $('.tables')


    navDropdown.hide();
    userDropdown.hide();
    alertsDropdown.hide();
    messageDropdown.hide();
    componentsChildren.show();
    components.toggleClass('nav__item--open')
    tables.toggleClass('nav__item--open')

    navLink.click(function () {
        const parent = $(this).parent()
        const dropdown = parent.children('.nav__dropdown')

        navItem .not(parent).removeClass('nav__item--open')
        navDropdown.not(dropdown).hide(animationSpeed)

        parent.toggleClass('nav__item--open')
        dropdown.toggle(animationSpeed)
    });

    headerUserName.click(function () {
        userDropdown.toggle(animationSpeed)
    });

    $('.btn__sidebar').click(function () {
        $('.sidebar').toggleClass('size');
    });

    headerUserAlert.click(function () {
        alertsDropdown.toggle(animationSpeed)
    });

    headerUserMail.click(function () {
        messageDropdown.toggle(animationSpeed)
    });

    $(document).click(function (e) {
        if (!navItem.is(e.target) && navItem.has(e.target).length === 0) { // Если 1- мы не нажали на навайтем, и 2-мы не нажали на его дочек, то закрываем все дроплисты
            navDropdown.hide(animationSpeed);
        }

        if (!headerUserName.is(e.target) && headerUserName.has(e.target).length === 0) {
            userDropdown.hide(animationSpeed);
        }

        if (!headerUserMail.is(e.target) && headerUserMail.has(e.target).length === 0) {
            messageDropdown.hide(animationSpeed);
        }

        if (!headerUserAlert.is(e.target) && headerUserAlert.has(e.target).length === 0) {
            alertsDropdown.hide(animationSpeed);
        }

    })
});