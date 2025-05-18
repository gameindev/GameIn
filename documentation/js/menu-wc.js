'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">gamein-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-04975d2a03a592efb339ac97439ee01f0da1abc430d0220c941470f688b3e6d0b62525480db5890f95640ff051054951761c651d3bfaad67b4c469c3e1379705"' : 'data-bs-target="#xs-controllers-links-module-AppModule-04975d2a03a592efb339ac97439ee01f0da1abc430d0220c941470f688b3e6d0b62525480db5890f95640ff051054951761c651d3bfaad67b4c469c3e1379705"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-04975d2a03a592efb339ac97439ee01f0da1abc430d0220c941470f688b3e6d0b62525480db5890f95640ff051054951761c651d3bfaad67b4c469c3e1379705"' :
                                            'id="xs-controllers-links-module-AppModule-04975d2a03a592efb339ac97439ee01f0da1abc430d0220c941470f688b3e6d0b62525480db5890f95640ff051054951761c651d3bfaad67b4c469c3e1379705"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-04975d2a03a592efb339ac97439ee01f0da1abc430d0220c941470f688b3e6d0b62525480db5890f95640ff051054951761c651d3bfaad67b4c469c3e1379705"' : 'data-bs-target="#xs-injectables-links-module-AppModule-04975d2a03a592efb339ac97439ee01f0da1abc430d0220c941470f688b3e6d0b62525480db5890f95640ff051054951761c651d3bfaad67b4c469c3e1379705"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-04975d2a03a592efb339ac97439ee01f0da1abc430d0220c941470f688b3e6d0b62525480db5890f95640ff051054951761c651d3bfaad67b4c469c3e1379705"' :
                                        'id="xs-injectables-links-module-AppModule-04975d2a03a592efb339ac97439ee01f0da1abc430d0220c941470f688b3e6d0b62525480db5890f95640ff051054951761c651d3bfaad67b4c469c3e1379705"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserProfileModule.html" data-type="entity-link" >UserProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserProfileModule-393129eb2f97342b7f2d5a9e2db9fb4c3719ab2ca66601be1de41675aeb816ea1a5530c1c1f62b954f1bb063caf1e0d1b0484c7ac88977c8e4576075532ce783"' : 'data-bs-target="#xs-controllers-links-module-UserProfileModule-393129eb2f97342b7f2d5a9e2db9fb4c3719ab2ca66601be1de41675aeb816ea1a5530c1c1f62b954f1bb063caf1e0d1b0484c7ac88977c8e4576075532ce783"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserProfileModule-393129eb2f97342b7f2d5a9e2db9fb4c3719ab2ca66601be1de41675aeb816ea1a5530c1c1f62b954f1bb063caf1e0d1b0484c7ac88977c8e4576075532ce783"' :
                                            'id="xs-controllers-links-module-UserProfileModule-393129eb2f97342b7f2d5a9e2db9fb4c3719ab2ca66601be1de41675aeb816ea1a5530c1c1f62b954f1bb063caf1e0d1b0484c7ac88977c8e4576075532ce783"' }>
                                            <li class="link">
                                                <a href="controllers/UserProfileController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfileController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-25dc171d679d7d21dc82ab6c6e24f755f4688b59b261a6bd1adad9e204e0314a34cb39972be2dafe5904421871ce820ad2f2f93bec74e031a6592b5b2091f3c3"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-25dc171d679d7d21dc82ab6c6e24f755f4688b59b261a6bd1adad9e204e0314a34cb39972be2dafe5904421871ce820ad2f2f93bec74e031a6592b5b2091f3c3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-25dc171d679d7d21dc82ab6c6e24f755f4688b59b261a6bd1adad9e204e0314a34cb39972be2dafe5904421871ce820ad2f2f93bec74e031a6592b5b2091f3c3"' :
                                            'id="xs-controllers-links-module-UsersModule-25dc171d679d7d21dc82ab6c6e24f755f4688b59b261a6bd1adad9e204e0314a34cb39972be2dafe5904421871ce820ad2f2f93bec74e031a6592b5b2091f3c3"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-25dc171d679d7d21dc82ab6c6e24f755f4688b59b261a6bd1adad9e204e0314a34cb39972be2dafe5904421871ce820ad2f2f93bec74e031a6592b5b2091f3c3"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-25dc171d679d7d21dc82ab6c6e24f755f4688b59b261a6bd1adad9e204e0314a34cb39972be2dafe5904421871ce820ad2f2f93bec74e031a6592b5b2091f3c3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-25dc171d679d7d21dc82ab6c6e24f755f4688b59b261a6bd1adad9e204e0314a34cb39972be2dafe5904421871ce820ad2f2f93bec74e031a6592b5b2091f3c3"' :
                                        'id="xs-injectables-links-module-UsersModule-25dc171d679d7d21dc82ab6c6e24f755f4688b59b261a6bd1adad9e204e0314a34cb39972be2dafe5904421871ce820ad2f2f93bec74e031a6592b5b2091f3c3"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserProfileController.html" data-type="entity-link" >UserProfileController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});