import { Container, Assets } from 'pixi.js'
import { LoadingBarContainer } from '../containers/loading-bar-container';
import { SceneManager, IScene } from '../shared/scene-manager';
import { GameScene1 } from './game-scene1';
import { manifest } from '../shared/manifest';
import { gsap } from "gsap";


export class LoaderScene extends Container implements IScene {
    private _loadingBar: LoadingBarContainer;

    constructor() {
        super();

        const loaderBarWidth = 280;
        this._loadingBar = new LoadingBarContainer(loaderBarWidth, SceneManager.width, SceneManager.height);

        // TODO: commented out because _loadingBar is buggy, using a simple CSS loading spinner instead
        // this.addChild(this._loadingBar);
        this.initLoader().then(() => {
            this.loaded();
        });
    }

    async initLoader(): Promise<void> {
        await Assets.init({manifest: manifest});
        const bundlesIds = manifest.bundles.map(bundle => bundle.name);
        await Assets.loadBundle(bundlesIds, this.downloadProgress.bind(this));
    }

    private downloadProgress(progressRatio: number): void {
        this._loadingBar.scaleProgress(progressRatio);
    }

    private loaded(): void {
        SceneManager.changeScene(new GameScene1(SceneManager.width, SceneManager.height));

        gsap.to('.game-title', {duration: 1, autoAlpha: 0, ease: "power2.out"});
        gsap.to('.loader', {duration: 0.3, autoAlpha: 0, ease: "power2.out"});
    }

    update(framesPassed: number): void {
        //...
    }

    resize(parentWidth: number, parentHeight: number): void {
        //...
    }
}
