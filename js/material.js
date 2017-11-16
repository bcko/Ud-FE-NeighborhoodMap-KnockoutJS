window.mdc.autoInit();
let drawer = new mdc.drawer.MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'));
document.querySelector('.mdc-toolbar__menu-icon').addEventListener('click', () => drawer.open = true);