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
                                            'data-bs-target="#controllers-links-module-AppModule-32c2615c3e69119f40daa2cc987fc297862ecc5c37a87df2274dbec87c3482bfc0cdb3bf738ce24a1ee5b06a2e71fbb32be0c04e36ca72ebede16841ad4d891c"' : 'data-bs-target="#xs-controllers-links-module-AppModule-32c2615c3e69119f40daa2cc987fc297862ecc5c37a87df2274dbec87c3482bfc0cdb3bf738ce24a1ee5b06a2e71fbb32be0c04e36ca72ebede16841ad4d891c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-32c2615c3e69119f40daa2cc987fc297862ecc5c37a87df2274dbec87c3482bfc0cdb3bf738ce24a1ee5b06a2e71fbb32be0c04e36ca72ebede16841ad4d891c"' :
                                            'id="xs-controllers-links-module-AppModule-32c2615c3e69119f40daa2cc987fc297862ecc5c37a87df2274dbec87c3482bfc0cdb3bf738ce24a1ee5b06a2e71fbb32be0c04e36ca72ebede16841ad4d891c"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-32c2615c3e69119f40daa2cc987fc297862ecc5c37a87df2274dbec87c3482bfc0cdb3bf738ce24a1ee5b06a2e71fbb32be0c04e36ca72ebede16841ad4d891c"' : 'data-bs-target="#xs-injectables-links-module-AppModule-32c2615c3e69119f40daa2cc987fc297862ecc5c37a87df2274dbec87c3482bfc0cdb3bf738ce24a1ee5b06a2e71fbb32be0c04e36ca72ebede16841ad4d891c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-32c2615c3e69119f40daa2cc987fc297862ecc5c37a87df2274dbec87c3482bfc0cdb3bf738ce24a1ee5b06a2e71fbb32be0c04e36ca72ebede16841ad4d891c"' :
                                        'id="xs-injectables-links-module-AppModule-32c2615c3e69119f40daa2cc987fc297862ecc5c37a87df2274dbec87c3482bfc0cdb3bf738ce24a1ee5b06a2e71fbb32be0c04e36ca72ebede16841ad4d891c"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-22326f36d5511484cc5141031b7f198ef2accfb2f02fe3631fb9635a7cc09d0d8be153751948dd7b3553d8c39ca7619ff356c547f49495a05e5d3d5bfbf2348c"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-22326f36d5511484cc5141031b7f198ef2accfb2f02fe3631fb9635a7cc09d0d8be153751948dd7b3553d8c39ca7619ff356c547f49495a05e5d3d5bfbf2348c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-22326f36d5511484cc5141031b7f198ef2accfb2f02fe3631fb9635a7cc09d0d8be153751948dd7b3553d8c39ca7619ff356c547f49495a05e5d3d5bfbf2348c"' :
                                            'id="xs-controllers-links-module-AuthModule-22326f36d5511484cc5141031b7f198ef2accfb2f02fe3631fb9635a7cc09d0d8be153751948dd7b3553d8c39ca7619ff356c547f49495a05e5d3d5bfbf2348c"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/GoogleAuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-22326f36d5511484cc5141031b7f198ef2accfb2f02fe3631fb9635a7cc09d0d8be153751948dd7b3553d8c39ca7619ff356c547f49495a05e5d3d5bfbf2348c"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-22326f36d5511484cc5141031b7f198ef2accfb2f02fe3631fb9635a7cc09d0d8be153751948dd7b3553d8c39ca7619ff356c547f49495a05e5d3d5bfbf2348c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-22326f36d5511484cc5141031b7f198ef2accfb2f02fe3631fb9635a7cc09d0d8be153751948dd7b3553d8c39ca7619ff356c547f49495a05e5d3d5bfbf2348c"' :
                                        'id="xs-injectables-links-module-AuthModule-22326f36d5511484cc5141031b7f198ef2accfb2f02fe3631fb9635a7cc09d0d8be153751948dd7b3553d8c39ca7619ff356c547f49495a05e5d3d5bfbf2348c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenerateTokensProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenerateTokensProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleAuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshTokensProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokensProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SignInProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BrandProfilesModule.html" data-type="entity-link" >BrandProfilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BrandProfilesModule-058fed2fd4e3f4b1d2d9fd09df3e562fea27387a908cbba2a7801d425d03b62cf00b1124b45636171eb2df0921c5939bb637ab9f110ddea3769cb07081f8cd85"' : 'data-bs-target="#xs-controllers-links-module-BrandProfilesModule-058fed2fd4e3f4b1d2d9fd09df3e562fea27387a908cbba2a7801d425d03b62cf00b1124b45636171eb2df0921c5939bb637ab9f110ddea3769cb07081f8cd85"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BrandProfilesModule-058fed2fd4e3f4b1d2d9fd09df3e562fea27387a908cbba2a7801d425d03b62cf00b1124b45636171eb2df0921c5939bb637ab9f110ddea3769cb07081f8cd85"' :
                                            'id="xs-controllers-links-module-BrandProfilesModule-058fed2fd4e3f4b1d2d9fd09df3e562fea27387a908cbba2a7801d425d03b62cf00b1124b45636171eb2df0921c5939bb637ab9f110ddea3769cb07081f8cd85"' }>
                                            <li class="link">
                                                <a href="controllers/BrandProfilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandProfilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BrandProfilesModule-058fed2fd4e3f4b1d2d9fd09df3e562fea27387a908cbba2a7801d425d03b62cf00b1124b45636171eb2df0921c5939bb637ab9f110ddea3769cb07081f8cd85"' : 'data-bs-target="#xs-injectables-links-module-BrandProfilesModule-058fed2fd4e3f4b1d2d9fd09df3e562fea27387a908cbba2a7801d425d03b62cf00b1124b45636171eb2df0921c5939bb637ab9f110ddea3769cb07081f8cd85"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BrandProfilesModule-058fed2fd4e3f4b1d2d9fd09df3e562fea27387a908cbba2a7801d425d03b62cf00b1124b45636171eb2df0921c5939bb637ab9f110ddea3769cb07081f8cd85"' :
                                        'id="xs-injectables-links-module-BrandProfilesModule-058fed2fd4e3f4b1d2d9fd09df3e562fea27387a908cbba2a7801d425d03b62cf00b1124b45636171eb2df0921c5939bb637ab9f110ddea3769cb07081f8cd85"' }>
                                        <li class="link">
                                            <a href="injectables/BrandProfilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandProfilesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateBrandCoverPicProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateBrandCoverPicProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateBrandProfilePicProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateBrandProfilePicProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateBrandProfileProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateBrandProfileProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CreatorProfilesModule.html" data-type="entity-link" >CreatorProfilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CreatorProfilesModule-4ad2b38dc06165ea6f3ca8f027f4ea99ab9760a1a95b784abf2e4cf62503eaee73d9043af84760ef05ce393aff4820f1889c148c2ba8c0dfa99370a642f329c4"' : 'data-bs-target="#xs-controllers-links-module-CreatorProfilesModule-4ad2b38dc06165ea6f3ca8f027f4ea99ab9760a1a95b784abf2e4cf62503eaee73d9043af84760ef05ce393aff4820f1889c148c2ba8c0dfa99370a642f329c4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CreatorProfilesModule-4ad2b38dc06165ea6f3ca8f027f4ea99ab9760a1a95b784abf2e4cf62503eaee73d9043af84760ef05ce393aff4820f1889c148c2ba8c0dfa99370a642f329c4"' :
                                            'id="xs-controllers-links-module-CreatorProfilesModule-4ad2b38dc06165ea6f3ca8f027f4ea99ab9760a1a95b784abf2e4cf62503eaee73d9043af84760ef05ce393aff4820f1889c148c2ba8c0dfa99370a642f329c4"' }>
                                            <li class="link">
                                                <a href="controllers/CreatorProfilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreatorProfilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CreatorProfilesModule-4ad2b38dc06165ea6f3ca8f027f4ea99ab9760a1a95b784abf2e4cf62503eaee73d9043af84760ef05ce393aff4820f1889c148c2ba8c0dfa99370a642f329c4"' : 'data-bs-target="#xs-injectables-links-module-CreatorProfilesModule-4ad2b38dc06165ea6f3ca8f027f4ea99ab9760a1a95b784abf2e4cf62503eaee73d9043af84760ef05ce393aff4820f1889c148c2ba8c0dfa99370a642f329c4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CreatorProfilesModule-4ad2b38dc06165ea6f3ca8f027f4ea99ab9760a1a95b784abf2e4cf62503eaee73d9043af84760ef05ce393aff4820f1889c148c2ba8c0dfa99370a642f329c4"' :
                                        'id="xs-injectables-links-module-CreatorProfilesModule-4ad2b38dc06165ea6f3ca8f027f4ea99ab9760a1a95b784abf2e4cf62503eaee73d9043af84760ef05ce393aff4820f1889c148c2ba8c0dfa99370a642f329c4"' }>
                                        <li class="link">
                                            <a href="injectables/CreatorProfilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreatorProfilesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateCreatorCoverPicProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateCreatorCoverPicProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateCreatorProfileProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateCreatorProfileProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DiscordModule.html" data-type="entity-link" >DiscordModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DiscordModule-d58ae3383318db555c8dada84cc26ffa83e8069d7c3563f2ce68f6053af78737a035d68a04c7b62df0222999444f4100125acff09642545944db247458cc6d75"' : 'data-bs-target="#xs-injectables-links-module-DiscordModule-d58ae3383318db555c8dada84cc26ffa83e8069d7c3563f2ce68f6053af78737a035d68a04c7b62df0222999444f4100125acff09642545944db247458cc6d75"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DiscordModule-d58ae3383318db555c8dada84cc26ffa83e8069d7c3563f2ce68f6053af78737a035d68a04c7b62df0222999444f4100125acff09642545944db247458cc6d75"' :
                                        'id="xs-injectables-links-module-DiscordModule-d58ae3383318db555c8dada84cc26ffa83e8069d7c3563f2ce68f6053af78737a035d68a04c7b62df0222999444f4100125acff09642545944db247458cc6d75"' }>
                                        <li class="link">
                                            <a href="injectables/DiscordService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiscordService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailsModule.html" data-type="entity-link" >EmailsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EmailsModule-8ced9a37b32238b300ba9e0526e84ff0a5d5116e7e214acc2ced954a7321fed767c29173c503b3b10b05408563d50399367b8a446cf76c8e59be03627c5d1eed"' : 'data-bs-target="#xs-controllers-links-module-EmailsModule-8ced9a37b32238b300ba9e0526e84ff0a5d5116e7e214acc2ced954a7321fed767c29173c503b3b10b05408563d50399367b8a446cf76c8e59be03627c5d1eed"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmailsModule-8ced9a37b32238b300ba9e0526e84ff0a5d5116e7e214acc2ced954a7321fed767c29173c503b3b10b05408563d50399367b8a446cf76c8e59be03627c5d1eed"' :
                                            'id="xs-controllers-links-module-EmailsModule-8ced9a37b32238b300ba9e0526e84ff0a5d5116e7e214acc2ced954a7321fed767c29173c503b3b10b05408563d50399367b8a446cf76c8e59be03627c5d1eed"' }>
                                            <li class="link">
                                                <a href="controllers/EmailsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmailsModule-8ced9a37b32238b300ba9e0526e84ff0a5d5116e7e214acc2ced954a7321fed767c29173c503b3b10b05408563d50399367b8a446cf76c8e59be03627c5d1eed"' : 'data-bs-target="#xs-injectables-links-module-EmailsModule-8ced9a37b32238b300ba9e0526e84ff0a5d5116e7e214acc2ced954a7321fed767c29173c503b3b10b05408563d50399367b8a446cf76c8e59be03627c5d1eed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailsModule-8ced9a37b32238b300ba9e0526e84ff0a5d5116e7e214acc2ced954a7321fed767c29173c503b3b10b05408563d50399367b8a446cf76c8e59be03627c5d1eed"' :
                                        'id="xs-injectables-links-module-EmailsModule-8ced9a37b32238b300ba9e0526e84ff0a5d5116e7e214acc2ced954a7321fed767c29173c503b3b10b05408563d50399367b8a446cf76c8e59be03627c5d1eed"' }>
                                        <li class="link">
                                            <a href="injectables/EmailsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InstagramModule.html" data-type="entity-link" >InstagramModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-InstagramModule-e3982159432b7554f96b1ebb0623f23d577de9945dd5eb05a09d57ee84338967a317609dbd6bc57f11b3d79d905fa75338fc17ef9c95868b144632286e906cad"' : 'data-bs-target="#xs-injectables-links-module-InstagramModule-e3982159432b7554f96b1ebb0623f23d577de9945dd5eb05a09d57ee84338967a317609dbd6bc57f11b3d79d905fa75338fc17ef9c95868b144632286e906cad"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InstagramModule-e3982159432b7554f96b1ebb0623f23d577de9945dd5eb05a09d57ee84338967a317609dbd6bc57f11b3d79d905fa75338fc17ef9c95868b144632286e906cad"' :
                                        'id="xs-injectables-links-module-InstagramModule-e3982159432b7554f96b1ebb0623f23d577de9945dd5eb05a09d57ee84338967a317609dbd6bc57f11b3d79d905fa75338fc17ef9c95868b144632286e906cad"' }>
                                        <li class="link">
                                            <a href="injectables/InstagramService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InstagramService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetadataModule.html" data-type="entity-link" >MetadataModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MetadataModule-e32b73cd97f6a339337bccd5de7917a067e85760c28af9b8a04946ff8c6c029fa65689b3f5c375f75ee4446ab443ab162955506884f8d76c6055e2bfdca18143"' : 'data-bs-target="#xs-injectables-links-module-MetadataModule-e32b73cd97f6a339337bccd5de7917a067e85760c28af9b8a04946ff8c6c029fa65689b3f5c375f75ee4446ab443ab162955506884f8d76c6055e2bfdca18143"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MetadataModule-e32b73cd97f6a339337bccd5de7917a067e85760c28af9b8a04946ff8c6c029fa65689b3f5c375f75ee4446ab443ab162955506884f8d76c6055e2bfdca18143"' :
                                        'id="xs-injectables-links-module-MetadataModule-e32b73cd97f6a339337bccd5de7917a067e85760c28af9b8a04946ff8c6c029fa65689b3f5c375f75ee4446ab443ab162955506884f8d76c6055e2bfdca18143"' }>
                                        <li class="link">
                                            <a href="injectables/MetadataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetadataService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OfferingOffersModule.html" data-type="entity-link" >OfferingOffersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OfferingOffersModule-ff444b76dc4036222b0053e4235cd409ad2ecebea4ddd9797cb620b8277a56c8c3f0a66cf6eb4e154c55bb8445bb49f491b3e4ae877a0d763eec63403121b0d4"' : 'data-bs-target="#xs-controllers-links-module-OfferingOffersModule-ff444b76dc4036222b0053e4235cd409ad2ecebea4ddd9797cb620b8277a56c8c3f0a66cf6eb4e154c55bb8445bb49f491b3e4ae877a0d763eec63403121b0d4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OfferingOffersModule-ff444b76dc4036222b0053e4235cd409ad2ecebea4ddd9797cb620b8277a56c8c3f0a66cf6eb4e154c55bb8445bb49f491b3e4ae877a0d763eec63403121b0d4"' :
                                            'id="xs-controllers-links-module-OfferingOffersModule-ff444b76dc4036222b0053e4235cd409ad2ecebea4ddd9797cb620b8277a56c8c3f0a66cf6eb4e154c55bb8445bb49f491b3e4ae877a0d763eec63403121b0d4"' }>
                                            <li class="link">
                                                <a href="controllers/OfferingOffersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferingOffersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OfferingOffersModule-ff444b76dc4036222b0053e4235cd409ad2ecebea4ddd9797cb620b8277a56c8c3f0a66cf6eb4e154c55bb8445bb49f491b3e4ae877a0d763eec63403121b0d4"' : 'data-bs-target="#xs-injectables-links-module-OfferingOffersModule-ff444b76dc4036222b0053e4235cd409ad2ecebea4ddd9797cb620b8277a56c8c3f0a66cf6eb4e154c55bb8445bb49f491b3e4ae877a0d763eec63403121b0d4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OfferingOffersModule-ff444b76dc4036222b0053e4235cd409ad2ecebea4ddd9797cb620b8277a56c8c3f0a66cf6eb4e154c55bb8445bb49f491b3e4ae877a0d763eec63403121b0d4"' :
                                        'id="xs-injectables-links-module-OfferingOffersModule-ff444b76dc4036222b0053e4235cd409ad2ecebea4ddd9797cb620b8277a56c8c3f0a66cf6eb4e154c55bb8445bb49f491b3e4ae877a0d763eec63403121b0d4"' }>
                                        <li class="link">
                                            <a href="injectables/OfferingOffersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferingOffersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OfferingPriceModule.html" data-type="entity-link" >OfferingPriceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OfferingPriceModule-baa4d5b74b6441b1750a3b985bf3a0bc3de0d2d421f2f21e82ca92d2d2e7b7dfd065a7c41e45feecf191c8c8120c42d26234d918e22faea70ae2d8d06fd75d8a"' : 'data-bs-target="#xs-controllers-links-module-OfferingPriceModule-baa4d5b74b6441b1750a3b985bf3a0bc3de0d2d421f2f21e82ca92d2d2e7b7dfd065a7c41e45feecf191c8c8120c42d26234d918e22faea70ae2d8d06fd75d8a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OfferingPriceModule-baa4d5b74b6441b1750a3b985bf3a0bc3de0d2d421f2f21e82ca92d2d2e7b7dfd065a7c41e45feecf191c8c8120c42d26234d918e22faea70ae2d8d06fd75d8a"' :
                                            'id="xs-controllers-links-module-OfferingPriceModule-baa4d5b74b6441b1750a3b985bf3a0bc3de0d2d421f2f21e82ca92d2d2e7b7dfd065a7c41e45feecf191c8c8120c42d26234d918e22faea70ae2d8d06fd75d8a"' }>
                                            <li class="link">
                                                <a href="controllers/OfferingPriceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferingPriceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OfferingPriceModule-baa4d5b74b6441b1750a3b985bf3a0bc3de0d2d421f2f21e82ca92d2d2e7b7dfd065a7c41e45feecf191c8c8120c42d26234d918e22faea70ae2d8d06fd75d8a"' : 'data-bs-target="#xs-injectables-links-module-OfferingPriceModule-baa4d5b74b6441b1750a3b985bf3a0bc3de0d2d421f2f21e82ca92d2d2e7b7dfd065a7c41e45feecf191c8c8120c42d26234d918e22faea70ae2d8d06fd75d8a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OfferingPriceModule-baa4d5b74b6441b1750a3b985bf3a0bc3de0d2d421f2f21e82ca92d2d2e7b7dfd065a7c41e45feecf191c8c8120c42d26234d918e22faea70ae2d8d06fd75d8a"' :
                                        'id="xs-injectables-links-module-OfferingPriceModule-baa4d5b74b6441b1750a3b985bf3a0bc3de0d2d421f2f21e82ca92d2d2e7b7dfd065a7c41e45feecf191c8c8120c42d26234d918e22faea70ae2d8d06fd75d8a"' }>
                                        <li class="link">
                                            <a href="injectables/OfferingPriceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferingPriceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OfferingsModule.html" data-type="entity-link" >OfferingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OfferingsModule-70dd542b069d43a812914d97365a007c22327c103ce6c4bd67a6129064e5b6e293da3c6163e8625ab2c644f2884d6d392e06fba6c53f77961974065b3c3c197b"' : 'data-bs-target="#xs-controllers-links-module-OfferingsModule-70dd542b069d43a812914d97365a007c22327c103ce6c4bd67a6129064e5b6e293da3c6163e8625ab2c644f2884d6d392e06fba6c53f77961974065b3c3c197b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OfferingsModule-70dd542b069d43a812914d97365a007c22327c103ce6c4bd67a6129064e5b6e293da3c6163e8625ab2c644f2884d6d392e06fba6c53f77961974065b3c3c197b"' :
                                            'id="xs-controllers-links-module-OfferingsModule-70dd542b069d43a812914d97365a007c22327c103ce6c4bd67a6129064e5b6e293da3c6163e8625ab2c644f2884d6d392e06fba6c53f77961974065b3c3c197b"' }>
                                            <li class="link">
                                                <a href="controllers/OfferingsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferingsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OfferingsModule-70dd542b069d43a812914d97365a007c22327c103ce6c4bd67a6129064e5b6e293da3c6163e8625ab2c644f2884d6d392e06fba6c53f77961974065b3c3c197b"' : 'data-bs-target="#xs-injectables-links-module-OfferingsModule-70dd542b069d43a812914d97365a007c22327c103ce6c4bd67a6129064e5b6e293da3c6163e8625ab2c644f2884d6d392e06fba6c53f77961974065b3c3c197b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OfferingsModule-70dd542b069d43a812914d97365a007c22327c103ce6c4bd67a6129064e5b6e293da3c6163e8625ab2c644f2884d6d392e06fba6c53f77961974065b3c3c197b"' :
                                        'id="xs-injectables-links-module-OfferingsModule-70dd542b069d43a812914d97365a007c22327c103ce6c4bd67a6129064e5b6e293da3c6163e8625ab2c644f2884d6d392e06fba6c53f77961974065b3c3c197b"' }>
                                        <li class="link">
                                            <a href="injectables/OfferingBaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferingBaseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OfferingOffersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferingOffersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OfferingPriceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferingPriceService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OfferingsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferingsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PreferredGamesModule.html" data-type="entity-link" >PreferredGamesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PreferredGamesModule-fc4fc3f3ae05e07d255bc5d876838e6b9afeb1514fc9732d0bdb540950acd7b43b6f200ae7bfdb80865d0fb489019d46b339646f07fd6573eb0baaa403594f08"' : 'data-bs-target="#xs-controllers-links-module-PreferredGamesModule-fc4fc3f3ae05e07d255bc5d876838e6b9afeb1514fc9732d0bdb540950acd7b43b6f200ae7bfdb80865d0fb489019d46b339646f07fd6573eb0baaa403594f08"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PreferredGamesModule-fc4fc3f3ae05e07d255bc5d876838e6b9afeb1514fc9732d0bdb540950acd7b43b6f200ae7bfdb80865d0fb489019d46b339646f07fd6573eb0baaa403594f08"' :
                                            'id="xs-controllers-links-module-PreferredGamesModule-fc4fc3f3ae05e07d255bc5d876838e6b9afeb1514fc9732d0bdb540950acd7b43b6f200ae7bfdb80865d0fb489019d46b339646f07fd6573eb0baaa403594f08"' }>
                                            <li class="link">
                                                <a href="controllers/PreferredGamesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreferredGamesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PreferredGamesModule-fc4fc3f3ae05e07d255bc5d876838e6b9afeb1514fc9732d0bdb540950acd7b43b6f200ae7bfdb80865d0fb489019d46b339646f07fd6573eb0baaa403594f08"' : 'data-bs-target="#xs-injectables-links-module-PreferredGamesModule-fc4fc3f3ae05e07d255bc5d876838e6b9afeb1514fc9732d0bdb540950acd7b43b6f200ae7bfdb80865d0fb489019d46b339646f07fd6573eb0baaa403594f08"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PreferredGamesModule-fc4fc3f3ae05e07d255bc5d876838e6b9afeb1514fc9732d0bdb540950acd7b43b6f200ae7bfdb80865d0fb489019d46b339646f07fd6573eb0baaa403594f08"' :
                                        'id="xs-injectables-links-module-PreferredGamesModule-fc4fc3f3ae05e07d255bc5d876838e6b9afeb1514fc9732d0bdb540950acd7b43b6f200ae7bfdb80865d0fb489019d46b339646f07fd6573eb0baaa403594f08"' }>
                                        <li class="link">
                                            <a href="injectables/PreferredGamesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreferredGamesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SocialIntegrationModule.html" data-type="entity-link" >SocialIntegrationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SocialIntegrationModule-16002b068cd1cfde5b049706efa3ea9d0543d446b0ba70216766b6f2b52797ce750b41d4e0ad8897c0f5215f06ab2ad5f247e657ef4a102cbd92a0b31edd19b7"' : 'data-bs-target="#xs-controllers-links-module-SocialIntegrationModule-16002b068cd1cfde5b049706efa3ea9d0543d446b0ba70216766b6f2b52797ce750b41d4e0ad8897c0f5215f06ab2ad5f247e657ef4a102cbd92a0b31edd19b7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SocialIntegrationModule-16002b068cd1cfde5b049706efa3ea9d0543d446b0ba70216766b6f2b52797ce750b41d4e0ad8897c0f5215f06ab2ad5f247e657ef4a102cbd92a0b31edd19b7"' :
                                            'id="xs-controllers-links-module-SocialIntegrationModule-16002b068cd1cfde5b049706efa3ea9d0543d446b0ba70216766b6f2b52797ce750b41d4e0ad8897c0f5215f06ab2ad5f247e657ef4a102cbd92a0b31edd19b7"' }>
                                            <li class="link">
                                                <a href="controllers/SocialIntegrationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocialIntegrationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SocialIntegrationModule-16002b068cd1cfde5b049706efa3ea9d0543d446b0ba70216766b6f2b52797ce750b41d4e0ad8897c0f5215f06ab2ad5f247e657ef4a102cbd92a0b31edd19b7"' : 'data-bs-target="#xs-injectables-links-module-SocialIntegrationModule-16002b068cd1cfde5b049706efa3ea9d0543d446b0ba70216766b6f2b52797ce750b41d4e0ad8897c0f5215f06ab2ad5f247e657ef4a102cbd92a0b31edd19b7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SocialIntegrationModule-16002b068cd1cfde5b049706efa3ea9d0543d446b0ba70216766b6f2b52797ce750b41d4e0ad8897c0f5215f06ab2ad5f247e657ef4a102cbd92a0b31edd19b7"' :
                                        'id="xs-injectables-links-module-SocialIntegrationModule-16002b068cd1cfde5b049706efa3ea9d0543d446b0ba70216766b6f2b52797ce750b41d4e0ad8897c0f5215f06ab2ad5f247e657ef4a102cbd92a0b31edd19b7"' }>
                                        <li class="link">
                                            <a href="injectables/SocialIntegrationProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocialIntegrationProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SocialIntegrationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocialIntegrationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeamsModule.html" data-type="entity-link" >TeamsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TeamsModule-71dc65598605e65db724e4f42ea02e32a9f114e031e614e57bfc32152649892cd835f086e5803b1179cf1751c2e3f625359112f62f11e5aa5703e54c0a1c24e9"' : 'data-bs-target="#xs-controllers-links-module-TeamsModule-71dc65598605e65db724e4f42ea02e32a9f114e031e614e57bfc32152649892cd835f086e5803b1179cf1751c2e3f625359112f62f11e5aa5703e54c0a1c24e9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TeamsModule-71dc65598605e65db724e4f42ea02e32a9f114e031e614e57bfc32152649892cd835f086e5803b1179cf1751c2e3f625359112f62f11e5aa5703e54c0a1c24e9"' :
                                            'id="xs-controllers-links-module-TeamsModule-71dc65598605e65db724e4f42ea02e32a9f114e031e614e57bfc32152649892cd835f086e5803b1179cf1751c2e3f625359112f62f11e5aa5703e54c0a1c24e9"' }>
                                            <li class="link">
                                                <a href="controllers/TeamsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TeamsModule-71dc65598605e65db724e4f42ea02e32a9f114e031e614e57bfc32152649892cd835f086e5803b1179cf1751c2e3f625359112f62f11e5aa5703e54c0a1c24e9"' : 'data-bs-target="#xs-injectables-links-module-TeamsModule-71dc65598605e65db724e4f42ea02e32a9f114e031e614e57bfc32152649892cd835f086e5803b1179cf1751c2e3f625359112f62f11e5aa5703e54c0a1c24e9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TeamsModule-71dc65598605e65db724e4f42ea02e32a9f114e031e614e57bfc32152649892cd835f086e5803b1179cf1751c2e3f625359112f62f11e5aa5703e54c0a1c24e9"' :
                                        'id="xs-injectables-links-module-TeamsModule-71dc65598605e65db724e4f42ea02e32a9f114e031e614e57bfc32152649892cd835f086e5803b1179cf1751c2e3f625359112f62f11e5aa5703e54c0a1c24e9"' }>
                                        <li class="link">
                                            <a href="injectables/TeamsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TwitchModule.html" data-type="entity-link" >TwitchModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TwitchModule-84b54f796b9c042e0c01e07eefea8a5b272da44d0111d0bd015d214fc7e643e1d9e763377aed206133a41072b9a508edf0c82b595fd2d110ff976edf074a9922"' : 'data-bs-target="#xs-injectables-links-module-TwitchModule-84b54f796b9c042e0c01e07eefea8a5b272da44d0111d0bd015d214fc7e643e1d9e763377aed206133a41072b9a508edf0c82b595fd2d110ff976edf074a9922"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TwitchModule-84b54f796b9c042e0c01e07eefea8a5b272da44d0111d0bd015d214fc7e643e1d9e763377aed206133a41072b9a508edf0c82b595fd2d110ff976edf074a9922"' :
                                        'id="xs-injectables-links-module-TwitchModule-84b54f796b9c042e0c01e07eefea8a5b272da44d0111d0bd015d214fc7e643e1d9e763377aed206133a41072b9a508edf0c82b595fd2d110ff976edf074a9922"' }>
                                        <li class="link">
                                            <a href="injectables/TwitchService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwitchService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadsModule.html" data-type="entity-link" >UploadsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UploadsModule-4d8ce837bf806a2f6b840c33324cec976d6a674196223d979585297c2ea3ef6fb0b18bccaeeb396ec68a5e01fa416615ca2ac02a058c7d31c591d4eb10f1095c"' : 'data-bs-target="#xs-controllers-links-module-UploadsModule-4d8ce837bf806a2f6b840c33324cec976d6a674196223d979585297c2ea3ef6fb0b18bccaeeb396ec68a5e01fa416615ca2ac02a058c7d31c591d4eb10f1095c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UploadsModule-4d8ce837bf806a2f6b840c33324cec976d6a674196223d979585297c2ea3ef6fb0b18bccaeeb396ec68a5e01fa416615ca2ac02a058c7d31c591d4eb10f1095c"' :
                                            'id="xs-controllers-links-module-UploadsModule-4d8ce837bf806a2f6b840c33324cec976d6a674196223d979585297c2ea3ef6fb0b18bccaeeb396ec68a5e01fa416615ca2ac02a058c7d31c591d4eb10f1095c"' }>
                                            <li class="link">
                                                <a href="controllers/UploadsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UploadsModule-4d8ce837bf806a2f6b840c33324cec976d6a674196223d979585297c2ea3ef6fb0b18bccaeeb396ec68a5e01fa416615ca2ac02a058c7d31c591d4eb10f1095c"' : 'data-bs-target="#xs-injectables-links-module-UploadsModule-4d8ce837bf806a2f6b840c33324cec976d6a674196223d979585297c2ea3ef6fb0b18bccaeeb396ec68a5e01fa416615ca2ac02a058c7d31c591d4eb10f1095c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadsModule-4d8ce837bf806a2f6b840c33324cec976d6a674196223d979585297c2ea3ef6fb0b18bccaeeb396ec68a5e01fa416615ca2ac02a058c7d31c591d4eb10f1095c"' :
                                        'id="xs-injectables-links-module-UploadsModule-4d8ce837bf806a2f6b840c33324cec976d6a674196223d979585297c2ea3ef6fb0b18bccaeeb396ec68a5e01fa416615ca2ac02a058c7d31c591d4eb10f1095c"' }>
                                        <li class="link">
                                            <a href="injectables/UploadsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserFollowModule.html" data-type="entity-link" >UserFollowModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserFollowModule-258ef991c19cf1dbefdab1633ad6922f545b8c139db75fecdb3ca03e3540349d5bd1a397742894c6b8aacce627f3d4a3b11f5c740f204b1355aa3899e6628103"' : 'data-bs-target="#xs-controllers-links-module-UserFollowModule-258ef991c19cf1dbefdab1633ad6922f545b8c139db75fecdb3ca03e3540349d5bd1a397742894c6b8aacce627f3d4a3b11f5c740f204b1355aa3899e6628103"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserFollowModule-258ef991c19cf1dbefdab1633ad6922f545b8c139db75fecdb3ca03e3540349d5bd1a397742894c6b8aacce627f3d4a3b11f5c740f204b1355aa3899e6628103"' :
                                            'id="xs-controllers-links-module-UserFollowModule-258ef991c19cf1dbefdab1633ad6922f545b8c139db75fecdb3ca03e3540349d5bd1a397742894c6b8aacce627f3d4a3b11f5c740f204b1355aa3899e6628103"' }>
                                            <li class="link">
                                                <a href="controllers/UserFollowController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserFollowController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserFollowModule-258ef991c19cf1dbefdab1633ad6922f545b8c139db75fecdb3ca03e3540349d5bd1a397742894c6b8aacce627f3d4a3b11f5c740f204b1355aa3899e6628103"' : 'data-bs-target="#xs-injectables-links-module-UserFollowModule-258ef991c19cf1dbefdab1633ad6922f545b8c139db75fecdb3ca03e3540349d5bd1a397742894c6b8aacce627f3d4a3b11f5c740f204b1355aa3899e6628103"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserFollowModule-258ef991c19cf1dbefdab1633ad6922f545b8c139db75fecdb3ca03e3540349d5bd1a397742894c6b8aacce627f3d4a3b11f5c740f204b1355aa3899e6628103"' :
                                        'id="xs-injectables-links-module-UserFollowModule-258ef991c19cf1dbefdab1633ad6922f545b8c139db75fecdb3ca03e3540349d5bd1a397742894c6b8aacce627f3d4a3b11f5c740f204b1355aa3899e6628103"' }>
                                        <li class="link">
                                            <a href="injectables/UserFollowService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserFollowService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersBioModule.html" data-type="entity-link" >UsersBioModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersBioModule-566e21361aa94b62f03f8e1ef21337d4a6d4966ceb842c9a63caf3d7ba25cf52a858ff6e1dd44f0f89f1e57eaa257296f3597225a30b164c95317ad7abfcb3f0"' : 'data-bs-target="#xs-controllers-links-module-UsersBioModule-566e21361aa94b62f03f8e1ef21337d4a6d4966ceb842c9a63caf3d7ba25cf52a858ff6e1dd44f0f89f1e57eaa257296f3597225a30b164c95317ad7abfcb3f0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersBioModule-566e21361aa94b62f03f8e1ef21337d4a6d4966ceb842c9a63caf3d7ba25cf52a858ff6e1dd44f0f89f1e57eaa257296f3597225a30b164c95317ad7abfcb3f0"' :
                                            'id="xs-controllers-links-module-UsersBioModule-566e21361aa94b62f03f8e1ef21337d4a6d4966ceb842c9a63caf3d7ba25cf52a858ff6e1dd44f0f89f1e57eaa257296f3597225a30b164c95317ad7abfcb3f0"' }>
                                            <li class="link">
                                                <a href="controllers/UsersBioController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersBioController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersBioModule-566e21361aa94b62f03f8e1ef21337d4a6d4966ceb842c9a63caf3d7ba25cf52a858ff6e1dd44f0f89f1e57eaa257296f3597225a30b164c95317ad7abfcb3f0"' : 'data-bs-target="#xs-injectables-links-module-UsersBioModule-566e21361aa94b62f03f8e1ef21337d4a6d4966ceb842c9a63caf3d7ba25cf52a858ff6e1dd44f0f89f1e57eaa257296f3597225a30b164c95317ad7abfcb3f0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersBioModule-566e21361aa94b62f03f8e1ef21337d4a6d4966ceb842c9a63caf3d7ba25cf52a858ff6e1dd44f0f89f1e57eaa257296f3597225a30b164c95317ad7abfcb3f0"' :
                                        'id="xs-injectables-links-module-UsersBioModule-566e21361aa94b62f03f8e1ef21337d4a6d4966ceb842c9a63caf3d7ba25cf52a858ff6e1dd44f0f89f1e57eaa257296f3597225a30b164c95317ad7abfcb3f0"' }>
                                        <li class="link">
                                            <a href="injectables/UsersBioService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersBioService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserSearchModule.html" data-type="entity-link" >UserSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserSearchModule-ad0b5586bec6d43ffe3be500a3bfaa81907aaf3952ad77a950e80787e1a8e60a8680fc0acb467c2b55208fb0183848d8893233cc18b2d0e77259c86580642465"' : 'data-bs-target="#xs-controllers-links-module-UserSearchModule-ad0b5586bec6d43ffe3be500a3bfaa81907aaf3952ad77a950e80787e1a8e60a8680fc0acb467c2b55208fb0183848d8893233cc18b2d0e77259c86580642465"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserSearchModule-ad0b5586bec6d43ffe3be500a3bfaa81907aaf3952ad77a950e80787e1a8e60a8680fc0acb467c2b55208fb0183848d8893233cc18b2d0e77259c86580642465"' :
                                            'id="xs-controllers-links-module-UserSearchModule-ad0b5586bec6d43ffe3be500a3bfaa81907aaf3952ad77a950e80787e1a8e60a8680fc0acb467c2b55208fb0183848d8893233cc18b2d0e77259c86580642465"' }>
                                            <li class="link">
                                                <a href="controllers/UserSearchController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserSearchController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserSearchModule-ad0b5586bec6d43ffe3be500a3bfaa81907aaf3952ad77a950e80787e1a8e60a8680fc0acb467c2b55208fb0183848d8893233cc18b2d0e77259c86580642465"' : 'data-bs-target="#xs-injectables-links-module-UserSearchModule-ad0b5586bec6d43ffe3be500a3bfaa81907aaf3952ad77a950e80787e1a8e60a8680fc0acb467c2b55208fb0183848d8893233cc18b2d0e77259c86580642465"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserSearchModule-ad0b5586bec6d43ffe3be500a3bfaa81907aaf3952ad77a950e80787e1a8e60a8680fc0acb467c2b55208fb0183848d8893233cc18b2d0e77259c86580642465"' :
                                        'id="xs-injectables-links-module-UserSearchModule-ad0b5586bec6d43ffe3be500a3bfaa81907aaf3952ad77a950e80787e1a8e60a8680fc0acb467c2b55208fb0183848d8893233cc18b2d0e77259c86580642465"' }>
                                        <li class="link">
                                            <a href="injectables/UserSearchService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserSearchService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-0d718cb6d7953eea9ef011971eca59cafdf74d68c8fd711bc1c9b5519b4ab4d1af4c569bb9c9ca2095edae3faaaa8992db73453638e08fe253676c0319020c33"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-0d718cb6d7953eea9ef011971eca59cafdf74d68c8fd711bc1c9b5519b4ab4d1af4c569bb9c9ca2095edae3faaaa8992db73453638e08fe253676c0319020c33"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-0d718cb6d7953eea9ef011971eca59cafdf74d68c8fd711bc1c9b5519b4ab4d1af4c569bb9c9ca2095edae3faaaa8992db73453638e08fe253676c0319020c33"' :
                                            'id="xs-controllers-links-module-UsersModule-0d718cb6d7953eea9ef011971eca59cafdf74d68c8fd711bc1c9b5519b4ab4d1af4c569bb9c9ca2095edae3faaaa8992db73453638e08fe253676c0319020c33"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-0d718cb6d7953eea9ef011971eca59cafdf74d68c8fd711bc1c9b5519b4ab4d1af4c569bb9c9ca2095edae3faaaa8992db73453638e08fe253676c0319020c33"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-0d718cb6d7953eea9ef011971eca59cafdf74d68c8fd711bc1c9b5519b4ab4d1af4c569bb9c9ca2095edae3faaaa8992db73453638e08fe253676c0319020c33"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-0d718cb6d7953eea9ef011971eca59cafdf74d68c8fd711bc1c9b5519b4ab4d1af4c569bb9c9ca2095edae3faaaa8992db73453638e08fe253676c0319020c33"' :
                                        'id="xs-injectables-links-module-UsersModule-0d718cb6d7953eea9ef011971eca59cafdf74d68c8fd711bc1c9b5519b4ab4d1af4c569bb9c9ca2095edae3faaaa8992db73453638e08fe253676c0319020c33"' }>
                                        <li class="link">
                                            <a href="injectables/CheckOneByIdentifierProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckOneByIdentifierProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateGoogleUserProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateGoogleUserProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateUserProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUserProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneByGoogleIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneByGoogleIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneByIdentifierProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneByIdentifierProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneUserByEmailProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneUserByEmailProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateUserProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateUserProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateUserRoleProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateUserRoleProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ViewsModule.html" data-type="entity-link" >ViewsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ViewsModule-1da2e73adb55252f0119438548d4403e19c044cb22149723ec3bd8e93ad89c0a6dfa4c7fe62d738c2e15e51e08ab2f7210928ceb8c9ed30c1fe57ddc83e23d7b"' : 'data-bs-target="#xs-controllers-links-module-ViewsModule-1da2e73adb55252f0119438548d4403e19c044cb22149723ec3bd8e93ad89c0a6dfa4c7fe62d738c2e15e51e08ab2f7210928ceb8c9ed30c1fe57ddc83e23d7b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ViewsModule-1da2e73adb55252f0119438548d4403e19c044cb22149723ec3bd8e93ad89c0a6dfa4c7fe62d738c2e15e51e08ab2f7210928ceb8c9ed30c1fe57ddc83e23d7b"' :
                                            'id="xs-controllers-links-module-ViewsModule-1da2e73adb55252f0119438548d4403e19c044cb22149723ec3bd8e93ad89c0a6dfa4c7fe62d738c2e15e51e08ab2f7210928ceb8c9ed30c1fe57ddc83e23d7b"' }>
                                            <li class="link">
                                                <a href="controllers/ViewsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ViewsModule-1da2e73adb55252f0119438548d4403e19c044cb22149723ec3bd8e93ad89c0a6dfa4c7fe62d738c2e15e51e08ab2f7210928ceb8c9ed30c1fe57ddc83e23d7b"' : 'data-bs-target="#xs-injectables-links-module-ViewsModule-1da2e73adb55252f0119438548d4403e19c044cb22149723ec3bd8e93ad89c0a6dfa4c7fe62d738c2e15e51e08ab2f7210928ceb8c9ed30c1fe57ddc83e23d7b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ViewsModule-1da2e73adb55252f0119438548d4403e19c044cb22149723ec3bd8e93ad89c0a6dfa4c7fe62d738c2e15e51e08ab2f7210928ceb8c9ed30c1fe57ddc83e23d7b"' :
                                        'id="xs-injectables-links-module-ViewsModule-1da2e73adb55252f0119438548d4403e19c044cb22149723ec3bd8e93ad89c0a6dfa4c7fe62d738c2e15e51e08ab2f7210928ceb8c9ed30c1fe57ddc83e23d7b"' }>
                                        <li class="link">
                                            <a href="injectables/ViewsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/XModule.html" data-type="entity-link" >XModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-XModule-d72ccc70b894958c721084ee1ae19ec9bf9c7897e21c4c1e8f7858dc5751dd6e678b6a49d9c01fbf4949825fb7e764cf2813bd47bd4de9484abdc2aedccfd5b5"' : 'data-bs-target="#xs-injectables-links-module-XModule-d72ccc70b894958c721084ee1ae19ec9bf9c7897e21c4c1e8f7858dc5751dd6e678b6a49d9c01fbf4949825fb7e764cf2813bd47bd4de9484abdc2aedccfd5b5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-XModule-d72ccc70b894958c721084ee1ae19ec9bf9c7897e21c4c1e8f7858dc5751dd6e678b6a49d9c01fbf4949825fb7e764cf2813bd47bd4de9484abdc2aedccfd5b5"' :
                                        'id="xs-injectables-links-module-XModule-d72ccc70b894958c721084ee1ae19ec9bf9c7897e21c4c1e8f7858dc5751dd6e678b6a49d9c01fbf4949825fb7e764cf2813bd47bd4de9484abdc2aedccfd5b5"' }>
                                        <li class="link">
                                            <a href="injectables/XService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >XService</a>
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
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BrandProfilesController.html" data-type="entity-link" >BrandProfilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CreatorProfilesController.html" data-type="entity-link" >CreatorProfilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EmailsController.html" data-type="entity-link" >EmailsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GoogleAuthController.html" data-type="entity-link" >GoogleAuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OfferingOffersController.html" data-type="entity-link" >OfferingOffersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OfferingPriceController.html" data-type="entity-link" >OfferingPriceController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OfferingsController.html" data-type="entity-link" >OfferingsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PreferredGamesController.html" data-type="entity-link" >PreferredGamesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SocialIntegrationController.html" data-type="entity-link" >SocialIntegrationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TeamsController.html" data-type="entity-link" >TeamsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UploadsController.html" data-type="entity-link" >UploadsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserFollowController.html" data-type="entity-link" >UserFollowController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersBioController.html" data-type="entity-link" >UsersBioController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserSearchController.html" data-type="entity-link" >UserSearchController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ViewsController.html" data-type="entity-link" >ViewsController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/BrandProfile.html" data-type="entity-link" >BrandProfile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/CreatorProfile.html" data-type="entity-link" >CreatorProfile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Offering.html" data-type="entity-link" >Offering</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Offering-1.html" data-type="entity-link" >Offering</a>
                                </li>
                                <li class="link">
                                    <a href="entities/OfferingOffers.html" data-type="entity-link" >OfferingOffers</a>
                                </li>
                                <li class="link">
                                    <a href="entities/OfferingPrice.html" data-type="entity-link" >OfferingPrice</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PreferredGames.html" data-type="entity-link" >PreferredGames</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ProfileView.html" data-type="entity-link" >ProfileView</a>
                                </li>
                                <li class="link">
                                    <a href="entities/SocialIntegration.html" data-type="entity-link" >SocialIntegration</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Team.html" data-type="entity-link" >Team</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UploadEntity.html" data-type="entity-link" >UploadEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserBio.html" data-type="entity-link" >UserBio</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserFollow.html" data-type="entity-link" >UserFollow</a>
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
                                <a href="classes/AddCompositeIndexOnOfferingOffersTable1756373227167.html" data-type="entity-link" >AddCompositeIndexOnOfferingOffersTable1756373227167</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddCompositeIndexOnUserFollowTable1755873449500.html" data-type="entity-link" >AddCompositeIndexOnUserFollowTable1755873449500</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddIndexesOnOfferOrderTable1756375322910.html" data-type="entity-link" >AddIndexesOnOfferOrderTable1756375322910</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddIndexOnInvoiceTable1756615885625.html" data-type="entity-link" >AddIndexOnInvoiceTable1756615885625</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddIndexOnOfferingsTable1756229112063.html" data-type="entity-link" >AddIndexOnOfferingsTable1756229112063</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddIndexOnOfferPriceTable1756371070579.html" data-type="entity-link" >AddIndexOnOfferPriceTable1756371070579</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddIndexOnPaymentIntentTable1756617003631.html" data-type="entity-link" >AddIndexOnPaymentIntentTable1756617003631</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddIndexOnPaymentTable1756617589479.html" data-type="entity-link" >AddIndexOnPaymentTable1756617589479</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddMetaDataColumnToPreferredGamesTable1750758874252.html" data-type="entity-link" >AddMetaDataColumnToPreferredGamesTable1750758874252</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddTokenFieldToUsersTable1755785462391.html" data-type="entity-link" >AddTokenFieldToUsersTable1755785462391</a>
                            </li>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterEnumSocialPlatform1756711325352.html" data-type="entity-link" >AlterEnumSocialPlatform1756711325352</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBioDto.html" data-type="entity-link" >CreateBioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBrandProfileDto.html" data-type="entity-link" >CreateBrandProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBrandProfileTable1750089906051.html" data-type="entity-link" >CreateBrandProfileTable1750089906051</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCreatorProfileDto.html" data-type="entity-link" >CreateCreatorProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCreatorProfileTable1750089846354.html" data-type="entity-link" >CreateCreatorProfileTable1750089846354</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEnums1750089383202.html" data-type="entity-link" >CreateEnums1750089383202</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateIndexOnRefundTable1756618599171.html" data-type="entity-link" >CreateIndexOnRefundTable1756618599171</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInvoiceTable1756614964725.html" data-type="entity-link" >CreateInvoiceTable1756614964725</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOfferingBundleDto.html" data-type="entity-link" >CreateOfferingBundleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOfferingDto.html" data-type="entity-link" >CreateOfferingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOfferingEnums1756223908953.html" data-type="entity-link" >CreateOfferingEnums1756223908953</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOfferingOfferDto.html" data-type="entity-link" >CreateOfferingOfferDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOfferingOffersTable1756372678359.html" data-type="entity-link" >CreateOfferingOffersTable1756372678359</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOfferingPriceDto.html" data-type="entity-link" >CreateOfferingPriceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOfferingTable1756224668793.html" data-type="entity-link" >CreateOfferingTable1756224668793</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOfferOrderTable1756374254072.html" data-type="entity-link" >CreateOfferOrderTable1756374254072</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOfferPriceTable1756370268965.html" data-type="entity-link" >CreateOfferPriceTable1756370268965</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaymentIntentTable1756616374656.html" data-type="entity-link" >CreatePaymentIntentTable1756616374656</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaymentRefundTable1756618354224.html" data-type="entity-link" >CreatePaymentRefundTable1756618354224</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaymentTable1756617183082.html" data-type="entity-link" >CreatePaymentTable1756617183082</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePreferredGamesTable1750234357114.html" data-type="entity-link" >CreatePreferredGamesTable1750234357114</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProfileViewTable1751045070851.html" data-type="entity-link" >CreateProfileViewTable1751045070851</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRefundStatusEnum1756618183116.html" data-type="entity-link" >CreateRefundStatusEnum1756618183116</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSocialIntegrationTable1750092962804.html" data-type="entity-link" >CreateSocialIntegrationTable1750092962804</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSocialPlatformEnum1750090379420.html" data-type="entity-link" >CreateSocialPlatformEnum1750090379420</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTeamsTables1756710447966.html" data-type="entity-link" >CreateTeamsTables1756710447966</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUploadTable1750089749558.html" data-type="entity-link" >CreateUploadTable1750089749558</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserBioTable1750089934420.html" data-type="entity-link" >CreateUserBioTable1750089934420</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserFollowerTable1751557015382.html" data-type="entity-link" >CreateUserFollowerTable1751557015382</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserTable1750089444236.html" data-type="entity-link" >CreateUserTable1750089444236</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindOfferingsQueryDto.html" data-type="entity-link" >FindOfferingsQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindOfferingsResponseDto.html" data-type="entity-link" >FindOfferingsResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FollowDto.html" data-type="entity-link" >FollowDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GoogleTokenDto.html" data-type="entity-link" >GoogleTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Offering.html" data-type="entity-link" >Offering</a>
                            </li>
                            <li class="link">
                                <a href="classes/Offering-1.html" data-type="entity-link" >Offering</a>
                            </li>
                            <li class="link">
                                <a href="classes/OfferingBundleResponseDto.html" data-type="entity-link" >OfferingBundleResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OfferingOffers.html" data-type="entity-link" >OfferingOffers</a>
                            </li>
                            <li class="link">
                                <a href="classes/OfferingPrice.html" data-type="entity-link" >OfferingPrice</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationMetaDto.html" data-type="entity-link" >PaginationMetaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchBioDto.html" data-type="entity-link" >PatchBioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchBrandProfileDto.html" data-type="entity-link" >PatchBrandProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchCreatorProfileDto.html" data-type="entity-link" >PatchCreatorProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPreferredGamesDto.html" data-type="entity-link" >PatchPreferredGamesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PathcUserRoleDto.html" data-type="entity-link" >PathcUserRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SigninDto.html" data-type="entity-link" >SigninDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCreatorProfilePicProvider.html" data-type="entity-link" >UpdateCreatorProfilePicProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserFollow.html" data-type="entity-link" >UserFollow</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSearchDto.html" data-type="entity-link" >UserSearchDto</a>
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
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BcryptProvider.html" data-type="entity-link" >BcryptProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BrandProfilesService.html" data-type="entity-link" >BrandProfilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CheckOneByIdentifierProvider.html" data-type="entity-link" >CheckOneByIdentifierProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateGoogleUserProvider.html" data-type="entity-link" >CreateGoogleUserProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateUserProvider.html" data-type="entity-link" >CreateUserProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreatorProfilesService.html" data-type="entity-link" >CreatorProfilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataResponseInterceptor.html" data-type="entity-link" >DataResponseInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DiscordService.html" data-type="entity-link" >DiscordService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailsService.html" data-type="entity-link" >EmailsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindOneByGoogleIdProvider.html" data-type="entity-link" >FindOneByGoogleIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindOneByIdentifierProvider.html" data-type="entity-link" >FindOneByIdentifierProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindOneUserByEmailProvider.html" data-type="entity-link" >FindOneUserByEmailProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GenerateTokensProvider.html" data-type="entity-link" >GenerateTokensProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAuthService.html" data-type="entity-link" >GoogleAuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashingProvider.html" data-type="entity-link" >HashingProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InstagramService.html" data-type="entity-link" >InstagramService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalUploadProvider.html" data-type="entity-link" >LocalUploadProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MetadataService.html" data-type="entity-link" >MetadataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OfferingBaseService.html" data-type="entity-link" >OfferingBaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OfferingOffersService.html" data-type="entity-link" >OfferingOffersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OfferingPriceService.html" data-type="entity-link" >OfferingPriceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OfferingsService.html" data-type="entity-link" >OfferingsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OfferingsService-1.html" data-type="entity-link" >OfferingsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PreferredGamesService.html" data-type="entity-link" >PreferredGamesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokensProvider.html" data-type="entity-link" >RefreshTokensProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/S3UploadProvider.html" data-type="entity-link" >S3UploadProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/S3UploadProvider-1.html" data-type="entity-link" >S3UploadProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SesEmailProvider.html" data-type="entity-link" >SesEmailProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SignInProvider.html" data-type="entity-link" >SignInProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SmtpEmailProvider.html" data-type="entity-link" >SmtpEmailProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SocialIntegrationProvider.html" data-type="entity-link" >SocialIntegrationProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SocialIntegrationService.html" data-type="entity-link" >SocialIntegrationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamsService.html" data-type="entity-link" >TeamsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TwitchService.html" data-type="entity-link" >TwitchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateBrandCoverPicProvider.html" data-type="entity-link" >UpdateBrandCoverPicProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateBrandProfilePicProvider.html" data-type="entity-link" >UpdateBrandProfilePicProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateBrandProfileProvider.html" data-type="entity-link" >UpdateBrandProfileProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateCreatorCoverPicProvider.html" data-type="entity-link" >UpdateCreatorCoverPicProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateCreatorProfileProvider.html" data-type="entity-link" >UpdateCreatorProfileProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateUserProvider.html" data-type="entity-link" >UpdateUserProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateUserRoleProvider.html" data-type="entity-link" >UpdateUserRoleProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UploadsService.html" data-type="entity-link" >UploadsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserFollowService.html" data-type="entity-link" >UserFollowService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersBioService.html" data-type="entity-link" >UsersBioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserSearchService.html" data-type="entity-link" >UserSearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ViewsService.html" data-type="entity-link" >ViewsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/XService.html" data-type="entity-link" >XService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link" >AuthenticationGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserTypeGuard.html" data-type="entity-link" >UserTypeGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActiveUserData.html" data-type="entity-link" >ActiveUserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConnectionCheckResult.html" data-type="entity-link" >ConnectionCheckResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmailProviderInterface.html" data-type="entity-link" >EmailProviderInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GoogleUser.html" data-type="entity-link" >GoogleUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PopulateOptions.html" data-type="entity-link" >PopulateOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SendOptions.html" data-type="entity-link" >SendOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SocialIntegrationServiceInterface.html" data-type="entity-link" >SocialIntegrationServiceInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadProviderInterface.html" data-type="entity-link" >UploadProviderInterface</a>
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
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
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